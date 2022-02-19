import express from 'express'; //import express library into file
import logRequest from './middlewares/logger';
import authCheck  from './middlewares/authenticator';
import config from 'config';
import helmet from 'helmet'; //used for api security e.g headers, authentication filters e.t.c
import langs from './routes/langs';
import home from './routes/home';
import color from './routes/colors';

const app = express(); //creates an express application
app.use(helmet());

app.use(express.json()) //import json serialization and deserialization in express (express.json()) is a middleware function
app.use(express.urlencoded({extended:  true})) //import a middleware for us to use form data for POST request instead of raw json body 
app.use(express.static('assets')); //this loads a middleware that allows usage of static files, e.g images, css and textfiles e.t.c

app.use(authCheck);
//this is used to create a custom middleware
app.use(logRequest.logRequest2);

//import newly exported courses modules into index module
app.use('/', home);
app.use('/api/langs', langs);
app.use('/api/colors', color);


//this is used to create a custom middleware

   //use this to read values from config files
  console.log(`Application Name = ${config.get('name')}`);
  console.log(`Application Port = ${config.get('mail.port')}`);
  
  //read from custom config file
  console.log(`Application Password = ${config.get('mail.password')}`);
  console.log(`Application Password = ${process.env.app_password}`); //use this to read from env variables
 



//MIDDLEWARES


//use environment variable to dynamically get port number

const port = process.env.PORT ?? 3000;

app.listen(port , () => console.log(`Listening on port ${port}...`));