import React from 'react';
import styles from './Admin.module.css';
import AdminContentMain from './AdminContentMain';
export default function AdminContent() {
    return (
            <div className={styles.sidenav_container}>
                <button value="0" onClick={()=>{<AdminContentMain selection="0" />}}>Dashboard</button>
                <button value="1" onClick={(e) => {<AdminContentMain selection="1"/>}}>Profile</button>

                {/* <button onClick={() => { selection = 0 }}>Role</button>
                <button onClick={() => { selection = 0 }}>Movie Distributers</button>
                <button onClick={() => { selection = 0 }}>Customer</button>
                <button onClick={() => { selection = 0 }} >Multi Screening</button>
                <button onClick={() => { selection = 0 }}>Snacks</button>
                <button onClick={() => { selection = 0 }}>Private Shows</button> */}
            </div>
    );
}
