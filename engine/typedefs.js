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
    """
    Unique identifier of the ${modelName}.
    """
    _id: ID!  

    ${fieldTypeDefs.join("\n ")}

    """
    Date and time the ${modelName} was created. (Auto-generated on creation)
    """
    createdAt: String

    """
    ID of the user who created the ${modelName}.
    """  
    createdBy: User

    """
    Date and time the ${modelName} was last updated. (Auto-generated on update)
    """  
    updatedAt: String

    """
    ID of the user who last updated the ${modelName}.
    """  
    updatedBy: User
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
    """
    Current page number. (Required)
    """
    page: Int!

    """
    Number of ${modelName}s per page. (Required)
    """
    limit: Int!
    
    """
    Whether there are more ${modelName}s to be retrieved.
    """
    hasNextPage: Boolean

    """
    Total number of${modelName}s available. (Required)
    """
    totalCount: Int!
}


# **${capitalizedModelName}Connection**
"""
Connection type for a paginated list of ${modelName}s.
"""
type ${capitalizedModelName}Connection {
    """
    Pagination information for the current ${modelName} list. (Required)
    """
    pageInfo: ${capitalizedModelName}Pagination!

    """
    Array of ${modelName}s for the current page. (Required)
    """
    data: [${capitalizedModelName}]!
}


# **delete${capitalizedModelName} mutation**
"""
Response type for the delete${capitalizedModelName} mutation.
"""
type ${capitalizedModelName}DeleteResponse {
    """
    Whether the deletion was successful. (Required)
    """
    success: Boolean!

    """
    (Optional) The deleted ${modelName} information.
    """
    resource: ${capitalizedModelName}
}


# **Query**
"""
Root query type for accessing ${modelName} data.
"""
type Query {
    """
    Fetches a ${modelName} by its ID.
    """
    get${capitalizedModelName}ById(id: ID!): ${capitalizedModelName}

    """
    Retrieves a paginated list of ${modelName}s.
    """
    getAll${capitalizedModelName}s(page: Int = 1, limit: Int = 10): ${capitalizedModelName}Connection!
}


# **Mutation**
"""
Root mutation type for creating, updating, and deleting ${modelName}s.
"""
type Mutation {
    """
    Creates a new ${modelName}.
    """
    create${capitalizedModelName}(input: ${capitalizedModelName}Input!): ${capitalizedModelName}

    """
    Updates a new ${modelName}.
    """
    update${capitalizedModelName}(id: ID!, input: ${capitalizedModelName}Input!): ${capitalizedModelName}

    """
    Deletes a new ${modelName}.
    """
    delete${capitalizedModelName}(id: ID!): ${capitalizedModelName}DeleteResponse
}
`;

    return typeDefs;
}

module.exports = { generateTypeDefs };
