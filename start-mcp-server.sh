#!/bin/bash

# Portable MCP Server for Flagship_E2E
# No admin privileges required

echo "🚀 Starting Portable MCP Server for Flagship_E2E..."

# Check if MCP is installed
if ! command -v npx &> /dev/null; then
    echo "❌ npm/npx not found. Please ensure Node.js is installed."
    exit 1
fi

# Check if Playwright MCP is available
if ! npm list -g @playwright/mcp &> /dev/null; then
    echo "✅ @playwright/mcp is installed globally"
else
    echo "📦 Installing @playwright/mcp locally..."
    npm install @playwright/mcp
fi

# Set environment variables
export PLAYWRIGHT_PROJECT_DIR="/Users/nadzrul.adnan/Documents/PSL_Nadz/VSCODE/Flagship_E2E"

# Start MCP server on available port
echo "🌐 Starting MCP server..."
echo "📁 Project: $PLAYWRIGHT_PROJECT_DIR"
echo "🔧 Port: 3000 (or next available)"

# Start the server
npx @playwright/mcp --port 3000 --host localhost

echo "✅ MCP Server running for Flagship_E2E automation framework"
echo "🔗 Connect your AI tools to: http://localhost:3000"