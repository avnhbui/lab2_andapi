//import thu vien
const express = require('express');
const mongoose= require('mongoose');
//tao doi tuong moi cho express
const app= express();
app.set('view engine', 'ejs');
//ket noi voi csdl mongdb------------------------------------------------------------------------
mongoose.connect('mongodb+srv://vanhdz12:vanhdzz12@cluster0.kivdclq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("ket noi thanh cong voi mongodb")
}).catch((err)=>{  
    console.error("Loi: ", err);
});
//truy van csdl----------------------------------------------------------------------------------
//chon csdl thao tac
const db1= mongoose.connection.useDb('db1');
//dinh nghia model cho bang du lieu
const SinhVienSchema = new mongoose.Schema({
    id:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    }
});
//anh xa model vao bang du lieu
const SinhVien= db1.model('sinhvien', SinhVienSchema);
//tao link de goi tren trinh duyet (API)
app.get('/', async(req,res)=>{
    try{
        const sinhvien =await SinhVien.find();//doc du lieu tu bang sinh vien
        if(sinhvien.length>0){//neu co ton tai du lieu
            res.json(sinhvien);
            // res.render('students', {sinhvien: sinhvien});
        }else{
            res.status(404).json({error: "ko co sinh vien"});
        }
    }catch (error){
        console.error("Loi doc du lieu: ");
        res.status(500).json({error: "Doc du lieu loi"});
    }
});
//khoi chay may chu-----------------------------------------------------------------------------
const PORT =process.env.PORT|| 5000;
app.listen(PORT, ()=>{
    console.log('server dang chay o cong 5000');
});
module.exports=app;