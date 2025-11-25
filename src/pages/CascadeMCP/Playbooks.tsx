import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import {
    Box,
    Typography,
    TextField,
    Button,
    Paper,
    CircularProgress,
    Stack,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
} from '@mui/material';
import { Add, Edit, Delete, Save, Cancel } from '@mui/icons-material';

interface PlaybooksProps {
    open: boolean;
    onClose: () => void;
    onPlaybooksUpdate?: (playbooks: any[]) => void;
}

export default function Playbooks({ open, onClose, onPlaybooksUpdate }: PlaybooksProps) {
    const { user } = useAuth();
    const [playbooks, setPlaybooks] = useState<any[]>([]);
    const [selectedPlaybook, setSelectedPlaybook] = useState<any | null>(null);
    const [playbookForm, setPlaybookForm] = useState({ title: '', description: '' });
    const [isEditMode, setIsEditMode] = useState(false);
    const [playbookLoading, setPlaybookLoading] = useState(false);

    // Playbook CRUD functions
    const fetchPlaybooks = async () => {
        try {
            setPlaybookLoading(true);
            const response = await fetch('http://localhost:5000/api/playbooks');
            if (response.ok) {
                const data = await response.json();
                setPlaybooks(data);
                // Notify parent component of playbook updates
                if (onPlaybooksUpdate) {
                    onPlaybooksUpdate(data);
                }
            }
        } catch (err) {
            console.error('Failed to fetch playbooks:', err);
        } finally {
            setPlaybookLoading(false);
        }
    };

    const handleSavePlaybook = async () => {
        if (!playbookForm.title.trim()) return;

        try {
            setPlaybookLoading(true);
            const url = selectedPlaybook
                ? `http://localhost:5000/api/playbooks/${selectedPlaybook.id}`
                : 'http://localhost:5000/api/playbooks';
            const method = selectedPlaybook ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...playbookForm,
                    created_by: user?.profile?.name || 'Unknown User',
                }),
            });

            if (response.ok) {
                await fetchPlaybooks();
                resetPlaybookForm();
            }
        } catch (err) {
            console.error('Failed to save playbook:', err);
        } finally {
            setPlaybookLoading(false);
        }
    };

    const handleEditPlaybook = (playbook: any) => {
        setSelectedPlaybook(playbook);
        setPlaybookForm({
            title: playbook.title,
            description: playbook.description || '',
        });
        setIsEditMode(true);
    };

    const handleDeletePlaybook = async (id: number) => {
        if (!confirm('Are you sure you want to delete this playbook?')) return;

        try {
            setPlaybookLoading(true);
            const response = await fetch(`http://localhost:5000/api/playbooks/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                await fetchPlaybooks();
            }
        } catch (err) {
            console.error('Failed to delete playbook:', err);
        } finally {
            setPlaybookLoading(false);
        }
    };

    const resetPlaybookForm = () => {
        setSelectedPlaybook(null);
        setPlaybookForm({ title: '', description: '' });
        setIsEditMode(false);
    };

    const handleClose = () => {
        resetPlaybookForm();
        onClose();
    };

    // Fetch playbooks when modal opens
    useEffect(() => {
        if (open) {
            fetchPlaybooks();
        }
    }, [open]);

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="md"
            fullWidth
        >
            <DialogTitle>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography variant="h6">Playbook Manager</Typography>
                    <IconButton
                        size="small"
                        onClick={() => {
                            resetPlaybookForm();
                            setIsEditMode(true);
                        }}
                    >
                        <Add />
                    </IconButton>
                </Stack>
            </DialogTitle>
            <DialogContent>
                {playbookLoading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <Box>
                        {/* Playbook Form (Create/Edit) */}
                        {isEditMode && (
                            <Paper sx={{ p: 3, mb: 3, border: '1px solid', borderColor: 'divider' }}>
                                <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                                    {selectedPlaybook ? 'Edit Playbook' : 'Create New Playbook'}
                                </Typography>
                                <TextField
                                    fullWidth
                                    label="Title"
                                    value={playbookForm.title}
                                    onChange={(e) => setPlaybookForm({ ...playbookForm, title: e.target.value })}
                                    sx={{ mb: 2 }}
                                    required
                                />
                                <TextField
                                    fullWidth
                                    label="Description"
                                    value={playbookForm.description}
                                    onChange={(e) => setPlaybookForm({ ...playbookForm, description: e.target.value })}
                                    multiline
                                    rows={4}
                                    sx={{ mb: 2 }}
                                />
                                <Stack direction="row" spacing={1}>
                                    <Button
                                        variant="contained"
                                        startIcon={<Save />}
                                        onClick={handleSavePlaybook}
                                        disabled={!playbookForm.title.trim()}
                                    >
                                        Save
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        startIcon={<Cancel />}
                                        onClick={resetPlaybookForm}
                                    >
                                        Cancel
                                    </Button>
                                </Stack>
                            </Paper>
                        )}

                        {/* Playbook List */}
                        {playbooks.length === 0 ? (
                            <Box sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
                                <Typography>No playbooks yet. Click the + button to create one.</Typography>
                            </Box>
                        ) : (
                            <List>
                                {playbooks.map((playbook) => (
                                    <ListItem
                                        key={playbook.id}
                                        sx={{
                                            border: '1px solid',
                                            borderColor: 'divider',
                                            borderRadius: 1,
                                            mb: 1,
                                            '&:hover': { bgcolor: 'action.hover' },
                                        }}
                                    >
                                        <ListItemText
                                            primary={playbook.title}
                                            secondary={
                                                <>
                                                    <Typography variant="body2" component="span" sx={{ display: 'block' }}>
                                                        {playbook.description}
                                                    </Typography>
                                                    <Typography variant="caption" color="text.secondary">
                                                        Created by: {playbook.created_by} | {new Date(playbook.created_on).toLocaleDateString()}
                                                    </Typography>
                                                </>
                                            }
                                        />
                                        <ListItemSecondaryAction>
                                            <Stack direction="row" spacing={1}>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleEditPlaybook(playbook)}
                                                >
                                                    <Edit fontSize="small" />
                                                </IconButton>
                                                <IconButton
                                                    size="small"
                                                    color="error"
                                                    onClick={() => handleDeletePlaybook(playbook.id)}
                                                >
                                                    <Delete fontSize="small" />
                                                </IconButton>
                                            </Stack>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                ))}
                            </List>
                        )}
                    </Box>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}
