import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';
import Content from './Content';
import Slider from '../Slider/Slider';
import axios from 'axios';
import styles from './customer.module.css'
import BookShow from '../ShowBooking/BookShow';

const Home = () => {


    axios.defaults.withCredentials = true; //to work with cookie

    const today = new Date();

    const [user, setUser] = useState([]);
    const [movies, setMovies] = useState([]);
    const [shows, setShows] = useState([])
    const [isMovieSelected, setIsMovieSelected] = useState(false);
    const [selectedMovie,setSelectedMovie]=useState({})

    function getBanners() {
        const banners = [];
        movies.forEach((movie) => {
            if (((parseInt(today.getMonth()) + 1 === parseInt(movie.movie_release_date.substring(5, 7)) | (parseInt(today.getMonth()) + 2 === parseInt(movie.movie_release_date.substring(5, 7)))) & (parseInt(today.getFullYear()) === parseInt(movie.movie_release_date.substring(0, 4))))) {
                banners.push(movie);
            }
            else if (parseInt(today.getFullYear()) - parseInt(movie.movie_release_date.substring(0, 4)) === 1) {
                if (parseInt(movie.movie_release_date.substring(5, 7)) === 12 | parseInt(movie.movie_release_date.substring(5, 7)) === 11) {
                    banners.push(movie)
                }
            }
        })
        return banners;
    }

    useEffect(() => {
        let isMounted = true; //for cleanup

        try {
            axios.get('http://localhost:3001/api/login').then((response) => {
                if (isMounted) {
                    if (response.data.loggedIn === true) {
                        //console.log(response.data.user)
                        setUser(response.data.user)
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

    return (
        <div className={styles.background}>
            {!isMovieSelected ? (<>
                <Header user={user} setUser={setUser}></Header>
                <Link to="/pscreen" className='text-white ml-2' style={{position:"absolute",margin:"2pc"}} >Private Screen?</Link>
                <Slider banners={getBanners()} />
                <div className="container-fluid"   >
                    <div className="row" style={{ overflowX: 'auto', color: "white", marginLeft: "6pc", marginTop: "3pc" }} >
                        <Content isMovieSelected={isMovieSelected} selectedMovie={selectedMovie} setSelectedMovie={setSelectedMovie} setIsMovieSelected={setIsMovieSelected} shows={shows} movies={movies} />
                    </div>
                </div>
                
            </>) : (<>
            <BookShow setIsMovieSelected={setIsMovieSelected} shows={shows} selectedMovie={selectedMovie}/>
            </>)}
            <Footer></Footer>
        </div>);
}

export default Home;