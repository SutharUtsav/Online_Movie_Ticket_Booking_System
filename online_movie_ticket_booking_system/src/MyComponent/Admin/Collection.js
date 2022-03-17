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
    const [selectedMovieId, setSelectedMovieId] = useState("-")
    //const [selectedMovie, setSelectedMovie] = useState([])
    const [selectedWeek, setSelectedWeek] = useState("-")
    const [selectedMonth, setSelectedMonth] = useState("-")


    
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
    }, [])

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
            if (selectedMovieId !== '-') {
                if (parseInt(selectedMovieId) === booking.booking_movie_id) {
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                return true
            }
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

        if (today.getTime() > release_day.getTime()) {
            return true
        }
        return false
    }

    
    var selectedMovie_name=""


    var selected_movie_week = []
    var selected_movie_month = []
    function getWeeksMonths(id) {
        let week = 1;
        let month = 1;
        movies.forEach((movie) => {
            if (movie.id === parseInt(id)) {

               selectedMovie_name = movie.movie_name
                const date = movie.movie_release_date
                const release_day = new Date();
                release_day.setDate(date.substring(8, 10))
                release_day.setMonth(parseInt(date.substring(5, 7)) - 1)
                release_day.setFullYear(date.substring(0, 4))

                while (today.getTime() >= release_day.getTime()) {
                    selected_movie_week.push(week);
                    week++;
                    release_day.setDate(release_day.getDate() + 7)
                }

                release_day.setDate(date.substring(8, 10))
                release_day.setMonth(parseInt(date.substring(5, 7)) - 1)
                release_day.setFullYear(date.substring(0, 4))

                while (today.getTime() >= release_day.getTime()) {
                    selected_movie_month.push(month);
                    month++;
                    release_day.setDate(release_day.getDate() + 28)
                }
            }
        })
    }


    function getWeeksMonthsBooking(booking) {
        let status = false;
        movies.forEach((movie)=>{
            if(movie.id === parseInt(selectedMovieId)){
                if (booking.booking_movie_id === parseInt(selectedMovieId)) {
                    selectedMovie_name = movie.movie_name

                    const date = movie.movie_release_date
                    const release_day = new Date();
                    release_day.setDate(date.substring(8, 10))
                    release_day.setMonth(parseInt(date.substring(5, 7)) - 1)
                    release_day.setFullYear(date.substring(0, 4))
                    if (selectedWeek !== '-' & selectedMonth === '-') {
                        
                        release_day.setDate(release_day.getDate() + selectedWeek * 7)

                        // console.log(selectedWeek)
                        if (booking.booking_date <= release_day.getTime()) {
                            // console.log("Week "+ selectedWeek)
                            status = true;
                        }
                        
                    }
                    else {
                        release_day.setDate(release_day.getDate() + selectedMonth*28)
                        if (booking.booking_date <= release_day.getTime()) {
                            status = true;
                        }
                    }
                }
            }
        })

        return status;

        
    }

    return (<div className={styles.content}>
        <p className={styles.RoleList}> List of Bookings</p>
        <div style={window.innerWidth > 1000 ? selectedMovieId === "-" ? { display: "flex", marginLeft: "30%", width: "inherit" } : { display: "flex", marginLeft: "20%", width: "inherit" } : { display: "block", marginLeft: "20%", width: "inherit" }}>
            <div style={{ display: "block", position: "relative", margin: "1pc" }}>
                <label htmlFor="SelectMovie" style={{ fontSize: "larger" }}>Select Movie:</label>
                <select value={selectedMovieId} id="SelectMovie" style={{ display: "block", padding: "7px", border: "none", borderRadius: "4px", width: "8pc" }} onChange={(e) => {
                    if(e.target.value === '-'){
                        setSelectedWeek('-')
                        setSelectedMonth('-')
                    }
                    setSelectedMovieId(e.target.value) }}>
                    <option value="-">All Movies</option>
                    {movies.map((m) => (
                        <option value={m.id} key={m.id} style={isReleased(m.movie_release_date) ? {} : { display: "none" }} >
                            {m.movie_name}
                        </option>
                    ))}
                </select>
            </div>
            {selectedMovieId !== "-" ? (
                <>
                    <div style={{ display: "block", position: "relative", margin: "1pc" }}>
                        <label htmlFor="selectWeek" style={{ fontSize: "larger" }}>Select Week:</label>
                        {getWeeksMonths(selectedMovieId)}
                        <select id="selectWeek" value={selectedWeek} style={{ display: "block", padding: "7px", border: "none", borderRadius: "4px", width: "8pc" }} onChange={(e) => { setSelectedWeek(e.target.value); setSelectedMonth("-") }}>
                            <option value="-">-</option>
                            {selected_movie_week.map((week, index) => (
                                <option value={week} key={index}>
                                    {week}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div style={{ display: "block", position: "relative", margin: "1pc" }}>
                        <label htmlFor="selectMonth" style={{ fontSize: "larger" }}>Select Month:</label>
                        <select id="selectMonth" value={selectedMonth} style={{ display: "block", padding: "7px", border: "none", borderRadius: "4px", width: "8pc" }} onChange={(e) => { setSelectedMonth(e.target.value); setSelectedWeek("-") }}>
                            <option value="-">-</option>
                            {selected_movie_month.map((month, index) => (
                                <option key={index} value={month}>
                                    {month}
                                </option>
                            ))}
                        </select>
                    </div>

                </>
            ) : ""}
            {(selectedWeek === "-" & selectedMonth === "-") ? (
                <div style={{ display: "block", position: "relative", margin: "1pc" }}>
                    <label htmlFor="showStartTime" style={{ fontSize: "larger" }}>Select Date:</label>
                    <input id="showStartTime" type="date" name="showStartTime" placeholder="Enter Show Time" className=" form-control" value={selectedDate} onChange={(e) => {
                        setSelectedDate(e.target.value);
                    }} required />
                </div>
            ) : (
                <div style={{ display: "block", position: "relative", margin: "1pc" }}>
                    <label htmlFor="showStartTime" style={{ fontSize: "larger" }}>Select Date:</label>
                    <input id="showStartTime" type="date" readOnly name="showStartTime" placeholder="Enter Show Time" className=" form-control" value={selectedDate} onChange={(e) => {
                        setSelectedDate(e.target.value);
                    }} required />
                </div>
            )}


        </div>
        <table className="table" style={{ color: "white", marginLeft: "7%", width: "80%" }}>
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

                {selectedMonth === '-' & selectedWeek === '-' ? (<>
                    {bookings && bookings.map((booking) =>
                        <tr key={booking.id}>
                            {dateselected(booking) ? (
                                <><td>{++x}</td>
                                    <td>{displayConsumerName(booking)}</td>
                                    <td>{phone_number}</td>
                                    <td>{displayMovieName(booking)}</td>
                                    <td>{booking.booking_code}</td>
                                    <td>{booking.booking_price}<i className="fa fa-inr mx-1" aria-hidden="true"></i></td>
                                </>) : <td style={{ display: "none" }}></td>}
                        </tr>
                    )}
                </>) :
                    (<>
                        {bookings && bookings.map((booking) =>
                            <tr key={booking.id}>
                                {getWeeksMonthsBooking(booking) ? (
                                    <><td>{++x}</td>
                                        <td>{displayConsumerName(booking)}</td>
                                        <td>{phone_number}</td>
                                        <td>{displayMovieName(booking)}</td>
                                        <td>{booking.booking_code}</td>
                                        <td>{booking.booking_price}<i className="fa fa-inr mx-1" aria-hidden="true"></i></td>
                                    </>) : <td style={{ display: "none" }}></td>}
                            </tr>
                        )}
                    </>)

                }
            </tbody>
        </table>
        {selectedMonth === '-' & selectedWeek === '-' ? (
            <>
            
            {selectedMovieId === '-' ?(
            <>
            <h3 style={{ marginLeft: "30%", display: "inline" }}>Collection of the Day : </h3><h2 style={{ display: "inline", color: "coral" }}>{collection}<i className="fa fa-inr mx-1" aria-hidden="true"></i></h2>
            </>):(<>
                <h3 style={{ marginLeft: "20%", display: "inline" }}>Collection of the Day by <u>{ selectedMovie_name}</u> : </h3><h2 style={{ display: "inline", color: "coral" }}>{collection}<i className="fa fa-inr mx-1" aria-hidden="true"></i></h2>
            </>) }
                
            </>) : (
            <>
                {selectedMonth === '-' ? (<>
                    <h3 style={{ marginLeft: "20%", display: "inline" }}>Total Collection by <u>{ selectedMovie_name}</u> in Week {selectedWeek} : </h3><h2 style={{ display: "inline", color: "coral" }}>{collection}<i className="fa fa-inr mx-1" aria-hidden="true"></i></h2>
                </>) : (
                    <>
                        <h3 style={{ marginLeft: "20%", display: "inline" }}>Total Collection by <u>{  selectedMovie_name} </u> in Month {selectedMonth} : </h3><h2 style={{ display: "inline", color: "coral" }}>{collection}<i className="fa fa-inr mx-1" aria-hidden="true"></i></h2>
                    </>)}
            </>)}

    </div>);
}

export default Collection;