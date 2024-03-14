const readAllFilesInFolder = require("./reader");
const writeObjectToFile = require("./writer");
const schemaService = require("./schema");
const resolverService = require("./resolver");
const tidefsService = require("./typedefs");

function main() {
  const allFileData = readAllFilesInFolder("codeGen/input");

  const postData = allFileData["post.json"];

  const schema = schemaService.createSchema(postData);

  writeObjectToFile(schema, `${postData.model}Schema.js`);

  const resolversString = resolverService.generateCrudResolvers(postData.model);
  writeObjectToFile(resolversString, `${postData.model}Resolvers.js`);

  const typeDefs = tidefsService.generateTypeDefs(postData);
  writeObjectToFile(typeDefs, `${postData.model}TypeDefs.graphql`);

  console.log("generator v2");
}

main();
