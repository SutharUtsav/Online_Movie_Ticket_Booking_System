import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
// import React, { useState, useEffect } from 'react';
import styles from './customer.module.css';

export default function Header(props) {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true; //to work with cookie

  function logout(e) {
    e.preventDefault();
    axios.post('http://localhost:3001/api/logout').then((response) => {
      if (response.data.message) {
        alert(response.data.message)
        navigate("/Login");
      }
      else {
        props.setUser([])
        navigate("/")
      }
    })
  }

  function header_content() {
    if (props.user.length === 0) {
      return (
        <>
          <Link to="/login" className='text-white ml-2 px-2' >Login</Link>
          <Link to="/register" className='text-white ml-10 ' >Register</Link>
        </>
      )

    }
    else {
      return (
        <>
          {/* <h1 style={{ color: "wheat" }} >Welcome {props.user.user_name}!!</h1> */}
          <button style={{right:"0px",position:"fixed",marginRight:"55px", background: "transparent", border: "none", color: "white", textDecoration: "underline" }} onClick={logout}>Logout</button>
        </>
      )
    }
  }
  return (
    <div className={styles.navbar}>
      <nav className={styles.navbar}>
        <img src='/movie_logo.png' alt="movie-logo" style={{height:"inherit"}}></img>
    
        <form className="d-flex px-2" style={{marginLeft:"13vw",width:"39vw"}}>
          <input className="form-control me-2 w-12" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-success" type="submit">Search</button>
        </form>

        <div style={{right:"0px",position:"fixed",marginRight:"55px"}}>
          {header_content()}
        </div>
      </nav>
    </div>
  )
}
