import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
// /data dummy
import pool from "../config/db.js";

const USERS =[
    {
        nama:"ismail",
        email:"ismail@gmail.com",
        password:"12345678",
    },
];


// untuk req dan res
export const login = async (req,res) =>{
    const{email,password} = req.body;

    if (!email || !password) {
        res.status(400).json({
            status:false,
            message: "email atau password jaangan kosong"
        });
    }
    // find()

    // const user = USERS.find((cariuser) => cariuser.email === email && cariuser.password === password);
    const [user] = await pool.query("SELECT id, name,email,password FROM users2 WHERE email=?" , [email]);
    if (user.lenght === 0) {
        return res.status(401).json({
        status:false,
        message:"invalid credential"
        });
    } else {
      
    }
    const dataUser = user[0];
    const isMatch  = await bcrypt.compare(password,dataUser.password);
    if (!isMatch) {
        return res.status(401).json({
        status:false,
        message:"invalid login wok"
        });
    }
    const token = jwt.sign({
        id:dataUser.id,
        name:dataUser.name,
        email:dataUser.email,
    }, process.env.JWT_SECRET,
    {expiresIn: process.env.JWT_EXPIRES_IN || '1d'},
);
  res.status(200).json({
            status:true,
            message:"berhasil",
            data:{
                user:{
                    id:dataUser.id,
                    name:dataUser.nama,
                    email:dataUser.email,
                },
                token,
            }
        });
};
