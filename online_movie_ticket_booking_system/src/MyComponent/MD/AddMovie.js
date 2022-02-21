import React from 'react';
import styles from './MD.module.css';

const AddMovie = (props) => {
    return (props.trigger) ? (
        <div className={styles.popup}>
            <div className={styles.popup_inner}>
                <button className={styles.close_btn} onClick={() => { props.setTrigger(false) }}><i class="fa fa-close" style={{fontSize:"24px"}}></i></button>

                <div className="container" >
                    <div className="row py-5 mt-4 align-items-center" style={{position:"relative",width:"68vw"}}>
                        <div className="col-md-7 col-lg-6 ml-auto">
                            <form >
                                <div className="row">

                                    <div className="input-group col-lg-8 mb-4">
                                        <input id="movieName" type="text" name="movieName" placeholder="Enter Movie Name" className="form-control bg-white border-left-0 border-md" required/>
                                    </div>

                                    <div className="input-group col-lg-12 mb-4">
                                        <input id="movieLanguage" type="text" name="movieLanguage" placeholder="Enter Movie Language" className="form-control bg-white border-left-0 border-md" />
                                    </div>

                                    <div className="input-group col-lg-6 mb-4">
                                        <input id="movieGenre" type="text" name="movieGenre" placeholder="Enter Movie Genre" className="form-control bg-white border-left-0 border-md" required/>
                                    </div>

                                    <div className="input-group col-lg-6 mb-4">
                                        <input id="movieTrailerLink" type="text" name="movieTrailerLink" placeholder="Enter Trailer Link" className="form-control bg-white border-left-0 border-md" required/>
                                    </div>

                                    <div className="input-group col-lg-12 mb-4">
                                        <input id="movieHours" type="time" name="movieHours" placeholder="Enter Movie Hours" className="form-control bg-white border-md border-left-0 pl-3" required/>
                                        <label for="movieHours" style={{marginLeft:"4px",paddingTop:"6px"}} >Enter Movie Hours</label>
                                    </div>

                                    <div className="input-group col-lg-6 mb-4">
                                        <input id="movieBanner" type="file" name="movieBanner" className="form-control bg-white border-left-0 border-md" required/>
                                        <label for="movieBanner" style={{marginLeft:"4px",paddingTop:"6px"}} >Enter Movie Poster</label>
                                    </div>

                                    <div className="input-group col-lg-6 mb-4">
                                        <input id="movieReleaseDate" type="date" name="movieReleaseDate" placeholder="Enter Movie Release Date" className="form-control bg-white border-left-0 border-md" required/>
                                        <label for="movieReleaseDate" style={{marginLeft:"4px",paddingTop:"6px"}} >Enter Movie Release Date</label>
                                    </div>

                                    <div className="input-group col-lg-6 mb-4">
                                        <textarea id="movieDescription" name="movieDescription" placeholder="Enter Movie Description" className="form-control bg-white border-left-0 border-md"  required/>
                                    </div>

                                    <div className="form-group col-lg-12 mx-auto mb-0">
                                        <button className="btn btn-outline-primary py-2 font-weight-bold d-grid col-6 mx-auto" >Add Movie</button>
                                    </div>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : "";
}


export default AddMovie;