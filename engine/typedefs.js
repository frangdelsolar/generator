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
# **${capitalizedModelName}**
"""
Type representing a ${modelName}.
"""
type ${capitalizedModelName} {
  _id: ID!
  # Unique identifier of the ${modelName}.
  
  ${fieldTypeDefs.join("\n  ")}
  
  createdAt: String
  # Date and time the ${modelName} was created. (Auto-generated on creation)
  
  createdBy: ID
  # ID of the user who created the ${modelName}.
  
  updatedAt: String
  # Date and time the ${modelName} was last updated. (Auto-generated on update)

  updatedBy: ID
  # ID of the user who last updated the ${modelName}.
}


# **${capitalizedModelName}Input**
"""
Input type for creating or updating a ${modelName}.
"""
input ${capitalizedModelName}Input {
  ${fieldTypeDefs.join("\n  ")}
}


# **${capitalizedModelName}Pagination**
"""
Pagination information for a list of ${modelName}s.
"""
type ${capitalizedModelName}Pagination {
    page: Int!
    # Current page number. (Required)

    limit: Int!
    # Number of ${modelName}s per page. (Required)
    
    hasNextPage: Boolean
    # Whether there are more ${modelName}s to be retrieved.

    totalCount: Int!
    # Total number of${modelName}s available. (Required)
}


# **${capitalizedModelName}Connection**
"""
Connection type for a paginated list of ${modelName}s.
"""
type ${capitalizedModelName}Connection {
    pageInfo: ${capitalizedModelName}Pagination!
    # Pagination information for the current ${modelName} list. (Required)

    data: [${capitalizedModelName}]!
    # Array of ${modelName}s for the current page. (Required)
}


# **delete${capitalizedModelName} mutation**
"""
Response type for the delete${capitalizedModelName} mutation.
"""
type ${capitalizedModelName}DeleteResponse {
    success: Boolean!
    # Whether the deletion was successful. (Required)

    resource: ${capitalizedModelName}
    # (Optional) The deleted ${modelName} information.
}


# **Query**
"""
Root query type for accessing ${modelName} data.
"""
type Query {
    get${capitalizedModelName}ById(id: ID!): ${capitalizedModelName}
    # Fetches a ${modelName} by its ID.

    getAll${capitalizedModelName}s(page: Int = 1, limit: Int = 10): ${capitalizedModelName}Connection!
    # Retrieves a paginated list of ${modelName}s.
}


# **Mutation**
"""
Root mutation type for creating, updating, and deleting ${modelName}s.
"""
type Mutation {
  create${capitalizedModelName}(input: ${capitalizedModelName}Input!): ${capitalizedModelName}
  # Creates a new ${modelName}.

  update${capitalizedModelName}(id: ID!, input: ${capitalizedModelName}Input!): ${capitalizedModelName}
  # Updates a new ${modelName}.

  delete${capitalizedModelName}(id: ID!): ${capitalizedModelName}DeleteResponse
  # Deletes a new ${modelName}.
}
`;

    return typeDefs;
}

module.exports = { generateTypeDefs };
