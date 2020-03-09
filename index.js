var express=require("express"); 
var bodyParser=require("body-parser"); 
const MongoClient = require("mongodb").MongoClient;
const dotenv=require("dotenv");
require('dotenv').config()

dotenv.config({path: 'ENV_FILENAME'});

const mongoose = require('mongoose'); 
mongoose.connect(process.env.DB_CONNECT,{useNewUrlParser: true, useUnifiedTopology: true}); 
var DB=mongoose.connection; 
DB.on('error', console.log.bind(console, "connection error")); 
DB.once('open', function(callback){ 
	console.log("connection succeeded"); 
}) 

let port = process.env.PORT || 3000

var app=express() 

app.use(bodyParser.json()); 
app.use(express.static('public')); 
app.use(bodyParser.urlencoded({ 
	extended: true
})); 


app.use(express.static(__dirname + "/../public"));



app.post('/sign_up', function(req,res){ 
    var team = req.body.team; 
	var email =req.body.email;
    var phone =req.body.phone;
    var name1 = req.body.name1;
    var reg1 = req.body.reg1;
    var name2 = req.body.name2;
    var reg2 = req.body.reg2;
    var name3 = req.body.name3;
    var reg3 = req.body.reg3;
    var name4 = req.body.name4;
    var reg4 = req.body.reg4;
    var name5 = req.body.name5;
    var reg5 = req.body.reg5;
    var room1 = req.body.room1;
    var room2 = req.body.room2;
    var room3 = req.body.room3;
    var room4 = req.body.room4;
    var room5 = req.body.room5;
    var add1 = req.body.add1;
    var add2 = req.body.add2;
    var add3 = req.body.add3;
    var add4 = req.body.add4;
    var add5 = req.body.add5;

	var data = { 
        "Team name": team,
        "Leader name": name1,
        "Leader regno":reg1,
        "Leader email":email, 
        "Leader phone":phone,
        "Leader hostel":add1,
        "Leader room":room1,
        "Member 2": name2,
        "Member 2 regno":reg2,
        "Member 2 hostel":add2,
        "Member 2 room":room2,
        "Member 3": name3,
        "Member 3 regno":reg3,
        "Member 3 hostel":add3,
        "Member 3 room":room3,
        "Member 4": name4,
        "Member 4 regno":reg4,
        "Member 4 hostel":add4,
        "Member 4 room":room4,
        "Member 5": name5,
        "Member 5 regno":reg5,
        "Member 5 hostel":add5,
        "Member 5 room":room5,

    }
    
    MongoClient.connect(process.env.DB_CONNECT,{useNewUrlParser: true, useUnifiedTopology: true}, (err, db)=>{
        if (err) throw err;
        var dbo = db.db('h4c');
        var collection = dbo.collection('team');
        collection.findOne({"Leader regno": reg1}, (err, result)=>{
            // if (err) throw err;
            console.log(`result is ${result}`);
            if(result == null){
                DB.collection('team').insertOne(data,function(err, collection){ 
                if (err) throw err; 
                console.log("Record inserted Successfully"); 
                
		    }); 
            }
            else{
                console.log('Duplicate record found');
            }
        });
    });
    




    	
	
		
	return res.redirect('signup_success.html'); 
}) 


app.get('/',function(req,res){ 
    res.render('index2.html');
    
}).listen(port) 



// var user = db.model('user', regSchema);

app.get('/register', (req,res)=>{
    
});
console.log("server listening at port 3000"); 