import morgan from 'morgan'; //used to log req and responses
import express from 'express'; //import express library into file
const app = express(); //creates an express application


export default function logRequest (req: any, res: any, next: () => void){
   console.log('Logging...');
  next(); //use this to pass control to the next function e.g the endpoint. if this is ommited, the req,res cycle will never get terminated.
}

//CHECK ENVIRONMENT 
const environment =  app.get('env');
console.log(environment);

//make decision based on environment
if(environment === 'development'){
   app.use(morgan('tiny'));
   console.log('morgan logging loaded...')
}

else{
   console.log('morgan logging not loaded...')
}

