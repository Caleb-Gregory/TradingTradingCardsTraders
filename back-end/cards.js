const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

// Configure multer so that it will upload to '/public/images'
const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 50000000
  }
});

const users = require("./users.js");
const User = users.model;
const validUser = users.valid;

const cardSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  path: String,
  cardName: String,
  cardCost: String,
  cardRarity: String,
  cardText: String,
  created: {
    type: Date,
    default: Date.now
  },
});

const Card = mongoose.model('Card', cardSchema);

// upload card
router.post("/", validUser, upload.single('card'), async (req, res) => {
  // check parameters
  if (!req.file)
    return res.status(400).send({
      message: "Must upload a file."
    });

  const card = new Card({
    user: req.user,
    path: "/images/" + req.file.filename,
    cardName: req.body.cardName,
    cardCost: req.body.cardCost,
    cardRarity: req.body.cardRarity,
    cardText: req.body.cardText,
  });
  try {
    await card.save();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// get my cards
router.get("/", validUser, async (req, res) => {
  // return cards
  try {
    let cards = await Card.find({
      user: req.user
    }).sort({
      created: -1
    }).populate('user');
    return res.send(cards);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// get all cards
router.get("/all", async (req, res) => {
  try {
    let cards = await Card.find().sort({
      created: -1
    }).populate('user');
    return res.send(cards);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Card.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = {
  model: Card,
  routes: router,
}