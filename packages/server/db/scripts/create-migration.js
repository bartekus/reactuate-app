#!/usr/bin/env node
/*
 * Makes migration files in Benjie's preferred structure.
 *
 * https://db-migrate.readthedocs.io/en/latest/Getting%20Started/usage/#using-files-for-sqls
 */
/* eslint-disable no-console */
const readline = require("readline");
const fs = require("fs");
const { dirname, relative } = require("path");

const root = dirname(__dirname);

const ask = async (msg, multilinePrompt = null) => {
  console.log(msg);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: multilinePrompt || "> ",
  });
  rl.prompt();
  const response = await new Promise(resolve => {
    const allData = [];
    rl.on("line", line => {
      if (line) {
        allData.push(line);
      }
      if (!line || !multilinePrompt) {
        resolve(allData.join("\n") + (multilinePrompt ? "\n" : ""));
      } else {
        rl.prompt();
      }
    });
  });
  rl.close();
  console.log();
  return response;
};

async function main() {
  /* Migration name */
  const name = process.argv[2];
  const NAME_REGEX = /^[a-z][a-z0-9-_.]*$/;
  if (name && !name.match(NAME_REGEX)) {
    console.error(
      "Migration name is if the wrong format. We recommend SCHEMA.TYPE[.SUBJECT][.SUBJECT].ACTION; e.g. app_public.schema.create or app_public.column.users.bio.add_length_check"
    );
    process.exit(2);
  }
  if (!name || !name.length) {
    console.error(
      "Migration name is required, e.g. 'yarn db:migrate:create app_public.users.create'"
    );
    process.exit(1);
  }
  const allMigrations = fs.readdirSync(`${root}/migrations/.db-migrate`);
  const migrationWithSameName = allMigrations.find(
    n => n.substr(15) === `${name}.js`
  );
  if (migrationWithSameName) {
    console.error(
      `Migration name is already in use: ${migrationWithSameName}, please pick a different migration name`
    );
    process.exit(1);
  }

  /* Migration timestamp */
  const pad = i => (i < 10 ? `0${i}` : String(i));
  const date = new Date();
  const datestamp = `${date.getUTCFullYear()}${pad(
    date.getUTCMonth() + 1
  )}${pad(date.getUTCDate())}_${pad(date.getUTCHours())}${pad(
    date.getUTCMinutes()
  )}${pad(date.getUTCSeconds())}`;
  const compressedDatestamp = datestamp.replace(/_/g, "");

  /* Leg up on migration creation */
  const upContent = await ask(
    "Up migration content? (Add a blank line to exit this)",
    "up> "
  );
  const downContent = upContent
    ? await ask(
        "Down migration content? (Add a blank line to exit this)",
        "down> "
      )
    : "";

  /* Create migration files */
  const prefix = `${root}/migrations/${datestamp}.${name}`;
  const boilerplateMigrationPath = `${root}/migrations/.db-migrate/${compressedDatestamp}-${name.replace(
    /\./g,
    "__"
  )}.js`;

  fs.writeFileSync(
    boilerplateMigrationPath,
    `/* This is boilerplate, you want the parent directory for the actual migrations */
module.exports = require('../../scripts/migrate')(${JSON.stringify(
      `${datestamp}.${name}`
    )});\n`
  );

  fs.writeFileSync(`${prefix}-up.sql`, upContent);
  fs.writeFileSync(`${prefix}-down.sql`, downContent);

  /* Helpful(ish) output */
  const rel = filepath => relative(`${root}/..`, filepath);
  console.log(
    "Created these up and down migrations for you, please go edit them:"
  );
  console.log();
  console.log(`  ${rel(`${prefix}-up.sql`)}`);
  console.log(`  ${rel(`${prefix}-down.sql`)}`);
  console.log();
  console.log(
    "If you messed up the name and haven't ran migrated yet, you can remove them relevant files with this command:"
  );
  console.log();
  console.log(
    `  rm "${rel(`${prefix}-up.sql`)}" "${rel(`${prefix}-down.sql`)}" "${rel(
      `${boilerplateMigrationPath}`
    )}"`
  );
}

main()
  .catch(e => {
    console.error(e);
    process.exit(5);
  })
  .finally(() => {});
