import mongoose from "mongoose";
const { Schema } = mongoose;

const menuSchema = new Schema({
  name: {
   type: String, 
    required: true,
    min:5,
    max:50,
    trim:true
  },
  description: {
    type: String,
    required: true,
    min:10,
  }
});

export default mongoose.model('menu', menuSchema) 