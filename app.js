const express = require('express');
const bodyParser = require("body-parser");
const path = require('path');


const db = require("./db");
const collection = "todo";
const app = express();


 
app.use(bodyParser.json());

app.get('/getTodos',(req,res)=>{
    
    db.getDB().collection(collection).find({}).toArray((err,documents)=>{
        if(err)
            console.log(err);
        else{
            res.json(documents);
        }
    });
});


db.connect((err)=>{
    
    if(err){
        console.log('unable to connect to database');
        process.exit(1);
    }
    else{
        app.listen(8081,()=>{
            console.log('connected to database, app listening on port 8081');
        });
    }
});
