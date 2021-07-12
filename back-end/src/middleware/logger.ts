import *  as winston from "winston";

const format = winston.format;
const createLogger = winston.createLogger;
const transports = winston.transports;
const { combine, timestamp, label, prettyPrint  } = format;


export  function logBlogs(mess: any, levelType:any, method:any){
  if(levelType==='info'){
    loggerBlogs.log({
      level: 'info',
      message: mess,
      method: method,
    });
  }
  else if(levelType==='error'){
    loggerBlogs.log({
      level: 'error',
      message: mess,
      method: method,
    });
  }
}
export  function logUsers(mess: any, levelType:any, method:any){
  if(levelType==='info'){
  loggerUsers.log({
    level: 'info',
    message: mess,
    method: method,
  });
}
else if(levelType==='error'){
  loggerUsers.log({
    level: 'error',
    message: mess,
    method: method,
  });
}
}
const loggerBlogs = winston.createLogger({
  level: 'info',
  format: combine(
    label({ label: 'Blog logs Entry!' }),
    timestamp(),
    prettyPrint()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: './../logs/BlogLogs.log' })
  ]
});

const loggerUsers = winston.createLogger({
  level: 'info',
  format: combine(
    label({ label: 'User logs Entry!' }),
    timestamp(),
    prettyPrint()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: './../logs/userLogs.log' })
  ]
});