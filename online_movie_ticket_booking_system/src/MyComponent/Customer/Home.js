import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import Content from './Content';
import Slider from '../Slider/Slider';
import axios from 'axios';
import styles from './customer.module.css'

const Home = () => {


    axios.defaults.withCredentials = true; //to work with cookie

    const today = new Date();

    const [user, setUser] = useState([]);
    const [movies, setMovies] = useState([]);

    function getBanners() {
        const banners = [];
        movies.forEach((movie) => {
            if (((parseInt(today.getMonth()) + 1 === parseInt(movie.movie_release_date.substring(5, 7)) | (parseInt(today.getMonth()) + 2 === parseInt(movie.movie_release_date.substring(5, 7)))) & ( parseInt(today.getFullYear()) === parseInt(movie.movie_release_date.substring(0, 4)) ))) {
                banners.push(movie);
            }
            else if( parseInt(today.getFullYear()) - parseInt(movie.movie_release_date.substring(0, 4)) === 1){
                if( parseInt(movie.movie_release_date.substring(5, 7))=== 12 | parseInt(movie.movie_release_date.substring(5, 7))===11){
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
            return () => { isMounted = false };
        }
        catch (error) {
        console.log(error)
    }
}, [])

return (
    <div className={styles.background}>
        <Header user={user} setUser={setUser}></Header>
        <Slider banners={getBanners()} />
        <div className="container-fluid"   >
            <div className="row" style={{ overflowX: 'auto', color: "white",marginLeft:"6pc",marginTop:"3pc" }} >
                <Content movies={movies} />
            </div>
        </div>
        <Footer></Footer>
    </div>);
}

export default Home;