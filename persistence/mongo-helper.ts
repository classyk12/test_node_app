import { assert, func } from "joi";
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
  name: {
    type: String,
    required: true,
    minlength: 20,
    maxlength: 255,

    // match: /pattern/
  },

  //use the num validator property to restrict input to a predefined set of strings
  category: {
    type: String,

    enum: ["web", "mobile", "desktop"],
  },
  author: { type: String, required: true },

  //custom validators
  tags: {
    type: Array,
    validate: {
      validator: function (v: any[]) {
        return v && v.length > 0;
      },
      message: "A course must have at least one tag",
    },
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,

  //create conditional validation.. validate price only when the course is published
  price: {
    type: Number,
    required: true,
    min: 5,
    max: 200,

    // function () {
    //   return this.isPublished;
    // },
  },
});

//convert/maps the mongoose schema to a typescript class/model
//this products an instance of our schema as a class
const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  try {
    const course = new Course({
      name: "new networking Course",
      author: "Faith",
      //tags: ["CISS", "Networking"],
      isPublished: true,
      category: "ios",
      price: 10,
    });
    const result = await course.save();
    console.log(result);
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    }
  }
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

createCourse();

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
