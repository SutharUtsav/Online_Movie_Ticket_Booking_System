const express = require("express");
const app = express();
const mysql = require("mysql");

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"password1234",
    database:"online_movie_ticket_booking_system",   
});

db.connect(function(err){
    if(err) console.log(err.message);
    else{
        console.log("Connected!");
    }
});

const port = 3001;

app.get("/",(req,res)=>{
    // var sqlInsert = "INSERT INTO role(role_title,role_description) VALUES('admin','Administratior')";
    // db.query(sqlInsert,(err,result)=>{
    //     if(err) 
    //         console.log(err.message);
    //     res.send("Inserted");
    // });
    
})

app.listen(port, function(err) {
    if (err)
        console.log("Error in server setup")
    else
        console.log("Server listening on Port "+port+" \n==> Link http://localhost:3001/ <==");
})