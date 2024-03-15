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

    const fieldTypeDefs = objectDefinition.fields.map((field) => {
        const typeName = mapJsonTypeToGraphQLType(field.type);
        const exclamationMark = field.required ? "!" : ""; // Add "!" for required fields
        return `  ${field.name.replace(
            /\s+/g,
            ""
        )}: ${typeName}${exclamationMark}`;
    });

    const typeDefs = `
type ${capitalizedModelName} {
  ${fieldTypeDefs.join("\n  ")}
}

input ${capitalizedModelName}Input {
  ${fieldTypeDefs.join("\n  ")}
}

type PageInfo {
    page: Int!
    totalCount: Int!
    hasNextPage: Boolean!
    }

type ${capitalizedModelName}Connection {
    pageInfo: PageInfo!
    edges: [${capitalizedModelName}Edge!]!
}

type ${capitalizedModelName}Edge {
    node: ${capitalizedModelName}
    cursor: String!
}

type Query {
    get${capitalizedModelName}ById(id: ID!): ${capitalizedModelName}
    all${capitalizedModelName}s(page: Int = 1, limit: Int = 10): ${capitalizedModelName}Connection!
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
