import express from 'express'; //import express library into file
import Joi from 'joi';
const router = express.Router(); //use route when seperating routes/controllers into seperate files. express decleration on the index.ts remain the same 


const genres = [
    {id: 1, name: 'Horror'},
    {id: 2, name: 'Romance'},
    {id: 3, name: 'Action'},
    {id: 4, name: 'Thrillers'}
]

router.get('/', (req, res) => {
 res.send(genres);
});


//single route paramter
router.get('/:id', (req, res) => {
 const genre = genres.find(c => c.id === parseInt(req.params.id));
 if(genre == null){
    res.status(400).send('No genre with the given id found'); 
 } 

 else{
    res.status(200).send(genre);
 }
});

router.post('/', (req,res) => {


   //using object destructors
  const {error} = validategenre(req.body);
  
   if(error)
   {
      res.status(400).send(error.details[0].message);
      return;
   }

    const genre = {
        id: genres.length + 1,
        name: req.body.name
    }

    genres.push(genre);
    res.status(200).send(genre);
});

router.put('/:id', (req,res) => {
  

    //using object destructors
    const {error} = validategenre(req.body);

   if(error){
      res.status(400).send(error.details[0].message);
      return;
   }

   const genre = genres.find(c => c.id ===   parseInt(req.params.id))
   if(!genre){
    res.status(400).send(`No genre with id: ${req.params.id} found`)
    return;
   }

   genre.name = req.body.name;
   res.send(genre);
});

router.delete('/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id))
   if(!genre)
   {
    res.status(400).send(`No genre with id: ${req.params.id} found`)
    return;
   }
   const index = genres.indexOf(genre);
   genres.splice(index,1);

   res.send();
});
 

//multiple route paramter
router.get('/:id/rate/:rating', (req, res) => {
 res.send(
    req.params
 );
});


function validategenre(course:any){
    const schema = Joi.object({
      name: Joi.string().required().min(3)
   });

   const validate = schema.validate(course);
   return validate;
}


//this exports the router object so it can be used outside this module/file
export default router;
