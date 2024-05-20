const Todo = require("../Schema/todoschema");

const findupdate=async(req,res)=>{
    const{Activityname}=req.body
    const _id=req.params.id;
    const gettodo=await Todo.findByIdAndUpdate(_id,{Activityname})
    res.json(gettodo)
}
module.exports=findupdate