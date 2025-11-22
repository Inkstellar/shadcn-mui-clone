import { useState } from 'react';
import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    Paper,
    Grid,
    Alert,
    CircularProgress,
    MenuItem,
    Stack,
    Tabs,
    Tab,
    IconButton,
    Menu,
    Slider,
    Select,
    FormControl,
    InputLabel,
    Divider,
} from '@mui/material';
import { ContentCopy, PlayArrow, Code, Visibility } from '@mui/icons-material';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import OpenAI from 'openai';
import { MoreHorizontal, Settings } from 'lucide-react';

interface GeneratedComponent {
    code: string;
    componentName: string;
    timestamp: Date;
}

const EXAMPLE_PROMPTS = [
    'Create a login form with email and password fields',
    'Build a pricing card with three tiers',
    'Design a user profile card with avatar and bio',
    'Create a dashboard stats card with icon and number',
    'Build a contact form with name, email, and message fields',
    'Create a product card with image, title, price, and add to cart button',
    'Design a notification card with icon, message, and timestamp',
];

// System prompt for AI
const SYSTEM_PROMPT = `You are an expert React and TypeScript developer specializing in Material-UI and the mui-cascade component library.

Generate clean, production-ready React components using:
- React with TypeScript
- Material-UI (@mui/material) components
- mui-cascade library components (Button, Card, CardContent, CardActions, Input, Modal)
- lucide-react for icons
- Proper TypeScript types
- Functional components with hooks

Available mui-cascade components:
- Button: variant="contained" | "outlined" | "text" | "tonal"
- Card, CardContent, CardActions, CardHeader
- Input: with label, error, helperText, type, etc.
- Modal: with open, onClose, title, children

Guidelines:
1. Use TypeScript with proper types
2. Include all necessary imports
3. Use mui-cascade components when appropriate
4. Add proper styling with sx prop
5. Make components reusable and well-structured
6. Include state management if needed
7. Add comments for complex logic
8. Export as default function

Return ONLY the component code, no explanations or markdown formatting.`;

const AVAILABLE_MODELS = [
    // DeepSeek Models
    { value: 'deepseek-chat', label: 'DeepSeek Chat', provider: 'deepseek' },
    { value: 'deepseek-coder', label: 'DeepSeek Coder', provider: 'deepseek' },

    // OpenAI Models
    { value: 'gpt-4-turbo-preview', label: 'GPT-4 Turbo', provider: 'openai' },
    { value: 'gpt-4', label: 'GPT-4', provider: 'openai' },
    { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo', provider: 'openai' },

    // Anthropic Models
    { value: 'claude-3-5-sonnet-20241022', label: 'Claude 3.5 Sonnet', provider: 'anthropic' },
    { value: 'claude-3-opus-20240229', label: 'Claude 3 Opus', provider: 'anthropic' },
    { value: 'claude-3-haiku-20240307', label: 'Claude 3 Haiku', provider: 'anthropic' },
];

export default function CascadeMCP() {
    const [prompt, setPrompt] = useState('');
    const [loading, setLoading] = useState(false);
    const [generatedCode, setGeneratedCode] = useState<GeneratedComponent | null>(null);
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState(0);
    const [copied, setCopied] = useState(false);

    // Manual API keys (override environment variables)
    const [manualApiKeys, setManualApiKeys] = useState<Record<string, string>>({
        deepseek: '',
        openai: '',
        anthropic: '',
    });
    const [settingsAnchor, setSettingsAnchor] = useState<null | HTMLElement>(null);
    const [selectedModel, setSelectedModel] = useState('deepseek-chat');
    const [temperature, setTemperature] = useState(0.7);
    const [maxTokens, setMaxTokens] = useState(2048);

    const generateComponent = async () => {
        if (!prompt.trim()) {
            setError('Please enter a prompt');
            return;
        }

        // Get the provider for the selected model
        const modelConfig = AVAILABLE_MODELS.find(m => m.value === selectedModel);
        const provider = modelConfig?.provider || 'deepseek';

        // Get API key based on provider (manual key takes priority over env variable)
        let apiKey = '';
        let baseURL = '';

        if (provider === 'deepseek') {
            apiKey = manualApiKeys.deepseek || import.meta.env.VITE_DEEPSEEK_API_KEY || '';
            baseURL = 'https://api.deepseek.com';
        } else if (provider === 'openai') {
            apiKey = manualApiKeys.openai || import.meta.env.VITE_OPENAI_API_KEY || '';
            baseURL = 'https://api.openai.com/v1';
        } else if (provider === 'anthropic') {
            apiKey = manualApiKeys.anthropic || import.meta.env.VITE_ANTHROPIC_API_KEY || '';
            baseURL = 'https://api.anthropic.com/v1';
        }

        if (!apiKey) {
            setError(`API key not configured. Please add VITE_${provider.toUpperCase()}_API_KEY to your .env file`);
            return;
        }

        setLoading(true);
        setError('');

        try {
            const openai = new OpenAI({
                apiKey: apiKey,
                baseURL: baseURL,
                dangerouslyAllowBrowser: true, // Note: In production, use a backend proxy
            });

            const completion = await openai.chat.completions.create({
                model: selectedModel,
                messages: [
                    {
                        role: 'system',
                        content: SYSTEM_PROMPT,
                    },
                    {
                        role: 'user',
                        content: `Generate a React component for: ${prompt}`,
                    },
                ],
                temperature: temperature,
                max_tokens: maxTokens,
            });

            // Extract code from response
            let code = completion.choices[0]?.message?.content || '';

            // Clean up the code if it has markdown code blocks
            if (code.includes('```')) {
                const codeMatch = code.match(/```(?:typescript|tsx|jsx)?\n([\s\S]*?)```/);
                if (codeMatch) {
                    code = codeMatch[1];
                }
            }

            setGeneratedCode({
                code: code.trim(),
                componentName: 'GeneratedComponent',
                timestamp: new Date(),
            });
            setActiveTab(1); // Switch to code tab
        } catch (err: any) {
            console.error('Generation error:', err);
            setError(err.message || 'Failed to generate component. Please check your API key and try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = async () => {
        if (generatedCode) {
            await navigator.clipboard.writeText(generatedCode.code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const exportToCodeSandbox = () => {
        if (!generatedCode) return;

        const sandboxConfig = {
            files: {
                'package.json': {
                    content: {
                        dependencies: {
                            '@mui/material': '^5.14.20',
                            '@emotion/react': '^11.11.1',
                            '@emotion/styled': '^11.11.0',
                            '@mui/icons-material': '^5.14.19',
                            'mui-cascade': 'latest',
                            'lucide-react': '^0.294.0',
                            'react': '^18.2.0',
                            'react-dom': '^18.2.0',
                        },
                    },
                },
                'App.tsx': {
                    content: generatedCode.code,
                },
                'index.tsx': {
                    content: `import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import { createCustomTheme } from 'mui-cascade';
import App from './App';

const theme = createCustomTheme('light');
const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);`,
                },
                'public/index.html': {
                    content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${generatedCode.componentName}</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`,
                },
            },
        };

        fetch('https://codesandbox.io/api/v1/sandboxes/define?json=1', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(sandboxConfig),
        })
            .then(res => res.json())
            .then(data => {
                window.open(`https://codesandbox.io/s/${data.sandbox_id}`, '_blank');
            })
            .catch(err => {
                console.error('Failed to create sandbox:', err);
                setError('Failed to export to CodeSandbox');
            });
    };

    return (
        <Container maxWidth="xl" >
            <Box sx={{ py: 4 }}>
                <Typography variant="h1" sx={{ mb: 2 }}>
                    AI Component Playground
                </Typography>
                <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
                    Describe a UI component and watch it come to life with MUI and mui-cascade
                </Typography>
                <Paper sx={{ boxShadow: 'none', border: '1px solid', borderColor: 'divider', }}>
                    <Stack direction="row" gap={2} alignItems="center" sx={{ px: 3, height: 72, borderBottom: '1px solid', borderColor: 'divider', }}>
                        <Typography variant="h6" >
                            Build your component
                        </Typography>
                        <TextField
                            select
                            size="small"
                            sx={{ width: 240 }}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder='Select an example'
                        >
                            <MenuItem value="" selected disabled>
                                Select an example
                            </MenuItem>
                            {EXAMPLE_PROMPTS.map((example) => (
                                <MenuItem key={example} value={example}>
                                    {example}
                                </MenuItem>
                            ))}
                        </TextField>
                        <Box sx={{ flex: 1 }}></Box>
                        {generatedCode ? (
                            <>

                                <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)}>
                                    <Tab icon={<Visibility />} label="Preview" />
                                    <Tab icon={<Code />} label="Code" />
                                </Tabs>
                            </>
                        ) : null}
                        <IconButton
                            size="small"
                            onClick={(e) => setSettingsAnchor(e.currentTarget)}
                        >
                            <Settings />
                        </IconButton>
                        <Menu
                            anchorEl={settingsAnchor}
                            open={Boolean(settingsAnchor)}
                            onClose={() => setSettingsAnchor(null)}
                            PaperProps={{
                                sx: { width: 320, p: 2 }
                            }}
                        >
                            <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                                Model Settings
                            </Typography>

                            <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                                <InputLabel>Model</InputLabel>
                                <Select
                                    value={selectedModel}
                                    label="Model"
                                    onChange={(e) => setSelectedModel(e.target.value)}
                                >
                                    {AVAILABLE_MODELS.map((model) => (
                                        <MenuItem key={model.value} value={model.value}>
                                            {model.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <TextField
                                fullWidth
                                size="small"
                                type="password"
                                label={`API Key (${AVAILABLE_MODELS.find(m => m.value === selectedModel)?.provider.toUpperCase()})`}
                                placeholder="Enter API key or use .env"
                                value={manualApiKeys[AVAILABLE_MODELS.find(m => m.value === selectedModel)?.provider || 'deepseek'] || ''}
                                onChange={(e) => {
                                    const provider = AVAILABLE_MODELS.find(m => m.value === selectedModel)?.provider || 'deepseek';
                                    setManualApiKeys(prev => ({
                                        ...prev,
                                        [provider]: e.target.value
                                    }));
                                }}
                                helperText="Optional: Override environment variable"
                                sx={{ mb: 2 }}
                            />

                            <Divider sx={{ mb: 2 }} />

                            <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
                                Temperature: {temperature.toFixed(2)}
                            </Typography>
                            <Slider
                                value={temperature}
                                onChange={(_, value) => setTemperature(value as number)}
                                min={0}
                                max={1}
                                step={0.1}
                                marks={[
                                    { value: 0, label: '0' },
                                    { value: 0.5, label: '0.5' },
                                    { value: 1, label: '1' },
                                ]}
                                sx={{ mb: 3 }}
                            />

                            <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
                                Max Tokens: {maxTokens}
                            </Typography>
                            <Slider
                                value={maxTokens}
                                onChange={(_, value) => setMaxTokens(value as number)}
                                min={512}
                                max={4096}
                                step={256}
                                marks={[
                                    { value: 512, label: '512' },
                                    { value: 2048, label: '2K' },
                                    { value: 4096, label: '4K' },
                                ]}
                            />
                        </Menu>
                    </Stack>
                    <Grid container>
                        {/* Input Section */}
                        <Grid item xs={12} md={4}>
                            <Box sx={{ p: 3, borderRight: '1px solid', borderColor: 'divider', }}>


                                <TextField
                                    fullWidth
                                    multiline
                                    rows={8}
                                    label="Write your own prompt"
                                    placeholder="e.g., Create a dashboard card showing user statistics with an icon and number"
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    sx={{ mb: 2 }}
                                />

                                <Button
                                    variant="contained"
                                    fullWidth
                                    size="large"
                                    onClick={generateComponent}
                                    disabled={loading}
                                    startIcon={loading ? <CircularProgress size={20} /> : <PlayArrow />}
                                >
                                    {loading ? 'Generating...' : 'Generate Component'}
                                </Button>

                                {error && (
                                    <Alert severity="error" sx={{ mt: 2 }}>
                                        {error}
                                    </Alert>
                                )}

                                <Box sx={{ mt: 3 }}>
                                    <Typography variant="caption" color="text.secondary">
                                        💡 Tip: Be specific about the components you want to use (Button, Card, Input, Modal, etc.)
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>

                        {/* Preview/Code Section */}
                        <Grid item xs={12} md={8}>
                            <Box sx={{ p: 3 }}>
                                {generatedCode ? (
                                    <>
                                        {activeTab === 0 && (
                                            <Box
                                                sx={{
                                                    border: '1px solid',
                                                    borderColor: 'divider',
                                                    borderRadius: 2,
                                                    p: 3,
                                                    minHeight: 400,
                                                    backgroundColor: '#f9fafb',
                                                }}
                                            >
                                                <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
                                                    Preview (Component code ready - export to CodeSandbox to see it live)
                                                </Typography>
                                                <Alert severity="info">
                                                    Click "Open in CodeSandbox" below to see the live preview
                                                </Alert>
                                            </Box>
                                        )}

                                        {activeTab === 1 && (
                                            <Box>
                                                <Stack direction="row" width="100%" justifyContent="flex-end" spacing={1} sx={{ mb: 2 }}>
                                                    <Button
                                                        size="small"
                                                        variant="outlined"
                                                        startIcon={copied ? <Check /> : <ContentCopy />}
                                                        onClick={handleCopy}
                                                    >
                                                        {copied ? 'Copied!' : 'Copy Code'}
                                                    </Button>
                                                    <Button
                                                        size="small"
                                                        variant="contained"
                                                        onClick={exportToCodeSandbox}
                                                    >
                                                        Open in CodeSandbox
                                                    </Button>
                                                </Stack>

                                                <Box
                                                    sx={{
                                                        border: '1px solid',
                                                        borderColor: 'divider',
                                                        borderRadius: 2,
                                                        overflow: 'auto',
                                                        maxHeight: 500,
                                                    }}
                                                >
                                                    <SyntaxHighlighter
                                                        language="tsx"
                                                        style={oneLight}
                                                        customStyle={{
                                                            margin: 0,
                                                            fontSize: '0.875rem',
                                                        }}
                                                    >
                                                        {generatedCode.code}
                                                    </SyntaxHighlighter>
                                                </Box>
                                            </Box>
                                        )}
                                    </>
                                ) : (
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            minHeight: 400,
                                            color: 'text.secondary',
                                        }}
                                    >
                                        <Typography variant="body1">
                                            Enter a prompt and click "Generate Component" to get started
                                        </Typography>
                                    </Box>
                                )}
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
        </Container >
    );
}

function Check() {
    return <ContentCopy />;
}
