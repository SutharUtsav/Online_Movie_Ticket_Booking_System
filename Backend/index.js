const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

const cors = require('cors');
app.use(cors());

app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password1234",
    database: "online_movie_ticket_booking_system",
});

db.connect(function (err) {
    if (err) console.log(err.message);
    else {
        console.log("Connected!");
    }
});

const port = 3001;

//Role
app.get("/api/getRole", (req, res) => {
    var sqlSelect = "SELECT * From role";
    db.query(sqlSelect, (err, result) => {
        if (err)
            console.log(err.message);
        else {
            res.send(result);
        }
    });
})

app.post("/api/insertRole", async (req, res) => {

    let roleTitle = req.body.roleTitle;
    let roleDescription = req.body.roleDescription;
    //console.log(roleTitle,roleDescription);

    var sqlInsert = "INSERT INTO role(role_title,role_description) VALUES(?,?)";
    db.query(sqlInsert, [roleTitle, roleDescription], (err, result) => {
        if (err)
            console.log(err.message);
        else {
            console.log(result);
        }
    });

})

app.delete("/api/deleteRole/:id", async (req, res) => {
    let id = req.params.id;
    
    var sqlDelete = "DELETE FROM role WHERE id=?";
    db.query(sqlDelete, id, (err, result) => {
        if (err)
            console.log(err.message);
        else {
            console.log(result);
        }
    });

})


//Movie Distributer
app.get("/api/getMD", (req, res) => {
    let mD = "Movie Distributer"
    var sqlSelect = `SELECT * FROM user WHERE user_role_id=(
                            SELECT id FROM role WHERE role_title=? )`
    db.query(sqlSelect, mD,(err, result) => {
        if (err)
            console.log(err.message);
        else {
            res.send(result);
        }
    });
})

app.post("/api/insertMD", async (req, res) => {

    let userName = req.body.userName;
    let userPhoneNumber = req.body.userPhoneNumber;
    let userEmail = req.body.userEmail;
    let userPassword = req.body.userPassword;
    let id;
    // console.log(userName,userPhoneNumber,userEmail,userPassword);
    let mD = "Movie Distributer";

    var sqlInsert = `INSERT INTO user SET user_name=?
                                        ,user_role_id = (
                                            SELECT id FROM role WHERE role_title=? 
                                        ),
                                        user_phone_number=?,
                                        user_email=?,
                                        user_password=?`;
    db.query(sqlInsert, [userName,mD,userPhoneNumber,userEmail,userPassword], (err, result) => {
        if (err)
            console.log(err.message);
        else {
            console.log(result);
        }
    });

})

app.delete("/api/deleteMD/:id", async (req, res) => {
    let id = req.params.id;
    
    var sqlDelete = "DELETE FROM user WHERE id=?";
    db.query(sqlDelete, id, (err, result) => {
        if (err)
            console.log(err.message);
        else {
            console.log(result);
        }
    });

})

app.listen(port, function (err) {
    if (err)
        console.log("Error in server setup")
    else
        console.log("Server listening on Port " + port + " \n==> Link http://localhost:3001/ <==");
})