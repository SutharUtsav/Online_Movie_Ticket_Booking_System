import React, { useState,useEffect } from 'react';
import AdminHeader from './AdminHeader';
import AdminFooter from './AdminFooter';
import AdminContent from './AdminContent';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const navigate = useNavigate()
  const [isProfile, setIsProfile] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false)

  
  useEffect(() => {
    let isMounted = true; //for cleanup
    try {
      if (isMounted) {


        axios.get('http://localhost:3001/api/isUserAuth', {
          headers: {
            "x-access-tokens":localStorage.getItem('token')
          }
        }).then((response) => {
          
          if (response.data.isLoggedin === true) {
            setLoginStatus(response.data.isLoggedin)
          }
          else {
            alert(response.data.message)
            setLoginStatus(false)
            navigate("/Login")
          }
        })
      }
      return () => { isMounted = false };
    }
    catch (error) {
      console.log(error)
    }
  })

  
  return(loginStatus) ?(

    < >
      <AdminHeader isProfile={isProfile} setIsProfile={setIsProfile}  />
      <AdminContent isProfile={isProfile} setIsProfile={setIsProfile}  />
      <AdminFooter />
    </>

  ):"";
}
