const Todo = require("../Schema/todoschema")

const userfunction=async(req,res)=>{
    const  {Activityname}=req.body
    const tododeatils=await Todo.create({
        Activityname
    })
    res.json(tododeatils)
}
module.exports=userfunction