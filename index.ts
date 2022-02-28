import express from "express"; //import express library into file
import logRequest from "./middlewares/logger";
import authCheck from "./middlewares/authenticator";
import helmet from "helmet"; //used for api security e.g headers, authentication filters e.t.c
import langs from "./routes/genres";
import home from "./routes/home";
import helper from "./persistence/db-helper-exercise";

const app = express(); //creates an express application
app.use(helmet());

app.use(express.json()); //import json serialization and deserialization in express (express.json()) is a middleware function
app.use(express.urlencoded({ extended: true })); //import a middleware for us to use form data for POST request instead of raw json body
app.use(express.static("assets")); //this loads a middleware that allows usage of static files, e.g images, css and textfiles e.t.c

app.use(authCheck);
//this is used to create a custom middleware
app.use(logRequest.logRequest2);

//import newly exported courses modules into index module
app.use("/", home);
app.use("/api/genres", langs);

//use environment variable to dynamically get port number

helper(); //load mongo
const port = process.env.PORT ?? 3000;

app.listen(port, () => console.log(`Listening on port ${port}...`));
