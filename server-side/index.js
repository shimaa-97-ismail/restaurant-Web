import dotenv from "dotenv";
dotenv.config();
import  express from'express';
const app = express();
import cors from 'cors';
import bodyParser from 'body-parser';
import axios from "axios";
import dbconnect from './config/db.js';
import authenticateToken from './middleware/auth.js';
import { i18next, middleware } from "./i18n/i18n.js";
import authRoutes from "./routes/auth.js";
import menuRoutes from "./routes/menu.js";
import menuItemRoutes from "./routes/menuItem.js";
import orderRoutes from "./routes/order.js";
import userRoutes from "./routes/user.js";
import faq from "./routes/Faq.js";
// Connect to the database and start the server
dbconnect;

// Enable CORS

app.use(cors({origin:'http://localhost:5173', credentials: true}));
// Middleware to parse JSON requests
// app.use(express.json());
app.use(bodyParser.json());
app.use(middleware.handle(i18next));


// Routes
app.use("/auth",authRoutes);
app.use('/menu',authenticateToken, menuRoutes);
app.use('/menuItem',authenticateToken,menuItemRoutes);
app.use('/order',authenticateToken,orderRoutes);
app.use('/user', userRoutes);
app.use("/chat",faq);


// app.post("/api/chat", async (req, res) => {
//   const { message } = req.body; // 1️⃣ Check DB
//     const faq = await FAQ.findOne({ question: message });
//     if (faq) return res.json({ reply: faq.answer });


//   try{const res = await axios.post(
//     "https://api-inference.huggingface.co/models/distilgpt2",
//     { inputs: message},
//     { headers: { Authorization: `Bearer ${process.env.HF_API_KEY}` } }
//   );

  
//     const reply = response.data[0]?.generated_text || "I don't know the answer yet.";
//     res.json({ reply });
  
// } catch (error) {
//     console.error(error.response?.data || error.message);
//      res.status(500).json({ reply: "Error connecting to AI." });
//   }
// })










//handle me=iddleware errors
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});



// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
