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
 * @constant {string} INPUT_DIR - Path to the directory where the sample file is copied.
 */
const INPUT_DIR = path.join(CODEGEN_DIR, "input");

/**
 * @constant {string} OUTPUT_DIR - Path to the directory where generated code will be placed.
 */
const OUTPUT_DIR = path.join(CODEGEN_DIR, "output");

/**
 * @constant {string} README_PATH - Path to the directory where generated code will be placed.
 */
const README_PATH = path.join(__dirname, "README.md");

module.exports = {
    SAMPLE_FILE_NAME,
    CODEGEN_DIR,
    INPUT_DIR,
    OUTPUT_DIR,
    README_PATH,
};
