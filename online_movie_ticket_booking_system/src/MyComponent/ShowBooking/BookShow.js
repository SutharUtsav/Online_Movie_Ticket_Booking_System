import React, { useState } from 'react';
import styles from './booking.module.css'
import BookingSeat from './BookingSeat';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const BookShow = (props) => {
    const navigate = useNavigate()
    const [selectedDateIndex, setSelectedDateIndex] = useState(0)
    const sort_show_by_date = []

    props.shows.forEach((show) => {
        const date = new Date()
        date.setTime(show.screen_show_start_time)
        const today = new Date()

        if (date.getTime() >= today.getTime()) {
            var fullDate = "";
            if (date.getDate() >= 0 & date.getDate() <= 9) {
                fullDate += "0" + date.getDate() + "/"
            }
            else {
                fullDate += date.getDate() + "/"
            }

            if (date.getMonth() >= 0 & date.getMonth() <= 9) {
                fullDate += "0" + (parseInt(date.getMonth()) + 1) + "/"
            }
            else {
                fullDate += (parseInt(date.getMonth()) + 1) + "/"
            }

            fullDate += date.getFullYear()

            if (sort_show_by_date.length === 0) {
                sort_show_by_date.push(fullDate)
            }
            else {
                if (sort_show_by_date.find(sh => sh === fullDate) === undefined) {
                    sort_show_by_date.push(fullDate)
                }
            }
        }

    })

    const [isShowSelected, setIsShowSelected] = useState(false);
    const [selectedShow, setSelectedShow] = useState({});

    
    var show_count = 0;
    function availableshows(show) {
        if (show.screen_movie_id === props.selectedMovie.id) {
            const start_time = new Date()
            start_time.setTime(show.screen_show_start_time)

            var fullDate = "";
            if (start_time.getDate() >= 0 & start_time.getDate() <= 9) {
                fullDate += "0" + start_time.getDate() + "/"
            }
            else {
                fullDate += start_time.getDate() + "/"
            }

            if (start_time.getMonth() >= 0 & start_time.getMonth() <= 9) {
                fullDate += "0" + (parseInt(start_time.getMonth()) + 1) + "/"
            }
            else {
                fullDate += (parseInt(start_time.getMonth()) + 1) + "/"
            }

            fullDate += start_time.getFullYear()

            const end_time = new Date()
            end_time.setTime(show.screen_show_end_time)

            if (fullDate === sort_show_by_date[selectedDateIndex]) {
                show_count++;
                return (
                    <>
                        <button value={show.id} className='py-2 my-1 mx-3 font-weight-bold col-9' style={{ border: "none", borderRadius: "5px", background: "goldenrod" }} onClick={() => {

                            axios.get('http://localhost:3001/api/isUserAuth', {
                                headers: {
                                    "x-access-tokens": localStorage.getItem('token')
                                }
                            }).then((response) => {

                                if (response.data.isLoggedin === true) {
                                    setSelectedShow(show)
                                    setIsShowSelected(true)
                                }
                                else {
                                    alert(response.data.message)
                                    navigate("/Login")
                                }
                            })
                           
                        }}>{(start_time.getHours() >= 0 & start_time.getHours() <= 9) ? ("0" + start_time.getHours()) : (start_time.getHours())}:{(start_time.getMinutes() >= 0 & start_time.getMinutes() <= 9) ? ("0" + start_time.getMinutes()) : (start_time.getMinutes())} -
                            {(end_time.getHours() >= 0 & end_time.getHours() <= 9) ? ("0" + end_time.getHours()) : (end_time.getHours())}:{(start_time.getMinutes() >= 0 & start_time.getMinutes() <= 9) ? ("0" + start_time.getMinutes()) : (start_time.getMinutes())}</button>
                    </>
                )

            }
        }
    }

    return (!isShowSelected) ? (<div style={{ color: "white", height: "100%" }}>
        <button className={styles.back_btn} onClick={() => { props.setIsMovieSelected(false) }}><i className="fa fa-arrow-left" aria-hidden="true"></i></button>

        <center><u><h2>{props.selectedMovie.movie_name}</h2></u></center>

        <div className={styles.container_view}>
            <img src={process.env.PUBLIC_URL + "/Movies/" + props.selectedMovie.movie_banner} alt="MovieBanner" />

        </div>
        <div className={styles.container_detail}>
            <div style={{ float: "left", marginLeft: "2pc" }}>
                <img src={process.env.PUBLIC_URL + "/Movies/" + props.selectedMovie.movie_image} alt="MovieImage" />
            </div>
            <div style={{ marginLeft: "23pc", textAlign: "justify", fontSize: "larger" }}>
                <p><b>Movie Name : </b>{props.selectedMovie.movie_name}</p><hr />
                <p><b>Movie Language :</b> {props.selectedMovie.movie_language}</p><hr />
                <p><b>Movie Genre :</b> {props.selectedMovie.movie_genre}</p><hr />
                <p><b>Total hours of movie :</b> {props.selectedMovie.movie_hours}</p><hr />
                <p><b>Movie Release Date :</b> {props.selectedMovie.movie_release_date}</p><hr />
                <p><b>Movie Description :</b> {props.selectedMovie.movie_description}</p>
            </div>

            <div style={{ marginTop: "8pc", position: "relative", display: "flex", width: "100%" }}>
                <div style={{ position: "relative", left: "auto", width: "50%" }}>
                    <h4 className='py-2 px-3 my-0' style={{}}>Select Date :</h4>
                    {(sort_show_by_date.length > 0) ? (

                        sort_show_by_date.map((date, index) => (
                            <div key={index}>
                                <div className={selectedDateIndex === index ? "py-4 font-weight-bold bg-primary" : 'py-3 font-weight-bold'} style={{ background: "cornflowerblue", textAlign: "center" }} onClick={() => { setSelectedDateIndex(index) }}>{date}</div>
                            </div>
                        ))
                    ) : <p className='mx-2' style={{ color: "red", padding: "11px 0" }}>NO SHOW AVAILABLE </p>

                    }

                </div>

                {(sort_show_by_date.length > 0) ? (

                    <div style={{ position: "sticky", left: "50%", width: "50%" }}>
                        <h4 className='py-2 px-4' style={{}}>Select Show :</h4>
                        {
                            props.shows.map((show, index) => (
                                <div key={index}>
                                    {availableshows(show)}
                                </div>
                            ))
                        }{
                            (show_count === 0) ? (<p className='mx-2' style={{ color: "red", padding: "11px 0" }}>NO SHOW AVAILABLE </p>) : ""

                        }
                    </div>
                ) : ""}
            </div>
        </div>
    </div>) : (
        <>

            <BookingSeat setIsMovieSelected={props.setIsMovieSelected} user={props.user} selectedShow={selectedShow} selectedMovie={props.selectedMovie} setIsShowSelected={setIsShowSelected} />

        </>
    );
}


export default BookShow;