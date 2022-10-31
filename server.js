import express  from "express";
import mongoose from "mongoose";

import router from "./routes/userRoutes";
import blogRouter from "./routes/blogRoutes";
   
const app = express();
app.use(express.json());

app.use("/api/user",router);
app.use("/api/blog",blogRouter);



mongoose.connect("mongodb+srv://admin:HqfXI4eX3FpLOCp3@cluster0.e1i7cmq.mongodb.net/uder-app?retryWrites=true&w=majority")
.then(()=> app.listen(5000))
.then(()=>console.log("connected to db and listening to local 5000 "))
.catch((err)=>console.log(err));

 