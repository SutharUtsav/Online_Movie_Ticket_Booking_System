import React, { useState } from 'react';
import styles from '../Movie/movie.module.css';
import axios from 'axios';

const ViewSnack = (props) => {

    const [isUpdate, setIsUpdate] = useState(false);

    // const [movieName, setMovieName] = useState(props.movie.movie_name);
    // const [movieLanguage, setMovieLanguage] = useState(props.movie.movie_language);
    // const [movieGenre, setMovieGenre] = useState(props.movie.movie_genre);
    // const [movieTrailerLink, setMovieTrailerLink] = useState(props.movie.movie_trailer_link);
    // const [movieBanner, setMovieBanner] = useState(props.movie.movie_banner);
    // const [movieImage, setMovieImage] = useState(props.movie.movie_image);
    // const [movieReleaseDate, setMovieReleaseDate] = useState(props.movie.movie_release_date.substring(0, 10));
    // const [movieDescription, setMovieDescription] = useState(props.movie.movie_description);
    // const [movieHours, setMovieHours] = useState(props.movie.movie_hours);




    const [snackAmount, setSnackAmount] = useState(props.snack.snack_amount);
    const [snackType, setSnackType] = useState(props.snack.snack_type);
    const [snackDescription, setSnackDescription] = useState(props.snack.snack_description);
    const [snackOffer, setSnackOffer] = useState(props.snack.snack_offer);
    const [snackImage, setSnackImage] = useState(props.snack.snack_image);

    // useState(() => {
    //     let str1 = movieReleaseDate.substring(0, 8);
    //     let str2 = (parseInt(movieReleaseDate.substring(8, 10)) + 1).toString();
    //     setMovieReleaseDate(str1 + str2)
    // }, [])

    function updatesnack(e) {
        e.preventDefault();

        let isMounted = true; //for cleanup

        try {

            axios.post('http://localhost:3001/api/updateSnack', {

                // movieId: props.movie.id,
                // movieName: movieName,
                // movieLanguage: movieLanguage,
                // movieGenre: movieGenre,
                // movieTrailerLink: movieTrailerLink,
                // movieReleaseDate: movieReleaseDate,
                // movieHours: movieHours,
                // movieBanner: movieBanner,
                // movieImage: movieImage,
                // movieDescription: movieDescription,

                snackId:props.snack.id,
                snackAmount: snackAmount,
                snackType: snackType,
                snackDescription: snackDescription,
                snackOffer: snackOffer,
                snackImage: snackImage,

            }).then((response) => {
                if (isMounted) {
                    if (response.data.message) {
                        alert(response.data.message);
                        setIsUpdate(false);
                        props.setSnack(null)
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
                    <form onSubmit={updatesnack}>
                                <div className="row">

                                    <div className="input-group col-lg-8 mb-4">
                                        <input id="snackAmount" type="text" name="snackAmount" placeholder="Enter Snack Name" className="form-control bg-white border-left-0 border-md" value={snackAmount} onChange={(e) => {
                                            setSnackAmount(e.target.value);
                                        }} required />
                                    </div>

                                    <div className="input-group col-lg-12 mb-4">
                                        <input id="snackType" type="text" name="snackType" placeholder="Enter Snack Type" className="form-control bg-white border-left-0 border-md" value={snackType} onChange={(e) => {
                                            setSnackType(e.target.value);
                                        }} required />
                                    </div>

                                    <div className="input-group col-lg-6 mb-4">
                                        <input id="snackDescription" type="text" name="snackDescription" placeholder="Enter snack description" className="form-control bg-white border-left-0 border-md" value={snackDescription} onChange={(e) => {
                                            setSnackDescription(e.target.value);
                                        }} required />
                                    </div>

                                    <div className="input-group col-lg-6 mb-4">
                                        <input id="snackOffer" type="text" name="snackOffer" placeholder="Enter snack offer" className="form-control bg-white border-left-0 border-md" value={snackOffer} onChange={(e) => {
                                            setSnackOffer(e.target.value);
                                        }} required />
                                    </div>




                                    <div className="input-group col-lg-6 mb-4  form-floating">
                                        <input id="snackImage" type="file" name="snackImage" className="form-control bg-white border-left-0 border-md" onChange={(e) => {
                                            if (e.target.files[0].type.includes('image')) {
                                                setSnackImage(e.target.files[0].name);
                                            }
                                            else {
                                                e.target.value = ""
                                                alert("Please Select Image File..")
                                            }
                                        }} required />
                                        <label htmlFor="snackImage" style={{ color: "black", marginLeft: "14px", marginTop: "-12px", opacity: "0.75", fontSize: "larger" }} >Enter snack Image</label>
                                    </div>

                                   

                                    

                                    <div className="form-group col-lg-12 mx-auto mb-0">
                                        <input type="submit" className="btn btn-outline-info py-2 font-weight-bold d-grid col-6 mx-auto" value="Add Snack" />
                                    </div>

                                </div>
                            </form>
                    </div>
                </div>
            </div>
        </>
    ) : (
        <>
            {/* <center><u><h2>{movieName}</h2></u></center> */}

            <div className={styles.container_detail}>
                <div style={{ float: "left" }}>
                <img src={process.env.PUBLIC_URL + "/Snacks/" + props.snack.snack_image} alt='movie-banner' width="300" height="300" />
                </div>
                <div style={{ marginLeft: "21pc", width: "36vw", fontSize: "larger" }}>
                    <p><b>Snack Amount : </b>{snackAmount}</p>
                    <p><b>snack Type :</b> {snackType}</p>
                    <p><b>Snack Description :</b> {snackDescription}</p>
                    <p><b>Snack Offer :</b> {snackOffer}</p>
                </div>
                <button type='button' className='btn btn-outline-primary py-2 font-weight-bold col-5' onClick={() => {
                    setIsUpdate(true)
                }}>Update</button>
                
            </div>
        </>);
}

export default ViewSnack;