import React, { useState,useEffect } from 'react';
import styles from './Admin.module.css';
import Show from '../Screen/Show';
import axios from 'axios';

const Screen = () => {
    const total_screen = 3;
    //const today = new Date();
    const screens = [];
    let i = 0;
    for (i = 0; i < total_screen; i++) {
        screens.push(i + 1);
    }

    const [selectedScreen, setSelectedScreen] = useState(1);
    const [isAddShow, setIsAddShow] = useState(false);
    const [movies,setMovies]=useState([])

    
    useEffect(() => {
        let isMounted = true; //for cleanup
        try {
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

        <div className={styles.content}>
            <div style={{ display: "flex", justifyContent: "space-evenly", width: "84vw" }}>
                {screens.map((screen, index) => (
                    <button key={index} className='btn btn-outline-light py-2 font-weight-bold col-3' onClick={()=>{
                        setSelectedScreen(screen)
                        setIsAddShow(false)
                    }}>Screen {screen}</button>
                ))}
            </div>   
            <Show screenNo={selectedScreen} movies={movies} isAddShow={isAddShow} setIsAddShow={setIsAddShow} />
        </div>
    )
}


export default Screen;