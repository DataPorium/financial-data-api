// The DataPorium API with plain fetch, no library. Node.js 18 or newer.
//
//   export DATAPORIUM_API_KEY="YOUR_API_KEY"
//   node fetch-example.mjs
//
// For a full client with every endpoint as a typed method, use
// https://github.com/DataPorium/dataporium-js instead.

const BASE_URL = "https://api.dataporium.io";
const API_KEY = process.env.DATAPORIUM_API_KEY;
if (!API_KEY) throw new Error("Set the DATAPORIUM_API_KEY environment variable");

async function dataporium(path, params = {}) {
  const url = `${BASE_URL}${path}?${new URLSearchParams(params)}`;
  const response = await fetch(url, { headers: { apikey: API_KEY } });
  const body = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(`DataPorium ${response.status}: ${body?.detail ?? response.statusText}`);
  }
  return body;
}

// Daily prices: a list with one record per ticker, bars under price_history, newest first
const [apple] = await dataporium("/stock-price-1d", { ticker: "AAPL" });
console.log("AAPL latest close:", apple.price_history[0].date, apple.price_history[0].close);

// A US economic series: rows with date and value, newest first
const unemployment = await dataporium("/economic-metrics", { economic_metrics: "unemployment_Rate" });
console.log("Unemployment rate:", unemployment[0].date, unemployment[0].value);

// Income statement of one quarter: lines under income_statement
const [quarter] = await dataporium("/income-statements-summary", { symbol: "AAPL", fiscal_year_qtr: "2024Q2" });
const lines = Object.fromEntries(quarter.income_statement.map((line) => [line.metric, line.value]));
console.log("AAPL 2024Q2 revenue:", lines["Total Revenue"], "net income:", lines["Net Income"]);
