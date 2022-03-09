import React, { useState, useEffect } from 'react';
import styles from './Admin.module.css';
import axios from 'axios';
// import {useNavigate}  from "react-router-dom";


const Profile = (props) => {
    // const navigate = useNavigate();
    axios.defaults.withCredentials = true; //to work with cookie

    const [userId, setUserId] = useState(0);
    const [userName, setUserName] = useState("");
    const [userPhoneNumber, setUserPhoneNumber] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [isChangePassword, setIsChangePassword] = useState(false);
    const [userConfirmPassword, setUserConfirmPassword] = useState("");

    useEffect(() => {
        let isMounted = true; //for cleanup
        try {
            if (isMounted) {


                axios.get('http://localhost:3001/api/login').then((response) => {
                    if (response.data.loggedIn === true) {
                        setUserId(response.data.user.id)
                        setUserName(response.data.user.user_name)
                        setUserEmail(response.data.user.user_email)
                        setUserPhoneNumber(response.data.user.user_phone_number)
                    }
                    else {
                        alert("You are not logged in...");
                    }
                })
            }
            return () => { isMounted = false };
        }
        catch (error) {
            console.log(error)
        }


    }, [])


    function updateAdmin(e) {
        e.preventDefault();
        try {
            if (userPassword === userConfirmPassword) {
                axios.post('http://localhost:3001/api/updateAdmin', {
                    userid: userId,
                    userName: userName,
                    userPhoneNumber: userPhoneNumber,
                    userEmail: userEmail,
                    userPassword: userPassword,
                }).then((response) => {
                    alert(response.data.message);
                    props.setTrigger(false)
                    props.setMovie(true)
                })
            }
            else {
                alert("Both entered passwords doesn's match");
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    return (props.trigger) ? (
        <div className={styles.content}>
            <div className={styles.popup}>
                <div className={styles.popup_inner}>
                    <button className={styles.close_btn} onClick={() => { props.setTrigger(false); props.setDashboard(true) }}><i className="fa fa-close" style={{ fontSize: "24px" }}></i></button>

                    <div className="container rounded bg-white mt-5 mb-5">
                        <div className="row" style={{ width: "60vw" }}>
                            <div className="col-md-2 border-right">
                                <div className="d-flex flex-column align-items-center text-center p-3 py-5"><img className="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" alt="profile" /><span className="font-weight-bold">Administrator</span></div>
                            </div>
                            <div className="col-md-5 border-right">
                                <div className="p-3 py-5">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h4 className="text-right">Update Profile</h4>
                                    </div>
                                    <form onSubmit={updateAdmin}>
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
            </div >
        </div>) : "";
}

export default Profile;