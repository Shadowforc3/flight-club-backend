import items from "../data/items.json" assert { type: "json" };

export const getItems = (req, res) => {
  res.json(items);
};
