import React from 'react';
import useWindowDimensions from "../useWindowDimensions";
import styles from './customer.module.css'

const Content = (props) => {

        const {height,width}=useWindowDimensions();
  
        
        var noSearch = false;
        function playtrailer(e) {

                window.location.assign(e.target.value)
        }

        function displayMovies(movie) {
                var status = false;
                props.shows.forEach((show) => {
                        
                        const today = new Date()
                        if (show.screen_movie_id === movie.id && show.screen_show_start_time > today.getTime()) {
                                status = true;
                        }
                })
                if (status) {
                        return (<>
                                {props.searchData === "" ? (
                                        <div className="card m-5" style={{ width: "21pc", float: "left", background: "none" }} >
                                                <img src={process.env.PUBLIC_URL + "/Movies/" + movie.movie_image} alt='movie-banner' width="300" height="400" className="card-img-top" />
                                                <div className="card-body">
                                                        <button className="btn btn-outline-success py-2 font-weight-bold col-5" style={{ marginLeft: "7px", marginTop: "10px" }}
                                                                onClick={() => {
                                                                        props.setIsMovieSelected(true)
                                                                        props.setSelectedMovie(movie)
                                                                }} ><i className="fa fa-ticket"></i> Book Now</button>
                                                        <button className="btn btn-outline-danger py-2 font-weight-bold col-5" style={{ marginLeft: "2pc", marginTop: "10px" }}
                                                                value={movie.movie_trailer_link}
                                                                onClick={playtrailer}><i className="fa fa-play" aria-hidden="true"></i> Play Trailer</button>
                                                </div>

                                        </div>
                                ) : (<div >
                                        {movie.movie_name.toLowerCase().indexOf(props.searchData.toLowerCase()) !== -1 ? (<>
                                                <div className="card m-5" style={{ width: "21pc", background: "none", float: "left" }}>
                                                        <img src={process.env.PUBLIC_URL + "/Movies/" + movie.movie_image} alt='movie-banner' width="300" height="400" className="card-img-top" />
                                                        <div className="card-body">
                                                                <button className="btn btn-outline-success py-2 font-weight-bold col-5" style={{ marginLeft: "7px", marginTop: "10px" }}
                                                                        onClick={() => {
                                                                                props.setIsMovieSelected(true)
                                                                                props.setSelectedMovie(movie)
                                                                                props.setSearchData("")
                                                                        }} ><i className="fa fa-ticket"></i> Book Now</button>
                                                                <button className="btn btn-outline-danger py-2 font-weight-bold col-5" style={{ marginLeft: "2pc", marginTop: "10px" }}
                                                                        value={movie.movie_trailer_link}
                                                                        onClick={playtrailer}><i className="fa fa-play" aria-hidden="true"></i> Play Trailer</button>
                                                        </div>
                                                </div>
                                        </>) : <>{noSearch = true}</>}
                                </div>)}
                        </>)
                }

        }
        return (<div style={ width >= 1024 ? { color: "white" }:{color: "white",marginTop:"16pc" }}>
                {props.searchData === "" ? (
                        <>
                                <div className={styles.section_header_1}>
                                        <h3 style={{ marginTop: "3pc", textAlign:"center" }}>Now Showing</h3>
                                </div>
                        </>) :(<div className={styles.section_header_1}> <h3 style={{ marginTop: "2pc", marginLeft: "3pc" }}>Searching Result</h3></div>)}

                        <div  style={ width>=1024 ? {marginLeft:"10%"}:{}}>
                {props.movies.map((movie, index) => (
                        <div key={index} className={styles.img_wrapper}>
                                {displayMovies(movie)}
                        </div>
                ))}
                
                {noSearch?<p style={{ color: "red", padding: "11px 0"}}>Sorry, No Search result by {props.searchData} </p>:""}
                </div>
        </div>
        );
}

export default Content;