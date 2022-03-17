import React, { useEffect, useState } from 'react';
import styles from './booking.module.css'
import axios from 'axios';
import useWindowDimensions from "../useWindowDimensions";

const BookingHistory = (props) => {

    
  const {height,width}=useWindowDimensions();

    let x = 0;
    const [booking, setBooking] = useState([])
    const [seats, setSeats] = useState([]);

    useEffect(() => {
        let isMounted = true; //for cleanup
        try {
            axios.get('http://localhost:3001/api/getBooking').then((response) => {
                if (isMounted) {
                    if (response.data.booking) {
                        setBooking(response.data.booking)
                    }
                }
            })
            axios.get('http://localhost:3001/api/getSeats').then((response) => {
                if (isMounted) {
                    if (response.data.seats) {

                        setSeats(response.data.seats)
                    }
                }
            })
            return () => { isMounted = false };
        }
        catch (error) {
            console.log(error)
        }
    }, [booking])

    function displayMovie(bk) {
        var movie_name = ""
        props.movies.forEach((movie) => {
            if (movie.id === bk.booking_movie_id) {
                movie_name = movie.movie_name
            }
        })
        return movie_name;
    }

    var show_date = ""
    var is_show_end = true
    function displayShow(bk) {
        var show_time = ""
        const today = new Date()
        props.shows.forEach((show) => {
            if (show.id === bk.booking_screen_id) {
                const start_time = new Date()
                start_time.setTime(show.screen_show_start_time)
                const end_time = new Date()
                end_time.setTime(show.screen_show_end_time)

                show_time = start_time.getHours() + ":" + start_time.getMinutes() + " - " + end_time.getHours() + ":" + end_time.getMinutes()

                show_time = ((start_time.getHours() >= 0 && start_time.getHours() <= 9) ?
                    "0" + start_time.getHours() : start_time.getHours()) +
                    ":" + ((start_time.getMinutes() >= 0 && start_time.getMinutes() <= 9) ?
                        "0" + start_time.getMinutes() : start_time.getMinutes()) + " - " +
                    ((end_time.getHours() >= 0 && end_time.getHours() <= 9) ?
                        "0" + end_time.getHours() : end_time.getHours()) +
                    ":" + ((end_time.getMinutes() >= 0 && end_time.getMinutes() <= 9) ?
                        "0" + end_time.getMinutes() : end_time.getMinutes())

                show_date = ((start_time.getDate() >= 0 & start_time.getDate() <= 9) ?
                    "0" + start_time.getDate() : start_time.getDate()) +
                    "/" + ((parseInt(start_time.getMonth()) + 1) ?
                        "0" + (parseInt(start_time.getMonth()) + 1) : parseInt(start_time.getMonth()) + 1) +
                    "/" + start_time.getFullYear()

                if (show.screen_show_end_time > today.getTime()) {
                    is_show_end = false
                }
            }
        })
        return show_time;
    }

    const DeleteBooking = (e) => {
        try {
            //console.log(e.target.value)
            axios.delete(`http://localhost:3001/api/deleteBooking/${e.target.value}`)
                .then((response) => { alert(response.data.message) })
        } catch (error) {
            console.log(error)
        }
    }

    function displayBookingDate(bk) {
        const date = new Date()
        date.setTime(bk.booking_date)
        var month = (parseInt(date.getMonth()) + 1 >= 0 & date.getMonth() + 1 <= 9) ? ("0" + (parseInt(date.getMonth()) + 1)) : (parseInt(date.getMonth()) + 1)
        var dt = (date.getDate() >= 0 & date.getDate() <= 9) ? ("0" + date.getDate()) : date.getDate()
        var hour = (date.getHours() >= 0 & date.getHours() <= 9) ? ("0" + date.getHours()) : date.getHours()
        var minute = (date.getMinutes() >= 0 & date.getMinutes() <= 9) ? ("0" + date.getMinutes()) : date.getMinutes()
        var booking_date = dt + "/" + month + "/" + date.getFullYear() + " IST " + hour + ":" + minute;
        return booking_date;
    }

    function displaySeats(bk) {
        var sts = ""
        if (seats.length > 0) {
            seats.forEach((seat) => {
                if (seat.seat_booking_id === bk.id) {
                    sts += seat.seat_type + " "
                }
            })
        }
        return sts;

    }

    return (
        <div style={ width>=1024 ? { color: "white", height: "100%",marginTop:"8pc" }:{color: "white",marginTop:"12pc",width:"fit-content"}}>
            <button className={styles.back_btn} onClick={() => { props.setIsBookingHistory(false) }}><i className="fa fa-arrow-left" aria-hidden="true"></i></button>

            <p style={{ fontSize: "35px", fontWeight: "bold", marginLeft: "35%", textDecorationLine: "underline" }}>Your Bookings</p>
            <p style={{ marginLeft: "10%", textDecorationLine: "underline" }}>User Name : {props.user.user_name}</p>
            <table className="table" style={{ color: "white", marginLeft: "10%", width: "72%" }}>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Movie Name</th>
                        <th>Show Time</th>
                        <th>Show Date</th>
                        <th>Seats</th>
                        <th>Booking Date</th>
                        <th>Booking Code</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {booking.map((bk) => ((bk.booking_user_id === props.user.id) ? (
                        <tr key={bk.id}>
                            <td>{++x} </td>
                            <td>{displayMovie(bk)}</td>
                            <td>{displayShow(bk)}</td>
                            <td>{show_date}</td>
                            <td>{displaySeats(bk)}</td>
                            <td>{displayBookingDate(bk)}</td>
                            <td>{bk.booking_code}</td>
                            <td>{bk.booking_price}</td>
                            <td>{ is_show_end ? (<p>Thank you for Booking!!</p>):(<button value={bk.id} className="btn btn-danger" onClick={DeleteBooking}>Cancel Booking</button>)}</td>
                        </tr>
                    ) : <tr key={bk.id} style={{display:"none"}}></tr>
                    ))}
                </tbody>
            </table>

        </div>);
}

export default BookingHistory;