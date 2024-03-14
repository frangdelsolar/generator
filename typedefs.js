function generateTypeDefs(objectDefinition) {
  console.log("Generating typedefs...", objectDefinition);

  const modelName = objectDefinition.model;
  const capitalizedModelName =
    modelName.charAt(0).toUpperCase() + modelName.slice(1);

  const typeDefs = `
type ${modelName} {
  ${objectDefinition.fields
    .map((field) => `${field.name}: ${field.type}`)
    .join("\n  ")}
}

input ${modelName}Input {
  ${objectDefinition.fields
    .map((field) => `${field.name.replace(/\s+/g, "")}: ${field.type}`)
    .join("\n  ")}
}

type Query {
  get${capitalizedModelName}ById(id: ID!): ${modelName}
  all${capitalizedModelName}s: [${modelName}]
}

type Mutation {
  create${capitalizedModelName}(input: ${modelName}Input!): ${modelName}
  update${capitalizedModelName}(id: ID!, input: ${modelName}Input!): ${modelName}
  delete${capitalizedModelName}(id: ID!): ${modelName}
}
`;

  return typeDefs;
}

module.exports = { generateTypeDefs };
