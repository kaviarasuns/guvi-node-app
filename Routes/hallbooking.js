import express from "express";
import { client } from "../index.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// HALL BOOKING API

//CREATING A ROOM
router.post("/rooms", async function (req, res) {
  const data = req.body;
  const result = await client.db("hall").collection("rooms").insertMany(data);
  res.send(result);
});

// CUSTOMER BOOKING A ROOM
router.post("/booking", async function (req, res) {
  const data = req.body;

  const { date: date, start_time: starttime } = data[0];

  const booked_rooms = await client
    .db("hall")
    .collection("booking")
    .find({ date: date })
    .toArray();

  if (booked_rooms[0] == undefined) {
    const result = await client
      .db("hall")
      .collection("booking")
      .insertMany(data);
    res.send(data);
  } else {
    res.send("Room Already booked at this date");
  }
  console.log(date, starttime);
});

//LIST ALL THE ROOMS WITH BOOKED DATA
router.get("/rooms", async function (req, res) {
  const rooms = await client.db("hall").collection("rooms").find().toArray();
  res.send(rooms);
});

//LIST ALL CUSTOMERS WITH BOOKED DATA
router.get("/booking", async function (req, res) {
  const booked_rooms = await client
    .db("hall")
    .collection("booking")
    .find()
    .toArray();
  res.send(booked_rooms);
});

export const hallbookingRouter = router;
