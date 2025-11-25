const dotenv = require("dotenv");
const express = require("express");
const DbConnection = require("./db");
const cors = require("cors")
const app = express();
const cookieParser = require("cookie-parser");
const adminRoutes = require("./Routes/Admin")
const blog_route = require('./Routes/blogRoute')
const path = require('path');
const studentRoutes = require('./Routes/studentRoutes')

dotenv.config()

app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(cookieParser()); 

app.use("/api/admin", adminRoutes);
app.use("/api/blogs", blog_route);
app.use("/api/students", studentRoutes);
 
app.use('/' , (req , res)=>{
    res.json("Welcome to backend")
})

DbConnection()
PORT = process.env.PORT || 3131
app.listen(PORT , ()=>{
    console.log(`server is rinning on port ${PORT}`)
})