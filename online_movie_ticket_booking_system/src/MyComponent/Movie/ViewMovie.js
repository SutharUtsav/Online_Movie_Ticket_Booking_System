import React, { useState } from 'react';
import styles from './movie.module.css';
import axios from 'axios';

const ViewMovie = (props) => {
    const [isUpdate, setIsUpdate] = useState(false);
    const [movieName, setMovieName] = useState(props.movie.movie_name);
    const [movieLanguage, setMovieLanguage] = useState(props.movie.movie_language);
    const [movieGenre, setMovieGenre] = useState(props.movie.movie_genre);
    const [movieTrailerLink, setMovieTrailerLink] = useState(props.movie.movie_trailer_link);
    const [movieBanner, setMovieBanner] = useState(props.movie.movie_banner);
    const [movieImage, setMovieImage] = useState(props.movie.movie_image);
    const [movieReleaseDate, setMovieReleaseDate] = useState(props.movie.movie_release_date.substring(0, 10));
    const [movieDescription, setMovieDescription] = useState(props.movie.movie_description);
    const [movieHours, setMovieHours] = useState(props.movie.movie_hours);

    useState(() => {
        let str1 = movieReleaseDate.substring(0, 8);
        let str2 = (parseInt(movieReleaseDate.substring(8, 10)) + 1).toString();
        setMovieReleaseDate(str1 + str2)
    }, [])

    function updatemovie(e) {
        e.preventDefault();

        let isMounted = true; //for cleanup

        try {

            axios.post('http://localhost:3001/api/updateMovie', {

                movieId: props.movie.id,
                movieName: movieName,
                movieLanguage: movieLanguage,
                movieGenre: movieGenre,
                movieTrailerLink: movieTrailerLink,
                movieReleaseDate: movieReleaseDate,
                movieHours: movieHours,
                movieBanner: movieBanner,
                movieImage: movieImage,
                movieDescription: movieDescription,

            }).then((response) => {
                if (isMounted) {
                    if (response.data.message) {
                        alert(response.data.message);
                        setIsUpdate(false);
                        props.setMovie(null)
                    }
                }
            });
            return () => { isMounted = false };


        }
        catch (error) {
            console.log(error)
        }

    }

    return (isUpdate) ? (
        <>
            <div className="container" >
                <div className="row py-5 mt-4 align-items-center" >
                    <div className="col-md-7 col-lg-6 ml-auto">
                        <form onSubmit={updatemovie}>
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
                                    <input type="submit" className="btn btn-outline-info py-2 font-weight-bold d-grid col-6 mx-auto" value="Update Movie" />
                                </div>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    ) : (
        <>
            <center><u><h2>{movieName}</h2></u></center>

            <div className={styles.container_view}>
                <img src={process.env.PUBLIC_URL + "/Movies/" + movieBanner} alt="MovieBanner" />

            </div>
            <div className={styles.container_detail}>
                <div style={{ float: "left" }}>
                    <img src={process.env.PUBLIC_URL + "/Movies/" + movieImage} alt="MovieImage" />
                </div>
                <div style={{ marginLeft: "21pc", width: "36vw", fontSize: "larger" }}>
                    <p><b>Movie Name : </b>{movieName}</p>
                    <p><b>Movie Language :</b> {movieLanguage}</p>
                    <p><b>Movie Genre :</b> {movieGenre}</p>
                    <p><b>Total hours of movie :</b> {movieHours}</p>
                    <p><b>Movie Release Date :</b> {movieReleaseDate}</p>
                    <p><b>Movie Description :</b> {movieDescription}</p>
                </div>
                <button type='button' className='btn btn-outline-primary py-2 font-weight-bold col-5' onClick={() => {
                    setIsUpdate(true)
                }}>Update</button>
                <button className="btn btn-outline-danger py-2 font-weight-bold col-5" style={{ marginLeft: "2pc", marginTop: "10px" }}
                    value={movieTrailerLink}
                    onClick={(e)=>{
                        window.location.assign(e.target.value)
                    }}><i className="fa fa-play" aria-hidden="true"></i> Play Trailer</button>
            </div>
        </>);
}

export default ViewMovie;