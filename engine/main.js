const readAllFilesInFolder = require("./inputReader");
const writeObjectToFile = require("./writer");
const schemaService = require("./schema");
const generateResolvers = require("./resolver");
const tidefsService = require("./typedefs");

const logger = require("../services/logger");

const { TYPEDEFS_DIR, RESOLVERS_DIR, MODELS_DIR } = require("../config");

async function runner() {
    logger.info("Running code generator engine...");

    const allFileData = await readAllFilesInFolder();

    Object.keys(allFileData).forEach((fileName) => {
        const data = allFileData[fileName];
        const schema = schemaService.createSchema(data);
        const resolversString = generateResolvers(data.model);
        const typeDefs = tidefsService.generateTypeDefs(data);
        writeObjectToFile(schema, MODELS_DIR, `${data.model}Schema.js`);
        writeObjectToFile(
            resolversString,
            RESOLVERS_DIR,
            `${data.model}Resolvers.js`
        );
        writeObjectToFile(
            typeDefs,
            TYPEDEFS_DIR,
            `${data.model}TypeDefs.graphql`
        );
    });
}

module.exports = runner;
