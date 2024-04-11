import  express  from "express";
import dotenv from "dotenv"
import { studentRouter } from "./routes/students.js";
import cors from "cors"
// env Configuration
dotenv.config()
const PORT = process.env.PORT;
// Middlevare
const app = express();
app.use(express.json()) //middlevare tells server to use json

app.use(cors())

app.get ("/",(req,res)=>{
    res.send(`hi i'm started`)
})
app.use("/students",studentRouter)

// http server initialization
app.listen(PORT,()=>console.log(`server started localhost:${PORT}`))