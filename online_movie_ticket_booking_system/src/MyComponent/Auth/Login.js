import React, { useState } from 'react';
import styles from './register.module.css';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';


const Login = () => {

    const navigate = useNavigate();

    axios.defaults.withCredentials = true; //to work with cookie

    const [userName, setUserName] = useState("");
    const [userPassword, setUserPassword] = useState("");
    
    function login(e) {
        e.preventDefault();
        try {
            axios.post('http://localhost:3001/api/login', {
                userName: userName,
                userPassword: userPassword,
            }).then((response) => {
                //console.log(response)
                if (response.data.message) {
                    alert(response.data.message)
                    setUserPassword("");
                } else {
                    localStorage.setItem('token',response.data.token)
                    if (response.data.loginAs === "Customer") {
                        navigate("/");
                    }
                    else if (response.data.loginAs === "Administrator") {
                        navigate("/Admin");
                    }
                }
            })
        }
        catch (error) {
            console.log(error)
        }
    }

    // useEffect(() => {
    //     axios.get('http://localhost:3001/api/login').then((response) => {
    //         if (response.data.loggedIn === true) {
    //             // setLoginAs(response.data.roleAs);
    //             alert("You are already logged in");
    //         }
    //     })
    // }, [])

    return (

        <div className={styles.main}>            
            <div className="container" style={{ marginTop: "7%" }}>
                <div className="row align-items-center" style={{ justifyContent: "center" }}>
                    
                    <div className="col-md-7 col-lg-6 ml-auto">
                        <form onSubmit={login} >
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

                                <div className="form-group col-lg-12 mx-auto mb-0">
                                    <input type="submit" className="btn btn-outline-info py-2 font-weight-bold d-grid col-6 mx-auto" value="Sign In" />
                                </div>

                                <div className="form-group col-lg-12 mx-auto d-flex align-items-center my-4">
                                    <div className="border-bottom w-100 ml-5"></div>
                                    <span className="px-2 small text-muted font-weight-bold text-muted">OR</span>
                                    <div className="border-bottom w-100 mr-5"></div>
                                </div>


                                <div className="text-center w-100">
                                    <p className="text-muted font-weight-bold">Already Registered? <Link to="/register" className="text-primary ml-2">Sign Up</Link></p>
                                </div>


                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Login;