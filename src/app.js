import express from "express";
import cors from "cors";
// import { login } from "./controllers/AuthController.js";
import authRoutes from'./routes/authRoutes.js';
import userRoutes from "./routes/userRoutes.js";
// import barangRoutes from "./routes/barangRoutes.js";
import categoriesRoutes from "./routes/categoriesRoutes.js";
import produkRoutes from './routes/produkRoutes.js';

// end point
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth' , authRoutes);
app.use('/api/user' , userRoutes);
app.use('/api/categories' , categoriesRoutes);
app.use('/api/products' , produkRoutes );
// app.use('/api/barang' , barangRoutes);
// app.post('/api/auth/login' ,login);

app.get('/', (req,res) =>{
    // req:mengambil data 
    // re.body, req.params
    // res.send()
    res.json({message:"welcome to pos api"});
});


export default app;