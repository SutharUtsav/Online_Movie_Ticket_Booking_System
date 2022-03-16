import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import React from 'react';
import styles from './customer.module.css';
import useWindowDimensions from "../useWindowDimensions";

export default function Header(props) {

  const {height,width}=useWindowDimensions();
  
  const navigate = useNavigate();
  axios.defaults.withCredentials = true; //to work with cookie

  function logout(e) {
    localStorage.removeItem('token')
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
          <Link to="/login" className='text-white px-2' style={ width >=768 ? { marginLeft: "19pc" } :{}} >Login</Link>
          <Link to="/register" className='text-white' style={{marginRight:"7px"}} >Register</Link>
        </>
      )

    }
    else {
      return (
        <>
          <div className="btn-group" style={width>=768 ? { alignItems: "baseline", color: "white",marginLeft:"4pc" }:{alignItems: "baseline", color: "white"}}>
            <button className="m-1 " style={{ color: "white", background: "none", border: "none" }} onClick={() => {
              props.setIsProfile(!props.isProfile)
            }} ><i className="fa fa-user-circle-o mx-1" aria-hidden="true"></i> { width >=1024 ? "Profile" : ""}</button>
            <button className="m-1" style={{ color: "white", background: "none", border: "none" }} onClick={() => {
              props.setIsBookingHistory(!props.isbookingHistory)
            }} ><i className="fa fa-list mx-1" aria-hidden="true"></i>{ width >=1024 ? "My Bookings" : ""}</button>

            {width>=1024 ? <p className="m-1">Welcome ! {props.user.user_name}</p> :"" }
            <button className="btn btn-danger m-2" style={{ borderRadius: "19px" }} onClick={logout}><i className="fa fa-sign-out mx-1" aria-hidden="true"></i>{ width >=1024 ? "Logout" : ""}</button>

          </div>


        </>
      )
    }
  }
  
  return (
    <div className={styles.navbar} style={width>=435 && width<=1024 ? {display:"inline-block"}:{}}>
      <nav className={styles.navbar}>

        <div className="d-flex" style={{ width: "100%" }}>
          <img src='/movie_logo_13.png' alt="movie-logo" width="15%" className="bg-red" ></img>
          <i className="fa fa-search" aria-hidden="true" style={ width>=1024  ?{ color: "white", padding: "10px", marginLeft:"12%", fontSize: "20px", borderRadius: "6px" } : {color: "white", padding: "10px",marginLeft:"5px", fontSize: "20px", borderRadius: "6px"}}></i>
          <input className="form-control me-2 w-8" style={ width >=1024 ? {width:"38%",height:"3pc"} : {width:"10.5pc",height:"2.4pc"}} type="search" placeholder="Enter Movie Name" value={props.searchData} aria-label="Search" onChange={(e) => { props.setSearchData(e.target.value) }} />

          {header_content()}

        </div>

      </nav>
    </div>
  )
}
