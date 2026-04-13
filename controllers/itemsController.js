import Item from "../models/Item.js";

export async function getItems(req, res) {
  try {
    const items = await Item.find({});
    res.json({ success: true, items });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}
