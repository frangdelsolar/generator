function capitalizeTypeName(typeName) {
    return typeName.charAt(0).toUpperCase() + typeName.slice(1);
}

function mapJsonTypeToGraphQLType(type) {
    switch (type) {
        case "string":
            return "String";
        case "number":
            return "Float";
        case "boolean":
            return "Boolean";
        case "Date":
            return "String"; // Treat Date as String
        default:
            return "String"; // Default to String for unknown types
    }
}

function generateTypeDefs(objectDefinition) {
    const modelName = objectDefinition.model;
    const capitalizedModelName = capitalizeTypeName(modelName);

    // Filter out the "id" field from input fields
    const inputFields = objectDefinition.fields.filter(
        (field) => field.name.toLowerCase() !== "id"
    );

    const fieldTypeDefs = inputFields.map((field) => {
        const typeName = mapJsonTypeToGraphQLType(field.type);
        const exclamationMark = field.required ? "!" : ""; // Add "!" for required fields
        return `  ${field.name.replace(
            /\s+/g,
            ""
        )}: ${typeName}${exclamationMark}`;
    });

    const typeDefs = `
type ${capitalizedModelName} {
  _id: ID!
  ${fieldTypeDefs.join("\n  ")}

  createdAt: String
  createdBy: ID

  updatedAt: String
  updatedBy: ID
}

input ${capitalizedModelName}Input {
  ${fieldTypeDefs.join("\n  ")}
}

type ${capitalizedModelName}Pagination {
    page: Int!
    limit: Int!
    hasNextPage: Boolean
    totalCount: Int!
}

type ${capitalizedModelName}Connection {
    pageInfo: ${capitalizedModelName}Pagination!
    data: [${capitalizedModelName}]!
}

type Query {
    get${capitalizedModelName}ById(id: ID!): ${capitalizedModelName}
    getAll${capitalizedModelName}s(page: Int = 1, limit: Int = 10): ${capitalizedModelName}Connection!
}



type Mutation {
  create${capitalizedModelName}(input: ${capitalizedModelName}Input!): ${capitalizedModelName}
  update${capitalizedModelName}(id: ID!, input: ${capitalizedModelName}Input!): ${capitalizedModelName}
  delete${capitalizedModelName}(id: ID!): ${capitalizedModelName}
}
`;

    return typeDefs;
}

module.exports = { generateTypeDefs };
