const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();

//middleware 

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ucy0qh8.mongodb.net/?retryWrites=true&w=majority`;
 
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const run = async () => {
    try {
      const db = client.db("moontech");
      const collectionproduct = client.db("products").collection("product");
  
      app.get("/products", async (req, res) => {
        const cursor = collectionproduct.find({});
        const product = await cursor.toArray();
  
        res.send({ status: true, data: product });
      });
  
      app.post("/product", async (req, res) => {
        const product = req.body;
  
        const result = await collectionproduct.insertOne(product);
  
        res.send(result);
      });
  
      app.delete("/product/:id", async (req, res) => {
        const id = req.params.id;
  
        const result = await collectionproduct.deleteOne({ _id: ObjectId(id) });
        res.send(result);
      });
    } finally {
    }
  };
  
  run().catch((err) => console.log(err));
  
  app.get("/", (req, res) => {
    res.send("Hello World!");
  });
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });