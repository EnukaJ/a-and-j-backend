const express = require("express");
const mongoose = require("mongoose");
const Paitent = require("./models/paitient.model");
require("dotenv").config();
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from node api");
});

app.get("/paitents/getallpaitents", async (req, res) => {
  try {
    const paitents = await Paitent.find({});
    res.status(200).json(paitents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.get("/paitents/getpaitentbyid/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const paitents = await Paitent.findById(id);
    res.status(200).json(paitents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/paitents/updatepaitent/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const paitents = await Paitent.findByIdAndUpdate(id, req.body);
    if (!paitents) {
      return res.status(404).json({ message: "Paitient not found" });
    }
    const updatedpaitent = await Paitent.findById(id);
    res.status(200).json(updatedpaitent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/paitents/deletepaitent/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const paitents = await Paitent.findByIdAndDelete(id);
    if (!paitents) {
      return res.status(404).json({ message: "Paitient not found" });
    }
    res.status(200).json({ message: "Paitient deleted sucessfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/paitents/paitent", async (req, res) => {
  try {
    const paitent = await Paitent.create(req.body);
    res.status(200).json(paitent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to database");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch(() => {
    console.log("Connection failed");
  });
