import styles from './Admin.module.css';
import React, { useState,useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [movies, setMovies] = useState([]);
    const [customers, setCustomer] = useState([]);
    const [snacks, setSnacks] = useState([]);
    const [booking, setBooking] = useState([]);

    useEffect(() => {
        let isMounted = true; //for cleanup
        try {
            axios.get('http://localhost:3001/api/getMovies').then((response) => {
                if (isMounted) {
                    if (response.data.movies) {
                        setMovies(response.data.movies)
                    }
                }
            })
            axios.get('http://localhost:3001/api/getCustomer').then((response) => {
                if (isMounted) {
                    if (response.data.customers) {
                        setCustomer(response.data.customers)
                    }
                }
            })
            axios.get('http://localhost:3001/api/getBooking').then((response) => {
                if (isMounted) {
                    if (response.data.booking) {
                        setBooking(response.data.booking)
                    }
                }
            })
            axios.get('http://localhost:3001/api/getSnack').then((response) => {
                if (isMounted) {
                    if (response.data.snacks) {
                        setSnacks(response.data.snacks)
                    }
                }
            })

            return () => {
                isMounted = false
            };
        } catch (error) {
            console.log(error)
        }
    }, [])



    return (<div className={styles.content}>

        <div className="row" style={{ margin: "10px" }}>
            <div className={styles.card} style={{ background: "red" }}>

                <div className={styles.container}>
                    <h4><b>Movies</b></h4>
                    <p>{movies.length}</p>
                </div>
            </div>

            <div className={styles.card} style={{ background: "green" }}>

                <div className={styles.container}>
                    <h4><b>Customer</b></h4>
                    <p>{customers.length}</p>
                </div>
            </div>

            <div className={styles.card} style={{ background: "blue" }}>

                <div className={styles.container}>
                    <h4><b>Snacks</b></h4>
                    <p>{snacks.length}</p>
                </div>
            </div>

            <div className={styles.card} style={{ background: "brown" }}>

                <div className={styles.container} >
                    <h4><b>Booking</b></h4>
                    <p>{booking.length}</p>
                </div>
            </div>
        </div>
    </div>);
}

export default Dashboard;