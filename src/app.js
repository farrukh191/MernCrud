const { Router } = require("express");
const express = require("express");
const app = express();
let cors = require('cors');
require("./db/conn");
const StudentRouter= require("./router/router.js");
app.use(cors({origin:"http://localhost:3000", credentials:true}));
const port = process.env.port || 4000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));






app.use(StudentRouter);


app.listen(port,()=>{
    console.log(`Listening on port number ${port}`);
});