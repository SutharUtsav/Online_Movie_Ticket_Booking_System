import React, { useState, useEffect } from 'react';
import styles from './Admin.module.css';
import axios from 'axios';

const Consumer = () => {
    let x= 0;

    const [consumers, setConsumers] = useState([])

    useEffect(() => {
        let isMounted = true; //for cleanup
        try {
            axios.get('http://localhost:3001/api/getCustomer').then((response) => {
                if (isMounted) {
                    if (response.data.customers) {
                        setConsumers(response.data.customers)
                    }
                }
            })
            return () => { isMounted = false };
        }
        catch (error) {
            console.log(error)
        }
    }, [])

    return (<div className={styles.content}>
        <p className={styles.RoleList}> List of Customer</p>
        <table className="table" style={{ color: "white", marginLeft: "5%", width: "72%" }}>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>User Name</th>
                    <th>Phone Number</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {consumers && consumers.map(cst =>
                    <tr key={cst.id}>
                        <td>{++x} </td>
                        <td>{cst.user_name}</td>
                        <td>{cst.user_phone_number}</td>
                        <td>{cst.user_email}</td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>);
}

export default Consumer;