
import styles from './Admin.module.css'; 
import React from 'react';
// import { useState, useEffect } from 'react';
// import axios from 'axios';
import AdminHeader from './AdminHeader';
import AdminFooter from './AdminFooter';
import AdminContent from './AdminContent';

export default function Admin() {

  // const [roleTitle, setRoleTitle] = useState("");
  // const [roleDescription, setRoleDescription] = useState("");

  // useEffect(() => {
  //   axios.get('http://localhost:3001/api/getRole').then((response) => {
  //     console.log(response);
  //   });
  // }, [])


  // async function AddRole(e) {
  //   e.preventDefault();
  //   try {
  //     console.log(roleTitle, roleDescription);
  //     await axios.post('http://localhost:3001/api/insertRole', {
  //       roleTitle: roleTitle,
  //       roleDescription: roleDescription,
  //     }).then(() => { alert("Successfully role inserted") })
  //   }
  //   catch (error) {
  //     console.log(error)
  //   }

  // }

  return (

    <div className={styles.root} >
      <AdminHeader/>
      <AdminContent />
      <AdminFooter />
    </div>
    // <div id={style.wrapper}>
    //   <div className={style.header}>
    //     Administrator Portal
    //   </div>
    //   <form onSubmit={AddRole} >
    //     <label>Role Name:</label>
    //     <input type="text" placeholder="Enter Role Name" value={roleTitle} onChange={(e) => {
    //       setRoleTitle(e.target.value);
    //     }} required />
    //     <br />
    //     <label>Role Description:</label>
    //     <input type="text" placeholder="Enter Role Description" value={roleDescription} onChange={(e) => {
    //       setRoleDescription(e.target.value);
    //     }} required />
    //     <button type="submit">Submit</button>
    //   </form>
    // </div>
  );
}
