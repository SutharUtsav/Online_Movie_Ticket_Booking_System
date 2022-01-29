import React from 'react';
import styles from './Admin.module.css';
import Dashboard from './Dashboard';
import Profile from './Profile';
import Role from './Role';
import MovieDistributer from './MovieDistributer';
import Screen from './Screen';
import { useState } from 'react';

export default function AdminContent() {

    const [dashboard, setDashboard] = useState(true);
    const [profile, setProfile] = useState(false);
    const [role,setRole] = useState(false);
    const [MD,setMD] = useState(false);
    const [screen,setScreen] = useState(false);

    return (
        < >
        <div className={styles.sidenav_container}>
            
            < button className={styles.navtext} onClick={() => { 
                setDashboard(true); setProfile(false);  setRole(false);setScreen(false);
                }}>
                <span>Dashboard</span>
            </button>

            < button className={styles.navtext} onClick={() => { 
                setProfile(true); setDashboard(false); setRole(false); setMD(false);setScreen(false);
                }}>
                <span>Profile</span>
            </button>

            < button className={styles.navtext} 
            onClick={() => { 
                setProfile(false); setDashboard(false); setRole(true); setMD(false);setScreen(false);
                }}>
                <span>Role</span>
            </button>
            < button className={styles.navtext} onClick={() => { 
                setProfile(false); setDashboard(false); setRole(false); setMD(true);setScreen(false);
                }}>
                <span>Movie Distributer</span>
            </button>
            < button className={styles.navtext} onClick={() => { 
                setProfile(false); setDashboard(false); setRole(false); setMD(false);setScreen(true);
                }}>
                <span>Screen</span>
            </button>

        </div >
            {dashboard === true ? <Dashboard /> : null}
            {profile === true ? <Profile /> : null}
            {role === true ? <Role /> : null }
            {MD === true ? <MovieDistributer/> : null}
            {screen === true ? <Screen/> : null}
        </>
    );
}
