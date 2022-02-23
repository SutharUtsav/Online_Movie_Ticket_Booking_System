import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import Content from './Content';
import axios from 'axios';
import styles from './customer.module.css'

const Home = () => {

    axios.defaults.withCredentials = true; //to work with cookie

    const [user, setUser] = useState([]);
    const [movies, setMovies] = useState([]);

    const getMovieRequest = async () => {
        const url = 'http://www.omdbapi.com/?s=thor&apikey=4431b341';
        const response = await fetch(url);
        const responseJson = await response.json();

        //console.log(responseJson);
        setMovies(responseJson.Search);
    };

    useEffect(() => {
        getMovieRequest();
        axios.get('http://localhost:3001/api/login').then((response) => {
            if (response.data.loggedIn === true) {
                //console.log(response.data.user)
                setUser(response.data.user)
            }
        })
    }, [])

    return (
    <div className={styles.background}>
        <Header user={user} setUser={setUser}></Header>
        <div className="container-fluid "   >
            <div className="row" style={{ overflowX: 'auto', color: "white" }} >
                <Content movies={movies} />
            </div>
        </div>
        <Footer></Footer>
    </div>);
}

export default Home;