const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion,  ObjectId } = require('mongodb');

app.use(cors());
app.use(express.json());



const uri = "mongodb+srv://crudPracticeProjectManager:ZXTVDX8psGihJVMA@cluster0.ktgpsav.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
 
    await client.connect();

    const productsCollection = client.db("crudPracticeDB").collection("products")

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




    app.patch('/allproducts/:id', async(req, res) =>{
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



    app.post('/addproduct', async(req, res) => {
      const product = req.body;
      const result = await productsCollection.insertOne(product)
      res.send(result)
    })



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