import React, { useState, useEffect } from 'react';
import styles from '../Movie/movie.module.css';
import axios from 'axios';
import ListSnacks from './ListSnacks';
import ViewSnack from './ViewSnack'

const Snack = () => {
    const [selectedSnack,setSelectedSnack]=useState(null)
    const [snacks, setSnack] = useState([]);
    const [isAddSnack, setIsAddSnack] = useState(false);
    const [isDeletedSnack, setIsDeleteSnack] = useState(false);
    const [isUpdate,setIsUpdate] = useState(false);
    const [snackAmount, setSnackAmount] = useState("");
    const [snackType, setSnackType] = useState("");
    const [snackDescription, setSnackDescription] = useState("");
    const [snackOffer, setSnackOffer] = useState("");
    const [snackImage, setSnackImage] = useState(null);

    useEffect(() => {
        let isMounted = true; //for cleanup
        try {
            axios.get('http://localhost:3001/api/getSnack').then((response) => {
                if(isMounted){
                    if (response.data.snacks) {
                        setSnack(response.data.snacks)
                    }
                }
            })
            return ()=>{isMounted=false};
        }
        catch (error) {
            console.log(error)
        }
    }, [isAddSnack,isUpdate,isDeletedSnack])

    function addsnack(e) {
        e.preventDefault();
        //console.log(movieName, movieLanguage, movieGenre, movieTrailerLink, movieBanner, movieReleaseDate, movieDescription, movieHours);
        try {
            axios.post('http://localhost:3001/api/insertSnack', {
                snackAmount: snackAmount,
                snackType: snackType,
                snackDescription: snackDescription,
                snackOffer: snackOffer,
                snackImage: snackImage,
               

            }).then((response) => {
                if (response.data.message) {
                    alert(response.data.message);
                    setSnackAmount("");
                    setSnackType("");
                    setSnackDescription("");
                    setSnackOffer("");
                    setSnackImage(null);
                    
                    setIsAddSnack(false)
                }
            });
        }
        catch (error) {
            console.log(error)
        }
    }

    return (selectedSnack===null)?(

        <div className={styles.content}>
            <button className={styles.addmoviebutton} onClick={() => {
                setIsAddSnack(!isAddSnack)
            }}><i className="fa fa-plus px-2" aria-hidden="true"></i>Add Snack</button>

            {(isAddSnack) ? (

                <div className="container" >
                    <div className="row py-5 mt-4 align-items-center" >
                        <div className="col-md-7 col-lg-6 ml-auto">
                            <form onSubmit={addsnack}>
                                <div className="row">


                                <div className="input-group col-lg-12 mb-4">
                                        <input id="snackType" type="text" name="snackType" placeholder="Enter Snack Name" className="form-control bg-white border-left-0 border-md" value={snackType} onChange={(e) => {
                                            setSnackType(e.target.value);
                                        }} required />
                                    </div>

                                    <div className="input-group col-lg-8 mb-4">
                                        <input id="snackAmount" type="text" name="snackAmount" placeholder="Enter Snack Amount" className="form-control bg-white border-left-0 border-md" value={snackAmount} onChange={(e) => {
                                            setSnackAmount(e.target.value);
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
                </div>) : ""}
            <div className="container-fluid "  style={{width:"67vw",marginLeft:"5pc"}} >
                <div className="row" style={{ overflowX: 'auto', color: "white" }} >
                    <ListSnacks snacks={snacks} setSelectedSnack = {setSelectedSnack} setIsDeleteSnack={setIsDeleteSnack}/>
                </div>
            </div>
        </div>
    ):(
       
        <div className={styles.content}>
            <button className={styles.close_btn} onClick={() => { setSelectedSnack(null) }}><i className="fa fa-close mx-1"></i></button>
            <ViewSnack snack={selectedSnack} setSnack={setSelectedSnack} isUpdate={isUpdate} setIsUpdate={setIsUpdate}/>
        </div>
    );
}

export default Snack;