import React, { useState, useEffect } from 'react';
import styles from './movie.module.css';
import axios from 'axios';
import ListMovies from './ListMovies';
import ViewMovie from './ViewMovie'

const Movie = () => {
    const [selectedMovie,setSelectedMovie]=useState(null)
    const [movies, setMovies] = useState([]);
    const [isAddMovie, setIsAddMovie] = useState(false);
    const [movieName, setMovieName] = useState("");
    const [movieLanguage, setMovieLanguage] = useState("");
    const [movieGenre, setMovieGenre] = useState("");
    const [movieTrailerLink, setMovieTrailerLink] = useState("");
    const [movieBanner, setMovieBanner] = useState(null);
    const [movieImage,setMovieImage] = useState(null);
    const [movieReleaseDate, setMovieReleaseDate] = useState("");
    const [movieDescription, setMovieDescription] = useState("");
    const [movieHours, setMovieHours] = useState("02:00")

    useEffect(() => {
        let isMounted = true; //for cleanup
        try {
            axios.get('http://localhost:3001/api/getMovies').then((response) => {
                if(isMounted){
                    if (response.data.movies) {
                        setMovies(response.data.movies)
                    }
                }
            })
            return ()=>{isMounted=false};
        }
        catch (error) {
            console.log(error)
        }
    }, [movies])

    function addmovie(e) {
        e.preventDefault();
        //console.log(movieName, movieLanguage, movieGenre, movieTrailerLink, movieBanner, movieReleaseDate, movieDescription, movieHours);
        try {
            axios.post('http://localhost:3001/api/insertMovie', {
                movieName: movieName,
                movieLanguage: movieLanguage,
                movieGenre: movieGenre,
                movieTrailerLink: movieTrailerLink,
                movieReleaseDate: movieReleaseDate,
                movieHours: movieHours,
                movieBanner: movieBanner,
                movieImage:movieImage,
                movieDescription: movieDescription,

            }).then((response) => {
                if (response.data.message) {
                    alert(response.data.message);
                    setMovieName("");
                    setMovieGenre("");
                    setMovieLanguage("");
                    setMovieBanner(null);
                    setMovieImage(null);
                    setMovieDescription("");
                    setMovieHours("02:00");
                    setMovieReleaseDate("");
                    setMovieTrailerLink("");
                    setIsAddMovie(false)
                }
            });
        }
        catch (error) {
            console.log(error)
        }
    }

    return (selectedMovie===null)?(

        <div className={styles.content}>
            <button className={styles.addmoviebutton} onClick={() => {
                setIsAddMovie(!isAddMovie)
            }}><i className="fa fa-plus px-2" aria-hidden="true"></i>Add Movie</button>

            {(isAddMovie) ? (

                <div className="container" >
                    <div className="row py-5 mt-4 align-items-center" >
                        <div className="col-md-7 col-lg-6 ml-auto">
                            <form onSubmit={addmovie}>
                                <div className="row">

                                    <div className="input-group col-lg-8 mb-4">
                                        <input id="movieName" type="text" name="movieName" placeholder="Enter Movie Name" className="form-control bg-white border-left-0 border-md" value={movieName} onChange={(e) => {
                                            setMovieName(e.target.value);
                                        }} required />
                                    </div>

                                    <div className="input-group col-lg-12 mb-4">
                                        <input id="movieLanguage" type="text" name="movieLanguage" placeholder="Enter Movie Language" className="form-control bg-white border-left-0 border-md" value={movieLanguage} onChange={(e) => {
                                            setMovieLanguage(e.target.value);
                                        }} required />
                                    </div>

                                    <div className="input-group col-lg-6 mb-4">
                                        <input id="movieGenre" type="text" name="movieGenre" placeholder="Enter Movie Genre" className="form-control bg-white border-left-0 border-md" value={movieGenre} onChange={(e) => {
                                            setMovieGenre(e.target.value);
                                        }} required />
                                    </div>

                                    <div className="input-group col-lg-6 mb-4">
                                        <input id="movieTrailerLink" type="text" name="movieTrailerLink" placeholder="Enter Trailer Link" className="form-control bg-white border-left-0 border-md" value={movieTrailerLink} onChange={(e) => {
                                            setMovieTrailerLink(e.target.value);
                                        }} required />
                                    </div>

                                    <div className="input-group col-lg-12 mb-4 form-floating">
                                        <input id="movieHours" type="time" name="movieHours" placeholder="Enter Movie Hours" className="form-control bg-white border-md border-left-0 pl-3" value={movieHours} onChange={(e) => {
                                            setMovieHours(e.target.value);
                                        }} required />
                                        <label htmlFor="movieHours" style={{ color: "black", marginLeft: "14px", marginTop: "-5px", opacity: "0.75", fontSize: "larger" }}>Enter Movie Hours</label>
                                    </div>

                                    <div className="input-group col-lg-6 mb-4  form-floating">
                                        <input id="movieBanner" type="file" name="movieBanner" className="form-control bg-white border-left-0 border-md" onChange={(e) => {
                                            if (e.target.files[0].type.includes('image')) {
                                                setMovieBanner(e.target.files[0].name);
                                            }
                                            else {
                                                e.target.value = ""
                                                alert("Please Select Image File..")
                                            }
                                        }} required />
                                        <label htmlFor="movieBanner" style={{ color: "black", marginLeft: "14px", marginTop: "-12px", opacity: "0.75", fontSize: "larger" }} >Enter Movie Banner</label>
                                    </div>

                                    <div className="input-group col-lg-6 mb-4  form-floating">
                                        <input id="movieImage" type="file" name="movieImage" className="form-control bg-white border-left-0 border-md" onChange={(e) => {
                                            if (e.target.files[0].type.includes('image')) {
                                                setMovieImage(e.target.files[0].name);
                                            }
                                            else {
                                                e.target.value = ""
                                                alert("Please Select Image File..")
                                            }
                                        }} required />
                                        <label htmlFor="movieImage" style={{ color: "black", marginLeft: "14px", marginTop: "-12px", opacity: "0.75", fontSize: "larger" }} >Enter Movie Image</label>
                                    </div>

                                    <div className="input-group col-lg-6 mb-4 form-floating">
                                        <input id="movieReleaseDate" type="date" name="movieReleaseDate" placeholder="Enter Movie Release Date" className="form-control bg-white border-left-0 border-md" value={movieReleaseDate} onChange={(e) => {
                                            setMovieReleaseDate(e.target.value);
                                        }} required />
                                        <label htmlFor="movieReleaseDate" style={{ color: "black", marginLeft: "14px", marginTop: "-12px", opacity: "0.75", fontSize: "larger" }} >Enter Movie Release Date</label>
                                    </div>

                                    <div className="input-group col-lg-6 mb-4">
                                        <textarea id="movieDescription" name="movieDescription" placeholder="Enter Movie Description" className="form-control bg-white border-left-0 border-md" value={movieDescription} onChange={(e) => {
                                            setMovieDescription(e.target.value);
                                        }} required />
                                    </div>

                                    <div className="form-group col-lg-12 mx-auto mb-0">
                                        <input type="submit" className="btn btn-outline-info py-2 font-weight-bold d-grid col-6 mx-auto" value="Add Movie" />
                                    </div>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>) : ""}
            <div className="container-fluid "   >
                <div className="row" style={{ overflowX: 'auto', color: "white" }} >
                    <ListMovies movies={movies} setSelectedMovie = {setSelectedMovie}/>
                </div>
            </div>
        </div>
    ):(
        <div className={styles.content}>
            <button className={styles.close_btn} onClick={() => { setSelectedMovie(null) }}><i className="fa fa-close" style={{ fontSize: "24px" }}></i></button>
            <ViewMovie movie={selectedMovie} setMovie={setSelectedMovie}/>
        </div>
    );
}

export default Movie;