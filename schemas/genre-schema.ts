import mongoose from "mongoose";

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  // _id: String,
});

const Genre = mongoose.model("Genre", genreSchema);

export { Genre, genreSchema };
