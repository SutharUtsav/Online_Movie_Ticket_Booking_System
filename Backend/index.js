const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

app.use(bodyParser.urlencoded({ extended: true }));

const cors = require('cors');
app.use(cors({
    origin: ["http://localhost:3000"],
    method: ["GET", "POST"],
    credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({
    key: "user",
    secret: "online_movie_ticket_booking_system",
    resave: false,
    saveUninitialized: false,
    cookie: {
        express: 60 * 60 * 24,
    },
}))

const bcrypt = require('bcrypt');
const { response } = require("express");
const e = require("express");
const saltRounds = 10;

const jwt = require('jsonwebtoken')

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

//Administrator

app.post("/api/updateAdmin", async (req, res) => {

    let userName = req.body.userName;
    let userPhoneNumber = req.body.userPhoneNumber;
    let userEmail = req.body.userEmail;
    let userPassword = req.body.userPassword;
    let id = req.body.userid;
    // console.log(userName,userPhoneNumber,userEmail,userPassword);
    var sqlInsert;

    let admin = "Administrator";
    if (userPassword == "") {
        sqlInsert = `UPDATE user SET user_name=?
                                    ,user_role_id = (
                                        SELECT id FROM role WHERE role_title=? 
                                    ),
                                    user_phone_number=?,
                                    user_email=? WHERE id=?`;
        db.query(sqlInsert, [userName, admin, userPhoneNumber, userEmail, id], (err, result) => {
            if (err)
                console.log(err);
            else {
                res.send({ message: "Administrator is successfully updated" })
            }
        });
    }
    else {
        bcrypt.hash(userPassword, saltRounds, (err, hash) => {
            if (err) {
                console.log(err)
            }

            sqlInsert = `UPDATE user SET user_name=?
                                        ,user_role_id = (
                                            SELECT id FROM role WHERE role_title=? 
                                        ),
                                        user_phone_number=?,
                                        user_email=?,
                                        user_password=? WHERE id=?`;
            db.query(sqlInsert, [userName, admin, userPhoneNumber, userEmail, hash, id], (err, result) => {
                if (err)
                    console.log(err);
                else {
                    res.send({ message: "Administrator is successfully updated" })
                }
            });

        })
    }

})

//customer
app.post("/api/insertCustomer", async (req, res) => {

    let userName = req.body.userName;
    let userPhoneNumber = req.body.userPhoneNumber;
    let userEmail = req.body.userEmail;
    let userPassword = req.body.userPassword;

    db.query("SELECT * FROM user WHERE user_phone_number=?", userPhoneNumber, (error, response) => {
        if (error) {
            console.log(error)
        }
        if (response.length > 0) {
            res.send({ msg: "You are already registered by this Number" })
        }
        else {
            bcrypt.hash(userPassword, saltRounds, (err, hash) => {
                if (err) {
                    console.log(err)
                }
                let cs = "Customer";

                var sqlInsert = `INSERT INTO user SET user_name=?
                                                ,user_role_id = (
                                                    SELECT id FROM role WHERE role_title=? 
                                                ),
                                                user_phone_number=?,
                                                user_email=?,
                                                user_password=?`;
                db.query(sqlInsert, [userName, cs, userPhoneNumber, userEmail, hash], (err, result) => {
                    if (err)
                        console.log(err.message);
                    else if (result) {
                        db.query("SELECT * FROM user WHERE user_name=? AND user_phone_number=? AND user_password=?", [userName, userPhoneNumber, hash], (er, resp) => {
                            if (er) {
                                console.log(er)
                            }
                            if (resp.length > 0) {
                                const id = resp[0].id
                                const token = jwt.sign({ id }, "jwtSecret", {
                                    expiresIn: 300,
                                })
                                req.session.user = resp[0];
                                res.send({ token: token, user: resp[0], message: "You are successfully registered" })
                            }
                        })
                    }
                });
            })
        }
    })
})

app.post("/api/updateCustomer", async (req, res) => {

    let userName = req.body.userName;
    let userPhoneNumber = req.body.userPhoneNumber;
    let userEmail = req.body.userEmail;
    let userPassword = req.body.userPassword;
    let id = req.body.userid;
    // console.log(userName,userPhoneNumber,userEmail,userPassword);
    var sqlInsert;

    let admin = "Customer";
    if (userPassword == "") {
        sqlInsert = `UPDATE user SET user_name=?
                                    ,user_role_id = (
                                        SELECT id FROM role WHERE role_title=? 
                                    ),
                                    user_phone_number=?,
                                    user_email=? WHERE id=?`;
        db.query(sqlInsert, [userName, admin, userPhoneNumber, userEmail, id], (err, result) => {
            if (err)
                console.log(err);
            else {
                res.send({ message: "Customer is successfully updated" })
            }
        });
    }
    else {
        bcrypt.hash(userPassword, saltRounds, (err, hash) => {
            if (err) {
                console.log(err)
            }

            sqlInsert = `UPDATE user SET user_name=?
                                        ,user_role_id = (
                                            SELECT id FROM role WHERE role_title=? 
                                        ),
                                        user_phone_number=?,
                                        user_email=?,
                                        user_password=? WHERE id=?`;
            db.query(sqlInsert, [userName, admin, userPhoneNumber, userEmail, hash, id], (err, result) => {
                if (err)
                    console.log(err);
                else {
                    res.send({ message: "Administrator is successfully updated" })
                }
            });

        })
    }

})

//authentication

const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-tokens"]
    if (!token) {
        res.send("We need token")
    } else {
        jwt.verify(token, "jwtSecret", (err, decoded) => {
            if (err) {
                res.json({ isLoggedin: false, message: "Failed to authenticate" })
            }
            else {
                req.userId = decoded.id;
                next();
            }
        })
    }
}
app.get('/api/isUserAuth', verifyJWT, (req, res) => {
    res.send({isLoggedin:true,message:"You are already logged in!!"})
})

//login
app.get("/api/login", async (req, res) => {
    if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user })
    }
    else {
        res.send({ loggedIn: false })
    }
})

app.post("/api/login", async (req, res) => {
    let userName = req.body.userName;
    let userPassword = req.body.userPassword;

    var sqlFind = `SELECT * FROM user WHERE user_name=?`
    db.query(sqlFind, userName, (err, result) => {
        if (err) {
            res.send({ err: err })
        }

        if (result.length > 0) {
            result.forEach((r) => {
                if (userPassword == r.user_password) {
                    //admin tries to login

                    const id = r.id
                    const token = jwt.sign({ id }, "jwtSecret", {
                        expiresIn: 300,

                    })
                    req.session.user = r;
                    res.send({ auth: true, token: token, user: r, loginAs: "Administrator" });
                }
                else {
                    bcrypt.compare(userPassword, r.user_password, (error, response) => {
                        if (error) {
                            console.log(error)
                        }
                        if (response) {
                            db.query("SELECT * FROM role WHERE id=?", r.user_role_id, (er, rsp) => {
                                if (er) {
                                    console.log(er)
                                }
                                if (rsp[0].role_title === "Administrator") {

                                    const id = r.id
                                    const token = jwt.sign({ id }, "jwtSecret", {
                                        expiresIn: 300,

                                    })
                                    req.session.user = r;

                                    res.send({ auth: true, token: token, user: r, loginAs: "Administrator" });
                                }
                                else if (rsp[0].role_title === "Customer") {
                                    const id = r.id
                                    const token = jwt.sign({ id }, "jwtSecret", {
                                        expiresIn: 300,

                                    })
                                    req.session.user = r;
                                    res.send({ auth: true, token: token, user: r, loginAs: "Customer" });
                                }
                            })

                            //console.log(req.session.user)
                        }
                        else {
                            res.send({ message: "Wrong username or password!" })
                        }
                    })
                }
            });
        }
        else {
            res.send({ message: "User doesn't exist" });
        }
    })
})

//logout
app.post("/api/logout", async (req, res) => {
    if (req.session.user) {
        res.clearCookie("user");
        res.end()
    }
    else {
        res.send({ message: "You are not logged in!!" })
    }
})


//Movie

app.get("/api/getMovies", async (req, res) => {
    var sqlGet = 'SELECT * FROM movie';
    db.query(sqlGet, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send({ movies: result })
        }
    })
})


app.post("/api/insertMovie", async (req, res) => {

    let movieName = req.body.movieName;
    let movieLanguage = req.body.movieLanguage;
    let movieGenre = req.body.movieGenre;
    let movieTrailerLink = req.body.movieTrailerLink;
    let movieReleaseDate = req.body.movieReleaseDate;
    let movieHours = req.body.movieHours;
    let movieBanner = req.body.movieBanner;
    let movieImage = req.body.movieImage;
    let movieDescription = req.body.movieDescription;

    //console.log(movieName, movieLanguage, movieGenre, movieTrailerLink, movieReleaseDate, movieHours, movieBanner);

    var sqlInsert = `INSERT INTO movie SET movie_name=?,
                                                movie_language=?,
                                                movie_genre=?,
                                                movie_trailer_link=?,
                                                movie_release_date=?,
                                                movie_hours=?,
                                                movie_banner=?,
                                                movie_image=?,
                                                movie_description=?`;
    db.query(sqlInsert, [movieName, movieLanguage, movieGenre, movieTrailerLink, movieReleaseDate, movieHours, movieBanner, movieImage, movieDescription], (err, result) => {
        if (err)
            console.log(err.message);
        else if (result) {
            res.send({ message: "Movie is successfully inserted" })
        }
    })
})


app.post("/api/updateMovie", async (req, res) => {
    let id = req.body.movieId;
    let movieName = req.body.movieName;
    let movieLanguage = req.body.movieLanguage;
    let movieGenre = req.body.movieGenre;
    let movieTrailerLink = req.body.movieTrailerLink;
    let movieReleaseDate = req.body.movieReleaseDate;
    let movieHours = req.body.movieHours;
    let movieBanner = req.body.movieBanner;
    let movieImage = req.body.movieImage;
    let movieDescription = req.body.movieDescription;

    //console.log(movieName, movieLanguage, movieGenre, movieTrailerLink, movieReleaseDate, movieHours, movieBanner);

    var sqlUpdate = `UPDATE movie SET movie_name=?,
                                                movie_language=?,
                                                movie_genre=?,
                                                movie_trailer_link=?,
                                                movie_release_date=?,
                                                movie_hours=?,
                                                movie_banner=?,
                                                movie_image=?,
                                                movie_description=? WHERE id=?`;
    db.query(sqlUpdate, [movieName, movieLanguage, movieGenre, movieTrailerLink, movieReleaseDate, movieHours, movieBanner, movieImage, movieDescription, id], (err, result) => {
        if (err)
            console.log(err.message);
        else if (result) {
            res.send({ message: "Movie is successfully updated" })
        }
    })
})


app.delete("/api/deleteMovie/:id", async (req, res) => {
    let id = req.params.id;

    var sqlDelete = "DELETE FROM movie WHERE id=?";
    db.query(sqlDelete, id, (err, result) => {
        if (err)
            console.log(err);
        else if (result) {
            res.send({ message: "Movie Deleted Successfully" })
        }
    });

})



//Screen

app.post("/api/insertShow", async (req, res) => {
    let movieId = req.body.movieId;
    let showstartTime = req.body.showStartTime;
    let showEndtime = req.body.showEndtime;
    let privateScreen = req.body.privateScreen;
    let screenNo = req.body.screenNo;

    console.log(showstartTime, showEndtime)
    var sqlInsert = `INSERT INTO screen SET screen_movie_id=?,
            screen_show_start_time=?,
            screen_show_end_time=?,
            private_screen_booking=?,
            screen_no=?`;
    db.query(sqlInsert, [movieId, showstartTime, showEndtime, privateScreen, screenNo], (err, result) => {
        if (err)
            console.log(err.message);
        else if (result) {
            res.send({ success: "Show is successfully Added" })
        }
    })
})

app.get("/api/getShows", async (req, res) => {
    let screenNo = req.body.screenNo;
    //console.log(screenNo)
    var sqlSelect = `SELECT * FROM screen`;
    db.query(sqlSelect, screenNo, (err, result) => {
        if (err) {
            console.log(err);
        }
        else if (result) {
            res.send({ shows: result })
        }
    })
})

app.delete("/api/deleteShow/:id", async (req, res) => {
    let id = req.params.id;

    var sqlDelete = "DELETE FROM screen WHERE id=?";
    db.query(sqlDelete, id, (err, result) => {
        if (err)
            console.log(err);
        else {
            res.send({ message: "Successfully deleted a Show" })
        }
    });

})


app.post("/api/updateShow", async (req, res) => {
    let id = req.body.showid;
    let movieId = req.body.movieId;
    let showstartTime = req.body.showStartTime;
    let showEndtime = req.body.showEndtime;
    let privateScreen = req.body.privateScreen;
    let screenNo = req.body.screenNo;

    var sqlUpdate = `UPDATE screen SET screen_movie_id=?,
                                    screen_show_start_time=?,
                                    screen_show_end_time=?,
                                    private_screen_booking=?,
                                    screen_no=? WHERE id=?`;
    db.query(sqlUpdate, [movieId, showstartTime, showEndtime, privateScreen, screenNo, id], (err, result) => {
        if (err)
            console.log(err.message);
        else if (result) {
            res.send({ message: "Movie is successfully updated" })
        }
    })
})

//Seats
app.get("/api/getSeats", async (req, res) => {
    var sqlSelect = `SELECT * FROM seat`;
    db.query(sqlSelect, (err, result) => {
        if (err) {
            console.log(err);
        }
        else if (result.length > 0) {
            res.send({ seats: result })
        }
    })
})

//Snack

app.get("/api/getSnack", async (req, res) => {
    var sqlGet = 'SELECT * FROM snack';
    db.query(sqlGet, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send({ snacks: result })
        }
    })
})

app.post("/api/insertSnack", async (req, res) => {

    let snackAmount = req.body.snackAmount;
    let snackType = req.body.snackType;
    let snackDescription = req.body.snackDescription;
    let snackOffer = req.body.snackOffer;
    let snackImage = req.body.snackImage;


    //console.log(movieName, movieLanguage, movieGenre, movieTrailerLink, movieReleaseDate, movieHours, movieBanner);

    var sqlInsert = `INSERT INTO snack SET snack_amount=?,
                                                snack_type=?,
                                                snack_description=?,
                                                snack_offer=?,
                                                snack_image=?`;
    db.query(sqlInsert, [snackAmount, snackType, snackDescription, snackOffer, snackImage], (err, result) => {
        if (err)
            console.log(err.message);
        else if (result) {
            res.send({ message: "snack is successfully inserted" })
        }
    })
})


app.post("/api/updateSnack", async (req, res) => {
    let id = req.body.snackId;

    let snackAmount = req.body.snackAmount;
    let snackType = req.body.snackType;
    let snackDescription = req.body.snackDescription;
    let snackOffer = req.body.snackOffer;
    let snackImage = req.body.snackImage;


    //console.log(movieName, movieLanguage, movieGenre, movieTrailerLink, movieReleaseDate, movieHours, movieBanner);

    var sqlUpdate = `UPDATE snack SET snack_amount=?,
                                                snack_type=?,
                                                snack_description=?,
                                                snack_offer=?,
                                                snack_image=? WHERE id=?`;
    db.query(sqlUpdate, [snackAmount, snackType, snackDescription, snackOffer, snackImage, id], (err, result) => {
        if (err)
            console.log(err.message);
        else if (result) {
            res.send({ message: "snack is successfully updated" })
        }
    })
})


app.delete("/api/deleteSnack/:id", async (req, res) => {
    let id = req.params.id;

    var sqlDelete = "DELETE FROM snack WHERE id=?";
    db.query(sqlDelete, id, (err, result) => {
        if (err)
            console.log(err);
        else if (result) {
            res.send({ message: "snack Deleted Successfully" })
        }
    });

})

//Booking
app.post("/api/insertBooking", async (req, res) => {

    let movieId = req.body.movieId;
    let showId = req.body.showId;
    let userId = req.body.userId;
    let seats = req.body.seats;
    let bookingDate = req.body.bookingDate;
    let snacks = req.body.snacks;
    let price = req.body.price;
    let payment_status = true;

    // console.log(movieId)
    // console.log(showId)
    // console.log(userId)
    // console.log(seats)
    // console.log(bookingDate)
    // console.log(snacks)
    // console.log(price)

    var sqlInsert = `INSERT INTO booking SET booking_movie_id=?,
                                                booking_screen_id=?,
                                                booking_user_id=?,
                                                booking_date=?,
                                                booking_snacks=?,
                                                booking_price=?,
                                                booking_payment_status=?`;

    db.query(sqlInsert, [movieId, showId, userId, bookingDate, snacks, price, payment_status], (err, result) => {
        if (err)
            console.log(err.message);
        else if (result) {
            var sqlGet = `SELECT * FROM booking WHERE booking_movie_id=? AND
                                                      booking_screen_id=? AND
                                                      booking_user_id=? AND
                                                      booking_date=? AND
                                                      booking_snacks=? AND
                                                      booking_price=? AND
                                                      booking_payment_status=?`;

            db.query(sqlGet, [movieId, showId, userId, bookingDate, snacks, price, payment_status], (error, result) => {
                if (error) {
                    console.log(error);
                }
                else {
                    var status = true;
                    seats.forEach((seat) => {
                        var insert = `INSERT INTO seat SET seat_price=?,
                                                            seat_show_id=?,
                                                            seat_type=?,
                                                            seat_booking_id=?`;
                        db.query(insert, [seat.seat_price, showId, seat.seat_type, result[0].id], (err, resp) => {
                            if (err) {
                                status = false;
                                console.log(err)
                            }
                        })
                    })
                    if (status) {
                        res.send({ message: "Succesfully Booked Your Ticket" })
                    }
                }
            })
        }
    })
})

//Booking
app.get("/api/getBooking", async (req, res) => {
    var sqlGet = 'SELECT * FROM booking';
    db.query(sqlGet, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send({ booking: result })
        }
    })
})

app.delete("/api/deleteBooking/:id", async (req, res) => {
    let id = req.params.id;

    var sqlDelete = "DELETE FROM booking WHERE id=?";
    db.query(sqlDelete, id, (err, result) => {
        if (err)
            console.log(err.message);
        else {
            res.send({ message: "Successfully cancel your booking" })
        }
    });

})

app.listen(port, function (err) {
    if (err)
        console.log("Error in server setup")
    else
        console.log("Server listening on Port " + port + " \n==> Link http://localhost:3001/ <==");
})