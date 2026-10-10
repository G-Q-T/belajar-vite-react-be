import pool from '../../src/config/db.js';


// create
export const createProduk = async(req,res) =>{

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