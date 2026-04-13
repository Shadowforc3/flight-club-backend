import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
  itemId: Number,
  name: String,
  category: String,
  price: Number,
  updated: Date
});

export default mongoose.model("Item", ItemSchema);
