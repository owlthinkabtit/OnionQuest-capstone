import 'dotenv/config';
import express from "express";
import mongoose from 'mongoose';
import cors from "cors";

import User from "./models/User.js";
import Campaign from "./models/Campaign.js";
import Quest from "./models/Quest.js";

import authRoutes from "./routes/authRoutes.js";

const app = express();
const PORT = process.env.PORT || 3001

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes)

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Successfully connected to the Onion Quest Database!'))
  .catch((err) => console.error('Database connection error:', err))

app.get('/', (req, res) => {
  res.send('Onion Quest Server is Live and Ready for Adventure!')
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
});