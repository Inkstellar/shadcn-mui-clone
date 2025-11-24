/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_DEEPSEEK_API_KEY?: string;
    readonly VITE_OPENAI_API_KEY?: string;
    readonly VITE_ANTHROPIC_API_KEY?: string;
    readonly VITE_AZURE_CLIENT_ID?: string;
    readonly VITE_AZURE_AUTHORITY?: string;
    readonly VITE_AZURE_REDIRECT_URI?: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
