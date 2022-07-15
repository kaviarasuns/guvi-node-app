import express, { response } from "express";
import { client } from "../index.js";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

async function genHashedPassword(password){
  const NO_OF_ROUNDS = 10;
  const salt = await bcrypt.genSalt(NO_OF_ROUNDS);
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log(`${salt} + ${hashedPassword}`);
  return hashedPassword;
}



//-------------- Create - POST Operation - FOR SIGNUP PROCESS ------------------//


// middleware (inbuilt) - express.json() - will convert body to JOSON
router.post('/signup', async function (req, res){
  const {username, password} = req.body;
  // db.users.insertOne(data)

  const userFromDB = await getUserByName(username);
  console.log(userFromDB);

  if(userFromDB){
    res.status(404).send({message: "Username already exists"});
  } else if(password.length < 8){

       res.send({message: "Password must be minimum 8 characters"});

  } else {
      const hashedPassword = await genHashedPassword(password);
      console.log(`HasedPassword: ${hashedPassword}`);

  const result = await createUser({
    username: username,
    password: hashedPassword,
  });
  res.send(result);

  }
    
  
});



//-------------- Create - POST Operation - FOR SIGN IN PROCESS ------------------//

router.post('/login', async function (req, res){
  const {username, password} = req.body;
  // db.users.insertOne(data)

  const userFromDB = await getUserByName(username);
  console.log(userFromDB);
    
  if(!userFromDB){
    res.status(401).send({message: "Invalid credentials"});
  } else {
    const storedPassword = userFromDB.password;
    const isPasswordMatch = await bcrypt.compare(password, storedPassword);
    console.log(isPasswordMatch);

        if(isPasswordMatch){
          const token = jwt.sign({id: userFromDB._id}, process.env.SECRET_KEY);
          res.send({message: "Successful Login", token: token});
        } else {
          res.status(401).send({message: "Invalid credentials"});
      }


  }


  
});





export const usersRouter = router;


async function createUser(data) {
    return await client.db("guvi").collection("users").insertOne(data);
}


async function getUserByName(username) {

  // db.user.findOne({username: username});
    return await client.db("guvi").collection("users").findOne({ username : username }); 
}