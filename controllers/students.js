import { client } from "../db.js"
import { ObjectId } from "../db.js";


export function getStudents (req){
    return client
    .db("TTS")
    .collection("students")
    .find(req.query)
    .toArray()
}

export function getStudentsByParams (id){
    return  client
    .db("TTS")
    .collection("students")
    .findOne({_id : new ObjectId(id)})
}

export function addStudent (data){
    return client
    .db("TTS")
    .collection("students")
    .insertOne(data)
}

export function updateStudents (id,editData){
    return  client 
    .db("TTS")
    .collection("students")
    .findOneAndUpdate({_id : new ObjectId(id)},{$set:editData})
}

export function deleteStudent (id){
    return client
    .db("TTS")
    .collection("students")
    .deleteOne({_id : new ObjectId(id)})
}