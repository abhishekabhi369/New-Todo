const mongoose=require('mongoose')
const connectionString='mongodb+srv://abhishekabhitir:AbhishekBharath70250@myfirstdb.ih2se1t.mongodb.net/?retryWrites=true&w=majority'
const connection=async()=>{

    try {
        const connect=await mongoose.connect(connectionString, {

            dbName: 'todolist' // Specify the database name here
          })
        console.log("Database Is Connected");
        

    } catch (error) {
        console.log(`error,${error}`);
        process.exit()
        
    }
}
module.exports=connection