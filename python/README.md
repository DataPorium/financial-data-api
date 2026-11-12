# DataPorium API in Python

Two options:

- **The library** (recommended): [dataporium-python](https://github.com/DataPorium/dataporium-python) has every endpoint as a method, retries, error types and a pandas helper.

  ```bash
  pip install git+https://github.com/DataPorium/dataporium-python.git
  ```

- **Plain requests**, no library: see [requests_example.py](requests_example.py).

  ```bash
  pip install requests
  export DATAPORIUM_API_KEY="YOUR_API_KEY"
  python requests_example.py
  ```
