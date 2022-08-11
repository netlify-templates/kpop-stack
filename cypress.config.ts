import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "fwkmco",
  e2e: {
    baseUrl: "http://localhost:3000"
  },
});