import mongoose from "mongoose";
const { Schema } = mongoose;

const menuItemSchema = new Schema({
  name: {
    en: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
      trim: true
    },
    ar: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
      trim: true
    }
  },
  price: {
    
      type: Number,
      required: true,
      min: 0,
      max: 1000
  },
  description: {
    en: {
      type: String,
      required: true,
      minlength: 10
    },
    ar: {
      type: String,
      required: true,
      minlength: 10
    }
  },
  menuID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "menu",
    required: true
  },
  img: { type: String },
});

export default mongoose.model("MenuItem", menuItemSchema);
