var winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        //
        // - Write all logs error (and below) to `error.log`.
        //
        new winston.transports.File({ filename: 'logs/transactions.log' })
    ]
    });

module.exports = logger;