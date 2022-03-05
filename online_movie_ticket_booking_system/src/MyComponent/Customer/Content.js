import React from 'react';
// import axios from 'axios';
// import BookingSeat from '../BookingSeat/BookingSeat';

const Content = (props) => {
        // const [isBook,setIsBook]=useState(false)

        function playtrailer(e) {

                window.location.assign(e.target.value)
        }

        function displayMovies(movie) {
                var status = false;
                props.shows.forEach((show) => {
                        if (show.screen_movie_id === movie.id) {
                                status = true;
                        }
                })
                if (status) {
                        return (<>
                                {props.searchData === "" ? (
                                        <div className="card m-5" style={{ width: "21pc" ,float:"left",background:"none"}} >
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
                                ) : (<div className="card m-5" style={{ width: "21pc",background:"none" }}>
                                        {movie.movie_name.toLowerCase().indexOf(props.searchData.toLowerCase()) !== -1 ? (<>

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
                                        </>) : ""}
                                </div>)}
                        </>)
                }

        }
        return (<>
                {props.movies.map((movie, index) => (
                        <div key={index} >
                                {displayMovies(movie)}
                        </div>
                ))}
                {/* {!isBook ? <BookingSeat />:"" } */}
        </>
        );
}

export default Content;