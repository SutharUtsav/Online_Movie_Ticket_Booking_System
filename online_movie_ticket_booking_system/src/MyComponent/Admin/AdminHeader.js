import React from 'react';
import styles from './Admin.module.css';
import axios from 'axios';
// import Profile from './Profile';
import { useNavigate } from "react-router-dom";
//import {WindowDim} from '../Hook/WindowDim';

export default function AdminHeader(props) {

    const navigate = useNavigate();
    
    axios.defaults.withCredentials = true; //to work with cookie

    //const { window_height, window_width } = WindowDim();
    const today = new Date();
    var day = {
        0: "Sunday",
        1: "Monday",
        2: "Tuesday",
        3: "Wednesday",
        4: "Thursday",
        5: "Friday",
        6: "Saturday"
    };
    const today_day = today.getDay()
    const date = `${day[today_day]}, ${today.getDate()} / ${today.getMonth() + 1} / ${today.getFullYear()}`;

    function logout(e) {
        e.preventDefault();
        localStorage.removeItem('token')
        axios.post('http://localhost:3001/api/logout').then((response) => {
            if (response.data.message) {
                alert(response.data.message)
                navigate("/Login");
            }
            else {
                navigate("/");
            }
        })
    }

    return (
        <>
        <div className={styles.header}>
            <div className={styles.left_header}>
                {window.innerWidth > 560 ? <img src='./admin_logo.png' alt="admin-logo" style={{ width: "inherit", height: "inherit", padding: "39px" }}></img>:
                <h5 style={{ width: "inherit", color:"white", height: "inherit", padding: "39px" }} >Welcome Admin!!</h5>}
                
            </div>
            <div className={styles.right_header}>
                <p>{date}</p>
            </div>
            <div style={{ left: "100%" }}>
                <button className={styles.profile_button} onClick={() => { 
                props.setIsProfile(true); 
                }}>Profile<i className="fa fa-user-circle-o mx-1" aria-hidden="true"></i></button>
                <button className={styles.logout} onClick={logout}>Logout <i className="fa fa-sign-out mx-1" aria-hidden="true"></i></button>
            </div>
        </div>

        {/* {profile === true ? <Profile trigger={profile} setTrigger={setProfile}/> : null} */}

        </>

    );
}
