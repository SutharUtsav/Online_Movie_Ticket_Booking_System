import React from 'react';
import styles from './Admin.module.css';
import Profile from './Profile';
import Role from './Role';
import Screen from './Screen';
import { useState, useEffect } from 'react';
import Movie from './Movie';
import Snacks from './Snacks';

export default function AdminContent(props) {

    const [profile, setProfile] = useState(false);
    const [role, setRole] = useState(false);
    const [movie, setMovie] = useState(true);
    const [screen, setScreen] = useState(false);
    const [snacks,setSnacks] = useState(false);

    useEffect(() => {
        if (props.isProfile === true) {
            setMovie(false);
            setRole(false);
            setScreen(false);
            setProfile(true);
        }
    },[props.isProfile])

    return (
        < >
            {props.isProfile}
            <div className={styles.sidebar_container}>

                < button className={(movie === false) ? styles.navtext : styles.navtext_click}
                    onClick={() => {
                        setRole(false); setScreen(false); setMovie(true);setSnacks(false);
                    }}>
                    <span>Movie</span>
                </button>

                < button className={(screen === false) ? styles.navtext : styles.navtext_click} onClick={(e) => {
                    setRole(false); setScreen(true); setMovie(false);setSnacks(false);
                }}>
                    <span>Screen</span>
                </button>

                < button className={(snacks === false) ? styles.navtext : styles.navtext_click}
                    onClick={() => {
                        setRole(false); setScreen(false); setMovie(false);setSnacks(true);
                    }}>
                    <span>Snacks</span>
                </button>

                < button className={(role === false) ? styles.navtext : styles.navtext_click}
                    onClick={() => {
                        setRole(true); setScreen(false); setMovie(false);setSnacks(false);
                    }}>
                    <span>Role</span>
                </button>

            </div >
            {profile === true ? <Profile trigger={props.isProfile} setTrigger={props.setIsProfile} setMovie={setMovie} /> : null}
            {role === true ? <Role /> : null}
            {screen === true ? <Screen /> : null}
            {movie === true ? <Movie /> : null}
            {snacks === true? <Snacks />:null}

        </>
    );
}
