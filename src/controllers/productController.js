import pool from '../../src/config/db.js';


// create
export const createProduk = async(req,res) =>{
    const {categories_id,name,price,stock,description} = req.body;
    await pool.query("INSERT INTO products (categories_id,name,price,stock,description) VALUES (?,?,?,?,?)" , [categories_id,name,price,stock,description]);

    try {
        return res.status(201).json({
            status: true,
            message:"create succes",
        });
    } catch (error) {
          return res.status(500).json({
            status: false,
            error:error.message,
        });
    }
};
// read
export const getAllProduk = async(req,res)=>{
    try {
        const products = await pool.query ("SELECT products.*, categories.name AS category_name FROM products LEFT JOIN categories ON products.categories_id = categories.id");
        return res.status(200).json({
            status:true,
            data:products,
        });
        
    } catch (error) {
        return res.status(500).json({
            status:false,
            error:error.message,
        });
        
    }
    
};
// update
export const updateData = async (req,res) => {
    const id = parseInt(req.params.id);
    const {categories_id,name,price,stock,description,is_Active} = req.body;
    await pool.query("UPDATE products set categories_id=?, name=?, price=?, stock=?, description=?, is_Active=? WHERE id=?", [categories_id,name,price,stock,description,is_Active ?? 1,id]);

    try {
         return res.status(202).json({
            status: true,
            message:"update succes",
        });
    } catch (error) {
         return res.status(500).json({
            status: true,
            error:error.message,
        });
    }
};


// find data
export const  getOneData = async(req,res)=>{
    try {
        const id = parseInt(req.params.id);
        const [product] = await pool.query ("SELECT products.*, categories.name AS category_name FROM products LEFT JOIN categories ON products.categories_id = categories.id WHERE products.id=?", [id]);
        return res.status(200).json({
            status:true,
            total:product.lenght,
            data:product,
        });
        
    } catch (error) {
        return res.status(500).json({
            status:false,
            error:error.message,
        });
        
    }
}
// delete

export const deleteProduct = async(req,res) =>{
        const id = parseInt(req.params.id);
        const [product] = await pool.query ("DELETE FROM products WHERE id=?", [id]);

        try {
            return res.status(200).json({
                status:true,
                message:"delete berhasil wok",
            });
        } catch (error) {
            return res.status(500).json({
                status:false,
                error:error.message,
            });
        }

    };