import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import itemsRoute from "./routes/items.js";
import config from "./config.js";

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(config.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));

app.use("/api/items", itemsRoute);

app.get("/", (req, res) => {
  res.send("Flight Club Backend Running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
