const winston = require('winston');

const logFormat = winston.format.combine(
    winston.format.timestamp({
        format: 'YYYY-MM-DD hh:mm:ss A ZZ'
    }),
    winston.format.json()
);

const logger = new winston.createLogger({
    transports: [
        new winston.transports.Console({
            name: 'info-console',
            level: 'info',
            colorize: true,
            format: logFormat
        }),
        new winston.transports.File({
            filename: 'logs.log',
            format: logFormat
        })
    ]
});

module.exports = logger;