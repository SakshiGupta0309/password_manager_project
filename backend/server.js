/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-undef
const express = require('express')
// eslint-disable-next-line no-undef
const dotenv=require('dotenv')
// eslint-disable-next-line no-undef
const { MongoClient } = require('mongodb');
// eslint-disable-next-line no-undef
const bodyParser = require('body-parser');
// eslint-disable-next-line no-undef
const cors=require('cors')
// eslint-disable-next-line no-undef
dotenv.config()
// Connection URL
const url = 'mongodb://localhost:27017/';
const client = new MongoClient(url);


const dbName ='passop';
const app = express()
const port = 3000
app.use(bodyParser.json())
app.use(cors())

 client.connect();
 
 app.get('/', async(req, res) => {
  const db=client.db(dbName);
  const collection=db.collection('documents');
  // eslint-disable-next-line no-undef, no-unused-vars
  const findResult = await collection.find({}).toArray();
  // res.send('Hello World!')
  res.json(findResult)
})

//for save
app.post('/',async(req,res)=>{
  const password=req.body
  const db=client.db(dbName);
  const collection=db.collection('documents');
  const findResult=await collection.insertOne(password);
  res.send({success:true,result:findResult});
})


//for delet
// app.delete('/',async(req,res)=>{
//   const password =req.body
//   const db=client.db(dbName);
//   const collection=db.collection('documents');
//   // eslint-disable-next-line no-undef
//   const findResult=await collection.deleteOne(password)
//   res.json(findResult);
// })
app.delete('/',async(req,res)=>{
  const password=req.body
  const db=client.db(dbName);
  const collection=db.collection('documents');
  const findResult=await collection.deleteOne(password);
  res.send({success:true,result:findResult});
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})