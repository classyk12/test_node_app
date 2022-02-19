import express from 'express'; //import express library into file
import Joi from 'joi';
const router = express.Router(); //use route when seperating routes/controllers into seperate files. express decleration on the index.ts remain the same 


const languages = [
    {id: 1, name: 'Javacript'},
    {id: 2, name: 'C#'},
    {id: 3, name: 'Typescript'},
    {id: 4, name: 'Dart'}
]

router.get('/', (req, res) => {
 res.send(languages);
});


//single route paramter
router.get('/:id', (req, res) => {
 const langugage = languages.find(c => c.id === parseInt(req.params.id));
 if(langugage == null){
    res.status(400).send('No Language with the given id found'); 
 } 

 else{
    res.status(200).send(langugage);
 }
});

router.post('/', (req,res) => {

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

router.put('/:id', (req,res) => {
  
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

router.delete('/:id', (req, res) => {
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
 

//multiple route paramter
router.get('/:id/rate/:rating', (req, res) => {
 res.send(
    req.params
 );
});


function validateLanguage(course:any){
    const schema = Joi.object({
      name: Joi.string().required().min(3)
   });

   const validate = schema.validate(course);
   return validate;
}


//this exports the router object so it can be used outside this module/file
export default router;
