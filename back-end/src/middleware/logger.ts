import *  as winston from "winston";
import { createLogger } from "winston";
import { format } from "winston";
import { transports } from "winston";
const { combine, timestamp, label, prettyPrint  } = format;


export  function logBlogs(mess: any, levelType:any){
  if(levelType==='info'){
    loggerBlogs.log({
      level: 'info',
      message: mess,
    });
  }
  else if(levelType==='error'){
    loggerBlogs.log({
      level: 'error',
      message: mess,
    });
  }
}
export  function logUsers(mess: any, levelType:any){
  if(levelType==='info'){
  loggerUsers.log({
    level: 'info',
    message: mess,
  });
}
else if(levelType==='error'){
  loggerUsers.log({
    level: 'error',
    message: mess,
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
    new winston.transports.File({ filename: 'BlogLogs.log' })
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
    new winston.transports.File({ filename: 'UserLogs.log' })
  ]
});