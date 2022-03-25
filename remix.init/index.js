const crypto = require("crypto");
const fs = require("fs/promises");
const path = require("path");

function getRandomString(length) {
  return crypto.randomBytes(length).toString("hex");
}

// The initialization script for your project after
// you've installed.
//
// This will:
// - Replace our template name for your given app name in the README
// - Replace our template name for your given app name in the package.json
// - Add a new .env file for you to use based upon the example file
async function main({ rootDirectory }) {
  // env example
  const EXAMPLE_ENV_PATH = path.join(rootDirectory, ".env.sample");
  const ENV_PATH = path.join(rootDirectory, ".env");

  const [env] = await Promise.all([fs.readFile(EXAMPLE_ENV_PATH, "utf-8")]);

  // Create a new env file with all the necessary keys.
  // This will create a new key to give you a new session key
  // You will want to be sure to add your own credentials
  // as well.
  const newEnv = env.replace(
    /^SESSION_SECRET=.*$/m,
    `SESSION_SECRET="${getRandomString(16)}"`
  );

  await Promise.all([fs.writeFile(ENV_PATH, newEnv)]);
}

module.exports = main;
