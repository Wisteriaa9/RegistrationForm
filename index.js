var express=require("express")
var bodyParser=require("body-parser")
var mongoose=require("mongoose")

const app=express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/Database')
var db=mongoose.connection
db.on('error',()=> console.log("Error in Connecting to Database"))
db.once('open',()=> console.log("Connected to Database"))

app.post("/sign_up",(req,res) => {
    var name= req.body.name
    var age=req.body.age
    var gender=req.body.gender
    var bloodgroup=req.body.bloodgroup
    var height=req.body.height
    var weight=req.body.weight
    var allergies=req.body.allergies

    var data={
        "name":name,
        "age":age,
        "gender":gender,
        "bloodgroup":bloodgroup,
        "height":height,
        "weight":weight,
        "allergies":allergies
    }
    db.collection('users').insertOne(data,(err,collection) => {
        if(err){
            throw err;
        }
        console.log("Record Inserted Succesfully")
    })
    return res.redirect('signup_successful.html')
})
app.get("/",(req,res) => {
    res.set({
        "Allow-acces-Allow-Origin":'*'
    })
    return res.redirect('index.html')
}).listen(5054);
console.log("Listening on port 5054")