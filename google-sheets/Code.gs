/**
 * DataPorium functions for Google Sheets.
 *
 * Setup:
 *   1. In your sheet, open Extensions > Apps Script and paste this file into Code.gs. Save.
 *   2. In Apps Script, open Project Settings > Script properties and add the property
 *      DATAPORIUM_API_KEY with your API key as the value.
 *   3. Back in the sheet, type for example =DP_PRICES("AAPL", 30).
 *
 * Answers are cached for 10 minutes, so a sheet that recalculates often stays within the rate limit.
 */

const DATAPORIUM_BASE_URL = "https://api.dataporium.io";

/**
 * Calls any DataPorium path and returns the decoded answer. Used by the functions below.
 * @param {string} path For example "/stock-price-1d".
 * @param {Object} params Query parameters.
 * @return {*} The decoded JSON answer.
 */
function dataporium_(path, params) {
  const key = PropertiesService.getScriptProperties().getProperty("DATAPORIUM_API_KEY");
  if (!key) throw new Error("Add DATAPORIUM_API_KEY in Apps Script > Project Settings > Script properties.");

  const query = Object.keys(params || {})
    .filter(function (name) { return params[name] !== "" && params[name] !== null && params[name] !== undefined; })
    .map(function (name) { return encodeURIComponent(name) + "=" + encodeURIComponent(params[name]); })
    .join("&");
  const url = DATAPORIUM_BASE_URL + path + (query ? "?" + query : "");

  const cache = CacheService.getScriptCache();
  const cacheKey = Utilities.base64Encode(Utilities.computeDigest(Utilities.DigestAlgorithm.MD5, url));
  const cached = cache.get(cacheKey);
  if (cached) return JSON.parse(cached);

  const response = UrlFetchApp.fetch(url, { headers: { apikey: key }, muteHttpExceptions: true });
  const status = response.getResponseCode();
  const text = response.getContentText();
  let body;
  try {
    body = JSON.parse(text);
  } catch (e) {
    body = null;
  }
  if (status >= 400) {
    throw new Error("DataPorium " + status + ": " + (body && body.detail ? body.detail : "request failed"));
  }
  if (text.length < 90000) cache.put(cacheKey, text, 600);
  return body;
}

/**
 * Daily closing prices of a stock, ETF, index or cryptocurrency, newest first.
 *
 * @param {string} ticker For example "AAPL", "SPY", "^GSPC" or "BTC-USD".
 * @param {number} days How many of the newest days to show (default 30).
 * @return Date and close.
 * @customfunction
 */
function DP_PRICES(ticker, days) {
  const records = dataporium_("/stock-price-1d", { ticker: ticker });
  if (!records || !records.length) return [["No data for " + ticker]];
  const bars = records[0].price_history.slice(0, days || 30);
  return [["Date", "Close"]].concat(bars.map(function (bar) { return [bar.date, bar.close]; }));
}

/**
 * The latest price of a stock, ETF, index or cryptocurrency.
 *
 * @param {string} ticker For example "AAPL" or "BTC-USD".
 * @return The latest price.
 * @customfunction
 */
function DP_PRICE(ticker) {
  const records = dataporium_("/stock-price-1d", { ticker: ticker });
  if (!records || !records.length) return "No data for " + ticker;
  return records[0].regular_market_price;
}

/**
 * A US economic series, newest first.
 *
 * @param {string} metric For example "GDP", "CPI", "unemployment_Rate" or "30Year_Fixed_Rate_Mortgage_Average".
 * @param {number} rows How many of the newest values to show (default 24).
 * @return Date and value.
 * @customfunction
 */
function DP_ECONOMY(metric, rows) {
  const data = dataporium_("/economic-metrics", { economic_metrics: metric });
  return [["Date", "Value"]].concat(data.slice(0, rows || 24).map(function (row) { return [row.date, row.value]; }));
}

/**
 * The main lines of a company's income statement for one quarter.
 *
 * @param {string} symbol For example "AAPL".
 * @param {string} fiscalYearQuarter For example "2025Q4".
 * @return Line and value.
 * @customfunction
 */
function DP_INCOME(symbol, fiscalYearQuarter) {
  const periods = dataporium_("/income-statements-summary", { symbol: symbol, fiscal_year_qtr: fiscalYearQuarter });
  if (!periods || !periods.length) return [["No data for " + symbol + " " + fiscalYearQuarter]];
  return [["Line", "Value"]].concat(periods[0].income_statement.map(function (line) { return [line.metric, line.value]; }));
}
