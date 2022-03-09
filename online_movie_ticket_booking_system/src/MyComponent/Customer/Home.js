import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import Content from './Content';
import SliderView from '../Slider/SliderView';
import axios from 'axios';
import styles from './customer.module.css'
import BookShow from '../ShowBooking/BookShow';
import BookingHistory from '../ShowBooking/BookingHistory';

const Home = () => {


    axios.defaults.withCredentials = true; //to work with cookie

    const today = new Date();
    const [searchData, setSearchData] = useState("");
    const [user, setUser] = useState([]);
    const [movies, setMovies] = useState([]);
    const [shows, setShows] = useState([])
    const [isMovieSelected, setIsMovieSelected] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState({})

    const [isProfile, setIsProfile] = useState(false);
    const [isbookingHistory,setIsBookingHistory] = useState(false)

    function getBanners() {
        const banners = []; //upcoming movies in slider
        movies.forEach((movie) => {
            if (((parseInt(today.getMonth()) + 1 === parseInt(movie.movie_release_date.substring(5, 7)) | (parseInt(today.getMonth()) + 2 === parseInt(movie.movie_release_date.substring(5, 7)))) & (parseInt(today.getFullYear()) === parseInt(movie.movie_release_date.substring(0, 4))))) {
                banners.push(movie);
            }
            else if (parseInt(today.getFullYear()) - parseInt(movie.movie_release_date.substring(0, 4)) === 1) {
                if( parseInt(today.getMonth()+1) -(12 - parseInt(movie.movie_release_date.substring(5, 7))) <= 2 ){
                    banners.push(movie)
                }
            }
        })
        return banners;
    }

    const [userId, setUserId] = useState(0);
    const [userName, setUserName] = useState("");
    const [userPhoneNumber, setUserPhoneNumber] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [isChangePassword, setIsChangePassword] = useState(false);
    const [userConfirmPassword, setUserConfirmPassword] = useState("");

    useEffect(() => {

        localStorage.removeItem('selectedSeats')
        localStorage.removeItem('selectedSnacks')
        let isMounted = true; //for cleanup

        try {
            axios.get('http://localhost:3001/api/login').then((response) => {
                if (isMounted) {
                    if (response.data.loggedIn === true) {
                        //console.log(response.data.user)
                        setUser(response.data.user)
                        setUserId(response.data.user.id)
                        setUserName(response.data.user.user_name)
                        setUserEmail(response.data.user.user_email)
                        setUserPhoneNumber(response.data.user.user_phone_number)
                        setUserConfirmPassword("")
                        setUserPassword("")
                    }
                }
            })

            axios.get('http://localhost:3001/api/getMovies').then((response) => {
                if (isMounted) {
                    if (response.data.movies) {
                        setMovies(response.data.movies)
                    }
                }
            })

            axios.get('http://localhost:3001/api/getShows').then((response) => {
                if (isMounted) {
                    setShows(response.data.shows)
                }
            })

            return () => { isMounted = false };
        }
        catch (error) {
            console.log(error)
        }
    }, [])

    function updateCustomer(e) {
        e.preventDefault();
        setUserId(userId)
        try {
            if (userPassword === userConfirmPassword) {
                axios.post('http://localhost:3001/api/updateCustomer', {
                    userid: userId,
                    userName: userName,
                    userPhoneNumber: userPhoneNumber,
                    userEmail: userEmail,
                    userPassword: userPassword,
                }).then((response) => {
                    alert(response.data.message);
                    setIsProfile(false)
                })
            }
            else {
                alert("Both entered passwords doesn's match");
                setUserPassword("")
                setUserConfirmPassword("")
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    return (isProfile ? (
        <div className={styles.background}>
            <Header isProfile={isProfile} setIsProfile={setIsProfile} isbookingHistory={isbookingHistory} setIsBookingHistory={setIsBookingHistory} user={user} setUser={setUser} searchData={searchData} setSearchData={setSearchData}></Header>
            <div className={styles.popup}>
                <div className={styles.popup_inner}>
                    <button className={styles.close_btn} onClick={() => { setIsProfile(false) }}><i className="fa fa-close" style={{ fontSize: "24px" }}></i></button>

                    <div className="container rounded bg-white mt-5 mb-5">
                        <div className="row" style={{ width: "60vw" }}>
                            <div className="col-md-2 border-right">
                                <div className="d-flex flex-column align-items-center text-center p-3 py-5"><img className="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" alt="profile" /><span className="font-weight-bold">Customer</span></div>
                            </div>
                            <div className="col-md-5 border-right">
                                <div className="p-3 py-5">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h4 className="text-right">Update Profile</h4>
                                    </div>
                                    <form onSubmit={updateCustomer}>
                                        <div className="row mt-3">
                                            <div className="col-md-12"><label className="labels">Name</label><input type="text" className="form-control" placeholder="User name" value={userName} onChange={(e) => {
                                                setUserName(e.target.value)
                                            }} required /></div>
                                            <div className="col-md-12"><label className="labels">Mobile Number</label><input type="text" className="form-control" placeholder="Enter Phone Number" value={userPhoneNumber} onChange={(e) => {
                                                setUserPhoneNumber(e.target.value)
                                            }} required /></div>
                                            <div className="col-md-12"><label className="labels">Email</label><input type="email" className="form-control" placeholder="Enter Email Id" value={userEmail} onChange={(e) => {
                                                setUserEmail(e.target.value)
                                            }} required /></div>
                                        </div>
                                        <div className="mt-3 text-center"><button className="btn btn-primary" type="button" onClick={() => {
                                            setIsChangePassword(!isChangePassword)
                                        }}>Change Password?</button></div>
                                        {(isChangePassword) ? (
                                            <>
                                                <div className="col-md-12"><label className="labels">Password</label><input type="password" className="form-control" placeholder="Enter Password" value={userPassword} onChange={(e) => {
                                                    setUserPassword(e.target.value)
                                                }} required /></div>
                                                <div className="col-md-12"><label className="labels">Confirm Password</label><input type="password" className="form-control" placeholder="Re-enter Password" value={userConfirmPassword} onChange={(e) => {
                                                    setUserConfirmPassword(e.target.value)
                                                }} /></div>
                                            </>
                                        ) : ""}
                                        <div className="mt-3 text-center"><input className="btn btn-success" type="submit" value="Save Profile" /></div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <Footer></Footer>
        </div>) : ( 
            isbookingHistory ? (<div className={styles.background}>
            <Header isProfile={isProfile} setIsProfile={setIsProfile} isbookingHistory={isbookingHistory} setIsBookingHistory={setIsBookingHistory} user={user} setUser={setUser} searchData={searchData} setSearchData={setSearchData}></Header>
            <BookingHistory setIsBookingHistory={setIsBookingHistory} user={user} movies={movies} shows={shows}/>
            <Footer></Footer>
            </div>):(
        <div className={styles.background}>
            {!isMovieSelected ? (<>
                <Header isProfile={isProfile} setIsProfile={setIsProfile} isbookingHistory={isbookingHistory} setIsBookingHistory={setIsBookingHistory} user={user} setUser={setUser} searchData={searchData} setSearchData={setSearchData}></Header>
                <SliderView searchData={searchData} banners={getBanners()} />
                <Content searchData={searchData} setSearchData={setSearchData} isMovieSelected={isMovieSelected} selectedMovie={selectedMovie} setSelectedMovie={setSelectedMovie} setIsMovieSelected={setIsMovieSelected} shows={shows} movies={movies} />
            </>) : (<>
                <BookShow user={user} setIsMovieSelected={setIsMovieSelected} shows={shows} selectedMovie={selectedMovie} />
            </>)}
            <Footer></Footer>
        </div>)));
}

export default Home;