import { Box, Paper, Stack, Typography, Chip, Divider } from '@mui/material';
import { DocItem } from '../../hooks/useMiniSearchDocs';

interface ExpandedDocumentViewProps {
    doc: DocItem;
    onClose: () => void;
    renderContent: (doc: DocItem) => React.ReactNode;
}

export function ExpandedDocumentView({ doc, onClose, renderContent }: ExpandedDocumentViewProps) {
    return (
        <Box >
            <Paper key={doc.id} id={doc.id} sx={{ p: 4, }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                    <Box>
                        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                            {doc.title}
                        </Typography>
                        {doc.category && (
                            <Chip label={doc.category} color="primary" variant="outlined" />
                        )}
                    </Box>
                    <Chip
                        label="Close"
                        onClick={onClose}
                        color="default"
                        variant="outlined"
                    />
                </Stack>
                <Divider sx={{ mb: 3 }} />
                {renderContent(doc)}
            </Paper>
        </Box>
    );
}
