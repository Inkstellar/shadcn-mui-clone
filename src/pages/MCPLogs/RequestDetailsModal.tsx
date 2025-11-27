import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    IconButton,
    Typography,
    Paper,
    Stack,
    Box,
    Chip,
    Alert,
} from '@mui/material';
import { X } from 'lucide-react';
import Editor from '@monaco-editor/react';

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

interface RequestDetailsModalProps {
    open: boolean;
    request: MCPRequest | null;
    onClose: () => void;
}

export function RequestDetailsModal({ open, request, onClose }: RequestDetailsModalProps) {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">Request Details</Typography>
                <IconButton onClick={onClose} size="small">
                    <X size={20} />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                {request && (
                    <Stack spacing={3}>
                        <Stack spacing={3} direction="row" flexWrap="wrap" gap={4}>
                            <Box>
                                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                    Request ID
                                </Typography>
                                <Typography variant="body1">#{request.id}</Typography>
                            </Box>
                            <Box>
                                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                    User
                                </Typography>
                                <Typography variant="body1">{request.username}</Typography>
                            </Box>
                            <Box>
                                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                    Model
                                </Typography>
                                <Typography variant="body1">{request.model}</Typography>
                            </Box>
                            <Box>
                                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                    Status
                                </Typography>
                                <Chip
                                    label={request.status}
                                    color={
                                        request.status === 'success'
                                            ? 'success'
                                            : request.status === 'failed'
                                            ? 'error'
                                            : 'warning'
                                    }
                                    size="small"
                                />
                            </Box>
                        </Stack>
                        <Box>
                            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                Request Text
                            </Typography>
                            <Paper
                                sx={{
                                    p: 2,
                                    backgroundColor: 'grey.100',
                                    maxHeight: 200,
                                    overflow: 'auto',
                                }}
                            >
                                <Typography
                                    variant="body2"
                                    component="pre"
                                    sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', m: 0 }}
                                >
                                    {request.request_text}
                                </Typography>
                            </Paper>
                        </Box>
                        {request.response_content && (
                            <Box>
                                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                    Response Code
                                </Typography>
                                <Box
                                    sx={{
                                        border: 1,
                                        borderColor: 'grey.300',
                                        borderRadius: 1,
                                        overflow: 'hidden',
                                        height: 400,
                                    }}
                                >
                                    <Editor
                                        height="400px"
                                        defaultLanguage="typescript"
                                        value={request.response_content}
                                        theme="vs-dark"
                                        options={{
                                            readOnly: true,
                                            minimap: { enabled: false },
                                            scrollBeyondLastLine: false,
                                            fontSize: 13,
                                            wordWrap: 'on',
                                            lineNumbers: 'on',
                                            folding: true,
                                        }}
                                    />
                                </Box>
                            </Box>
                        )}
                        {request.error_message && (
                            <Box>
                                <Typography variant="subtitle2" color="error" gutterBottom>
                                    Error Message
                                </Typography>
                                <Alert severity="error">{request.error_message}</Alert>
                            </Box>
                        )}
                        <Box>
                            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                Timing Information
                            </Typography>
                            <Stack spacing={1}>
                                <Typography variant="body2">
                                    <strong>Request Time:</strong>{' '}
                                    {new Date(request.request_time).toLocaleString()}
                                </Typography>
                                {request.response_time && (
                                    <Typography variant="body2">
                                        <strong>Response Time:</strong>{' '}
                                        {new Date(request.response_time).toLocaleString()}
                                    </Typography>
                                )}
                                {request.duration_ms && (
                                    <Typography variant="body2">
                                        <strong>Duration:</strong> {request.duration_ms.toLocaleString()} ms
                                    </Typography>
                                )}
                            </Stack>
                        </Box>
                    </Stack>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} variant="outlined">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}
