import express from "express";
import {getAllBlog,addBlog,updateBlog,getbyid,deleteBlog, getbyuserid} from "../controllers/blogController";

const blogRouter = express.Router();

blogRouter.get("/",getAllBlog);

blogRouter.post("/add",addBlog);
blogRouter.put("/update/:id",updateBlog);
blogRouter.get("/:id",getbyid);
blogRouter.delete("/:id",deleteBlog);

blogRouter.get("/user/:id",getbyuserid);





export default blogRouter; 