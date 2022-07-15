import express from "express";
import { client } from "../index.js";
import { ObjectId } from "mongodb";

const router = express.Router();

router.post('/', async function (req, res){
  const data = req.body;
  console.log(data);
  const result = await createMobiles(data);
  res.send(result);
})



router.get('/', async function (request, response) {
  console.log(request.query); 
  const mobiles = await getAllMobiles(request);
  response.send(mobiles);

})


export const mobilesRouter = router;

async function getAllMobiles(request) {
    return await client.db("guvi").collection("mobiles").find(request.query).toArray();
}


async function createMobiles(data) {
    return await client.db("guvi").collection("mobiles").insertMany(data);
}