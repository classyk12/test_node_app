//connect to mongo db
import mongoose from "mongoose";

export default async function connectToMongo() {
  try {
    await mongoose.connect("mongodb://localhost/mongo-exercises");
    console.log("connected to mongo excercises");
  } catch (err) {
    console.log("Errror");
  }
}

//create schema
const courseSchema = new mongoose.Schema({
  tags: [String],
  name: String,
  price: Number,
  date: { type: Date, default: Date.now },
  author: String,
  isPublished: Boolean,
});

//map/convert schema to model, creates a class from a schema
const Course = mongoose.model("Course", courseSchema);

async function getPublishedBackendCourses() {
  try {
    return await Course.find()
      .and([{ isPublished: true }, { tags: /.*backend.*/i }])
      .sort({ name: 1 })
      .select({
        name: 1,
        author: 1,
      });
  } catch (err) {
    console.log("get published backend courses error");
  }
}

async function getPublishedFrontAndBackendCourses() {
  try {
    return await Course.find({ tags: { $in: [/Backend/i, /Frontend/i] } })
      .and([{ isPublished: true }])

      .sort({ price: -1 })
      .select({
        name: 1,
        author: 1,
        price: 1,
      });
  } catch (err) {
    console.log("get published backend courses error");
  }
}

async function getPublished15DollarsOrMore() {
  try {
    return await Course.find({ isPublished: true })
      .or([{ name: /.*by.*/i }, { price: { $gte: 15 } }])

      .sort({ price: -1 })
      .select({
        name: 1,
        author: 1,
        price: 1,
      });
  } catch (err) {
    console.log("get published backend courses error");
  }
}

async function run() {
  const data = await getPublished15DollarsOrMore();
  console.log(data);
}

run();
