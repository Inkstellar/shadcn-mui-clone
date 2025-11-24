# Figma MCP Integration Guide

This guide explains how to use the Figma MCP (Model Context Protocol) integration in the AI Component Playground to convert Figma designs into React components.

## What is Figma MCP?

Figma MCP allows you to connect your Figma designs directly to the AI Component Playground. Instead of describing a component in text, you can provide a Figma design URL and have it automatically converted to a React component using MUI and mui-cascade.

## Prerequisites

1. **Figma Desktop App** installed on your machine
2. **Figma MCP Server** running locally on port 3845

## Setup

### 1. Install Figma Desktop MCP

The Figma MCP server runs as part of the Figma Desktop application. Make sure you have:
- Figma Desktop app installed
- MCP server enabled in Figma settings

### 2. Configure MCP Server

Add the following configuration to your MCP settings:

```json
{
  "mcpServers": {
    "Figma Desktop": {
      "url": "http://127.0.0.1:3845/mcp"
    }
  }
}
```

### 3. Start Figma Desktop

1. Open Figma Desktop application
2. Ensure the MCP server is running (check port 3845)
3. Keep Figma Desktop running while using the playground

## How to Use

### Step 1: Switch to Figma MCP Mode

1. Navigate to the AI Component Playground (`/cascade-mcp`)
2. Click the **"Figma MCP"** toggle button at the top
3. The interface will switch to Figma mode

### Step 2: Provide Figma Design URL

1. Copy the URL of your Figma design
   - Open your design in Figma
   - Click "Share" and copy the link
   - Example: `https://www.figma.com/file/abc123/My-Design`
2. Paste the URL in the "Figma Design URL" field

### Step 3: Add Instructions (Optional)

You can provide additional instructions to guide the conversion:
- "Use primary color for buttons"
- "Add hover effects to interactive elements"
- "Make it responsive for mobile"

### Step 4: Convert

Click the **"Convert from Figma"** button. The system will:
1. Connect to your local Figma MCP server
2. Fetch the design from Figma
3. Analyze the design structure
4. Generate React component code using MUI and mui-cascade
5. Display the generated code in the code viewer

## Features

### AI Generation Mode
- **Text-based prompts**: Describe what you want in natural language
- **Multiple AI models**: Choose from DeepSeek, OpenAI, or Anthropic
- **Customizable settings**: Adjust temperature and max tokens

### Figma MCP Mode
- **Design-to-code**: Convert Figma designs directly to React
- **Automatic styling**: Uses MUI theme and mui-cascade components
- **Additional instructions**: Guide the AI with specific requirements
- **Real-time conversion**: See your design as code instantly

## Troubleshooting

### "Failed to connect to Figma MCP server"

**Cause**: Figma Desktop MCP server is not running or not accessible.

**Solutions**:
1. Make sure Figma Desktop is running
2. Check that the MCP server is enabled in Figma settings
3. Verify port 3845 is not blocked by firewall
4. Restart Figma Desktop

### "Invalid Figma URL"

**Cause**: The provided URL is not a valid Figma design link.

**Solutions**:
1. Make sure you're using a Figma file URL (not a prototype or community link)
2. Ensure you have access to the design
3. Check that the URL is complete and correctly formatted

### Generated code doesn't match design

**Cause**: AI interpretation may vary based on design complexity.

**Solutions**:
1. Add more specific instructions in the "Additional Instructions" field
2. Break down complex designs into smaller components
3. Ensure your Figma design uses clear naming and structure
4. Try adjusting the AI model settings

## Best Practices

### For Better Results

1. **Clear Design Structure**
   - Use descriptive layer names in Figma
   - Group related elements
   - Use Auto Layout for responsive designs

2. **Specific Instructions**
   - Mention specific MUI components you want to use
   - Specify color schemes and themes
   - Note any interactive behaviors

3. **Component Scope**
   - Convert one component at a time
   - Start with simpler components
   - Build complex UIs by combining generated components

### Example Workflows

**Simple Button Component**:
1. Create button design in Figma
2. Copy Figma URL
3. Paste in playground
4. Instructions: "Use MUI Button with primary variant"
5. Convert and review code

**Dashboard Card**:
1. Design card with icon, title, and stats in Figma
2. Copy URL
3. Instructions: "Use Card component from mui-cascade, include hover effect"
4. Convert and customize

## Switching Between Modes

You can easily switch between AI Generation and Figma MCP modes:

- **AI Generation**: Best for describing components from scratch
- **Figma MCP**: Best when you have existing designs to convert

Both modes generate code that uses:
- Material-UI (MUI) components
- mui-cascade custom components
- Consistent theming and styling

## Security Note

The Figma MCP server runs locally on your machine (`127.0.0.1:3845`). Your Figma designs are processed locally and are not sent to external servers except for the AI generation step.

## Additional Resources

- [Figma Desktop Documentation](https://help.figma.com/hc/en-us/articles/360039823654-Download-the-Figma-Desktop-App)
- [MCP Protocol Specification](https://modelcontextprotocol.io/)
- [MUI Documentation](https://mui.com/)
- [mui-cascade Components](https://github.com/yourusername/mui-cascade)
