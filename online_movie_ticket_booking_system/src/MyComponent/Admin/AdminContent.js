import React from 'react';
import styles from './Admin.module.css';
import Profile from './Profile';
import Role from './Role';
import Screen from './Screen';
import { useState, useEffect } from 'react';
import Movie from '../Movie/Movie.js'
import Snacks from '../Snacks/Snack';
import Dashboard from './Dashboard';
import Collection from './Collection';
import Consumer from './Consumer';

export default function AdminContent(props) {

    const [profile, setProfile] = useState(false);
    const [role, setRole] = useState(false);
    const [movie, setMovie] = useState(false);
    const [screen, setScreen] = useState(false);
    const [snacks, setSnacks] = useState(false);
    const [dashboard, setDashboard] = useState(true);
    const [collection, setCollection] = useState(false);
    const [consumer, setConsumer] = useState(false);


    useEffect(() => {
        let isMounted = true; //for cleanup
        if (isMounted) {
            if (props.isProfile === true) {
                setMovie(false);
                setDashboard(false);
                setRole(false);
                setScreen(false);
                setSnacks(false)
                setProfile(true);
            }
        }
        return () => { isMounted = false };
    }, [props.isProfile])

    return (
        < >
            {props.isProfile}
            <div className={styles.sidebar_container}>

                < button className={(dashboard === false) ? styles.navtext : styles.navtext_click}
                    onClick={() => {
                        setRole(false); setScreen(false); setMovie(false); setSnacks(false);setDashboard(true);setCollection(false);setConsumer(false)
                    }}>
                    <span>Dashboard</span>
                </button>

                < button className={(movie === false) ? styles.navtext : styles.navtext_click}
                    onClick={() => {
                        setRole(false); setScreen(false); setMovie(true); setSnacks(false);setDashboard(false);setCollection(false);setConsumer(false)
                    }}>
                    <span>Movie</span>
                </button>

                < button className={(screen === false) ? styles.navtext : styles.navtext_click} onClick={(e) => {
                    setRole(false); setScreen(true); setMovie(false); setSnacks(false);setDashboard(false);setCollection(false);setConsumer(false)
                }}>
                    <span>Screen</span>
                </button>

                < button className={(snacks === false) ? styles.navtext : styles.navtext_click}
                    onClick={() => {
                        setRole(false); setScreen(false); setMovie(false); setSnacks(true);setDashboard(false);setCollection(false);setConsumer(false)
                    }}>
                    <span>Snacks</span>
                </button>

                < button className={(collection === false) ? styles.navtext : styles.navtext_click}
                    onClick={() => {
                        setRole(false); setScreen(false); setMovie(false); setSnacks(false);setDashboard(false);setCollection(true);setConsumer(false)
                    }}>
                    <span>Collection</span>
                </button>

                < button className={(consumer === false) ? styles.navtext : styles.navtext_click}
                    onClick={() => {
                        setRole(false); setScreen(false); setMovie(false); setSnacks(false);setDashboard(false);setCollection(false);setConsumer(true)
                    }}>
                    <span>Customer</span>
                </button>

                < button className={(role === false) ? styles.navtext : styles.navtext_click}
                    onClick={() => {
                        setRole(true); setScreen(false); setMovie(false); setSnacks(false);setDashboard(false);setCollection(false);setConsumer(false)
                    }}>
                    <span>Role</span>
                </button>

            </div >
            {profile === true ? <Profile trigger={props.isProfile} setTrigger={props.setIsProfile} movie={movie} setDashboard={setDashboard} /> : null}
            {role === true ? <Role /> : null}
            {screen === true ? <Screen /> : null}
            {movie === true ? <Movie /> : null}
            {dashboard === true ? <Dashboard />:null}
            {snacks === true ? <Snacks /> : null}
            {collection === true ? <Collection /> : null}
            {consumer ===true ? <Consumer/>: null}

        </>
    );
}
