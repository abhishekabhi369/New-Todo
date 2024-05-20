const Todo = require("../Schema/todoschema");


const tododelete=async(req,res)=>{
    const _id=req.params.id;
    const getuser=await Todo.findByIdAndDelete(_id)
    res.json("Todo deleted")
}
module.exports=tododelete