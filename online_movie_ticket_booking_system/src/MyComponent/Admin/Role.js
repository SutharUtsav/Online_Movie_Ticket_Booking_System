import React from 'react';
import styles from './Admin.module.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Role = () => {
    let x=0;
    const [roleTitle, setRoleTitle] = useState("");
    const [roleDescription, setRoleDescription] = useState("");
    const [rolesList, setRolesList] = useState([]);

    useEffect(() => {
        let isMounted = true; //for cleanup
        axios.get('http://localhost:3001/api/getRole').then((response) => {
            if(isMounted){
                setRolesList(response.data);
            }
        });
        return ()=>{isMounted=false};
    })

    function AddRole(e) {
        e.preventDefault();
        try {
            // console.log(roleTitle, roleDescription);
            axios.post('http://localhost:3001/api/insertRole', {
                roleTitle: roleTitle,
                roleDescription: roleDescription,
            }).then(() => { alert("Successfully role inserted") })
            setRoleTitle("")
            setRoleDescription("")
        }
        catch (error) {
            console.log(error)
        }

    }

    function DeleteRole(e){
        try{
            //console.log(e.target.value)
            axios.delete(`http://localhost:3001/api/deleteRole/${e.target.value}`)
            .then(()=>{ alert("Successfully delete role")})
        }catch(error){
            console.log(error)
        }
    }

    return <div className={styles.content}>
        <br />
        <div className={styles.wrapper}>
            <form onSubmit={AddRole} >
                <div id="roleTitleId" className="form-floating mb-3" style={{width:"71%"}}>
                    <input type="text" className='form-control' value={roleTitle} onChange={(e) => {
                        setRoleTitle(e.target.value);
                    }} required />
                    <label htmlFor="roleTitleId" style={{color:"black"}}> Enter Role Title</label>

                </div>
                <div id="roleDescriptionID" className="form-floating mb-3" style={{width:"71%"}}>
                    <input type="text" className='form-control' value={roleDescription} onChange={(e) => {
                        setRoleDescription(e.target.value);
                    }} required />
                    <label htmlFor="roleDescriptionID" style={{color:"black"}}> Enter Role Description</label>
                </div>

                <button type="submit" className="btn btn-primary" style={{width:"37%"}}>Add Role</button>
            </form>
        </div>
        <br />
        <p className={styles.RoleList}> List of Roles</p>
        <table className="table" style={{color:"white",marginLeft:"5%",width:"72%"}}>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                {rolesList && rolesList.map(role =>
                    <tr key={role.id}>
                        <td>{++x} </td>
                        <td>{role.role_title}</td>
                        <td>{role.role_description}</td>
                        <td>
                        <div style={{display:"inline"}}>
                            <button value={role.id} className="btn btn-danger" onClick={DeleteRole}>Remove</button>
                        </div>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
}


export default Role;