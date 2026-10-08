import express from "express";
import cors from "cors";
// import { login } from "./controllers/AuthController.js";
import authRoutes from'./routes/authRoutes.js'

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth' , authRoutes);
// app.post('/api/auth/login' ,login);

app.get('/', (req,res) =>{
    // req:mengambil data 
    // re.body, req.params
    // res.send()
    res.json({message:"welcome to pos api"});
});


export default app;