# DataPorium in Excel (Power Query)

Excel's Power Query can load any DataPorium endpoint into a table that you refresh with one click. This works in Excel for Microsoft 365 and Excel 2016 or newer on Windows, and in Excel for Microsoft 365 on Mac.

## Setup

1. Open **Data** > **Get Data** > **From Other Sources** > **Blank Query**.
2. In the Power Query editor, open **Home** > **Advanced Editor**, paste one of the queries below, and replace `YOUR_API_KEY` with your key.
3. Click **Done**, then **Close & Load**. If Excel asks how to connect, choose **Anonymous**: the key is already in the request.
4. Use **Data** > **Refresh All** to get new data.

## Daily prices of a stock, ETF, index or cryptocurrency

```
let
    ApiKey = "YOUR_API_KEY",
    Ticker = "AAPL",
    Source = Json.Document(Web.Contents("https://api.dataporium.io", [
        RelativePath = "stock-price-1d",
        Query = [ticker = Ticker],
        Headers = [apikey = ApiKey]
    ])),
    Bars = Table.FromRecords(Source{0}[price_history]),
    Prices = Table.SelectColumns(Bars, {"date", "open", "high", "low", "close", "volume"}),
    Typed = Table.TransformColumnTypes(Prices, {{"date", type date}, {"open", type number}, {"high", type number}, {"low", type number}, {"close", type number}, {"volume", type number}})
in
    Typed
```

Change `Ticker` to `"SPY"`, `"^GSPC"` (S&P 500) or `"BTC-USD"` (bitcoin).

## A US economic series

```
let
    ApiKey = "YOUR_API_KEY",
    Metric = "unemployment_Rate",
    Source = Json.Document(Web.Contents("https://api.dataporium.io", [
        RelativePath = "economic-metrics",
        Query = [economic_metrics = Metric],
        Headers = [apikey = ApiKey]
    ])),
    Rows = Table.FromRecords(Source),
    Series = Table.SelectColumns(Rows, {"date", "value"}),
    Typed = Table.TransformColumnTypes(Series, {{"date", type date}, {"value", type number}})
in
    Typed
```

Other series names include `GDP`, `CPI`, `federal_Funds` and `30Year_Fixed_Rate_Mortgage_Average`. They are case-sensitive.

## Income statement of one quarter

```
let
    ApiKey = "YOUR_API_KEY",
    Source = Json.Document(Web.Contents("https://api.dataporium.io", [
        RelativePath = "income-statements-summary",
        Query = [symbol = "AAPL", fiscal_year_qtr = "2025Q4"],
        Headers = [apikey = ApiKey]
    ])),
    Lines = Table.FromRecords(Source{0}[income_statement]),
    Result = Table.SelectColumns(Lines, {"metric", "value"})
in
    Result
```

## Keep the key out of shared files

The key is saved inside the workbook. Before you send the file to someone, remove the key from the queries, or share only the values (copy and paste as values into a new workbook).
