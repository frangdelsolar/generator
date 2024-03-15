const path = require("path");

/**
 * @constant {string} SAMPLE_FILE_NAME - Name of the sample file to be copied.
 */
const SAMPLE_FILE_NAME = "sample.json";

/**
 * @constant {string} CODEGEN_DIR - Name of the directory where generated files are placed.
 */
const CODEGEN_DIR = "codeGen";

/**
 * @constant {string} MAIN_FILE_NAME - Name of the main file to be copied.
 */
const MAIN_FILE_NAME = "main.js";

/**
 * @constant {string} INPUT_DIR - Path to the directory where the sample file is copied.
 */
const INPUT_DIR = path.join(CODEGEN_DIR, "input");

/**
 * @constant {string} MODELS_DIR - Path to the directory where generated code will be placed.
 */
const MODELS_DIR = path.join(__dirname, "models");

/**
 * @constant {string} RESOLVERS_DIR - Path to the directory where generated code will be placed.
 */
const TYPEDEFS_DIR = path.join(__dirname, "graphql", "typedefs");

/**
 * @constant {string} TYPEDEFS_DIR - Path to the directory where generated code will be placed.
 */
const RESOLVERS_DIR = path.join(__dirname, "graphql", "resolvers");

/**
 * @constant {string} README_PATH - Path to the directory where generated code will be placed.
 */
const README_PATH = path.join(__dirname, "README.md");

module.exports = {
    SAMPLE_FILE_NAME,
    CODEGEN_DIR,
    INPUT_DIR,
    MODELS_DIR,
    TYPEDEFS_DIR,
    RESOLVERS_DIR,
    README_PATH,
    MAIN_FILE_NAME,
};
