import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ListShows from './ListShows';
import styles from './screen.module.css';

const Show = (props) => {
    const [showStartTime, setshowStartTime] = useState("");
    const [showDate, setshowDate] = useState("");
    const [shows, setShows] = useState([])
    const [selectedMovieID, setSelectedMovieID] = useState(0);
    const [seletedMovieHours, setSelectedMovieHours] = useState("");

    useEffect(() => {
        let isMounted = true; //for cleanup
        try {

            axios.get('http://localhost:3001/api/getShows').then((response) => {
                if (isMounted) {
                    setShows(response.data.shows)
                }
            })

            return () => { isMounted = false };
        }
        catch (error) {
            console.log(error)
        }

    }, [props])

    function addshow(e) {
        e.preventDefault();
        //console.log(showDate)
        // console.log(shows)
        //console.log(showStartTime, selectedScreen)
        const start_time = new Date();
        start_time.setHours(showStartTime.substring(0, 2))
        // console.log(showTime.substring(0, 2))
        // console.log(showTime.substring(3, 5))
        start_time.setMinutes(showStartTime.substring(3, 5))
        start_time.setFullYear(showDate.substring(0, 4));
        start_time.setDate(showDate.substring(8, 10));
        start_time.setMonth(parseInt(showDate.substring(5, 7)) - 1);

        const today = new Date()
        if (start_time.getTime() < today.getTime()) {
            alert("Please set upcomming shows")
        }
        else {
            const movie_hours = new Date();
            movie_hours.setHours(seletedMovieHours.substring(0, 2))
            // console.log(showTime.substring(0, 2))
            // console.log(showTime.substring(3, 5))
            movie_hours.setMinutes(seletedMovieHours.substring(3, 5))
            movie_hours.setFullYear(1970);
            movie_hours.setDate(1);
            movie_hours.setMonth(0);

            const end_time = new Date()
            end_time.setTime(start_time.getTime() - movie_hours.getTime())
            
            var status = true;
            shows.forEach((show) => {
                if (show.screen_no === props.screenNo) {
                    const st = new Date();
                    st.setTime(show.screen_show_start_time)
                    const et = new Date();
                    et.setTime(show.screen_show_end_time);
                    // console.log(st.getHours())
                    // console.log(et.getHours())

                    if (start_time.getTime() < st.getTime()) {
                        if (end_time.getTime() > st.getTime() & end_time.getTime() < et.getTime()) {
                            alert("This slot is already allocated")
                            status = false;
                        }
                    }
                    else if (start_time.getTime() > st.getTime() & start_time.getTime() < et.getTime()) {
                        alert("This slot is already allocated")
                        status = false;
                    }

                }
            })
            if (status) {
                //alert("Successfully added")
                // console.log(start_time.getTime())
                // console.log(end_time.getTime())
                try {
                    axios.post('http://localhost:3001/api/insertShow', {
                        movieId: selectedMovieID,
                        showStartTime: start_time.getTime(),
                        showEndtime: end_time.getTime(),
                        privateScreen: false,
                        screenNo: props.screenNo,
                    }).then((response) => {
                        if (response.data.message) {
                            alert(response.data.message);
                        }
                        if (response.data.success) {
                            alert(response.data.success)
                            setshowStartTime("")
                            setshowDate("")
                            props.setIsAddShow(false);
                        }
                    });
                }
                catch (error) {
                    console.log(error)
                }
            }
        }

    }

    function getmovielist(movie) {
        const today = new Date();
        today.setMonth(today.getMonth() + 1)
        const releaseDate = new Date();
        releaseDate.setFullYear(movie.movie_release_date.substring(0, 4))
        releaseDate.setMonth(movie.movie_release_date.substring(5, 7))
        releaseDate.setDate(movie.movie_release_date.substring(8, 10))
        if (releaseDate.getTime() < today.getTime()) {
            return (
                <>
                    <input className='form-check-input mx-2 mb-2 ' type="radio" name="radioNoLabel" id="radioNoLabel1" value={movie.id} onChange={(e) => { setSelectedMovieID(e.target.value); setSelectedMovieHours(movie.movie_hours) }} required />{movie.movie_name}
                </>
            )
        }

    }

    return (
        <div style={{ marginTop: "2pc", height: "93%" }}>
            <button className={styles.addshowbutton} onClick={() => {
                props.setIsAddShow(!props.isAddShow)
            }}><i className="fa fa-plus px-2" aria-hidden="true"></i>Add Show</button>

            {props.isAddShow ? (
                <div className="container" >
                    <div className="row py-5 mt-4 align-items-center" >
                        <div className="col-md-7 col-lg-6 ml-auto">
                            <p>Screen {props.screenNo}</p>
                            <form onSubmit={addshow}>
                                <div className="row">

                                    <div className="input-group col-lg-8 mb-4 form-floating" style={{ padding: "0px" }}>
                                        <input id="showStartTime" type="date" name="showStartTime" placeholder="Enter Show Time" className="form-control bg-white border-left-0 border-md" value={showDate} onChange={(e) => {
                                            setshowDate(e.target.value);
                                        }} required />
                                        <label htmlFor="showStartTime" style={{ color: "black", marginLeft: "14px", marginTop: "-5px", opacity: "0.75", fontSize: "larger" }}>Enter Show Date</label>
                                    </div>

                                    <div className="input-group col-lg-8 mb-4 form-floating" style={{ padding: "0px" }}>
                                        <input id="showStartTime" type="time" name="showStartTime" placeholder="Enter Show Time" className="form-control bg-white border-left-0 border-md" value={showStartTime} onChange={(e) => {
                                            setshowStartTime(e.target.value);
                                        }} required />
                                        <label htmlFor="showStartTime" style={{ color: "black", marginLeft: "14px", marginTop: "-5px", opacity: "0.75", fontSize: "larger" }}>Enter Show Time</label>
                                    </div>

                                    <div className='form-control bg-white border-left-0 border-md' >
                                        <p>Select Movie</p>
                                        {props.movies.map((movie, index) => (
                                            <div key={index} className="my-4" >
                                                {getmovielist(movie)}
                                                {/* <input className='form-check-input mx-2 mb-2 ' type="radio" name="radioNoLabel" id="radioNoLabel1" value={movie.id} onChange={(e) => { setSelectedMovieID(e.target.value); setSelectedMovieHours(movie.movie_hours) }} />{movie.movie_name} */}
                                            </div>
                                        ))}
                                    </div>

                                    <div className="form-group col-lg-12 mx-auto mb-0">
                                        <input type="submit" className="btn btn-outline-info py-3 mt-5 font-weight-bold d-grid col-6 mx-auto" value="Add Show" />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>) : (
                <>
                    <ListShows shows={shows} movies={props.movies} screenNo={props.screenNo} setIsDeletedShow={props.setIsDeletedShow} setIsUpdatedShow={props.setIsUpdatedShow}/>
                </>)}


        </div>
    );
}

export default Show;
