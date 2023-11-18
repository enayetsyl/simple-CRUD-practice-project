const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion,  ObjectId } = require('mongodb');

app.use(cors({
    origin: [
      'http://localhost:5173'
    ],
    credentials: true
  }));
app.use(express.json());
app.use(cookieParser())


const uri = "mongodb+srv://crudPracticeProjectManager:ZXTVDX8psGihJVMA@cluster0.ktgpsav.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// middleware
const verifyToken = (req, res, next) => {
  const token = req?.cookies?.token;
  if(!token){
    return res.status(401).send({message: "UNAUTHORIZED ACCESS"})
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if(err){
      return res.status(401).send({message: "UNAUTHORIZED ACCESS"})
    }
    req.user = decoded;
    next();
  })
}






async function run() {
  try {
 
    await client.connect();

    const productsCollection = client.db("crudPracticeDB").collection("products")


// Auth api

    app.post('/jwt', async (req,res) => {
      console.log('jwt route accessed')
      try {
        const user = req.body;
        const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1hr' });
    
        res.cookie('token', token, {
          httpOnly: true,
          secure: true, // Adjust based on the environment
          sameSite: 'None'
        }).send({ success: true });
      } catch (error) {
        console.error('Error creating token:', error);
        res.status(500).send({ success: false, error: 'Internal Server Error' });
      }
    })

    app.post('/logout', async(req, res) => {
      const user = req.body;
      res.clearCookie('token', {maxAge: 0}).send({success: true})
    })





    // Get api
    app.get('/allproducts', async(req,res) => {
      const result = await productsCollection.find().toArray()
      res.send(result)
    })

    app.get('/allproducts/:id', async(req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await productsCollection.findOne(query)
      res.send(result)
    })






    // update api
    app.patch('/allproducts/:id', verifyToken, async(req, res) =>{
      if(req.user.email !== req.query.email){
        return res.status(403).send({message: 'forbidden access'})
      }

      const id = req.params.id;
      const upadatedProductData = req.body;
      const query = {_id: new ObjectId(id)}
      const updatedDoc = {
        $set: {
          ProductName : upadatedProductData.ProductName,
          Size : upadatedProductData.Size,
          Color: upadatedProductData.Color,
          availableAllYear : upadatedProductData.availableAllYear
        }
      }
      const result = await productsCollection.updateOne(query, updatedDoc)
      res.send(result)
    })








    // post api
    app.post('/addproduct', async(req, res) => {
      const product = req.body;
      const result = await productsCollection.insertOne(product)
      res.send(result)
    })







    // delete api
    app.delete('/allproducts/:id', async(req, res) =>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await productsCollection.deleteOne(query);
      res.send(result)
    })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
  res.send('CRUD practice server is running')
})

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})

