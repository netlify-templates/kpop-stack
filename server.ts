import * as build from "@remix-run/dev/server-build";
import { createRequestHandler } from "@netlify/remix-adapter";

const handler = createRequestHandler({
  build,
  mode: process.env.NODE_ENV,
});

export default handler;
