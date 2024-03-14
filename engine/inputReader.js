/**
 * @module file-processor
 * @description This module provides functions to read and process data files from a specified directory.
 */

const path = require("path");
const fs = require("fs").promises; // Use promises for async operations
const logger = require("../services/logger");

const { INPUT_DIR } = require("../config"); // Path to the directory containing data files

/**
 * @function initializaDataObject
 * @description Processes and normalizes a parsed data object, ensuring the model name starts with a lowercase letter.
 * @param {object} parsedData - The object containing data parsed from a file (expected structure: { model: string, fields: array }).
 * @returns {object} A new object with the processed data, including a potentially modified model name.
 */
function initializaDataObject(parsedData) {
    let modelName = parsedData.model;
    if (modelName[0] !== modelName[0].toLowerCase()) {
        modelName = modelName.charAt(0).toLowerCase() + modelName.slice(1);
    }

    const data = {
        model: modelName,
        fields: parsedData.fields,
    };
    return data;
}

/**
 * @function validateFileData
 * @description Validates the structure of the parsed data object.
 * @param {object} parsedData - The object parsed from the file content (expected to be JSON).
 * @throws {Error} If the data object is invalid or missing required properties.
 */
function validateFileData(parsedData) {
    logger.info(`Validating file content: ${JSON.stringify(parsedData)}`);
    if (!parsedData || typeof parsedData !== "object") {
        throw new Error("Invalid file content: Expected an object");
    }

    if (!parsedData.model || typeof parsedData.model !== "string") {
        throw new Error(
            `Missing or invalid model property in file: ${filename}`
        );
    }

    if (!parsedData.fields || !Array.isArray(parsedData.fields)) {
        throw new Error(
            `Missing or invalid fields property in file: ${filename}`
        );
    }
}

/**
 * @function readFile
 * @description Reads the contents of a file and parses it as JSON.
 * @param {string} filePath - The path to the file to be read.
 * @returns {Promise<object>} A promise that resolves to the parsed data object from the file.
 * @throws {Error} If an error occurs while reading or parsing the file.
 */
async function readFile(filePath) {
    logger.info(`Reading file: ${filePath}`);
    try {
        const fileContents = await fs.readFile(filePath, "utf8");
        const parsedData = JSON.parse(fileContents);
        validateFileData(parsedData);
        return parsedData;
    } catch (error) {
        throw new Error(`Error reading file ${filePath}:`, error);
    }
}

/**
 * @function readAllFilesInFolder
 * @description Reads all files from a directory, parses their JSON content, and processes them.
 * @returns {Promise<object>} A promise that resolves to an object containing processed data from each file.
 * @throws {Error} If an error occurs while reading files or processing data.
 */
async function readAllFilesInFolder() {
    logger.info(`Reading files from directory: ${INPUT_DIR}`);
    try {
        const files = await fs.readdir(INPUT_DIR);
        const fileData = {};

        for (const filename of files) {
            const filePath = path.join(INPUT_DIR, filename);
            const stats = await fs.lstat(filePath);

            if (stats.isFile()) {
                try {
                    const parsedData = await readFile(filePath);
                    fileData[filename] = initializaDataObject(parsedData); // Process the data
                } catch (error) {
                    logger.error(`Error processing file ${filename}:`, error);
                }
            }
        }

        return fileData;
    } catch (error) {
        throw new Error(
            `Error reading files from directory ${INPUT_DIR}:`,
            error
        );
    }
}

module.exports = readAllFilesInFolder;
