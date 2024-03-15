const { camelCase, pluralize } = require("./helpers");

/**
 * @function generateModelPath
 * @description Constructs the path to the model file based on the model name.
 * @param {string} modelName - The name of the model.
 * @returns {string} The path to the corresponding model file.
 */
function generateModelPath(modelName) {
    return `${modelName}`; // Assuming model file structure (adjust if needed)
}

/**
 * @function generateResolvers
 * @description Generates a template string containing CRUD resolvers for a given model.
 * @param {string} modelName - The name of the model.
 * @param {object} schemaData - Data related to the model schema (optional).
 * @returns {string} The template string with the generated resolvers.
 */
function generateResolvers(modelName, schemaData = {}) {
    const modelPath = generateModelPath(modelName);
    const singularName = camelCase(modelName);
    const pluralName = pluralize(singularName);

    const template = `
const ${singularName} = require('../../models/${modelPath}Schema');

module.exports = {
  Query: {
    get${singularName}ById: async (_, { id }) => {
      try {
        return await ${singularName}.findById(id);
      } catch (error) {
        throw error;
      }
    },
    getAll${pluralName}: async (_, { page = 1, limit = 10 }) => {
      try {
        const skip = (page - 1) * limit;
        const results = await ${singularName}.find().skip(skip).limit(limit);
        const total = await ${singularName}.countDocuments();

        return {
          pageInfo: {
            page,
            limit,
            totalCount: total,
            hasNextPage: total > (page * limit),
          },
          data: results,
        };
      } catch (error) {
        throw error;
      }
    }
  },
  Mutation: {
    create${singularName}: async (_, { input }) => {
      try {
        const new${singularName} = new ${singularName}(input);
        await new${singularName}.save();

        return {
          ...new${singularName}._doc,
          _id: new${singularName}.id
        };

      } catch (error) {
        throw error;
      }
    },
    update${singularName}: async (_, { id, input }, { headers }) => {
      try {
        const userId = headers.userId;
        input.updatedBy = userId;

        input.updatedAt = new Date();

        return await ${singularName}.findByIdAndUpdate(id, input, { new: true });
      } catch (error) {
        throw error;
      }
    },
    delete${singularName}: async (_, { id }) => {
      try {
        return await ${singularName}.findByIdAndDelete(id);
      } catch (error) {
        throw error;
      }
    },
  },
};
`;

    return template
        .replace(/\$\{singularName\}/g, singularName)
        .replace(/\$\{pluralName\}/g, pluralName);
}

module.exports = generateResolvers;
