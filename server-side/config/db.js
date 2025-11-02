import mongoose from "mongoose";

// mongodb://localhost:27017/resturantTarget

export default mongoose
  .connect("mongodb://localhost:27017/resturantTarget", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected successfully");
    console.log(mongoose.connection.readyState);
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
