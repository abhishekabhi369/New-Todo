const express=require('express')
const bodyParser = require('body-parser');
const connection = require('./mongoconfig/mongo');
const router = require('./Router/mainroute');
const cors=require('cors')
const app=express()
const port=4002;
connection()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.json())
app.use(cors())
app.use('/',router)
app.get('/',(req,res)=>
{
    res.send("Welcome")
})
app.listen(port,()=>{
    console.log(`Server is Runing on ${port}`);
})