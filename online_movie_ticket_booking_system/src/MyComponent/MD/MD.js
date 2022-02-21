import React, { useState } from 'react';
import styles from './MD.module.css';
import AddMovie from './AddMovie.js';
import Profile from './Profile';
import { useNavigate } from "react-router-dom";
import axios from 'axios';


const MD = () => {
  const [isAddMovie, setIsAddMovie] = useState(false)
  const [isProfile, setIsProfile] = useState(false)
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
        navigate("/");
      }
    })
  }


  return (
    <div className={styles.background}>
      <div className={styles.header}>
        <button className={styles.logout} onClick={logout}>Logout</button>
        <input type="search" className="form-control rounded " style={{ height: "50px", width: "40%", marginLeft: "26%" }} placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
        <span className="input-group-text border-0" style={{ height: "50px", marginRight: "16%" }} id="search-addon">
          <i className="fa fa-search"></i>
        </span>
        <button className={styles.profile} onClick={() => {
          setIsProfile(true)
        }}>Profile</button>
        <button className={styles.addmoviebutton}><i className="fa fa-plus px-2" aria-hidden="true" onClick={() => {
          setIsAddMovie(true)
        }}></i>Add Movie</button>
        <AddMovie trigger={isAddMovie} setTrigger={setIsAddMovie}>
        </AddMovie>
        <Profile trigger={isProfile} setTrigger={setIsProfile}></Profile>
      </div>
    </div>
  );
}

export default MD;