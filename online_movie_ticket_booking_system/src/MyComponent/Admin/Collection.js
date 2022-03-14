import React, { useState, useEffect } from 'react';
import styles from './Admin.module.css';
import axios from 'axios';

const Collection = () => {


    let x = 0;
    const today = new Date()
    var today_str = ""
    today_str += today.getFullYear() + "-"
    var today_month = parseInt(today.getMonth()) + 1
    if (today_month >= 0 && today_month <= 9) {
        today_str += "0" + today_month
    }
    else {
        today_str += today_month
    }
    today_str += "-"

    if (today.getDate() >= 0 && today.getDate() <= 9) {
        today_str += "0" + today.getDate()
    }
    else {
        today_str += today.getDate()
    }



    const [bookings, setBookings] = useState([])
    const [movies, setMovies] = useState([])
    const [consumers, setConsumers] = useState([])
    const [selectedDate, setSelectedDate] = useState(today_str)
    const [selectedMovie, setSelectedMovie] = useState("")


    useEffect(() => {
        let isMounted = true; //for cleanup
        try {
            axios.get('http://localhost:3001/api/getBooking').then((response) => {
                if (isMounted) {
                    if (response.data.booking) {
                        setBookings(response.data.booking)
                    }
                }
            })
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
                        setConsumers(response.data.customers)
                    }
                }
            })

            return () => { isMounted = false };
        }
        catch (error) {
            console.log(error)
        }
    }, [selectedDate])

    let phone_number = ""
    let collection = 0
    function displayConsumerName(booking) {
        collection = parseInt(collection) + parseInt(booking.booking_price)
        phone_number = ""
        var name = ""
        consumers.forEach((consumer) => {
            if (consumer.id === booking.booking_user_id) {
                name += consumer.user_name
                phone_number += consumer.user_phone_number
            }
        })
        return name;
    }


    function displayMovieName(booking) {
        var name = ""

        movies.forEach((movie) => {
            if (movie.id === booking.booking_movie_id) {
                name += movie.movie_name
            }


        })
        return name;
    }

    function dateselected(booking) {
        const date = new Date()
        date.setTime(booking.booking_date)
        var date_str = ""
        date_str += date.getFullYear() + "-"
        var date_month = parseInt(date.getMonth()) + 1
        if (date_month >= 0 && date_month <= 9) {
            date_str += "0" + date_month
        }
        else {
            date_str += date_month
        }
        date_str += "-"

        if (date.getDate() >= 0 && date.getDate() <= 9) {
            date_str += "0" + date.getDate()
        }
        else {
            date_str += date.getDate()
        }

        if (date_str === selectedDate) {
            return true
        }
        else {
            return false
        }
    }


    function isReleased(date) {
        const today = new Date();
        const release_day = new Date();
        release_day.setDate(date.substring(8, 10))
        release_day.setMonth(parseInt(date.substring(5, 7)) - 1)
        release_day.setFullYear(date.substring(0, 4))

        if (today.getTime() >= release_day.getTime()) {
            return true
        }
        return false
    }

    var selected_movie_week=[]
    var selected_movie_month=[]
    function getWeeksMonths(date){
        let week =1;
        let month=1;
        const release_day = new Date();
        release_day.setDate(date.substring(8, 10))
        release_day.setMonth(parseInt(date.substring(5, 7)) - 1)
        release_day.setFullYear(date.substring(0, 4))

        while(today.getTime() >= release_day.getTime()){
            selected_movie_week.push(week);
            week++;
            release_day.setDate(release_day.getDate()+7)
        }

        release_day.setDate(date.substring(8, 10))
        release_day.setMonth(parseInt(date.substring(5, 7)) - 1)
        release_day.setFullYear(date.substring(0, 4))

        while(today.getTime() >= release_day.getTime()){
            selected_movie_month.push(month);
            month++;
            release_day.setDate(release_day.getDate()+28)
        }
    }

    return (<div className={styles.content}>
        <p className={styles.RoleList}> List of Bookings</p>
        <div style={window.innerWidth > 1000 ? { display: "flex", marginLeft: "21%", width: "inherit" } : { display: "block", marginLeft: "21%", width: "inherit" }}>
            <div style={{ display: "block", position: "relative", margin: "1pc" }}>
                <label htmlFor="SelectMovie" style={{ fontSize: "larger" }}>Select Movie:</label>
                <select defaultValue="All Movie" id="SelectMovie" style={{ display: "block", padding: "7px", border: "none", borderRadius: "4px", width: "8pc" }} onChange={(e) => { console.log(e.target.value); setSelectedMovie(e.target.value) }}>
                    <option>All Movies</option>
                    {movies.map((m, index) => (
                        <option value={m.movie_release_date} key={index} style={isReleased(m.movie_release_date) ? {} : { display: "none" }}>
                            {m.movie_name}
                        </option>
                    ))}

                </select>
            </div>

            {selectedMovie !== "All Movie" ? (
                <>
                    <div style={{ display: "block", position: "relative", margin: "1pc" }}>
                        <label htmlFor="selectWeek" style={{ fontSize: "larger" }}>Select Week:</label>
                        {getWeeksMonths(selectedMovie)}
                        <select  id="selectWeek" style={{ display: "block", padding: "7px", border: "none", borderRadius: "4px", width: "8pc" }}>
                            {selected_movie_week.map((week,index)=>(
                                <option key={index}>
                                {week}
                            </option>
                            ))}
                        </select>
                    </div>
                    <div style={{ display: "block", position: "relative", margin: "1pc" }}>
                        <label htmlFor="selectMonth" style={{ fontSize: "larger" }}>Select Month:</label>
                        <select id="selectMonth" style={{ display: "block", padding: "7px", border: "none", borderRadius: "4px", width: "8pc" }}>
                            {selected_movie_month.map((month,index)=>(
                                <option key={index}>
                                {month}
                            </option>
                            ))}
                        </select>
                    </div>

                </>
            ) : ""}


            <div style={{ display: "block", position: "relative", margin: "1pc" }}>
                <label htmlFor="showStartTime" style={{ fontSize: "larger" }}>Select Date:</label>
                <input id="showStartTime" type="date" name="showStartTime" placeholder="Enter Show Time" className=" form-control" value={selectedDate} onChange={(e) => {
                    setSelectedDate(e.target.value);
                }} required />
            </div>


        </div>
        <table className="table" style={{ color: "white", marginLeft: "5%", width: "72%" }}>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>User Name</th>
                    <th>User Phone Number</th>
                    <th>Movie Name</th>
                    <th>Booking Code</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody>
                {bookings && bookings.map(booking =>
                    <tr key={booking.id}>
                        {dateselected(booking) ? (
                            <> <td>{++x} </td>
                                <td>{displayConsumerName(booking)}</td>
                                <td>{phone_number}</td>
                                <td>{displayMovieName(booking)}</td>
                                <td>{booking.booking_code}</td>
                                <td>{booking.booking_price}<i className="fa fa-inr mx-1" aria-hidden="true"></i></td></>) : <td style={{ display: "none" }}></td>}

                    </tr>
                )}
            </tbody>
        </table>
        <h3 style={{ marginLeft: "30%", display: "inline" }}>Collection of the Day : </h3><h2 style={{ display: "inline", color: "coral" }}>{collection}<i className="fa fa-inr mx-1" aria-hidden="true"></i></h2>
    </div>);
}

export default Collection;