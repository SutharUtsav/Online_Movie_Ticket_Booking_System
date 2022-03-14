import React, { useState } from 'react';
import styles from './register.module.css';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { authentication } from '../../firebase-config';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";


const Register = () => {
    const navigate = useNavigate();
    var regPhone = /[a-zA-z]/g;

    const [userName, setUserName] = useState("");
    const [userPhoneNumber, setUserPhoneNumber] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [userConfirmPassword, setUserConfirmPassword] = useState("");
    const [OTP, setOTP] = useState("")
    const [isAddButton, setIsAddButton] = useState(false)

    const generateRecaptcha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
            // 'size': 'invisible',
            'callback': (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.

            }
        }, authentication);

    }

    function insertCustomer() {
        axios.post('http://localhost:3001/api/insertCustomer', {
            userName: userName,
            userPhoneNumber: userPhoneNumber,
            userEmail: userEmail,
            userPassword: userPassword,
        }).then((response) => {
            if (response.data.msg) {
                alert(response.data.msg)
                setIsAddButton(false)
                setUserPassword("")
                setUserConfirmPassword("")
            }
            else if (response.data.message) {
                alert(response.data.message)
                localStorage.setItem('token', response.data.token)
                navigate("/")
            }
        })
    }

    const verifyOTP = (e) => {
        let otp = e.target.value;
        setOTP(otp)

        if (otp.length === 6) {
            // console.log(otp)

            let confirmationResult = window.confirmationResult;
            confirmationResult.confirm(otp).then((result) => {
                // User verified successfully.
                const user = result.user;
                alert(user.phoneNumber + "verified successfully")
                insertCustomer()
                // ...
            }).catch((error) => {
                // User couldn't sign in (bad verification code?)
                console.log(error)
            });

        }
    }

    function AddCustomer(e) {
        e.preventDefault();
        if (userPhoneNumber.length !== 10) {
            alert("User's Phone Number must be 10-digit long!!")
            setUserPhoneNumber("")
        }
        else {
            try {
                if (userPassword === userConfirmPassword) {

                    setIsAddButton(true)
                    generateRecaptcha();
                    let number = '+91' + userPhoneNumber;
                    let appVerifier = window.recaptchaVerifier;
                    signInWithPhoneNumber(authentication, number, appVerifier)
                        .then(confirmationResult => {
                            window.confirmationResult = confirmationResult;
                        }).catch((error) => {
                            console.log(error)
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
    }

    return (
        <div className={styles.main}>


            {!isAddButton ? (
                <div className="container" style={{ marginTop: "7%" }}>
                    <div className="row py-5 mt-4 align-items-center">

                        <div className="col-md-5 pr-lg-5 mb-5 mb-md-0">
                            <img src="https://bootstrapious.com/i/snippets/sn-registeration/illustration.svg" alt="" className="img-fluid mb-3 d-none d-md-block" />
                            <h3 style={{ color: "deepskyblue", marginLeft: "8pc" }}>Register with us</h3>
                            <h2 style={{ color: "white", marginLeft: "2pc" }}>ENJOY THE LIFE OF MOVIES</h2>
                        </div>
                        <div className="col-md-7 col-lg-6 ml-auto">
                            <form onSubmit={AddCustomer}>
                                <div className="row">

                                    <div className="input-group col-lg-6 mb-4">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text bg-white px-4 border-md border-right-0" style={{ height: "50px" }} >
                                                <i className="fa fa-user text-muted" ></i>
                                            </span>
                                        </div>
                                        <input id="userName" type="text" name="username" placeholder="User Name" className="form-control bg-white border-left-0 border-md" value={userName} onChange={(e) => {
                                            setUserName(e.target.value);
                                        }} required />
                                    </div>

                                    <div className="input-group col-lg-12 mb-4">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text bg-white px-4 border-md border-right-0" style={{ height: "50px" }}>
                                                <i className="fa fa-envelope text-muted"></i>
                                            </span>
                                        </div>
                                        <input id="email" type="email" name="email" placeholder="Email Address" className="form-control bg-white border-left-0 border-md" value={userEmail} onChange={(e) => {
                                            setUserEmail(e.target.value);
                                        }} required />
                                    </div>


                                    <div className="input-group col-lg-12 mb-4">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text bg-white px-4 border-md border-right-0" style={{ height: "50px" }}>
                                                <i className="fa fa-phone-square text-muted"></i>
                                            </span>
                                        </div>
                                        <select id="countryCode" name="countryCode" style={{ maxWidth: "80px" }} className="custom-select form-control bg-white border-left-0 border-md h-100 font-weight-bold text-muted">
                                            <option value="">+91</option>
                                        </select>
                                        <input id="phoneNumber" type="tel" name="phone" placeholder="Phone Number" className="form-control bg-white border-md border-left-0 pl-3" value={userPhoneNumber} onChange={(e) => {
                                            if (e.target.value.length > 10) {
                                                alert("User's Phone Number must be 10-digit long!!")
                                                e.target.value("")
                                                setUserPhoneNumber("");
                                            }
                                            if (regPhone.test(e.target.value)) {
                                                alert("Phone Number can't contail letters")
                                                e.target.value("")
                                                setUserPhoneNumber("");
                                            }
                                            else {
                                                setUserPhoneNumber(e.target.value);
                                            }

                                        }} required />
                                    </div>

                                    <div className="input-group col-lg-6 mb-4">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text bg-white px-4 border-md border-right-0" style={{ height: "50px" }}>
                                                <i className="fa fa-lock text-muted"></i>
                                            </span>
                                        </div>
                                        <input id="password" type="password" name="password" placeholder="Password" className="form-control bg-white border-left-0 border-md" value={userPassword} onChange={(e) => {
                                            setUserPassword(e.target.value);
                                        }} required />
                                    </div>


                                    <div className="input-group col-lg-6 mb-4">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text bg-white px-4 border-md border-right-0" style={{ height: "50px" }}>
                                                <i className="fa fa-lock text-muted"></i>
                                            </span>
                                        </div>
                                        <input id="passwordConfirmation" type="password" name="passwordConfirmation" placeholder="Confirm Password" className="form-control bg-white border-left-0 border-md" value={userConfirmPassword} onChange={(e) => {
                                            setUserConfirmPassword(e.target.value);
                                        }} required />
                                    </div>

                                    <div className="form-group col-lg-12 mx-auto mb-0">
                                        <button className="btn btn-outline-info py-2 font-weight-bold d-grid col-6 mx-auto" >Register</button>

                                    </div>

                                    <div className="form-group col-lg-12 mx-auto d-flex align-items-center my-4">
                                        <div className="border-bottom w-100 ml-5"></div>
                                        <span className="px-2 small text-muted font-weight-bold text-muted">OR</span>
                                        <div className="border-bottom w-100 mr-5"></div>
                                    </div>


                                    <div className="text-center w-100">
                                        <p className="text-muted font-weight-bold">Already Registered? <Link to="/login" className="text-primary ml-2">Sign In</Link></p>
                                    </div>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            ) : (
                
                        <div className="container" style={{ marginTop: "7%",width:"45%" }}>
                            <center><h2 style={{color:"white"}}>Verify OTP</h2></center>
                            <div className="row py-5 mt-4 align-items-center">
                                <div className="input-group col-lg-12 mb-4">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text bg-white px-4 border-md border-right-0" style={{ height: "50px" }}>
                                            <i className="fa fa-phone-square text-muted"></i>
                                        </span>
                                    </div>
                                    <input id="OTP" type="number" name="OTP" placeholder="Enter OTP" className="form-control bg-white border-md border-left-0 pl-3" value={OTP} onChange={(e) => { verifyOTP(e) }} />
                                </div>
                            </div>
                        </div>
                    
            )
            }
            
            
            <div id="recaptcha-container" style={{marginLeft :"38%"}}></div>
        </div >
    )
}

export default Register;