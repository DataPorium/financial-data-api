# DataPorium API in JavaScript

Two options:

- **The library** (recommended): [dataporium-js](https://github.com/DataPorium/dataporium-js) has every endpoint as a typed method, retries and error types.

  ```bash
  npm install github:DataPorium/dataporium-js
  ```

- **Plain fetch**, no library: see [fetch-example.mjs](fetch-example.mjs).

  ```bash
  export DATAPORIUM_API_KEY="YOUR_API_KEY"
  node fetch-example.mjs
  ```

Call the API from a server, a serverless function or a script. Code in a web page is visible to every visitor, and your key would be too.
