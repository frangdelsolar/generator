const path = require("path");
const fs = require("fs");

function readAllFilesInFolder(folderPath) {
  const files = fs.readdirSync(folderPath);
  const fileData = {};

  files.forEach((filename) => {
    const filePath = path.join(folderPath, filename);
    // Check if it's a file (not a directory)
    if (fs.lstatSync(filePath).isFile()) {
      try {
        const fileContents = fs.readFileSync(filePath, "utf8");
        const parsedData = JSON.parse(fileContents);
        fileData[filename] = parsedData;
      } catch (error) {
        console.error(`Error reading file ${filename}:`, error);
      }
    }
  });

  return fileData;
}

module.exports = readAllFilesInFolder;
