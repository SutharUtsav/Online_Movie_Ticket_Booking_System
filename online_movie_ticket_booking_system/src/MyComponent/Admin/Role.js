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
        axios.get('http://localhost:3001/api/getRole').then((response) => {
            setRolesList(response.data);
        });
    })

    async function AddRole(e) {
        e.preventDefault();
        try {
            // console.log(roleTitle, roleDescription);
            await axios.post('http://localhost:3001/api/insertRole', {
                roleTitle: roleTitle,
                roleDescription: roleDescription,
            }).then(() => { alert("Successfully role inserted") })
        }
        catch (error) {
            console.log(error)
        }

    }

    async function DeleteRole(e){
        try{
            //console.log(e.target.value)
            await axios.delete(`http://localhost:3001/api/deleteRole/${e.target.value}`)
            .then(()=>{ alert("Successfully delete role")})
        }catch(error){
            console.log(error)
        }
    }

    function EditRole(e){
        console.log("Edit Role");
    }

    return <div className={styles.content}>
        <br />
        <div className={styles.wrapper}>
            <form onSubmit={AddRole} >
                <div id="roleTitleId" className="form-floating mb-3">
                    <input type="text" className='form-control' value={roleTitle} onChange={(e) => {
                        setRoleTitle(e.target.value);
                    }} required />
                    <label htmlFor="roleTitleId"> Enter Role Title</label>

                </div>
                <div id="roleDescriptionID" className="form-floating mb-3">
                    <input type="text" className='form-control' value={roleDescription} onChange={(e) => {
                        setRoleDescription(e.target.value);
                    }} required />
                    <label htmlFor="roleDescriptionID"> Enter Role Description</label>
                </div>

                <button type="submit" className="btn btn-primary">Add Role</button>
            </form>
        </div>
        <br />
        <p className={styles.RoleList}> List of Roles</p>
        <table className="table table-striped table-bordered">
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
                        <div style={{display:"inline"}}>
                            <button value={role.id} className="btn btn-primary" onClick={EditRole} >Edit</button>
                            <span> | </span>
                            <button value={role.id} className="btn btn-danger" onClick={DeleteRole}>Remove</button>
                        </div>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
}


export default Role;