import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import React, { useState } from 'react';
import styles from './customer.module.css';

export default function Header(props) {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true; //to work with cookie

  const [toggle,setToggle]=useState(false);
  

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
          <Link to="/login" className='text-white px-2' style={{marginLeft:"19pc"}} >Login</Link>
          <Link to="/register" className='text-white' >Register</Link>
        </>
      )

    }
    else {
      return (
        <>
          <div className="btn-group" style={{position:"absolute",marginTop:"-1pc",marginLeft:"12pc"}}>
          <button className="btn btn-danger" onClick={()=>{
                  setToggle(false)
                  props.setIsProfile(!props.isProfile)}} >Profile</button>
            <button type="button" className="btn btn-danger dropdown-toggle" id="dropdown2" onClick={()=>{
              setToggle(!toggle)
            }}></button>
            {toggle ? (
              <div className="dropdown-menu" style={{display:"block",margin:"2.1pc 0pc"}} id="dropdown-menu">
                <button className="dropdown-item"  onClick={()=>{
                  setToggle(false)
                  props.setIsProfile(!props.isProfile)}}>Profile</button>


                <button className="dropdown-item"  onClick={()=>{
                  setToggle(false)
                  props.setIsBookingHistory(!props.isbookingHistory)}}>Booking History</button>

                <Link to="/pscreen" className='dropdown-item' >Private Screen?</Link>
              
            </div>
            ):""}
          </div>

          <button style={{  position: "absolute", marginLeft: "20pc",marginTop:"-1pc",display:"inline", background: "transparent", border: "none", color: "white", textDecoration: "underline" }} onClick={logout}>Logout</button>
      </>
      )
    }
  }
  return (
    <div className={styles.navbar}>
      <nav className={styles.navbar}>
        <img src='/movie_logo.png' alt="movie-logo" width="200px"></img>

        <div className="d-flex px-2" style={{ marginLeft: "18vw", width: "39vw" }}>
          <i className="fa fa-search" aria-hidden="true" style={{ color: "white", padding: "10px", fontSize: "20px", borderRadius: "6px" }}></i>
          <input className="form-control me-2 w-12" type="search" placeholder="Enter Movie Name" value={props.searchData} aria-label="Search" onChange={(e) => { props.setSearchData(e.target.value) }} />
        </div>

        <div>
          {header_content()}
        </div>
      </nav>
    </div>
  )
}
