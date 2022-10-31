import mongoose from "mongoose";
import Blog from "../model/Blog";
import User from "../model/User";

export const getAllBlog = async (req,res,next) => {
    let blogs;
    try{
     blogs = await Blog.find();
    }catch (err){
     console.log(err);
    }

    if(!blogs){
        return res.status(404).json({message: "no blogs found"});
    }
    return res.status(200).json({blogs});
};


export const addBlog = async (req,res,next) => {
    const {title,description,image,user} = req.body;

    let existingUser;
    try{
        existingUser= await User.findById(user)
    }catch(err){
        return  console.log(err);
      }

    if(!existingUser){
     return res.status(400).json({message:"unable to find user by this id"})
    }

    const blog = new Blog({title,description,image,user});

    try{
       const Session = await mongoose.startSession();
       Session.startTransaction();
       await blog.save(Session);
       existingUser.blogs.push(blog);
       await existingUser.save({Session})
       await Session.commitTransaction();

    }catch(err){
      console.log(err)
      return res.status(500).json({message: err})
    }
    return res.status(200).json({blog});
};

export const updateBlog = async (req,res,next) => {
    const {title,description} = req.body;
    const blogid = req.params.id ;
    let blog;

    try{
        blog = await Blog.findByIdAndUpdate(blogid, {
        title,
        description
    })
    }catch(err){
      return  console.log(err);
    }
    if (!blog){
        return res.status(500).json({message:"unable to update"})
    }
    return res.status(200).json({blog});
};

export const getbyid = async (req,res,next) => {
    const id = req.params.id;
    let blog;

    try{
        blog = await Blog.findById(id);
    }catch(err){
      return  console.log(err);
    }
    if (!blog){
        return res.status(404).json({message:"no blog found"})
    }
    return res.status(200).json({blog});
};

export const deleteBlog = async (req,res,next) => {
    const id = req.params.id;
    let blog;

    try{
        blog = await Blog.findByIdAndRemove(id).populate('user');
        await blog.user.blogs.pull(blog);
        await blog.user.save();
        
    }catch(err){
      return  console.log(err);
    }
    if (!blog){
        return res.status(500).json({message:"unable to delete"})
    }
    return res.status(200).json({message:"successfully delete"});
};