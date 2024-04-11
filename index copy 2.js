import  express  from "express";
import { MongoClient } from "mongodb";
import  Obj from "mongodb";
import dotenv from "dotenv"

// const express = require("express");
// const {MongoClient} = require("mongodb")
// const fs = require("fs")
// const path = require("path")
// const ObjectId = require("mongodb").ObjectId
dotenv.config()
const PORT = process.env.PORT;
const app = express();
var ObjectId = Obj.ObjectId

// const currentDir = path.join(__dirname,"express")
// console.log(currentDir)

// const secret = "I'm a file"
// fs.writeFileSync(`${currentDir}/express.txt`,secret,(err)=>{
//   if(err){
//     connsole.log(err)
//   }else{
//     console.log("file created")
//   }
// })

//mongo db connection

const MONGO_URL = process.env.MONGO_URL

async function createConnection (){
  const client = new MongoClient(MONGO_URL)
  await client.connect();
  console.log("Mongo db is suceesfully connected")
  return client;
}

export const client = await createConnection();

app.use(express.static("express")); //loading the static file
app.use(express.json()) //middlevare tells server to use json

app.get ("/static",(req,res)=>{
  res.sendFile(path.join(__dirname,"express/express.txt"))
})




app.get ("/",(req,res)=>{
    res.send(`hi i'm started`)
})

//parameters


app.get("/students/:id",async (req,res)=>{
  const {id} = req.params;
  // const student = students.find((stud)=>stud.id ===id)
  // data retrival from db
  const  studentsData = await (await client)
  .db("TTS")
  .collection("students")
  .findOne({_id : new ObjectId(id)})
  // res.send(studentsData)
  res.status(200).json(studentsData)
})

// query params http://localhost:9000/students?name=anish&gender=male
app.get ("/students",async (req,res)=>{
 // query conditions
 if(req.query.age){
  req.query.age = +req.query.age
 }
// data retrival from db
  const  studentsData = await (await client)
  .db("TTS")
  .collection("students")
  .find(req.query)
  .toArray()
  // res.send(studentsData)
  res.status(200).json(studentsData)
})

// app.get ("/all/students",async(req,res)=>{
//   const  studentsData = await (await client).db("TTS").collection("students").find().toArray()
//   // res.send(studentsData)
//   res.status(200).json(studentsData)
// })

app.post ("/students",async (req,res)=>{
  const newData = req.body
  const  result = await (await client)
  .db("TTS")
  .collection("students")
  .insertMany(newData)
  res.status(201).send(result)
})

app.put ("/students/:id",async (req,res)=>{
  const {id} = req.params
  const updateStudent = req.body
  const  result = await (await client)
  .db("TTS")
  .collection("students")
  .updateOne({_id : new ObjectId(id)},{$set:updateStudent})
  res.status(200).send(result)
})

app.delete("/students/:id", async (req,res)=>{
  const {id} = req.params
  const  result = await (await client)
  .db("TTS")
  .collection("students")
  .deleteOne({_id : new ObjectId(id)})
  res.status(200).send(result)
})

app.listen(PORT,()=>console.log(`server started localhost:${PORT}`))