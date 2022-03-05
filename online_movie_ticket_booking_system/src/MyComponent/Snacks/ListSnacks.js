import React from 'react';
import axios from 'axios';

const ListSnacks = (props) => {


    function deletesnack(e){
        try{
            axios.delete(`http://localhost:3001/api/deleteSnack/${e.target.value}`)
            .then((response)=>{ 
                alert(response.data.message)
                props.setSelectedSnack(null)
            })
        }catch(error){
            console.log(error)
        }
    }

    return (
        <>
      
        {props.snacks.map((snack,index)=>(
                <div key={snack.id} className= "justify-content-start m-3" style={{ width:"min-content"}} >
                 <img src={process.env.PUBLIC_URL + "/Snacks/" + snack.snack_image} alt='snack_image' width="300" height="300" />
                    <button className="btn btn-outline-info py-2 font-weight-bold col-5" style={{ marginLeft: "7px", marginTop: "10px" }} onClick={()=>{
                        props.setSelectedSnack(snack)
                    }}> View</button>
                    <button className="btn btn-outline-danger py-2 font-weight-bold col-5" style={{ marginLeft: "2pc", marginTop: "10px" }} value={snack.id} onClick={deletesnack}>Delete</button>
                </div>
        ))}
        
        </>);
}
export default ListSnacks;