/**
* Configurations of logger.
*/
const winston = require('winston');
const winstonRotator = require('winston-daily-rotate-file');

class Logger {
    constructor() {
        this.consoleConfig = [
            new winston.transports.Console({
                'colorize': true
            })
        ];

        this.createLogger = new winston.Logger({
            'transports': this.consoleConfig
        });

        this.createLogger.add(winstonRotator, {
            'name': 'access-file',
            'level': 'debug',
            'filename': '../logs/access.log',
            'json': false,
            'datePattern': 'YYYY-MM-DD',
            'prepend': true
        });

        return this.createLogger;
    }
}

const singleton = {};
singleton.getInstance = function(){
    if(global.singleton_instance === undefined)
      global.singleton_instance = new Logger();
    return global.singleton_instance;
  };
  
module.exports = singleton.getInstance();

