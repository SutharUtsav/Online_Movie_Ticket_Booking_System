import React, { useState } from 'react';
import styles from './booking.module.css'
import axios from 'axios';
import useWindowDimensions from "../useWindowDimensions";

const BookingInfo = (props) => {


    const [ispay, setIsPay] = useState(false)
    const {height,width}=useWindowDimensions();
  

    let selected_seat = "";
    let snack_type = "";
    const start_time = new Date()
    start_time.setTime(props.selectedShow.screen_show_start_time)
    const end_time = new Date()
    end_time.setTime(props.selectedShow.screen_show_end_time)


    var amount = 0;
    props.selectedSeat.forEach((seat) => (
        amount += seat.seat_price
    ))

    var snacks = "";
    if (props.selectedSnack !== null) {
        props.selectedSnack.forEach((snack) => {
            amount += snack.snack_amount
            snacks += snack.snack_type + ","
        })
    }

    function addBooking() {
        const bookingDate = new Date()
        setIsPay(true)
        try {
            axios.post('http://localhost:3001/api/insertBooking', {
                movieId: props.selectedMovie.id,
                showId: props.selectedShow.id,
                userId: props.user.id,
                seats: props.selectedSeat,
                bookingDate: bookingDate.getTime(),
                snacks: snacks,
                price: amount,
            }).then((response) => {
                if (response.data.message) {
                    alert(response.data.message)

                    //Send SMS

                    axios.post('http://localhost:3001/api/sendSMS', {
                        userName: props.user.user_name,
                        userPhoneNumber: props.user.user_phone_number,
                        movieName: props.selectedMovie.movie_name,
                        amount: amount,
                        screenNo: props.selectedShow.screen_no,
                        seatType: selected_seat,
                        showTime: start_time.getHours() + ":" + start_time.getMinutes() + " - " + end_time.getHours() + ":" + end_time.getMinutes(),
                        showDate: start_time.getDate() + "/" + (parseInt(start_time.getMonth()) + 1).toString() + "/" + start_time.getFullYear(),
                        snackType: snack_type,
                    }).then((response) => {
                        if (response.data.message) {
                            alert(response.data.message)
                        }
                        setIsPay(false)
                    })

                    props.setIsMovieSelected(false)
                }
            });
        }
        catch (error) {
            console.log(error)
        }
    }

    return (<div style={width >= 1024 ? { color: "white", height: "100%", width: "100%" } : { color: "white" }}>
        <button className={styles.back_btn} onClick={() => {
            localStorage.removeItem('selectedSnacks')
            props.setIsProceedtoPay(false)
        }}><i className="fa fa-arrow-left" aria-hidden="true"></i></button>

        {ispay ? (
            <div class="spinner-border text-info" style={{ marginLeft: "50%" }} role="status">
                <span class="sr-only">Loading...</span>
            </div>
        ) : ""}
        <div className='container'>
            <h1><center><u>Booking Info</u></center></h1>


            {width >= 1024 ? (

                <div className={styles.cardWrap}>
                    <div className={styles.cardLeft}>
                        <p style={{ fontSize: "2pc", textAlign: "center", background: "rgba(214, 19, 19, 0.822)", borderRadius: "8px" }}>Ticket</p>
                        <div className={styles.ticket_title}>
                            <span style={{ fontSize: ".7pc" }}>movie</span>
                            <p>{props.selectedMovie.movie_name}</p>
                        </div>
                        <div className={styles.amount}>
                            <span style={{ fontSize: ".7pc" }}>amount</span>
                            <p style={{ fontWeight: "bold" }}>{amount}</p>
                        </div>
                        <div className={styles.ticket_name}>
                            <span style={{ fontSize: ".7pc" }}>name</span>
                            <p>{props.user.user_name}</p>
                        </div>
                        <div className={styles.ticket_name}>
                            <span style={{ fontSize: ".7pc" }}>screen</span>
                            <p>{props.selectedShow.screen_no}</p>
                        </div>
                        <div className={styles.ticket_seat}>
                            <span style={{ fontSize: ".7pc", display: "block" }}>seat</span>
                            {props.selectedSeat.map((seat, index) => (<span key={index}>
                                <p style={{ display: "inline" }}>{seat.seat_type + " "}</p>
                                {<span style={{ display: "none" }}>{selected_seat += seat.seat_type + " "}</span>}
                            </span>
                            ))}
                        </div>
                        <div className={styles.ticket_time}>
                            <span style={{ fontSize: ".7pc" }}>Time</span>
                            <p>{start_time.getHours()}:{start_time.getMinutes()} - {end_time.getHours()}:{end_time.getMinutes()}</p>

                        </div>

                        {(props.selectedSnack !== null) ? (
                            <div className={styles.ticket_snack}>
                                <span style={{ fontSize: ".7pc", display: "block" }}>Snacks</span>
                                {props.selectedSnack.map((snack, index) => (
                                    <span key={index}>
                                        <p style={{ display: "block", margin: "0px" }}>{snack.snack_type + "\n"}</p>
                                        {<span style={{ display: "none" }}>{snack_type += snack.snack_type + " "}</span>}

                                    </span>
                                ))}
                            </div>
                        ) : (
                            <div></div>
                        )}

                    </div>
                </div>

            ) : ""}

        </div>

        <div className="col-lg-12" style={{ marginTop: "37pc" }}>
            <button className="btn btn-success py-2 font-weight-bold d-grid col-4 mx-auto" onClick={() => { addBooking() }}>Pay</button>
        </div>
    </div>);
}

export default BookingInfo;