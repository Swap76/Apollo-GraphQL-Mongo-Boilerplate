import * as winston from 'winston';
const { createLogger, format, transports } = winston;
import * as fs from 'fs';
require('winston-daily-rotate-file');

const logDir = 'log';

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
	fs.mkdirSync(logDir);
}

// Creates new file every day 
const dailyRotateLogTransport = new (winston.transports.DailyRotateFile)({
	filename: `${logDir}/results-%DATE%.log`,
	datePattern: 'YYYY-MM-DD',
});

// Logger for info
const infoLog = createLogger({
	level: 'info',
	format: format.combine(
		format.timestamp({
			format: 'YYYY-MM-DD HH:mm:ss',
		}),
		format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`),
	),
	transports: [
		new transports.Console({
			level: 'info',
			format: format.combine(
				format.colorize(),
				format.printf(
					info => `${info.timestamp} ${info.level}: ${info.message}`,
				),
			),
		}),
		dailyRotateLogTransport,
	],
});

export default infoLog;