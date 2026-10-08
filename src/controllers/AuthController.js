// /data dummy

const USERS =[
    {
        nama:"ismail",
        email:"ismail@gmail.com",
        password:"12345678",
    },
];


// untuk req dan res
export const login = (req,res) =>{
    const{email,password} = req.body;

    if (!email || !password) {
        res.status(400).json({
            status:false,
            message: "email atau password jaangan kosong"
        });
    }
    // find()

    const user = USERS.find((cariuser) => cariuser.email === email && cariuser.password === password);
    if (!user) {
        return res.status(401).json({
        status:false,
        message:"invalid login wok"
        });
    }
    res.status(200).json({
        status:true,
        message:"berhasil",
        data:{
            user:{
                id:user.id,
                name:user.nama,
                email:user.email
            },
            token:`jwt-token-123 ${user.id} - ${Date.now()}`
        }
    });
};
