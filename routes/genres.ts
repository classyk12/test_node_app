import express from "express"; //import express library into file
import joi from "joi";
const router = express.Router(); //use route when seperating routes/controllers into seperate files. express decleration on the index.ts remain the same
import { Genre } from "../schemas/genre-schema";

router.get("/", async (req, res) => {
  const genres = await Genre.find();
  res.send(genres);
});

//single route paramter
router.get("/:id", async (req, res) => {
  try {
    const genre = await Genre.findById(req.params.id);

    if (!genre) {
      res.status(400).send("No genre with the given id found");
    } else {
      res.status(200).send(genre);
    }
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
      res.status(500).send(err.message);
      return;
    }
    console.log("error", err);
    res.status(500).send("An error occuered while retrieving genres");
  }
});

router.post("/", async (req, res) => {
  //using object destructors
  const { error } = validategenre(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  try {
    const genre = new Genre({
      name: req.body.name,
    });

    const result = await genre.save();

    res.status(200).send(result);
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
      return;
    }

    res.status(500).send("An error occured while saving genre");
  }
});

router.put("/:id", async (req, res) => {
  //using object destructors
  const { error } = validategenre(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  try {
    const genre = await Genre.findById(req.params.id);
    if (!genre) {
      res.status(400).send(`No genre with id: ${req.params.id} found`);
      return;
    }

    genre.name = req.body.name;
    const result = await genre.save();
    res.send(result);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).send(err.message);
      return;
    }

    res.status(500).send("An error occured while updating genre");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const genre = await Genre.findById(parseInt(req.params.id));
    if (!genre) {
      res.status(400).send(`No genre with id: ${req.params.id} found`);
      return;
    }
    const result = await Genre.deleteOne({ id: req.params.id });
    if (result.deletedCount > 0) {
      res.status(200).send("Genre deleted successfully");
    } else {
      res.status(400).send("Unable to delete Genre");
    }
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
      return;
    }

    res.status(500).send("An error occured while deleting genre");
  }
});

//multiple route paramter
router.get("/:id/rate/:rating", (req, res) => {
  res.send(req.params);
});

function validategenre(course: any) {
  const schema = joi.object({
    name: joi.string().required().min(3),
  });

  const validate = schema.validate(course);
  return validate;
}

//this exports the router object so it can be used outside this module/file
export default router;
