const readAllFilesInFolder = require("./inputReader");
const writeObjectToFile = require("./writer");
const schemaService = require("./schema");
const generateResolvers = require("./resolver");
const tidefsService = require("./typedefs");

const logger = require("../services/logger");

async function runner() {
    logger.info("Running code generator engine...");

    const allFileData = await readAllFilesInFolder();

    Object.keys(allFileData).forEach((fileName) => {
        const data = allFileData[fileName];
        const schema = schemaService.createSchema(data);
        const resolversString = generateResolvers(data.model);
        const typeDefs = tidefsService.generateTypeDefs(data);
        writeObjectToFile(schema, `${data.model}Schema.js`);
        writeObjectToFile(resolversString, `${data.model}Resolvers.js`);
        writeObjectToFile(typeDefs, `${data.model}TypeDefs.graphql`);
    });

    // const postData = allFileData["post.json"];

    // const schema = schemaService.createSchema(postData);

    // writeObjectToFile(schema, `${postData.model}Schema.js`);

    // const resolversString = resolverService.generateCrudResolvers(
    //     postData.model
    // );
    // writeObjectToFile(resolversString, `${postData.model}Resolvers.js`);

    // const typeDefs = tidefsService.generateTypeDefs(postData);
    // writeObjectToFile(typeDefs, `${postData.model}TypeDefs.graphql`);

    // console.log("generator v2");
}

module.exports = runner;
