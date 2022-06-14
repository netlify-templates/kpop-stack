import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      config.baseUrl = "http://localhost:8080"

      return config
    }
  },
});
