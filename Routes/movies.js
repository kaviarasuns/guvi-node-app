import express from "express";
import { client } from "../index.js";
import { ObjectId } from "mongodb";
import { auth } from "../middleware/auth.js";

const router = express.Router();



//-------------- Create - POST Operation ------------------//


// middleware (inbuilt) - express.json() - will convert body to JOSON
router.post('/', async function (req, res){
  const data = req.body;
  console.log(data);
  const result = await createMovies(data);
  res.send(result);
})



//-------------- Read - GET Operation ------------------//



// function to show movies data
router.get('/', auth, async function (request, response) {
  console.log(request.query); // query returns the query given by the user
  
  if(request.query.rating){
    request.query.rating = +request.query.rating;
  }

  console.log(request.query);
  // Find returns Cursor - Pagination : To convert cursor to Array use toArray();
  const movies = await getAllMovies(request);
  // console.log(movies);
  response.send(movies);

})

// using filter method to get particular movies
// app.get('/movies/:id', function (request, response) {
//   const {id} = request.params;
//   console.log(request.params, id);
//   const movie = movies.filter((mv)=> mv.id == id)[0];
//   response.send(movie)
// })


// using find method to get particular movies
router.get('/:id', auth, async function (request, response) {
  const {id} = request.params;
  console.log(request.params, id);

  // console.log(request.query);

  // const movie = movies.find((mv)=> mv.id == id); // receiving movies saved locally
  const movie = await getMoviesById(id);  // getting movies from mongoDB database
  console.log(movie);
  movie ? response.send(movie) : response.status(404).send({msg: "Movie not fount"});
})


//-------------- Update - PUT Operation ------------------//

// using update method to update a field in movies
router.put('/:id', async function (request, response) {
  const {id} = request.params;
  console.log(request.params, id);
  const data = request.body;
  
  // db.movies.updateOne({id: "101"},{$set: data});

  const result = await updateMoviesById(id, data);  // getting movies from mongoDB database
  response.send(result);
  
})

//-------------- Delete - DELETE Operation ------------------//


// using delete method to delete particular movies
router.delete('/:id', auth, async function (request, response) {
  const {id} = request.params;
  console.log(request.params, id);
  // db.movies.deleteOne({id: "101"});

  const result = await deleteMoviesById(id);

  console.log(result);
  result.deletedCount !=0 ? response.send(result) : response.status(404).send({Msg: "Movie not found"});
 
})


export const moviesRouter = router;

async function deleteMoviesById(id) {
    return await client.db("guvi").collection("movies").deleteOne({ _id: ObjectId(id) });
}

async function updateMoviesById(id, data) {
    return await client.db("guvi").collection("movies").updateOne({ _id: ObjectId(id) }, { $set: data });
}

async function getMoviesById(id) {
    return await client.db("guvi").collection("movies").findOne({ _id: ObjectId(id) }); 
}

async function createMovies(data) {
    return await client.db("guvi").collection("movies").insertMany(data);
}

async function getAllMovies(request) {
    return await client.db("guvi").collection("movies").find(request.query).toArray();
}
