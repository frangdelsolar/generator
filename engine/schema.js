const { camelCase } = require("./helpers");

/**
 * @function createFieldDefinition
 * @description Generates a Mongoose field definition string based on a field object.
 * @param {object} field - An object containing field properties:
 *  - {string} name - The name of the field.
 *  - {string} type - The data type of the field (e.g., "string", "number", "boolean", "Date").
 *  - {boolean} required (optional) - Whether the field is required (defaults to false).
 * @returns {string} The Mongoose field definition string.
 */
function createFieldDefinition(field) {
    const { name, type, required = false, unique } = field;
    const requiredString = required ? ", required: true" : "";
    const uniqueString = unique ? ", unique: true" : "";

    return `  ${name}: { type: ${mapJsonTypeToSchemaType(
        type
    )} ${requiredString} ${uniqueString}},`;
}

/**
 * @function mapJsonTypeToSchemaType
 * @description Maps a JSON data type to its corresponding Mongoose schema type.
 * @param {string} jsonType - The JSON data type (e.g., "string", "number", "boolean", "Date", "object").
 * @returns {string} The equivalent Mongoose schema type.
 */
function mapJsonTypeToSchemaType(jsonType) {
    switch (jsonType) {
        case "string":
            return "String";
        case "number":
            return "Number";
        case "boolean":
            return "Boolean";
        case "Date":
            return "Date";
        case "object":
            return "Schema.Types.Mixed"; // Consider custom schema definitions for complex objects
        default:
            return "String"; // Default to string for unknown types
    }
}

/**
 * @function createSchema
 * @description Creates a Mongoose schema based on an object definition.
 * @param {object} objectDefinition - An object containing schema definition information:
 *  - {string} model - The name of the model.
 *  - {array} fields - An array of objects representing field definitions (refer to createFieldDefinition function).
 * @returns {string} The complete Mongoose schema code as a string.
 */
function createSchema(objectDefinition) {
    const modelName = objectDefinition.model;
    const capitalizedName = camelCase(modelName);
    const fieldDefinitions = objectDefinition.fields.map(createFieldDefinition);

    const schemaTemplate = `
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ${modelName}Schema = new Schema({
${fieldDefinitions.join("\n")}
  createdAt: {
    type: Date,
    default: new Date().toISOString(),
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  updatedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  updatedAt: {
    type: Date,
  },
});

module.exports = mongoose.model("${capitalizedName}", ${modelName}Schema);
`;

    return schemaTemplate;
}

module.exports = { createSchema };
