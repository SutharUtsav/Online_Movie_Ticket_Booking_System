import React from 'react';
import axios from 'axios';

const ListMovies = (props) => {

    function deletemovie(e){
        try{
            axios.delete(`http://localhost:3001/api/deleteMovie/${e.target.value}`)
            .then((response)=>{ 
                alert(response.data.message)
                props.setSelectedMovie(null)
            })
        }catch(error){
            console.log(error)
        }
    }

    return (
        <>
        {props.movies.map((movie,index)=>(
                <div key={movie.id} className= "justify-content-start m-3" style={{ width:"min-content"}} >
                    <img src={process.env.PUBLIC_URL + "/Movies/" + movie.movie_image} alt='movie-banner' width="300" height="400" />
                    <button className="btn btn-outline-info py-2 font-weight-bold col-5" style={{ marginLeft: "7px", marginTop: "10px" }} onClick={()=>{
                        props.setSelectedMovie(movie)
                    }}> View</button>
                    <button className="btn btn-outline-danger py-2 font-weight-bold col-5" style={{ marginLeft: "2pc", marginTop: "10px" }} value={movie.id} onClick={deletemovie}>Delete</button>
                </div>
        ))}
        
        </>);
}

export default ListMovies;