const fs = require("fs")
const { readdir } = require("fs/promises")
const process = require("process")
const os = require("os")
const [, ,n1,n2,msg,configPath] = process.argv
const sum = (num1,num2)=>{
    return num1 + num2
}

console.log(sum(+n1,+n2))

const welcome =  (message) =>{
    console.log(`Hi ${message} welcome to node js`)
}

welcome(msg)

// read a file 

fs.readFile(configPath,"utf-8",(err,data)=>{
    console.log(data)
})

// create a file 
const content = "Good morning have a nice day enjoy the day"
fs.writeFile("./sample.txt",content,(err)=>{
    if(err){
        console.log(err)
    }else{
        console.log("file writted successful")
    }
})

// update in the existing file 
const newContent = "\nNew content added"

fs.appendFile("./sample.txt",newContent,(err)=>{
    if(err){
        console.log(err)
    }else{
        console.log("file updated successful")
    }
})

// delete a file 

// fs.unlink("./sample.txt",(err)=>{
//     if(err){
//         console.log(err)
//     }else{
//         console.log("file deleted successful")
//     }
// })
// sync - it is used only whenever required only - readFileSync...etc

// date functions

let time = Date.now()
console.log(time)

let date = new Date();
let utt = date.toUTCString()
let today = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();
console.log(date)
console.log(utt)
console.log("All functions are" ,today,month,year)

fs.readdir("./newfolder/",(err,data)=>{
    console.log("Directory", data)
})


//os functions

console.log("Os version ---" , os.version());
console.log("free mem ---" , os.freemem());
console.log("total mem ---" , os.totalmem());
console.log("Cpu ---" , os.cpus());
console.log("Platform: " + os.platform());
console.log("Architecture: " + os.arch());

