import *  as winston from "winston";

export  function logTest(mess: any){
  logger.log({
    level: 'info',
    message: mess,
  });
}
const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'combined.txt' })
  ]
});