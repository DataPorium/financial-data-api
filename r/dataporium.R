# The DataPorium API in R, with the httr2 package.
#
#   install.packages("httr2")
#   Sys.setenv(DATAPORIUM_API_KEY = "YOUR_API_KEY")   # or put it in ~/.Renviron
#   source("dataporium.R")

library(httr2)

dataporium <- function(path, ...) {
  key <- Sys.getenv("DATAPORIUM_API_KEY")
  if (key == "") stop("Set the DATAPORIUM_API_KEY environment variable")
  request("https://api.dataporium.io") |>
    req_url_path_append(path) |>
    req_url_query(...) |>
    req_headers(apikey = key) |>
    req_retry(max_tries = 3) |>
    req_error(body = function(resp) tryCatch(resp_body_json(resp)$detail, error = function(e) NULL)) |>
    req_perform() |>
    resp_body_json(simplifyVector = TRUE)
}

# Daily prices: one record per ticker, bars in price_history, newest first
apple <- dataporium("stock-price-1d", ticker = "AAPL")
bars <- apple$price_history[[1]]
print(head(bars[, c("date", "open", "high", "low", "close", "volume")]))

# A US economic series: a data frame with date and value, newest first
unemployment <- dataporium("economic-metrics", economic_metrics = "unemployment_Rate")
print(head(unemployment[, c("date", "value")]))

# Income statement of one quarter: lines in income_statement
quarter <- dataporium("income-statements-summary", symbol = "AAPL", fiscal_year_qtr = "2025Q4")
lines <- quarter$income_statement[[1]]
print(lines[lines$metric %in% c("Total Revenue", "Net Income"), c("metric", "value")])
