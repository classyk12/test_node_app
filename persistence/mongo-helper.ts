import mongoose from "mongoose";

//connect to MONGODB
export default function startMongoService() {
  mongoose
    .connect("mongodb://localhost/playground")
    .then(() => console.log("Connected  to MONGO"))
    .catch((err) => console.error("Coud not connect to mongo db"));
}

//create schema for entity
const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: Number,
});

//convert/maps the mongoose schema to a typescript class/model
//this products an instance of our schema as a class
const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  //create an object of the course class
  const course = new Course({
    name: "angular Course",
    author: "Mosh",
    tags: ["Angular", "Frontend"],
    isPublished: true,
    price: 20,
  });

  const result = await course.save();
  console.log(result);
}

async function getCourses() {
  try {
    const data = await Course.find().select({
      name: 1,
      price: 1,
      isPublished: 1,
    });
    console.log(data);
  } catch (err) {
    console.error("Error", err);
  }
}

async function filterCourses() {
  try {
    const data = await Course.find({
      author: "Mosh",
      isPublished: false,
    })
      .limit(10)
      .sort({ author: 1 })
      .select({
        name: 1,
        tag: 1,
      });

    //in sorting, 1 = asc, -1 = desc

    console.log(data);
  } catch (err) {
    console.error("Error", err);
  }
}

async function filterCourse2() {
  try {
    const data = await Course.find({
      //  price: { $in: [5, 20] }, //filter for prices at 5 and 20
      price: { $gte: 20 }, //filter for prices between 5 and 20
    })
      .limit(10)
      .sort({ author: 1 })
      .select({
        name: 1,
        price: 1,
      });

    //in sorting, 1 = asc, -1 = desc

    console.log(data);
  } catch (err) {
    console.error("Error", err);
  }
}

async function filterCourse3() {
  const pageNumber = 1;
  const pageSize = 10;
  try {
    const data = await Course
      .find
      //  { author: /^M/ } //starts with - regular expression
      //    { author: /Mosh$/i } //end with, ignore casing - regular expression
      //  { author: /.*Mosh.*/i } // contains, ignore casing - regular expression
      ()
      .skip((pageNumber - 1) * pageSize)
      //  .or([{ author: "Ryan" }, { price: { $lte: 15 } }])
      // .and([{ tags: "Backend" }, { isPublished: true }])
      .limit(pageSize)
      .sort({ author: 1 })
      .select({
        name: 1,
        price: 1,
      });

    //in sorting, 1 = asc, -1 = desc

    console.log(data);
  } catch (err) {
    console.error("Error", err);
  }
}

filterCourse3();

//comparsion operator
//eq =  equal,
//ne = not equal
//gt = greater than
//gte = greater than or equal
//in
//nin = not in
//lt = less than
//lte = less than or equal

//logical operators
//and
//or
