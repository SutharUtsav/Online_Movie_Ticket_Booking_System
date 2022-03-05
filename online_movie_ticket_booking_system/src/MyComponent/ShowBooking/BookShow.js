import React, { useState } from 'react';
import styles from './booking.module.css'
import BookingSeat from './BookingSeat';

const BookShow = (props) => {
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

    var status = false;
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
                return (
                    <>
                        <button value={show.id} className='btn btn-success py-2 font-weight-bold mx-2' style={{ color: "white" }} onClick={() => {
                            setSelectedShow(show)
                            setIsShowSelected(true)
                        }}>{(start_time.getHours()>=0 &start_time.getHours()<=9)?("0"+ start_time.getHours()):(start_time.getHours())}:{(start_time.getMinutes()>=0 &start_time.getMinutes()<=9)?("0"+ start_time.getMinutes()):(start_time.getMinutes())} - 
                        {(end_time.getHours()>=0 &end_time.getHours()<=9)?("0"+ end_time.getHours()):(end_time.getHours())}:{(start_time.getMinutes()>=0 &start_time.getMinutes()<=9)?("0"+ start_time.getMinutes()):(start_time.getMinutes())}</button>
                    </>
                )
            }
        }
    }

    // function alertcall(){
    //     alert("You are not logged in")
    //     setIsShowSelected(false)
    //     props.setIsMovieSelected(false)
    // }

    // function nextcomponent() {
    //     if (props.user.id === undefined) {
    //         alert("You are not logged in")
    //         setSelectedShow({})
    //         setIsShowSelected(false)
    //         setSelectedDateIndex(0)
    //         props.setIsMovieSelected(false)
    //     }
    //     else {
    //         return (<BookingSeat setIsMovieSelected={props.setIsMovieSelected} user={props.user} selectedShow={selectedShow} selectedMovie={props.selectedMovie} setIsShowSelected={setIsShowSelected} />)
    //     }
    // }

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
            <div style={{ marginLeft: "21pc", textAlign: "justify", fontSize: "larger" }}>
                <p><b>Movie Name : </b>{props.selectedMovie.movie_name}</p>
                <p><b>Movie Language :</b> {props.selectedMovie.movie_language}</p>
                <p><b>Movie Genre :</b> {props.selectedMovie.movie_genre}</p>
                <p><b>Total hours of movie :</b> {props.selectedMovie.movie_hours}</p>
                <p><b>Movie Release Date :</b> {props.selectedMovie.movie_release_date}</p>
                <p><b>Movie Description :</b> {props.selectedMovie.movie_description}</p>
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "8pc", width: "100%" }}>
                <h4 className='py-2'>Select Date :</h4>
                {


                    sort_show_by_date.map((date, index) => (
                        <div key={index}>
                            <div className='btn btn-primary py-2 font-weight-bold mx-2' onClick={() => { setSelectedDateIndex(index) }}>{date}</div>
                        </div>
                    ))

                }

            </div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "8pc", width: "100%" }}>
                <h4 className='py-2'>Select Show :</h4>
                {
                    props.shows.map((show, index) => (
                        <div key={index}>
                            {availableshows(show)}
                        </div>
                    ))
                    // sort_show_by_date[selectedDateIndex]}
                }
                {status ? (<p className='mx-2' style={{ color: "red", padding: "11px 0" }}>NO SHOW AVAILABLE </p>) : ""}
            </div>
        </div>
    </div>) : (
        <>

            <BookingSeat setIsMovieSelected={props.setIsMovieSelected} user={props.user} selectedShow={selectedShow} selectedMovie={props.selectedMovie} setIsShowSelected={setIsShowSelected} />

        </>
    );
}


export default BookShow;