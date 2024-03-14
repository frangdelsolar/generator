function createSchema(objectDefinition) {
  const modelName = objectDefinition.model;
  const fieldDefinitions = objectDefinition.fields
    .map((field) => {
      const { name, type, required = false } = field;
      const requiredString = required ? ", required: true" : "";

      // Map JSON types to Mongoose schema types, including Date
      const schemaType = mapJsonTypeToSchemaType(type);

      return `  ${name}: { type: ${schemaType} ${requiredString} },`;
    })
    .join("\n");

  return `
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ${modelName}Schema = new Schema({
${fieldDefinitions}
});

module.exports = mongoose.model("${modelName}", ${modelName}Schema);
`;
}

function mapJsonTypeToSchemaType(jsonType) {
  switch (jsonType) {
    case "string":
      return "String";
    case "number":
      return "Number";
    case "boolean":
      return "Boolean";
    case "Date": // Handle Date type explicitly
      return "Date";
    case "object": // Handle potential nested objects or arrays
      return "Schema.Types.Mixed"; // Consider using custom schema definitions for complex objects
    default:
      return "String"; // Default to string for unknown types
  }
}

module.exports = { createSchema };
