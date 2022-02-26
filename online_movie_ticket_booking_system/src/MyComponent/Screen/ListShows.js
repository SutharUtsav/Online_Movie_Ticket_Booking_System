import React, { useState } from 'react';
import styles from './screen.module.css'
import axios from 'axios';

const ListShows = (props) => {
    let x = 0;

    const [showId,setShowId]=useState(0);
    const [isUpdateShow, setIsUpdateShow] = useState(false);
    const [showStartTime,setshowStartTime]=useState("")
    const [selectedMovieID, setSelectedMovieID] = useState(0);
    const [seletedMovieHours, setSelectedMovieHours] = useState("");

    
    function deleteShow(e) {
        try {
            //console.log(e.target.value)
            axios.delete(`http://localhost:3001/api/deleteShow/${e.target.value}`)
                .then((response) => { alert(response.data.message) })
        } catch (error) {
            console.log(error)
        }
    }

    function editshow(e){
        e.preventDefault();
        //console.log(showStartTime, selectedScreen)
        const start_time = new Date();
        start_time.setHours(showStartTime.substring(0, 2))
        // console.log(showTime.substring(0, 2))
        // console.log(showTime.substring(3, 5))
        start_time.setMinutes(showStartTime.substring(3, 5))
        start_time.setFullYear(2022);
        start_time.setDate(12);
        start_time.setMonth(2);

        console.log(seletedMovieHours)
        const movie_hours = new Date();
        movie_hours.setHours(seletedMovieHours.substring(0, 2))
        // console.log(showTime.substring(0, 2))
        // console.log(showTime.substring(3, 5))
        movie_hours.setMinutes(seletedMovieHours.substring(3, 5))
        movie_hours.setFullYear(2022);
        movie_hours.setDate(12);
        movie_hours.setMonth(2);

        const end_time = new Date()
        end_time.setHours(movie_hours.getHours() + start_time.getHours())
        end_time.setMinutes(movie_hours.getMinutes() + start_time.getMinutes())

        if (end_time.getDate() === 24) {
            end_time.setDate(12)
        }
        else {
            end_time.setDate(13)
        }
        // end_time.setFullYear(2022);
        // end_time.setDate();
        // end_time.setMonth(2);

        // end_time.setTime(movie_hours.getTime() + start_time.getTime());

        console.log(start_time)
        console.log(movie_hours)
        console.log(end_time)

        var status = true;
        props.shows.forEach((show) => {
            console.log(show)
            if (show.screen_no === props.screenNo) {
                const st = new Date();
                st.setTime(show.screen_show_start_time)
                const et = new Date();
                et.setTime(show.screen_show_end_time);
                // console.log(st.getHours())
                // console.log(et.getHours())
                if ((start_time.getHours() <= st.getHours() & end_time.getHours() >= st.getHours()) |
                    (st.getHours() < start_time.getHours() & et.getHours() > start_time.getHours())) {
                    alert("This slot is already allocated")
                    status = false;
                }
                else if (start_time.getHours() === et.getHours()) {
                    if (start_time.getMinutes() < et.getMinutes()) {
                        alert("This slot is already allocated")
                        status = false;
                    }
                }
            }
        })
        if (status) {
            console.log("axios")
            try {
                axios.post('http://localhost:3001/api/updateShow', {
                    showid:showId,
                    movieId: selectedMovieID,
                    showStartTime: start_time.getTime(),
                    showEndtime: end_time.getTime(),
                    privateScreen: false,
                    screenNo: props.screenNo,
                }).then((response) => {
                    if (response.data.message) {
                        alert(response.data.message)
                        setIsUpdateShow(false);
                    }
                });
            }
            catch (error) {
                console.log(error)
            }
        }
    }

    function displayShows(show) {
        if (show.screen_no === props.screenNo) {
            var movie_name = "";
            props.movies.forEach(movie => {
                if (movie.id === show.screen_movie_id) {
                    movie_name = movie.movie_name
                }
            });

            const start_time = new Date();
            start_time.setTime(show.screen_show_start_time)
            const end_time = new Date();
            end_time.setTime(show.screen_show_end_time);

            return (
                <>
                    <td>{++x} </td>
                    <td>{movie_name}</td>
                    <td>{start_time.getHours()}:{start_time.getMinutes()}</td>
                    <td>{end_time.getHours()}:{end_time.getMinutes()}</td>
                    <td>
                        <div style={{ display: "inline" }}>
                            <button value={show.id} className="btn btn-danger" onClick={deleteShow} >Remove</button>
                            <button value={show.id} className="btn btn-primary mx-2 col-4" onClick={() => {
                                const d = new Date()
                                d.setTime(show.screen_show_start_time);
                                if(d.getHours() < 10){
                                    setshowStartTime("0"+d.getHours()+":"+d.getMinutes());
                                }
                                else{
                                    setshowStartTime(d.getHours()+":"+d.getMinutes());
                                }
                                setShowId(show.id);
                                setIsUpdateShow(!isUpdateShow);
                                setSelectedMovieID(show.screen_movie_id);
                                const e = new Date()
                                e.setTime(show.screen_show_end_time);
                                const diff = new Date()
                                diff.setHours(e.getHours() - d.getHours())
                                diff.setMinutes(e.getMinutes() - d.getMinutes())
                                //console.log("diff",diff)
                                if(diff.getHours() < 10){
                                    setSelectedMovieHours("0"+diff.getHours()+":"+d.getMinutes());
                                }
                                else{
                                    setSelectedMovieHours(diff.getHours()+":"+diff.getMinutes())
                                }
                                
                            }} >Edit</button>
                        </div>
                    </td>

                </>
            )
        }
    }

    function getmovielist(movie) {
        const today = new Date();
        today.setMonth(today.getMonth()+1)
        const releaseDate = new Date();
        releaseDate.setFullYear(movie.movie_release_date.substring(0, 4))
        releaseDate.setMonth(movie.movie_release_date.substring(5, 7))
        releaseDate.setDate(movie.movie_release_date.substring(8, 10))
        if (releaseDate.getTime() <= today.getTime()) {
            return (
                <>
                    <input className='form-check-input mx-2 mb-2 ' type="radio" checked={selectedMovieID===movie.id ? true:false} name="radioNoLabel" id="radioNoLabel1" value={movie.id} onChange={(e) => { setSelectedMovieID(e.target.value); setSelectedMovieHours(movie.movie_hours) }} required/>{movie.movie_name}
                </>
            )
        }

    }


    return (!isUpdateShow) ? (
        <>
            <p style={{ fontSize: "35px", fontWeight: "bold", marginLeft: "30%", textDecorationLine: "underline" }}> List of Shows (Screen {props.screenNo})</p>
            <table className="table" style={{ color: "white", marginLeft: "5%", width: "72%" }}>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Movie Name</th>
                        <th>Show Starting Time</th>
                        <th>Show Ending Time</th>
                    </tr>
                </thead>
                <tbody>
                    {props.shows.map((show, index) => (
                        <tr key={show.id}>
                            {displayShows(show)}
                        </tr>
                    ))}
                </tbody>
            </table>
        </>) : (
        <>
            <div className="container" >
                <div className="row py-5 mt-4 align-items-center" >
                    <div className="col-md-7 col-lg-6 ml-auto">
                    <button className={styles.close_btn} onClick={() => { setIsUpdateShow(false) }}><i className="fa fa-close" style={{ fontSize: "24px" }}></i></button>

                            
                        <p>Screen {props.screenNo}</p>
                        <form onSubmit={editshow}>
                            <div className="row">
                        
                                <div className="input-group col-lg-8 mb-4 form-floating" style={{ padding: "0px" }}>
                                    <input id="showStartTime" type="time" name="showStartTime" placeholder="Enter Show Time" className="form-control bg-white border-left-0 border-md"  value={showStartTime}  onChange={(e) => {
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
                                    <input type="submit" className="btn btn-outline-info py-3 mt-5 font-weight-bold d-grid col-6 mx-auto" value="Edit Show" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ListShows;