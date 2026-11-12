# DataPorium in Google Sheets

[Code.gs](Code.gs) adds four functions to a Google Sheet. They call the DataPorium API with your own API key, which stays in the script's settings and never appears in a cell.

| Function | Example | Returns |
|---|---|---|
| `DP_PRICE(ticker)` | `=DP_PRICE("AAPL")` | The latest price |
| `DP_PRICES(ticker, days)` | `=DP_PRICES("BTC-USD", 30)` | Date and close for the newest days |
| `DP_ECONOMY(metric, rows)` | `=DP_ECONOMY("unemployment_Rate", 24)` | Date and value of a US economic series |
| `DP_INCOME(symbol, quarter)` | `=DP_INCOME("AAPL", "2024Q2")` | The main lines of one quarter's income statement |

## Setup

1. Open your sheet, then **Extensions** > **Apps Script**.
2. Replace the contents of `Code.gs` with [this file](Code.gs) and save.
3. In Apps Script, open **Project Settings** (the gear icon) > **Script properties** > **Add script property**. Name: `DATAPORIUM_API_KEY`. Value: your API key. Save.
4. Back in the sheet, type a function, for example `=DP_PRICES("SPY", 30)`. The first time, Google asks you to allow the script to connect to an external service.

Answers are kept for 10 minutes, so a sheet that recalculates often stays well within the limit of 600 requests per minute.

## Notes

- Index tickers start with `^`, for example `=DP_PRICE("^GSPC")` for the S&P 500. Crypto uses `-USD`, for example `BTC-USD`.
- Economic series names are case-sensitive. The full list is in the [API documentation](https://dataporium.tech/api-docs).
- Anyone you share the sheet with as an editor can open the script settings and see the key. Share view-only copies, or remove the key before sharing.
- To add more functions, call `dataporium_("/path", { parameter: value })` with any path from the API documentation.
