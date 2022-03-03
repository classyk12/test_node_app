//connect to mongo db
import mongoose from "mongoose";

export default async function connectToMongo() {
  try {
    await mongoose.connect("mongodb://127.0.0.1/mongo-exercises");
    console.log("connected to mongo excercises");
  } catch (err) {
    console.error("Error connecting to mongo", err);
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
        id: 1,
      });
  } catch (err) {
    console.log("get published backend courses error");
  }
}

async function updateCourse(id: any) {
  try {
    const course = await Course.findById(id);
    console.log("Course is: ", course);
    if (!course) {
      console.log("Invalid Course Id");
      return;
    }

    course.isPublished = true;
    course.author = "Faith Sodipe";

    const result = await course.save();
    console.log("xx", result);
  } catch (err) {
    console.log("Unable to update course");
  }
}

//updating document directly from the database without retrieving
async function updateCourse2(id: String[]) {
  try {
    //updates the document and returns a promise which shows result of the update operation
    // const c = await Course.updateOne({_id:id}, {
    //   $set:{
    //     author : 'New Author',
    //     isPublished: true
    //   }
    // })

    const update = await Course.updateMany(
      { _id: id },
      {
        $set: {
          author: "New Author",
          isPublished: true,
        },
      }
    );

    //returns the new document updated
    // const res = await Course.findByIdAndUpdate(
    //   id,
    //   {
    //     $set: {
    //       author: "Micheal",
    //       isPublished: true,
    //     },
    //   },
    //   { new: true }
    // );

    if (update.acknowledged) {
      return console.log("result: ", "update successful");
    }

    console.log("failed");
  } catch (err) {
    console.log("Unable to update course");
  }
}

async function deleteCourse(id: any) {
  try {
    const result = await Course.deleteOne({ _id: id });

    // if (course.acknowledged) {
    //   console.log("xx", "delete successfully");
    //   return;
    // }
    console.log("xx", result.deletedCount);
  } catch (err) {
    console.log("Unable to delete course");
  }
}

async function run() {
  deleteCourse("622017a9514abf37754e51d0");
  //updateCourse2(["622017a9514abf37754e51cf", "622017a9514abf37754e51d0"]);
}

run();
