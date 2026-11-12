"""The DataPorium API with the requests package, no DataPorium library.

    pip install requests
    export DATAPORIUM_API_KEY="YOUR_API_KEY"
    python requests_example.py

For a full client with every endpoint as a method, use
https://github.com/DataPorium/dataporium-python instead.
"""
import os

import requests

BASE_URL = "https://api.dataporium.io"
API_KEY = os.environ.get("DATAPORIUM_API_KEY")
if not API_KEY:
    raise SystemExit("Set the DATAPORIUM_API_KEY environment variable")


def dataporium(path, **params):
    response = requests.get(BASE_URL + path, params=params, headers={"apikey": API_KEY}, timeout=30)
    if response.status_code >= 400:
        try:
            detail = response.json().get("detail")
        except ValueError:
            detail = response.reason
        raise RuntimeError(f"DataPorium {response.status_code}: {detail}")
    return response.json()


# Daily prices: a list with one record per ticker, bars under price_history, newest first
apple = dataporium("/stock-price-1d", ticker="AAPL")[0]
latest = apple["price_history"][0]
print("AAPL latest close:", latest["date"], latest["close"])

# A US economic series: rows with date and value, newest first
unemployment = dataporium("/economic-metrics", economic_metrics="unemployment_Rate")
print("Unemployment rate:", unemployment[0]["date"], unemployment[0]["value"])

# Income statement of one quarter: lines under income_statement
quarter = dataporium("/income-statements-summary", symbol="AAPL", fiscal_year_qtr="2024Q2")[0]
lines = {line["metric"]: line["value"] for line in quarter["income_statement"]}
print("AAPL 2024Q2 revenue:", lines["Total Revenue"], "net income:", lines["Net Income"])
