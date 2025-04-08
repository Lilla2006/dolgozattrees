import express from "express";
import trees from "./trees.js";

const app = express();
app.use(express.json());

app.get("/trees", (req, res) => {
  res.status(200).json(trees);
});

app.get("/trees/:id", (req, res) => {
  const id = req.params.id;
  if (id < 0 || id >= trees.length) {
    return res.status(404).json({ message: "Trees not found" });
  }
  res.status(200).json(trees[id]);
});

app.post("/trees", (req, res) => {
  const { name, category, price, isEvergreen } = req.body;
  if (!name || !category || !price || isEvergreen == null) {
    return res.status(400).json({ message: "Missing data" });
  }
  const newTree = { name, category, price, isEvergreen };
  trees.push(newTree);
  res.status(201).json(newTree);
});

app.put("/trees/:id", (req, res) => {
  const id = req.params.id;
  if (id < 0 || id >= trees.length) {
    return res.status(404).json({ message: "Trees not found" });
  }
  const { name, category, price, isEvergreen } = req.body;
  if (!name || !category || !price || isEvergreen == null) {
    return res.status(400).json({ message: "Missing data" });
  }
  trees[id] = { name, category, price, isEvergreen };
  res.status(200).json(trees[id]);
});

app.delete("/trees/:id", (req, res) => {
  const id = req.params.id;
  if (id < 0 || id >= trees.length) {
    return res.status(404).json({ message: "Trees not found" });
  }
  trees.splice(id, 1);
  return res.status(200).json({ message: "Delete successful" });
});

app.listen(3010, () => {
  console.log("Server runs");
});
