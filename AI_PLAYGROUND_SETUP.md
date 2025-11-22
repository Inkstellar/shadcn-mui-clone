# AI Component Playground - Setup Guide

## Quick Start

The AI Component Playground supports multiple AI providers including DeepSeek, OpenAI, and Anthropic. Choose the provider that best fits your needs!

### 1. Get Your API Key(s)

You can use any of these providers:

**DeepSeek** (Recommended - Most Cost-Effective)
1. Go to [https://platform.deepseek.com/](https://platform.deepseek.com/)
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key (it starts with `sk-...`)

**OpenAI** (GPT-4, GPT-3.5)
1. Go to [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Sign up or log in
3. Create a new API key
4. Copy the key (it starts with `sk-...`)

**Anthropic** (Claude Models)
1. Go to [https://console.anthropic.com/](https://console.anthropic.com/)
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key (it starts with `sk-ant-...`)

### 2. Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` and add your API key(s):
   ```bash
   # Add at least one API key
   VITE_DEEPSEEK_API_KEY=sk-your-deepseek-key-here
   VITE_OPENAI_API_KEY=sk-your-openai-key-here
   VITE_ANTHROPIC_API_KEY=sk-ant-your-anthropic-key-here
   ```

3. **Important**: Never commit `.env` to git (it's already in `.gitignore`)

### 3. Restart the Development Server

After adding your API key, restart the dev server:

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npx yarn run dev
```

### 4. Start Using the Playground

1. Navigate to **AI Playground** in the sidebar
2. Enter a description of the component you want
3. Click "Generate Component"
4. View the generated code
5. Export to CodeSandbox to see it live!

## Example Prompts

Try these prompts to get started:

- "Create a login form with email and password fields"
- "Build a pricing card with three tiers"
- "Design a user profile card with avatar and bio"
- "Create a dashboard stats card with icon and number"
- "Build a contact form with name, email, and message fields"
- "Create a product card with image, title, price, and add to cart button"

## Features

- ✨ **Multi-Provider Support**: Choose from DeepSeek, OpenAI (GPT-4), or Anthropic (Claude)
- 🎨 **mui-cascade Components**: Generates code using your custom component library
- 📋 **Copy to Clipboard**: Easily copy generated code
- 🚀 **CodeSandbox Export**: One-click export to live sandbox
- 💻 **Syntax Highlighting**: Beautiful code display with Prism
- 💰 **Cost-Effective**: DeepSeek offers the most affordable option
- ⚙️ **Configurable Settings**: Adjust temperature, max tokens, and model selection

## Available Models

### DeepSeek (Recommended)
- **DeepSeek Chat**: General-purpose conversational model
- **DeepSeek Coder**: Optimized for code generation
- **Pricing**: ~$0.14 per million input tokens, ~$0.28 per million output tokens
- **Cost per generation**: ~$0.0002-0.0005

### OpenAI
- **GPT-4 Turbo**: Latest and most capable GPT-4 model
- **GPT-4**: Powerful reasoning and code generation
- **GPT-3.5 Turbo**: Fast and cost-effective
- **Pricing**: Varies by model (~$0.01-0.10 per 1K tokens)

### Anthropic
- **Claude 3.5 Sonnet**: Balanced performance and speed
- **Claude 3 Opus**: Most capable Claude model
- **Claude 3 Haiku**: Fastest and most compact
- **Pricing**: Varies by model (~$3-15 per million tokens)

## Important Notes

### Security

⚠️ **Browser API Calls**: The current implementation uses `dangerouslyAllowBrowser: true` which allows direct API calls from the browser. This is fine for development but **NOT recommended for production**.

**For Production**: Create a backend API endpoint that proxies requests to DeepSeek:

```typescript
// Backend endpoint (Node.js/Express example)
import OpenAI from 'openai';

app.post('/api/generate-component', async (req, res) => {
  const openai = new OpenAI({
    apiKey: process.env.DEEPSEEK_API_KEY, // Server-side only
    baseURL: 'https://api.deepseek.com',
  });
  
  const completion = await openai.chat.completions.create({
    model: 'deepseek-chat',
    messages: req.body.messages,
    temperature: 0.7,
    max_tokens: 2048,
  });
  
  res.json(completion);
});
```

Then update the frontend to call your backend instead of DeepSeek directly.

### API Costs

- DeepSeek offers very competitive pricing
- DeepSeek-Chat pricing: ~$0.14 per million input tokens, ~$0.28 per million output tokens
- Typical component generation: 500-1500 tokens (~$0.0002-0.0005 per generation)
- Much more affordable than other AI providers!
- Monitor your usage at [https://platform.deepseek.com/](https://platform.deepseek.com/)

### Rate Limits

- Check your plan's rate limits on the DeepSeek platform
- Free tier has generous limits for testing
- If you hit rate limits, wait before trying again

## Troubleshooting

### "API key not configured" Error

- Make sure you created `.env` (not just `.env.example`)
- Verify the API key is correct and starts with `sk-`
- Restart the development server after adding the key

### "Failed to generate component" Error

- Check your API key is valid
- Verify you have API credits in your DeepSeek account
- Check the browser console for detailed error messages
- Ensure you're not hitting rate limits

### TypeScript Errors

If you see TypeScript errors about `process`, make sure `@types/node` is installed:

```bash
npx yarn add -D @types/node
```

## Advanced Configuration

### Change AI Model

DeepSeek offers different models. Update `.env` to use them:

```bash
# Standard model (recommended)
VITE_DEEPSEEK_MODEL=deepseek-chat

# Coder model (optimized for code generation)
VITE_DEEPSEEK_MODEL=deepseek-coder
```

### Customize System Prompt

Edit the `SYSTEM_PROMPT` constant in `src/pages/CascadeMCP.tsx` to change how the AI generates components.

### Adjust Temperature

In `CascadeMCP.tsx`, you can modify the `temperature` parameter:
- Lower (0.3-0.5): More focused and deterministic
- Medium (0.7): Balanced creativity and consistency (default)
- Higher (0.8-1.0): More creative and varied outputs

## Why DeepSeek?

- 💰 **Cost-Effective**: ~10-20x cheaper than other AI providers
- 🚀 **Fast**: Quick response times
- 🎯 **Code-Focused**: Excellent at generating clean, working code
- 🌐 **Open**: Compatible with OpenAI API format
- 📊 **Transparent**: Clear pricing and usage tracking

## Support

For issues or questions:
- Check the [DeepSeek Documentation](https://platform.deepseek.com/docs)
- Review the [mui-cascade Documentation](../mui-cascade/README.md)
- Open an issue in the project repository

Happy component building with DeepSeek! 🚀
