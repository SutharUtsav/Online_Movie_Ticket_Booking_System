import React from 'react';
import styles from './Admin.module.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const MovieDistributer = () => {
    let x=0;
    const [userName, setUserName] = useState("");
    const [userPhoneNumber, setUserPhoneNumber] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [MDlist,setMDList]=useState([]);

    useEffect(() => {
        let isMounted = true; //foe cleanup
        axios.get('http://localhost:3001/api/getMD').then((response) => {
            if(isMounted){
                setMDList(response.data);
            }
        });
        return ()=>{isMounted=false};
    })

    async function AddMovieDistributer(e) {
        e.preventDefault();
        try {
            let userPassword = userName;
            alert("Your Password is your UserName")
            console.log(userName,userPhoneNumber,userEmail,userPassword);
            await axios.post('http://localhost:3001/api/insertMD', {
                userName:userName,
                userPhoneNumber:userPhoneNumber,
                userEmail:userEmail,
                userPassword:userName,
            }).then(() => { alert("Successfully movie distributer inserted") })
        }
        catch (error) {
            console.log(error)
        }
     }

    async function DeleteMD(e){
        try{
            console.log(e.target.value)
            await axios.delete(`http://localhost:3001/api/deleteMD/${e.target.value}`)
            .then(()=>{ alert("Successfully delete Movie Distributer")})
        }catch(error){
            console.log(error)
        }
        
    }

    function EditMD(e){
        console.log("Edit MD");
    }


    return <div className={styles.content}>
        <br />
        <div className={styles.wrapper}>
            <form onSubmit={AddMovieDistributer} >
                <div id="userNameId" className="form-floating mb-3">
                    <input type="text" className='form-control' value={userName} onChange={(e) => {
                        setUserName(e.target.value);
                    }} required />
                    <label htmlFor="roleTitleId"> Enter UserName</label>

                </div>
                <div id="userPhoneNumberId" className="form-floating mb-3">
                    <input type="text" className='form-control' value={userPhoneNumber} onChange={(e) => {
                        setUserPhoneNumber(e.target.value);
                    }} required />
                    <label htmlFor="roleDescriptionID"> Enter Phone Number</label>
                </div>
                <div id="userEmailId" className="form-floating mb-3">
                    <input type="text" className='form-control' value={userEmail} onChange={(e) => {
                        setUserEmail(e.target.value);
                    }} required />
                    <label htmlFor="roleDescriptionID"> Enter EmailId</label>
                </div>

                <button type="submit" className="btn btn-primary">Add Movie Distributer</button>
            </form>
        </div>
        <br />
        <p className={styles.RoleList}> List of Movie Distributers</p>
        <table className="table table-striped table-bordered">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>UserName</th>
                    <th>PhoneNumber</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {MDlist && MDlist.map(MD =>
                    <tr key={MD.id}>
                        <td>{++x} </td>
                        <td>{MD.user_name}</td>
                        <td>{MD.user_phone_number}</td>
                        <td>{MD.user_email}</td>
                        <div style={{display:"inline"}}>
                            <button value={MD.id} className="btn btn-primary" onClick={EditMD} >Edit</button>
                            <span> | </span>
                            <button value={MD.id} className="btn btn-danger" onClick={DeleteMD}>Remove</button>
                        </div>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
}
export default MovieDistributer;