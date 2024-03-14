/**
 * @module codegen-initializer
 * @description This module initializes the code generator by creating the necessary folder structure
 * and optionally copying a sample file.
 */

const fs = require("fs");
const logger = require("./services/logger");
const {
    CODEGEN_DIR,
    INPUT_DIR,
    OUTPUT_DIR,
    README_PATH,
    SAMPLE_FILE_NAME,
} = require("./config");

/**
 * @function initFolderTree
 * @description Creates the necessary folder structure for the code generator.
 * @returns {Promise<void>} A promise that resolves when all folders are created.
 */
async function initFolderTree() {
    logger.info("Initializing folder tree...");
    await Promise.all([
        fs.promises.mkdir(CODEGEN_DIR, { recursive: true }),
        fs.promises.mkdir(INPUT_DIR, { recursive: true }),
        fs.promises.mkdir(OUTPUT_DIR, { recursive: true }),
    ]);
}

/**
 * @function copySampleFile
 * @description Copies the sample file from the `samples` directory to the `input` directory.
 * @returns {Promise<void>} A promise that resolves when the file is copied.
 */
async function copySampleFile() {
    logger.info("Copying sample file...");
    const samplePath = path.join(__dirname, "samples", SAMPLE_FILE_NAME);
    const targetPath = path.join(INPUT_DIR, SAMPLE_FILE_NAME);
    await fs.promises.copyFile(samplePath, targetPath);
}

async function printReadme() {
    try {
        const content = await fs.promises.readFile(README_PATH, "utf8");
        console.log(content);
    } catch (error) {
        console.error(`Error reading file: ${error.message}`);
    }
}

/**
 * @function init
 * @description Initializes the code generator by creating the folder structure and optionally copying a sample file.
 * @returns {Promise<void>} A promise that resolves when the initialization is complete.
 */
async function init() {
    logger.info("Initializing generator...");
    await initFolderTree();
    await copySampleFile();
    await printReadme();
}

module.exports = init;
