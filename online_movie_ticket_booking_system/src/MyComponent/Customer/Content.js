import React from 'react';

const Content = (props) => {
    return (<>
        {props.movies.map((movie,index)=>(
                <div key={index} className="d-flex justify-content-start m-3 " style={{ width:"min-content"}} >
                    <img src={movie.Poster} alt='movies'></img>
                </div>
        ))}
        
        </>
        );
}


export default Content;