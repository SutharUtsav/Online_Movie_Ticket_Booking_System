import React from 'react';
// import YouTube from 'react-youtube';

const Content = (props) => {
        function playtrailer(e){
                window.location.assign(e.target.value)
        }

        return (<>
                {props.movies.map((movie, index) => (
                        <div key={index} className="ustify-content-start m-3 " style={{ width: "min-content" }} >
                                <img src={process.env.PUBLIC_URL + "/Movies/" + movie.movie_image} alt='movie-banner' width="300" height="400" />
                                <button className="btn btn-outline-success py-2 font-weight-bold col-5" style={{ marginLeft: "7px", marginTop: "10px" }} ><i className="fa fa-ticket"></i> Book Now</button>
                                <button className="btn btn-outline-danger py-2 font-weight-bold col-5" style={{ marginLeft: "2pc", marginTop: "10px" }} 
                                value={movie.movie_trailer_link}
                                onClick={playtrailer}><i className="fa fa-play" aria-hidden="true"></i> Play Trailer</button>
                        </div>
                ))}

        </>
        );
}


export default Content;