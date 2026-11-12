# DataPorium API with curl

Every request goes to `https://api.dataporium.io` with your API key in the `apikey` header. Set the key once in your terminal:

```bash
export DATAPORIUM_API_KEY="YOUR_API_KEY"
```

## Company profile

```bash
curl -H "apikey: $DATAPORIUM_API_KEY" "https://api.dataporium.io/company-info?symbol=AAPL"
```

## Daily prices of a stock, ETF, index or cryptocurrency

```bash
curl -H "apikey: $DATAPORIUM_API_KEY" "https://api.dataporium.io/stock-price-1d?ticker=AAPL"

# Index tickers start with ^, written as %5E in an address
curl -H "apikey: $DATAPORIUM_API_KEY" "https://api.dataporium.io/stock-price-1d?ticker=%5EGSPC"

# Crypto: add -USD to the symbol
curl -H "apikey: $DATAPORIUM_API_KEY" "https://api.dataporium.io/stock-price-1d?ticker=BTC-USD"
```

The answer is a list with one record per ticker. The daily bars (date, open, high, low, close, volume) are in `price_history`, newest first.

## Income statement of one quarter

```bash
curl -H "apikey: $DATAPORIUM_API_KEY" "https://api.dataporium.io/income-statements-summary?symbol=AAPL&fiscal_year_qtr=2024Q2"
```

## A US economic series

```bash
curl -H "apikey: $DATAPORIUM_API_KEY" "https://api.dataporium.io/economic-metrics?economic_metrics=unemployment_Rate"
```

The answer is a list of rows with a `date` and a `value`, newest first.

## The Treasury yield curve

```bash
curl -H "apikey: $DATAPORIUM_API_KEY" "https://api.dataporium.io/treasury-yields/curve?compare=1m,1y"
```

## Homes for sale with a recent price cut

```bash
curl -H "apikey: $DATAPORIUM_API_KEY" "https://api.dataporium.io/properties?zip=92602&price_cut=true&price_cut_within_days=30&limit=10"
```

## Pretty output

Add [jq](https://jqlang.org) to read the answer:

```bash
curl -s -H "apikey: $DATAPORIUM_API_KEY" "https://api.dataporium.io/stock-price-1d?ticker=AAPL" \
  | jq '.[0].price_history[:5][] | {date, close}'
```

## Errors

| Code | Meaning |
|---|---|
| 401 | API key required. Include your API key in the request |
| 403 | Invalid or expired API key, or subscription inactive |
| 429 | Rate limit exceeded. The maximum is 600 requests per minute |
| 500 | Internal server error. Try again or contact support |
