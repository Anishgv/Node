import express from "express";
import { client } from "../db.js";
import { ObjectId } from "../db.js";
import { addStudent, deleteStudent, getStudents, getStudentsByParams, updateStudents } from "../controllers/students.js";

const router =  express.Router();

//parameters

router.get("/:id",async (req,res)=>{
    const {id} = req.params;
    try {
      // data retrival from db
    const  studentsData = await getStudentsByParams(id)
    if(!studentsData) {
      res.status(400).json({data:"user not found"})
      return
    }
  res.status(200).send({data:studentsData})
    } catch (error) {
      res.status(500).json({data:"Internal server error"})

    }
    
  })

  // query params 
router.get ("/",async (req,res)=>{
    // query conditions
    if(req.query.age){
     req.query.age = +req.query.age
    }
    try {
      // data retrival from db
     const  studentsData = await getStudents(req) 
     if(studentsData.length <=0){
      res.status(404).json({data:"No content available"})
      return
     }
     res.status(200).json({data:studentsData})
    } catch (error) {
      res.status(500).json({data:"Internal server error"})
    }
   
   })

   router.post ("/",async (req,res)=>{
    try {
      const newData = req.body
      const  result = await addStudent(newData) 
    res.status(201).json({data :"data added"})
    } catch (error) {
      res.status(500).json({data:"Internal server error"})

    }
    
  })
  
  router.put ("/:id",async (req,res)=>{
    const {id} = req.params
    try {
      const updateStudent = req.body
      const  result = await updateStudents(id,updateStudent)
    res.status(200).json({data:"Data updated"})
    } catch (error) {
      res.status(500).json({data:"Internal server error"})
    }
    
  })
  
  router.delete("/:id", async (req,res)=>{
    const {id} = req.params
    try {
      const  result = await deleteStudent(id)
    res.status(201).json({data : "Data deleted"})
    } catch (error) {
      res.status(500).json({data:"Internal server error"})
    }
    
  })
  
  export const studentRouter = router