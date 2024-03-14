const fs = require("fs");
const path = require("path");

const folderPath = "codeGen/output";

function writeObjectToFile(data, filename) {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  let filePath = path.join(folderPath, filename);

  try {
    // const content = JSON.stringify(data, null, 4); // Add indentation for readability
    fs.writeFileSync(filePath, data, "utf8");
    console.log(`Successfully wrote object to ${filePath}`);
  } catch (error) {
    console.error(`Error writing object to file: ${error}`);
  }
}

module.exports = writeObjectToFile;
