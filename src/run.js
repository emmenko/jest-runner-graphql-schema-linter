const fs = require("fs");
const { pass, fail } = require("create-jest-runner");
const {
  configuration: { Configuration },
  validator: { validateSchemaDefinition }
} = require("graphql-schema-linter");

module.exports = ({ testPath }) => {
  const start = new Date();

  // NOTE: the following setup is taken from the `runner.js` file
  // in the linter library.
  // https://github.com/cjoudrey/graphql-schema-linter/blob/ca77478e2204e5cdc57adbb4fbffe4cdd81459ec/src/runner.js#L63-L96

  const configuration = new Configuration({
    schemaPaths: [testPath]
    // TODO: allow to pass custom options
  });
  const formatter = configuration.getFormatter();
  const issues = configuration.validate();
  const issueErrors = issues.filter(issue => issue.type === "error");

  if (issueErrors.length > 0) {
    const combinedErrorMessages = [];
    const combinedWarningMessages = [];
    issueErrors.forEach(issue => {
      if (issue.type === "error") {
        combinedErrorMessages.push(`Error on ${issue.field}: ${issue.message}`);
      } else if (issue.type === "warning") {
        combinedWarningMessages.push(
          `Warning on ${issue.field}: ${issue.message}`
        );
      }
    });
    if (combinedWarningMessages) {
      console.warn(combinedErrorMessages.join("\n\n"));
    }
    return fail({
      start,
      end: new Date(),
      test: {
        path: testPath,
        errorMessage: combinedErrorMessages.join("\n\n")
      }
    });
  }

  const schema = configuration.getSchema();
  if (schema == null) {
    return fail({
      start,
      end: new Date(),
      test: {
        path: testPath,
        errorMessage: "No valid schema input."
      }
    });
  }

  const rules = configuration.getRules();
  const schemaSourceMap = configuration.getSchemaSourceMap();
  const errors = validateSchemaDefinition(schema, rules, configuration);
  const groupedErrors = groupErrorsBySchemaFilePath(errors, schemaSourceMap);

  if (errors.length === 0) {
    return pass({
      start,
      end: new Date(),
      test: { path: testPath }
    });
  }
  return fail({
    start,
    end: new Date(),
    test: {
      path: testPath,
      errorMessage: formatter(groupedErrors)
    }
  });
};

// From https://github.com/cjoudrey/graphql-schema-linter/blob/ca77478e2204e5cdc57adbb4fbffe4cdd81459ec/src/runner.js#L103-L118
function groupErrorsBySchemaFilePath(errors, schemaSourceMap) {
  return errors.reduce((groupedErrors, error) => {
    const path = schemaSourceMap.getOriginalPathForLine(
      error.locations[0].line
    );

    const offsetForPath = schemaSourceMap.getOffsetForPath(path);
    error.locations[0].line =
      error.locations[0].line - offsetForPath.startLine + 1;

    groupedErrors[path] = groupedErrors[path] || [];
    groupedErrors[path].push(error);

    return groupedErrors;
  }, {});
}
