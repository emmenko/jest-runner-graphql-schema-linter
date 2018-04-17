<h1 align="center">jest-runner-graphql-schema-linter</h1>

## Usage

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
