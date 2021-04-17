const winston = require('winston');

// The default Category
const DEFAULT_CATEGORY = 'DEFAULT';

/**
 * Creates a specific type of logger config
 * Take a category label as a parameter that is used
 * to decorate the logged message.
 * 
 * @param {String} category - the category to decorate the message.
 * Generally, a category aligns to a function area in the app.
 * 
 * @return {Object} - the Winston configuration for a logger, ready
 * to be added via the winston.loggers.add() function.
 */
function createLoggerConfig(category) {
    return {
        level: 'info',
        transports: [
            new winston.transports.Console()
        ],
        format: winston.format.combine(
            winston.format.label({
                label: category
            }),
            winston.format.timestamp(),
            winston.format.printf((info) => {
                return `${info.timestamp} - ${info.label}:[${info.level}]: ${info.message}`;
            })
        )
    };
}
// Default Logger configuration
winston.loggers.add(DEFAULT_CATEGORY, createLoggerConfig(DEFAULT_CATEGORY));

// Export the default logger
module.exports.defaultLogger = winston.loggers.get(DEFAULT_CATEGORY);

// Export the function to create Winston log config
module.exports.createLoggerConfig = createLoggerConfig;