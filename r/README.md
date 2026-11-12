# DataPorium API in R

[dataporium.R](dataporium.R) defines a small `dataporium()` function with [httr2](https://httr2.r-lib.org) and uses it for prices, an economic series and an income statement.

```r
install.packages("httr2")
Sys.setenv(DATAPORIUM_API_KEY = "YOUR_API_KEY")   # or put DATAPORIUM_API_KEY=... in ~/.Renviron
source("dataporium.R")

prices <- dataporium("stock-price-1d", ticker = "SPY")$price_history[[1]]
gdp <- dataporium("economic-metrics", economic_metrics = "GDP")
```

Paths and parameter names are the API's own; the [API documentation](https://dataporium.tech/api-docs) lists them all. Rate-limit and server errors are retried, and other errors stop with the API's message.
