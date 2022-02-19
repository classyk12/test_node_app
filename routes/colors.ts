import express from 'express'; //import express library into file

const router = express.Router(); //use route when seperating routes/controllers into seperate files. express decleration on the index.ts remain the same 


//single query string, 
router.get('/' , (req, res) => {
 res.send(
    req.query
 );
});


export default router;