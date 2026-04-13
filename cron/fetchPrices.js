import axios from "axios";
import mongoose from "mongoose";
import cron from "node-cron";
import config from "../config.js";
import Item from "../models/Item.js";

const TORN = config.TORN_API_KEY;
const DB = config.MONGO_URI;

mongoose.connect(DB).then(() => console.log("DB connected"));

const ITEMS = [
  { id: 658, name: "Sheep Plushie", category: "plushies" },
  { id: 654, name: "Panda Plushie", category: "plushies" },
  { id: 217, name: "Ceibo Flower", category: "flowers" },
  { id: 209, name: "Xanax", category: "drugs" }
  // Add ALL items here later
];

async function fetchPrice(itemId) {
  const url = `https://api.torn.com/market/${itemId}?selections=basic&key=${TORN}`;
  const res = await axios.get(url);
  const data = res.data;

  return data.lowest || data.median || data.highest || 0;
}

async function updatePrices() {
  console.log("Updating Torn prices...");

  for (const item of ITEMS) {
    const price = await fetchPrice(item.id);

    await Item.findOneAndUpdate(
      { itemId: item.id },
      {
        itemId: item.id,
        name: item.name,
        category: item.category,
        price,
        updated: new Date()
      },
      { upsert: true }
    );

    console.log(`Updated ${item.name}: ${price}`);
  }

  console.log("Price update complete.");
}

cron.schedule("*/10 * * * *", updatePrices);

updatePrices();
