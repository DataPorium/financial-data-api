# DataPorium in AI assistants (MCP)

DataPorium runs a remote Model Context Protocol (MCP) server with 46 tools. Connect it once and the assistant can query stocks, company financials, Congress stock trades, layoffs, the US economy and housing down to the ZIP code, in plain language. There is nothing to install.

```
https://mcp.dataporium.io/mcp
```

The key goes in an `Authorization: Bearer YOUR_API_KEY` header, an `X-API-Key` header, or in the address as `?apikey=YOUR_API_KEY` for apps that only take a URL. MCP access is included with the Premium plan, with the same key as the REST API.

## Claude Code

```bash
claude mcp add --transport http dataporium https://mcp.dataporium.io/mcp --header "Authorization: Bearer YOUR_API_KEY"
```

## Cursor, VS Code and Windsurf (mcp.json)

```json
{
  "mcpServers": {
    "dataporium": {
      "url": "https://mcp.dataporium.io/mcp",
      "headers": { "Authorization": "Bearer YOUR_API_KEY" }
    }
  }
}
```

## Gemini CLI (~/.gemini/settings.json)

```json
{
  "mcpServers": {
    "dataporium": {
      "httpUrl": "https://mcp.dataporium.io/mcp",
      "headers": { "Authorization": "Bearer YOUR_API_KEY" }
    }
  }
}
```

## Claude and ChatGPT apps

Add a custom connector with the address `https://mcp.dataporium.io/mcp?apikey=YOUR_API_KEY`. The step-by-step setup for every app, including Grok and local-only clients, is on the [MCP page](https://dataporium.tech/mcp) and in the [MCP guide](https://github.com/DataPorium/dataporium-python/blob/main/docs/use-with-ai-assistants-mcp.md).

Treat an address that contains your key like a password.
