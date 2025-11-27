import { useState, useEffect } from 'react';
import {
    Container,
    Box,
    Typography,
    Paper,
    CircularProgress,
    Alert,
    Chip,
    Stack,
    TextField,
    MenuItem,
    IconButton,
} from '@mui/material';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { CheckCircle, XCircle, Clock, Eye } from 'lucide-react';
import { RequestDetailsModal } from './RequestDetailsModal';

interface MCPRequest {
    id: number;
    username: string;
    request_time: string;
    response_time: string | null;
    request_text: string;
    response_content: string | null;
    model: string;
    status: 'pending' | 'success' | 'failed';
    error_message: string | null;
    duration_ms: number | null;
    created_at: string;
}

interface MCPStats {
    total_requests: number;
    successful_requests: number;
    failed_requests: number;
    avg_duration_ms: number;
    unique_users: number;
}

export default function MCPLogs() {
    const [requests, setRequests] = useState<MCPRequest[]>([]);
    const [stats, setStats] = useState<MCPStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [codeModalOpen, setCodeModalOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState<MCPRequest | null>(null);

    useEffect(() => {
        fetchData();
    }, [statusFilter]);

    const fetchData = async () => {
        setLoading(true);
        setError('');
        try {
            // Fetch requests
            const filterParam = statusFilter !== 'all' ? `?status=${statusFilter}` : '';
            const requestsRes = await fetch(`http://localhost:5000/api/mcp/requests${filterParam}`);
            if (!requestsRes.ok) throw new Error('Failed to fetch requests');
            const requestsData = await requestsRes.json();

            // Fetch stats
            const statsRes = await fetch('http://localhost:5000/api/mcp/stats');
            if (!statsRes.ok) throw new Error('Failed to fetch stats');
            const statsData = await statsRes.json();

            setRequests(requestsData);
            setStats(statsData);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load data');
        } finally {
            setLoading(false);
        }
    };

    const handleViewCode = (request: MCPRequest) => {
        setSelectedRequest(request);
        setCodeModalOpen(true);
    };

    const handleCloseModal = () => {
        setCodeModalOpen(false);
        setSelectedRequest(null);
    };

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'ID',
            width: 70,
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 120,
            renderCell: (params: any) => {
                const status = params.value as string;
                const icons = {
                    success: <CheckCircle size={16} />,
                    failed: <XCircle size={16} />,
                    pending: <Clock size={16} />,
                };
                const colors = {
                    success: 'success',
                    failed: 'error',
                    pending: 'warning',
                } as const;
                return (
                    <Chip
                        icon={icons[status as keyof typeof icons]}
                        label={status}
                        color={colors[status as keyof typeof colors]}
                        size="small"
                    />
                );
            },
        },
        {
            field: 'username',
            headerName: 'User',
            width: 150,
        },
        {
            field: 'model',
            headerName: 'Model',
            width: 130,
        },
        {
            field: 'request_text',
            headerName: 'Request',
            width: 300,
            renderCell: (params: any) => (
                <Box
                    sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    }}
                    title={params.value}
                >
                    {params.value}
                </Box>
            ),
        },
        {
            field: 'duration_ms',
            headerName: 'Duration (ms)',
            width: 130,
            type: 'number',
            renderCell: (params: any) => {
                return params.value ? `${params.value.toLocaleString()} ms` : 'N/A';
            },
        },
        {
            field: 'request_time',
            headerName: 'Request Time',
            width: 180,
            renderCell: (params: any) => {
                return new Date(params.value).toLocaleString();
            },
        },
        {
            field: 'response_time',
            headerName: 'Response Time',
            width: 180,
            renderCell: (params: any) => {
                return params.value ? new Date(params.value).toLocaleString() : 'N/A';
            },
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 100,
            sortable: false,
            filterable: false,
            renderCell: (params: any) => (
                <IconButton
                    size="small"
                    onClick={() => handleViewCode(params.row)}
                    color="primary"
                    title="View Code"
                >
                    <Eye size={18} />
                </IconButton>
            ),
        },
    ];

    if (loading) {
        return (
            <Container>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: '60vh',
                    }}
                >
                    <CircularProgress />
                </Box>
            </Container>
        );
    }

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom>
                MCP Request Logs
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
                View and analyze AI component generation requests
            </Typography>

            {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                </Alert>
            )}

            {stats && (
                <Stack direction="row" spacing={2} sx={{ mb: 3 }} flexWrap="wrap">
                    <Paper sx={{ p: 2, minWidth: 150 }}>
                        <Typography variant="body2" color="text.secondary">
                            Total Requests
                        </Typography>
                        <Typography variant="h5">{stats.total_requests}</Typography>
                    </Paper>
                    <Paper sx={{ p: 2, minWidth: 150 }}>
                        <Typography variant="body2" color="text.secondary">
                            Successful
                        </Typography>
                        <Typography variant="h5" color="success.main">
                            {stats.successful_requests}
                        </Typography>
                    </Paper>
                    <Paper sx={{ p: 2, minWidth: 150 }}>
                        <Typography variant="body2" color="text.secondary">
                            Failed
                        </Typography>
                        <Typography variant="h5" color="error.main">
                            {stats.failed_requests}
                        </Typography>
                    </Paper>
                    <Paper sx={{ p: 2, minWidth: 150 }}>
                        <Typography variant="body2" color="text.secondary">
                            Avg Duration
                        </Typography>
                        <Typography variant="h5">
                            {stats.avg_duration_ms ? `${Math.round(stats.avg_duration_ms)} ms` : 'N/A'}
                        </Typography>
                    </Paper>
                    <Paper sx={{ p: 2, minWidth: 150 }}>
                        <Typography variant="body2" color="text.secondary">
                            Unique Users
                        </Typography>
                        <Typography variant="h5">{stats.unique_users}</Typography>
                    </Paper>
                </Stack>
            )}

            <Paper sx={{ mb: 3, p: 2 }}>
                <TextField
                    select
                    label="Filter by Status"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    size="small"
                    sx={{ minWidth: 200 }}
                >
                    <MenuItem value="all">All Status</MenuItem>
                    <MenuItem value="success">Success</MenuItem>
                    <MenuItem value="failed">Failed</MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
                </TextField>
            </Paper>

            <Paper sx={{ height: 600, width: '100%' }}>
                <DataGrid
                    rows={requests}
                    columns={columns}
                    pageSizeOptions={[10, 25, 50, 100]}
                    initialState={{
                        pagination: {
                            paginationModel: { pageSize: 25, page: 0 },
                        },
                        sorting: {
                            sortModel: [{ field: 'request_time', sort: 'desc' }],
                        },
                    }}
                    slots={{ toolbar: GridToolbar }}
                    slotProps={{
                        toolbar: {
                            showQuickFilter: true,
                        },
                    }}
                    disableRowSelectionOnClick
                    sx={{
                        '& .MuiDataGrid-cell': {
                            py: 1,
                            display: 'flex',
                            alignItems: 'center',
                        },
                    }}
                />
            </Paper>

            <RequestDetailsModal
                open={codeModalOpen}
                request={selectedRequest}
                onClose={handleCloseModal}
            />
        </Container>
    );
}
