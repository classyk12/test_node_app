import mongoose from "mongoose";

export default function connectToDB() {
  mongoose
    .connect("mongodb://127.0.0.1/playground")
    .then(() => console.log("Connected  to MONGO"))
    .catch((err) => console.error("Coud not connect to mongo db"));
}
