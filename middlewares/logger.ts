import morgan from 'morgan'; //used to log req and responses
import express, { NextFunction } from 'express'; //import express library into file
const app = express(); //creates an express application

//  //this allows us to define logging levels based on env
const startUpDebugger =  require('debug')('app:startup');
const dbDebugger =  require('debug')('app:db');


 function logRequest (req: any, res: any, next:  NextFunction){
   console.log('Logging...');
  next(); //use this to pass control to the next function e.g the endpoint. if this is ommited, the req,res cycle will never get terminated.
}

 function logRequest2 (req: any, res: any, next:  NextFunction){
   console.log('Logging.2222..');
  next(); //use this to pass control to the next function e.g the endpoint. if this is ommited, the req,res cycle will never get terminated.
}

//CHECK ENVIRONMENT 
const environment =  app.get('env');
console.log(environment);

//make decision based on environment
if(environment === 'development'){
   app.use(morgan('tiny'));
   //use debug to print and log data
   startUpDebugger('morgan logging loaded...');
    dbDebugger('morgan logging not loaded in dev');

}

else{
   dbDebugger('morgan logging not loaded...');
}


export default {logRequest, logRequest2};
