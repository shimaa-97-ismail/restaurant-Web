import mongoose from "mongoose";
// const bcrypt = require("bcrypt");
const { Schema } = mongoose;

const userSchema = new Schema({
  email:{
    type:String,
    required: true,
    unique:true,
    lowercase: true
    
  },
  userName: {
    type: String,
   required: function() { return !this.isGoogleUser } ,
    min: 5,
    max: 50,
    trim: true,
  },
  role: {
    type: String,
    enum: ["admin", "cashier","customer"],
    default: "customer",
  },
  password: {
    type: String,
   required: function() { return !this.isGoogleUser } ,
    min: 8,
    select: false,
  },
   isGoogleUser: { type: Boolean, default: false }
});

// Hash password before saving
// userSchema.pre("save", async function (next) {
//   try {
//       // const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, 10);
//     console.log(this.password);
    
//     next();
//   } catch (err) {
//     next(err);
//   }
// });

export default mongoose.model("user", userSchema);
