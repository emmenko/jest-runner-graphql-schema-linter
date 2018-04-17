[![Build Status](https://travis-ci.org/emmenko/jest-runner-graphql-schema-linter.svg?branch=master)](https://travis-ci.org/emmenko/jest-runner-graphql-schema-linter)
[![npm version](https://badge.fury.io/js/jest-runner-graphql-schema-linter.svg)](https://badge.fury.io/js/jest-runner-graphql-schema-linter)

<div align="center">
  <!-- replace with accurate logo e.g from https://worldvectorlogo.com/ -->
  <img width="150" height="150" src="https://raw.githubusercontent.com/facebook/graphql/master/resources/GraphQL%20Logo.png">
  <a href="https://facebook.github.io/jest/">
    <img width="150" height="150" vspace="" hspace="25" src="https://user-images.githubusercontent.com/2440089/37489554-6f776bd2-286e-11e8-862f-cb6c398cf752.png">
  </a>
  <h1>jest-runner-graphql-schema-linter</h1>
  <p>GraphQL Schema Linter runner for Jest</p>
</div>

## Usage

This library is a [jest-runner](https://facebook.github.io/jest/docs/en/configuration.html#runner-string) for the [`graphql-schema-linter`](https://github.com/cjoudrey/graphql-schema-linter) library.

### Limitations

If your schema is spread across multiple files, you will probably get a bunch of errors (like `Type "Foo" not found in document.`). This is because jest will pass a single file path to be tested at a time, as opposed to letting the CLI concatenate all the graphql schema.

### Install

Install `jest`_(it needs Jest 21+)_ and `jest-runner-graphql-schema-linter`

```bash
yarn add --dev jest jest-runner-graphql-schema-linter

# or with NPM

npm install --save-dev jest jest-runner-graphql-schema-linter
```

### Add it to your Jest config

#### Standalone

In your `package.json`

```json
{
  "jest": {
    "runner": "jest-runner-graphql-schema-linter",
    "displayName": "lint:gql",
    "moduleFileExtensions": ["gql", "graphql"],
    "testMatch": ["<rootDir>/src/**/*.gql"]
  }
}
```

Or in `jest.config.js`

```js
module.exports = {
  runner: "jest-runner-graphql-schema-linter",
  displayName: "gql lint",
  moduleFileExtensions: ["gql", "graphql"],
  testMatch: ["<rootDir>/src/**/*.gql"]
};
```

Please update `testMatch` to match your project folder structure

#### Alongside other runners

It is recommended to use the [`projects`](https://facebook.github.io/jest/docs/en/configuration.html#projects-array-string-projectconfig) configuration option to run multiple Jest runners simultaneously.

If you are using Jest <22.0.5, you can use multiple Jest configuration files and supply the paths to those files in the `projects` option. For example:

```js
// jest-test.config.js
module.exports = {
  // your Jest test options
  displayName: "test"
};

// jest-grapqhl-schema-linter.config.js
module.exports = {
  // your jest-runner-graphql-schema-linter options
  runner: "jest-runner-graphql-schema-linter",
  displayName: "gql lint",
  moduleFileExtensions: ["gql", "graphql"],
  testMatch: ["<rootDir>/src/**/*.gql"]
};
```

In your `package.json`:

```json
{
  "jest": {
    "projects": [
      "<rootDir>/jest-test.config.js",
      "<rootDir>/jest-graphql-schema-linter.config.js"
    ]
  }
}
```

Or in `jest.config.js`:

```js
module.exports = {
  projects: [
    "<rootDir>/jest-test.config.js",
    "<rootDir>/jest-graphql-schema-linter.config.js"
  ]
};
```

If you are using Jest >=22.0.5, you can supply an array of project configuration objects instead. In your `package.json`:

```json
{
  "jest": {
    "projects": [
      {
        "displayName": "test"
      },
      {
        "runner": "jest-runner-graphql-schema-linter",
        "displayName": "lint:gql",
        "moduleFileExtensions": ["gql", "graphql"],
        "testMatch": ["<rootDir>/src/**/*.gql"]
      }
    ]
  }
}
```

Or in `jest.config.js`:

```js
module.exports = {
  projects: [
    {
      displayName: "test"
    },
    {
      runner: "jest-runner-graphql-schema-linter",
      displayName: "gql lint",
      moduleFileExtensions: ["gql", "graphql"],
      testMatch: ["<rootDir>/src/**/*.gql"]
    }
  ]
};
```

### Run Jest

```bash
yarn test
```

## Options

This project uses [cosmiconfig](https://github.com/davidtheclark/cosmiconfig), so you can provide config via:

* a `jest-runner-eslint` property in your `package.json`
* a `jest-runner-eslint.config.js` JS file
* a `.jest-runner-eslintrc` JSON file

In `package.json`

```json
{
  "jest-runner-eslint": {
    "cliOptions": {
      // Options here
    }
  }
}
```

or in `jest-runner-eslint.config.js`

```js
module.exports = {
  cliOptions: {
    // Options here
  }
};
```

### cliOptions

The listed options are the ones provided by the `graphql-schema-linter` CLI.

| option              | default | values       | example                                                            |
| ------------------- | ------- | ------------ | ------------------------------------------------------------------ |
| rules               | `[]`    |              | `"rules": ["fields-have-descriptions", "types-have-descriptions"]` |
| format              | `text`  | `text|json`  | `"format": "json"`                                                 |
| configDirection     | `null`  |              | `"configDirection": "./src"`                                       |
| customRulePaths     | `null`  |              | `"customRulePaths": "./rules/*.js"`                                |
| commentDescriptions | `false` | `false|true` | `"commentDescriptions": true`                                      |
| oldImplementSyntax  | `false` | `false|true` | `"oldImplementSyntax": true`                                       |
