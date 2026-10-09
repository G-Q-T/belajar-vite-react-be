import pool from '../../src/config/db.js';

// const USERS =[
//     {
//         id:1,
//         nama:"ismail",
//         email:"ismail@gmail.com",
//         password:"12345678",
//     },

//     {
//         id:2,
//         nama:"jamal",
//         email:"jamal@gmail.com",
//         password:"12345678",
//     },
//     {
//         id:3,
//         nama:"kipli",
//         email:"kipli@gmail.com",
//         password:"12345678",
//     },
// ];

// crud 

// func read
export const getAllUser = async (req,res) => {
    try {
        const [rows] = await pool.query("SELECT id,nama,email,is_active FROM users");
        return res.status(200).json({
        status:true,
        message: "fetch user berhasil wokkkkkkk",
        total:rows.length,
        data: rows,
    });
        
    } catch (error) {
        return res.status(400).json({
        status:false,
        message: "fail fetch user",
        error: error.message,
    });
};
};

// update
export const getUserBYId = async(req,res) =>{
    try {
        const id = parseInt(req.params.id);
        const [user] = await pool.query("SELECT id,nama,email,is_active FROM users where id = ?",[id]);
    
        // const user = USERS.find((u)=> u.id === id);
        if (!user) {
            res.status(404).json({
                status:false,
                message:"data tidak ditemukan WOK",
            });
        }
        res.status(200).json({
        status:true,
        message:"data ditemukan",
        data:user,
    });
        
    } catch (error) {
        res.status(500).json({
        status:false,
        message:"fail fetch user",
        error:error.message,
    });   
};
};


// create
export const createUser = async(req,res) =>{
    const {nama,email,password} =req.body;
    
    try {
        const user = await pool.query("INSERT INTO users (nama,email,password) VALUES (?,?,?)", [nama,email,password]);
            return res.status(201).json({
            status:true,
            message:"data baru ditambahkan",
            data:{id:user.insertId,nama,email},
        });
    } catch (error) {
    return res.status(500).json({
        status:false,
        message:"gagal",
        data:error.message
    })     
    }
};

export const updateUser = async(req,res) =>{
    const id = parseInt(req.params.id);
    const {nama,email,password} = req.body;
    const [userIndex] = await pool.query ("UPDATE users set nama=?,email=?,password=? where id=?", [nama,email,password,id]);
    
    try {
        return res.status(200).json({
            status:true,
            message:'update berhasil WOk',
            data:userIndex
        });
        
    } catch (error) {
        return res.status(400).json({
            status:false,
            error:error.message,
        })
        
    };
};


// delete
export const deleteUser = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        // 1. Eksekusi query dengan mengirim array [id] saja & gunakan destructuring [result]
        const [result] = await pool.query("DELETE FROM users WHERE id = ?", [id]);

        // 2. Cek apakah ada baris data yang terhapus
        if (result.affectedRows === 0) {
            return res.status(404).json({
                status: false,
                message: "User tidak ditemukan",
            });
        }

        // 3. Jika berhasil dihapus
        return res.status(200).json({
            status: true,
            message: "User berhasil dihapus",
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Gagal menghapus user",
            error: error.message,
        });
    }
};

