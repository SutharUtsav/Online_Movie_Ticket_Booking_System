import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import React from 'react';
import styles from './customer.module.css';
import useWindowDimensions from "../useWindowDimensions";

export default function Header(props) {

  const { height, width } = useWindowDimensions();

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
          <li className={styles.menu_item_has_children} style={window.innerWidth>=1024 ? {marginLeft:"10vw"}:{}}>
            <Link to="/login" className='text-white px-2' >Login</Link>
          </li>
          <li className={styles.menu_item_has_children}>
            <Link to="/register" className='text-white' >Register</Link>
          </li>


        </>
      )

    }
    else {
      return (
        <>
          <li className={styles.menu_item_has_children}>
            <button className="m-1 " style={{ color: "white", background: "none", border: "none" }} onClick={() => {
              props.setIsProfile(!props.isProfile)
            }} ><i className="fa fa-user-circle-o mx-1" style={{fontSize:"25px"}}  aria-hidden="true"></i><span style={{textTransform:"uppercase",fontWeight:"bold"}}> {width >= 1024 ? "Profile" : ""}</span></button>
          </li>

          <li className={styles.menu_item_has_children}>
            <button className="m-1" style={{ color: "white", background: "none", border: "none" }} onClick={() => {
              props.setIsBookingHistory(!props.isbookingHistory)
            }} ><i className="fa fa-list mx-1" style={{fontSize:"25px"}} aria-hidden="true"></i> <span style={{textTransform:"uppercase",fontWeight:"bold"}}> {width >= 1024 ? "My Bookings" : ""}</span></button>
          </li>

          <li className={styles.menu_item_has_children}>
            <button className="btn btn-danger m-2"  style={{ borderRadius: "19px" }} onClick={logout}><i className="fa fa-sign-out mx-1" style={{fontSize:"25px"}}  aria-hidden="true"></i><span style={{textTransform:"uppercase",fontWeight:"bold"}}> {width >= 1024 ? "Logout" : ""}</span></button>
          </li>
        </>
      )
    }
  }

  return (
    <div className={styles.navbar} >
      <nav className="container">
        <div className={styles.header_wrapper}>

          <img src='/movie_logo_13.png' alt="movie-logo" width="15%"></img>
          <div style={{ display: "flex" }}>
            <i className="fa fa-search" aria-hidden="true" style={width >= 1024 ? { color: "white", padding: "10px", marginLeft: "12%", fontSize: "20px", borderRadius: "6px" } : { color: "white", padding: "10px", marginLeft: "5px", fontSize: "20px", borderRadius: "6px" }}></i>
            <input className="form-control me-2 w-8" style={width >= 1400 ? (props.user.length===0 ? {width: "43pc", height: "3pc" }:{width: "32pc", height: "3pc"} ): { width: "10.5pc", height: "2.4pc" }} type="search" placeholder="Search for Movies" value={props.searchData} aria-label="Search" onChange={(e) => { props.setSearchData(e.target.value) }} />
          </div>
          <ul className={styles.menu}>
            {header_content()}
          </ul>
        </div>
      </nav>
    </div>
  )
}
