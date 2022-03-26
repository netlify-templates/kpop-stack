const crypto = require("crypto");
const fs = require("fs/promises");
const path = require("path");

function escapeRegExp(string) {
  // $& means the whole matched string
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

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
  const EXAMPLE_ENV_PATH = path.join(rootDirectory, ".env.sample");
  const ENV_PATH = path.join(rootDirectory, ".env");
  const README_PATH = path.join(rootDirectory, "README.md");

  const REPLACER = "kpop-stack-template";

  const DIR_NAME = path.basename(rootDirectory);
  const SUFFIX = getRandomString(2);
  const APP_NAME = (DIR_NAME + "-" + SUFFIX)
    // get rid of anything that's not allowed in an app name
    .replace(/[^a-zA-Z0-9-_]/g, "-");

  const [env, readme] = await Promise.all([
    fs.readFile(EXAMPLE_ENV_PATH, "utf-8"),
    fs.readFile(README_PATH, "utf-8"),
  ]);

  // Create a new env file with all the necessary keys.
  // This will create a new key to give you a new session key
  // You will want to be sure to add your own credentials
  // as well.
  const newEnv = env.replace(
    /^SESSION_SECRET=.*$/m,
    `SESSION_SECRET="${getRandomString(16)}"`
  );

  // Parse the README and replace the name with our app name
  const newReadme = readme.replace(
    new RegExp(escapeRegExp(REPLACER), "g"),
    APP_NAME
  );

  await Promise.all([
    fs.writeFile(ENV_PATH, newEnv),
    fs.writeFile(README_PATH, newReadme),
  ]);
}

module.exports = main;
