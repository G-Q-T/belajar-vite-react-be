import pool from '../../src/config/db.js';

// const USERS =[
//     {
//         id:1,
//         name:"ismail",
//         email:"ismail@gmail.com",
//         password:"12345678",
//     },

//     {
//         id:2,
//         name:"jamal",
//         email:"jamal@gmail.com",
//         password:"12345678",
//     },
//     {
//         id:3,
//         name:"kipli",
//         email:"kipli@gmail.com",
//         password:"12345678",
//     },
// ];

// crud 

// func read
export const getAllUser = async (req,res) => {
    try {
        const [rows] = await pool.query("SELECT id,name,email,is_active FROM users2");
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
    const id = parseInt(req.params.id);
    try {
        const [rows] = await pool.query("SELECT id,name,email,is_active FROM users2 where id = ?",[id]);
        const user = rows[0];   
        // const user = USERS.find((u)=> u.id === id);
        if (!user) {
            return res.status(404).json({
                status:false,
                message:"data tidak ditemukan WOK",
                error:error.message,
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
    const {name,email,password} =req.body;
    
    try {
        const user = await pool.query("INSERT INTO users2 (name,email,password) VALUES (?,?,?)", [name,email,password]);
            return res.status(201).json({
            status:true,
            message:"data baru ditambahkan",
            data:{id:user.insertId,name,email},
        });
    } catch (error) {
    return res.status(500).json({
        status:false,
        message:"gagal",
        data:error.message
    });   
    }
};

export const updateUser = async(req,res) =>{
    const id = parseInt(req.params.id);
    const {name,email,password,is_active} = req.body;
    
    if (!password) {
        await pool.query ("UPDATE users2 set name=?,email=?, is_active=? WHERE id=?", [name,email, is_active??1,id]);
        
    }else{
        await pool.query ("UPDATE users2 set name=?,email=?,password=?,is_active=? WHERE id=? ", [name,email,password, is_active??1,id]);
    }
    try {
        return res.status(200).json({
            status:true,
            message:'update berhasil WOk',
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
        const [result] = await pool.query("DELETE FROM users2 WHERE id = ?", [id]);

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

