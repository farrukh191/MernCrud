const mongoose=require('mongoose');

mongoose.connect("mongodb://localhost:27017/crudtest",{
    // useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true,
    // useFindAndModify:false
}).then(()=>{
    console.log("connection successfully");
}).catch((err)=>{
    console.log(err);
})