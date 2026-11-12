# DataPorium API examples

Short, working examples of the [DataPorium](https://dataporium.tech) Data API in different languages and tools. The API is a REST financial data API with real-time and historical market data across stocks, ETFs, crypto, forex and commodities, plus company fundamentals, news, the US economy and US housing: 203 endpoints in 42 categories, all returning JSON.

| Folder | Use it from |
|---|---|
| [curl](curl) | The terminal, or to try a request before writing code |
| [javascript](javascript) | Node.js, with plain `fetch` or the [JavaScript library](https://github.com/DataPorium/dataporium-js) |
| [python](python) | Python, with `requests` or the [Python library](https://github.com/DataPorium/dataporium-python) |
| [r](r) | R, with httr2 |
| [google-sheets](google-sheets) | Google Sheets formulas such as `=DP_PRICES("AAPL", 30)` |
| [excel](excel) | Excel, through Power Query |
| [mcp](mcp) | Claude, ChatGPT, Cursor and other AI assistants, with no code |

## How every request works

1. **Base URL:** `https://api.dataporium.io`
2. **API key:** send it in the `apikey` request header (recommended), or as `?apikey=YOUR_API_KEY` in the address. The header keeps the key out of server and proxy logs.
3. **Answer:** JSON.

```bash
curl -H "apikey: YOUR_API_KEY" "https://api.dataporium.io/company-info?symbol=AAPL"
```

Your API key comes with the Premium plan. Sign up at [dataporium.tech](https://dataporium.tech/pricing); the key is in your account settings once you subscribe. The same key works for the REST API (600 requests per minute) and the MCP server.

## The requests used in the examples

| What | Path | Parameters |
|---|---|---|
| Company profile | `/company-info` | `symbol=AAPL` |
| Daily prices of a stock, ETF, index or crypto | `/stock-price-1d` | `ticker=AAPL`, `^GSPC` or `BTC-USD` |
| Income statement of one quarter | `/income-statements-summary` | `symbol=AAPL&fiscal_year_qtr=2024Q2` |
| US economic series | `/economic-metrics` | `economic_metrics=unemployment_Rate` |
| Treasury yield curve | `/treasury-yields/curve` | `compare=1m,1y` |
| Homes for sale with a price cut | `/properties` | `zip=92602&price_cut=true` |

All 203 endpoints and their parameters are in the [API documentation](https://dataporium.tech/api-docs).

## Errors

| Code | Meaning |
|---|---|
| 401 | API key required. Include your API key in the request |
| 403 | Invalid or expired API key, or subscription inactive |
| 429 | Rate limit exceeded. The maximum is 600 requests per minute |
| 500 | Internal server error. Try again or contact support |

## Keep your key safe

- Do not put the key in code that you commit or share. Use an environment variable or your tool's secret settings.
- Do not put the key in a web page or a mobile app. Call the API from your own server.
- If a key leaks, create a new key in your account settings. The old one stops working.

## Links

- Website: <https://dataporium.tech>
- API documentation: <https://dataporium.tech/api-docs>
- MCP server: <https://dataporium.tech/mcp>
- Python library: <https://github.com/DataPorium/dataporium-python>
- JavaScript library: <https://github.com/DataPorium/dataporium-js>
- Questions: [open an issue](https://github.com/DataPorium/dataporium-examples/issues) or write to info@dataporium.tech

The examples are released under the [MIT License](LICENSE). Data is for information only and is not investment advice.
