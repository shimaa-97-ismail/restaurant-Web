import express from "express";
import FAQ from "../models/FAQ.js";
import axios from "axios";
const router = express.Router();

router.post("/", async (req, res) => {
  const { message } = req.body;
console.log(message);

  try {
    // 1️⃣ Check database first
    const faq = await FAQ.findOne({ question: message });
    console.log(faq);
    if (faq) return res.json({ reply: faq.answer })
else {
    res.json({ answer: "Sorry, I don't know the answer to that." });
  }
    // 2️⃣ If not found, use free AI (Hugging Face)
    // const response = await axios.post(
    //   "https://api-inference.huggingface.co/models/google/gemma-2b-it",
    //   { inputs: message },
    //   { headers: { Authorization: `Bearer ${process.env.HF_API_KEY}` } }
    // );
    //  const reply = response.data[0]?.generated_text || "I don't know the answer yet.";
    // res.json({ reply });
} catch (error) {
    console.error(error);
    res.status(500).json({ reply: "Error processing request." });
  }
});

export default router;
