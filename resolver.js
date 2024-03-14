function camelCase(str) {
  if (typeof str !== "string") {
    return str; // Return the input as is if not a string
  }
  return str.replace(/^\w|[A-Z]/g, function (word) {
    return word.toUpperCase();
  });
}

function pluralize(str) {
  if (typeof str !== "string") {
    return str; // Return the input as is if not a string
  }
  const irregularCases = {
    person: "people",
    mouse: "mice",
  };

  if (irregularCases.hasOwnProperty(str)) {
    return irregularCases[str];
  }

  const lastLetter = str.charAt(str.length - 1);
  const exceptions = ["o", "s", "sh", "x", "ch"];

  if (exceptions.includes(lastLetter)) {
    return str + "es";
  } else if (lastLetter === "y" && str.slice(-2) !== "ay") {
    return str.slice(0, -1) + "ies";
  } else {
    return str + "s";
  }
}

function generateCrudResolvers(modelName, schemaData) {
  const modelInstancePath = `${modelName}`; // Assuming model file structure
  const resolvers = `
const ${camelCase(modelName)} = require('./${modelInstancePath}Schema');

const resolvers = {
  Query: {
    ${camelCase(modelName)}ById: async (_, { id }) => {
      try {
        const ${modelName} = await ${camelCase(modelName)}.findById(id);
        return ${modelName};
      } catch (error) {
        throw error;
      }
    },
    all${camelCase(modelName)}s: async () => {
      try {
        const ${pluralize(modelName)} = await ${camelCase(modelName)}.find();
        return ${pluralize(modelName)};
      } catch (error) {
        throw error;
      }
    },
  },
  Mutation: {
    create${camelCase(modelName)}: async (_, { input }) => {
      try {
        const new${camelCase(modelName)} = new ${camelCase(modelName)}();
        // Assign input fields to the new model instance
        Object.assign(new${camelCase(modelName)}, input);
        await new${camelCase(modelName)}.save();
        return new${camelCase(modelName)};
      } catch (error) {
        throw error;
      }
    },
    update${camelCase(modelName)}: async (_, { id, input }) => {
      try {
        const updated = await ${camelCase(
          modelName
        )}.findByIdAndUpdate(id, input, { new: true });
        return updated;
      } catch (error) {
        throw error;
      }
    },
    delete${camelCase(modelName)}: async (_, { id }) => {
      try {
        const deleted = await ${camelCase(modelName)}.findByIdAndDelete(id);
        return deleted;
      } catch (error) {
        throw error;
      }
    },
  },
};

module.exports = resolvers;
`;

  return resolvers;
}

module.exports = { generateCrudResolvers };
