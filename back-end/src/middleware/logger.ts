import *  as winston from "winston";

export  function logBlogs(mess: any, levelType:any){
  if(levelType=='info'){
    loggerBlogs.log({
      level: 'info',
      message: mess,
    });
  }
  else if(levelType=='error'){
    loggerBlogs.log({
      level: 'error',
      message: mess,
    });
  }
}
export  function logUsers(mess: any, levelType:any){
  if(levelType=='info'){
  loggerUsers.log({
    level: 'info',
    message: mess,
  });
}
else if(levelType=='error'){
  loggerUsers.log({
    level: 'error',
    message: mess,
  });
}
}
const loggerBlogs = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'BlogLogs.log' })
  ]
});

const loggerUsers = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'UserLogs.log' })
  ]
});