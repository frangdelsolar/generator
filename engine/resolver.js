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
    get${singularName}ById: async (_, { id }, { isAuth, user }) => {
      if (!isAuth) {
        throw new Error('Unauthenticated');
      }
      try {
        return await ${singularName}.findById(id).where('createdBy').equals(user._id);
      } catch (error) {
        throw error;
      }
    },
    getAll${pluralName}: async (_, { page = 1, limit = 10, filter = {} }, { isAuth, user }) => {
      if (!isAuth) {
        throw new Error('Unauthenticated');
      }
      try {
        const skip = (page - 1) * limit;
        const query = { createdBy: user._id, ...filter };
        const results = await ${singularName}.find(query).skip(skip).limit(limit).sort({ createdAt: -1 });
        const total = await ${singularName}.countDocuments(query);

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
    create${singularName}: async (_, { input }, { isAuth, user }) => {
      if (!isAuth) {
        throw new Error('Unauthenticated');
      }
      try {
        input.createdBy = user._id;
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
    update${singularName}: async (_, { id, input }, { isAuth, user }) => {
      if (!isAuth) {
        throw new Error('Unauthenticated');
      }
      try {
        input.updatedBy = user._id;
        input.updatedAt = new Date();

        return await ${singularName}.findByIdAndUpdate(id, input, { new: true }).where('createdBy').equals(user._id);
      } catch (error) {
        throw error;
      }
    },
    delete${singularName}: async (_, { id }, { isAuth, user }) => {
      if (!isAuth) {
        throw new Error('Unauthenticated');
      }
      try {
        const deleted${singularName} =await ${singularName}.findByIdAndDelete(id).where('createdBy').equals(user._id);
        return {
          success: true,
          resource: deleted${singularName}
        };
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
