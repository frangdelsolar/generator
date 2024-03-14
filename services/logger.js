const winston = require("winston");

// Create a Winston logger with specified configurations
const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.colorize({ all: true }),
        winston.format.simple({
            prettyPrint: true,
        }),
        winston.format.printf((info) => {
            return `${info.timestamp} - ${info.level}: ${info.message}`;
        })
    ),
    transports: [
        // Console transport for logging to the console
        new winston.transports.Console(),
    ],
});

/**
 * Logs an informational message.
 * @param {string} message - The log message.
 * @param {Object} [meta={}] - Additional metadata to include in the log entry.
 */
function info(message, meta = {}) {
    logger.info(message, meta);
}

/**
 * Logs an error message.
 * @param {string} message - The error message.
 * @param {Object} [meta={}] - Additional metadata to include in the log entry.
 */
function error(message, meta = {}) {
    logger.error(message, meta);
}

module.exports = {
    info,
    error,
};
