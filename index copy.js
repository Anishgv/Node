const express = require("express");
const fs = require("fs")
const app = express();
const PORT = 9000;
const path = require("path")

const currentDir = path.join(__dirname,"express")
console.log(currentDir)

const secret = "I'm a file"
fs.writeFileSync(`${currentDir}/express.txt`,secret,(err)=>{
  if(err){
    connsole.log(err)
  }else{
    console.log("file created")
  }
})

app.use(express.static("express")); //loading the static file
app.use(express.json()) //middlevare tells server to use json

app.get ("/static",(req,res)=>{
  res.sendFile(path.join(__dirname,"express/express.txt"))
})

const students =[
    {
        "id": "1",
        "name": "Anish",
        "batch": "C43",
        "gender": "male",
        "yearsOfExperience": "3"
      },
      {
        "id": "2",
        "name": "Arun",
        "batch": "C43",
        "gender": "male",
        "yearsOfExperience": "2"
      },
      {
        "id": "3",
        "name": "Ajith",
        "batch": "C43",
        "gender": "male",
        "yearsOfExperience": "4"
      },
      {
        "id": "4",
        "name": "Sruthi",
        "batch": "C43",
        "gender": "female",
        "yearsOfExperience": "2"
      },
      {
        "id": "5",
        "name": "Anju",
        "batch": "C43",
        "gender": "female",
        "yearsOfExperience": "1"
      },
      {
        "id": "6",
        "name": "Varsha",
        "batch": "C43",
        "gender": "female",
        "yearsOfExperience": "3"
      }
]


app.get ("/",(req,res)=>{
    res.send(`hi i'm started`)
})

//parameters
app.get("/students/:id",(req,res)=>{
  const {id} = req.params;
  console.log(id)
  console.log(req.params)
  const student = students.find((stud)=>stud.id ===id)
  res.send(student)
})

// query params http://localhost:9000/students?name=anish&gender=male
app.get ("/students",(req,res)=>{
  const {gender} = req.query
  // console.log(req.query)
  // console.log("name is" ,name , gender)
  const selected = students.filter((studs)=>studs.gender==gender)
  res.send(selected)
})

app.get ("/all/students",(req,res)=>{
    res.send(students)
})

app.post ("/students",(req,res)=>{
  const data ={
        id: req.body.id,
        name: req.body.name,
        batch: req.body.batch,
        gender: req.body.gender,
        yearsOfExperience: req.body.yearsOfExperience
  }
  students.push(data)
  res.send(students)
  console.log(req.body)
})

app.put ("/students/:id",(req,res)=>{
  const {id} = req.params
  const editStudent = students.find((stud)=>stud.id ===id)
  editStudent.id = req.body.id,
  editStudent.name= req.body.name,
  editStudent.batch= req.body.batch,
  editStudent.gender= req.body.gender,
  editStudent.yearsOfExperience= req.body.yearsOfExperience
  res.send(students)
})

app.delete("/students/:id",(req,res)=>{
  const {id} = req.params
  const deleteStudent = students.filter((stud)=>stud.id !=id)
  
  res.send(deleteStudent)
})

app.listen(PORT,()=>console.log(`server started localhost:${PORT}`))