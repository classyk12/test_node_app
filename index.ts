import express from 'express'; //import express library into file
import Joi, { options, valid } from 'joi'; //import joi for data validation
const app = express(); //creates an express application
app.use(express.json()) //import json serialization and deserialization in express


const languages = [
    {id: 1, name: 'Javacript'},
    {id: 2, name: 'C#'},
    {id: 3, name: 'Typescript'},
    {id: 4, name: 'Dart'}
]

app.get('/', (req, res) => {
 res.send('Hello Node');
});

app.get('/api/langs', (req, res) => {
 res.send(languages);
});


//single route paramter
app.get('/api/langs/:id', (req, res) => {
 const langugage = languages.find(c => c.id === parseInt(req.params.id));
 if(langugage == null){
    res.status(400).send('No Language with the given id found'); 
 } 

 else{
    res.status(200).send(langugage);
 }
});

//multiple route paramter
app.get('/api/langs/:id/rate/:rating', (req, res) => {
 res.send(
    req.params
 );
});

//single query string, 
app.get('/api/colors' , (req, res) => {
 res.send(
    req.query
 );
});

app.post('/api/langs', (req,res) => {

       //accessing 'error' property manually
 //  const validate = validateLanguage(req.body);
   // if(validate.error){
   //    res.status(400).send(validate.error.details[0].message);
   //    return;
   // }

   //using object destructors
  const {error} = validateLanguage(req.body);
  
   if(error)
   {
      res.status(400).send(error.details[0].message);
      return;
   }

    const language = {
        id: languages.length + 1,
        name: req.body.name
    }

    languages.push(language);
    res.status(200).send(language);
});

app.put('/api/langs/:id', (req,res) => {
  
    //accessing 'error' property manually
 //  const validate = validateLanguage(req.body);
   // if(validate.error){
   //    res.status(400).send(validate.error.details[0].message);
   //    return;
   // }

    //using object destructors
    const {error} = validateLanguage(req.body);

   if(error){
      res.status(400).send(error.details[0].message);
      return;
   }

   const language = languages.find(c => c.id ===   parseInt(req.params.id))
   if(!language){
    res.status(400).send(`No language with id: ${req.params.id} found`)
    return;
   }

   language.name = req.body.name;
   res.send(language);
});

app.delete('/api/langs/:id', (req, res) => {
    const language = languages.find(c => c.id === parseInt(req.params.id))
   if(!language)
   {
    res.status(400).send(`No language with id: ${req.params.id} found`)
    return;
   }
   const index = languages.indexOf(language);
   languages.splice(index,1);

   res.send();
});
 
function validateLanguage(course:any){
    const schema = Joi.object({
      name: Joi.string().required().min(3)
   });

   const validate = schema.validate(course);
   return validate;
}


//use environment variable to dynamically get port number

const port = process.env.PORT ?? 3000;

app.listen(port , () => console.log(`Listening on port ${port}...`));