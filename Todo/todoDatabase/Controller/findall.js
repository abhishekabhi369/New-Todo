const Todo = require("../Schema/todoschema")
const todoList=async(req,res)=>{
  try {
    const todo=await Todo.find() 
    res.json(todo)
  } catch (error) {
      res.json({ error: " Error" });
  }
}
module.exports=todoList