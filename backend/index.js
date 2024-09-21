const express=require("express");
const  mongoose  = require("mongoose");
//created express to  memeroy app;
const cors=require("cors")

const app=express()
//create midderware 
app.use(express.json())
app.use(cors())
mongoose.connect('mongodb+srv://madhumech:'+encodeURIComponent('14051995@MA')+'@0000.0tjrmps.mongodb.net/?retryWrites=true&w=majority&appName=0000')
.then(()=>{
console.log("DB connected")
})
.catch((err)=>{
    console.log(err)
})
// createb to model mongoose
const todoScheme=new mongoose.Schema({
    title:{
        required:true,

        type:String
    },
    descrption:String
})


//app.get('/',(req,res)=>{
    //res.send('helle world')
//})
//const todo=[]
//connected string to promissed 

//create database in connected and memeroy unit name to todo but data base store on (todos)plur 
const todoModel=mongoose.model("todo",todoScheme)
app.post('/todo',async (req,res)=>{
   const {title,descrption}=req.body

    //const newTodo={
   //     id:todo.length+1,
     //   title,
       // descrption
    //}
    //todo.push(newTodo)

    //console.log(todo)
 //   new todoModel({title,descrption})
   // res.status(201).json(newTodo)
   try{
const newTodo=new todoModel({title,descrption})
 await newTodo.save();
 res.status(201).json(newTodo)
   }catch (error){
 console.log(error)
    res.status(500).json({message:error.message})

   }
})


 app.get('/todo',async (req,res)=>{
    try{
        todos=await  todoModel.find()
        res.json(todos)

    }catch(error){
 
        console.log(error)
        res.status(500).json({message:error.message})
    }
 })
 //update 
 app.put ("/todo/:id", async (req,res)=>{
    try{
    const {title,descrption}=req.body
   const id= req.params.id;
   const updateTodo=await todoModel.findByIdAndUpdate(
    id,
    {title,descrption},
    {new:true}

   )
   if(!updateTodo){
    return res.status(404).json({message:"Todo not found"})
   }
   res.json(updateTodo)
 }catch (error)
 {
console.log(error)
res.status(500).json({message:error.message})
 }
})
app.delete('/todo/:id',async(req,res)=>{
    try{
        const id=req.params.id  
    await todoModel.findByIdAndDelete(id)
    res.status(204).end()
    }catch(error){
        console.log(error)
        res.status(404).json({message:error.message})
    }
})


const PORT=8000;
app.listen(PORT,()=>{
    console.log('server listen' +PORT)
})