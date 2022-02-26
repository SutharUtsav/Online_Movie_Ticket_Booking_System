import React,{useState} from 'react';
import styles from './booking.module.css'
import BookingSeat from './BookingSeat';

const BookShow = (props) => {

    const [isShowSelected,setIsShowSelected]=useState(false);
    const [selectedShow,setSelectedShow]=useState({});

    function availableshows(show) {
        if (show.screen_movie_id === props.selectedMovie.id) {
            const start_time = new Date()
            start_time.setTime(show.screen_show_start_time)
            const end_time = new Date()
            end_time.setTime(show.screen_show_end_time)
            return (
                <>
                    <button value={show.id} className='btn btn-primary py-2 font-weight-bold mx-2' style={{color:"white"}}  onClick={()=>{
                        setSelectedShow(show)
                        setIsShowSelected(true)
                    }}>{start_time.getHours()}:{start_time.getMinutes()} - {end_time.getHours()}:{end_time.getMinutes()}</button>
                </>
            )
        }

    }


    return (!isShowSelected)?(<div style={{ color: "white", height: "100%" }}>
        <button className={styles.back_btn} onClick={() => { props.setIsMovieSelected(false) }}><i className="fa fa-arrow-left" aria-hidden="true"></i></button>

        <center><u><h2>{props.selectedMovie.movie_name}</h2></u></center>

        <div className={styles.container_view}>
            <img src={process.env.PUBLIC_URL + "/Movies/" + props.selectedMovie.movie_banner} alt="MovieBanner" />

        </div>
        <div className={styles.container_detail}>
            <div style={{ float: "left",marginLeft:"2pc" }}>
                <img src={process.env.PUBLIC_URL + "/Movies/" + props.selectedMovie.movie_image} alt="MovieImage" />
            </div>
            <div style={{ marginLeft: "21pc", textAlign:"justify", fontSize: "larger" }}>
                <p><b>Movie Name : </b>{props.selectedMovie.movie_name}</p>
                <p><b>Movie Language :</b> {props.selectedMovie.movie_language}</p>
                <p><b>Movie Genre :</b> {props.selectedMovie.movie_genre}</p>
                <p><b>Total hours of movie :</b> {props.selectedMovie.movie_hours}</p>
                <p><b>Movie Release Date :</b> {props.selectedMovie.movie_release_date}</p>
                <p><b>Movie Description :</b> {props.selectedMovie.movie_description}</p>
            </div>
            <div style={{ display: "flex",justifyContent:"center",marginTop:"8pc", width: "100%" }}>
                <h5 className='py-2'>Select Any Show :</h5>
                {
                    props.shows.map((show, index) => (
                        <div key={index}>
                            {availableshows(show)}
                        </div>
                    ))
                }
            </div>
        </div>
    </div>):(
        <>
        <BookingSeat selectedShow={selectedShow} setIsShowSelected={setIsShowSelected}/>
        </>
    );
}


export default BookShow;