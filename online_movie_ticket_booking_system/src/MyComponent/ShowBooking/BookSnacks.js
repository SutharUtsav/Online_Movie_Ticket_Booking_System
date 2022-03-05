import React, { useState, useEffect } from 'react';
import styles from './booking.module.css'
import axios from 'axios';
import BookingInfo from './BookingInfo';

const BookSnacks = (props) => {
    const selectedSnacks = []
    const [snacks, setSnack] = useState([]);
    const [selectedSnack, setSelectedSnack] = useState([]);
    const [isProceedtoPay, setIsProceedtoPay] = useState(false);

    useEffect(() => {
        let isMounted = true; //for cleanup
        localStorage.setItem('selectedSnacks', null);
        try {
            axios.get('http://localhost:3001/api/getSnack').then((response) => {
                if (isMounted) {
                    if (response.data.snacks) {
                        setSnack(response.data.snacks)
                    }
                }
            })
            return () => { isMounted = false };
        }
        catch (error) {
            console.log(error)
        }
    }, [])

    function removeSnack(snack) {
        //console.log(snack)
        var getStoredSnack = JSON.parse(localStorage.getItem('selectedSnacks'))
        if (getStoredSnack !== null) {
            var status = true;
            selectedSnacks.forEach((sn, index) => {
                if (sn.id === snack.id & status) {
                    delete selectedSnacks[index]
                    status = false;
                }
            })
            var arr = []
            selectedSnacks.forEach((sn) => {
                if (sn !== null) {
                    arr.push(sn)
                }
            })
            localStorage.setItem('selectedSnacks', JSON.stringify(arr));

            var element = document.getElementById(`Quantity${snack.id}`)
            if (element.value > 0) {
                element.value = parseInt(element.value) - 1
            }
            console.log(element.value)
        }
    }

    function addSnack(snack) {

        var getStoredSnack = JSON.parse(localStorage.getItem('selectedSnacks'))
        if (getStoredSnack === null) {
            selectedSnacks.push(snack)
            localStorage.setItem('selectedSnacks', JSON.stringify(selectedSnacks));
        }
        else {
            selectedSnacks.push(snack)
            localStorage.setItem('selectedSnacks', JSON.stringify(selectedSnacks));
        }

        var arr = []
        selectedSnacks.forEach((sn) => {
            if (sn !== null) {
                arr.push(sn)
            }
        })
        localStorage.setItem('selectedSnacks', JSON.stringify(arr));

        var element = document.getElementById(`Quantity${snack.id}`)
        if (element.value === '') {
            element.value = 1
        } else {
            element.value = parseInt(element.value) + 1
        }
        // console.log(element.value)
    }

    function bookSnacks() {
        var getStoredSnack = JSON.parse(localStorage.getItem('selectedSnacks'))
        if (getStoredSnack !== 0) {
            setSelectedSnack(getStoredSnack)
            setIsProceedtoPay(true)
        }
    }

    return (!isProceedtoPay) ? (<div style={{ color: "white", height: "100%", width: "100%" }}>
        <button className={styles.back_btn} onClick={() => {
            localStorage.removeItem('selectedSeats')
            localStorage.removeItem('selectedSnacks')
            props.setIsSeatSelected(false)
        }}><i className="fa fa-arrow-left" aria-hidden="true"></i></button>
        <center><h1><u>Select Snacks</u></h1></center>
        <div className="m-5" style={{ overflowX: "auto", display: "flex" }}>
            {snacks.map((snack, index) => (
                <div key={index} className="card m-2" style={{ width: "18rem" }}>
                    <img src={process.env.PUBLIC_URL + "/Snacks/" + snack.snack_image} alt='snack_image' width="300" height="300" className='card-img-top' />
                    <div className="card-body" style={{ color: "black" }}>
                        <h5 className="card-title">{snack.snack_type}</h5>
                        <p className="card-text">{snack.snack_description}</p>
                        <p className='card-text'>Rs.{snack.snack_amount}</p>
                        <p className='card-text'>Enter Quantity:</p>

                        <div style={{ marginTop: "3px", justifyContent: "center" }}>
                            <input type="button" value="-" className={styles.minus} onClick={() => { removeSnack(snack) }} />
                            <input type="number" min='0' max='' title='Quantity' id={"Quantity" + snack.id} placeholder='0' className={styles.count} readOnly />
                            <input type='button' value='+' className={styles.plus} onClick={() => { addSnack(snack) }} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
        <div className="form-group col-lg-12 mx-auto mb-0">
            <button className="btn btn-outline-info py-2 font-weight-bold d-grid col-6 mx-auto" onClick={() => { bookSnacks() }}>Proceed to Payment</button>
        </div>

    </div>) : (
        <BookingInfo setIsMovieSelected={props.setIsMovieSelected} user={props.user} selectedSnack={selectedSnack} selectedShow={props.selectedShow} selectedSeat={props.selectedSeat} selectedMovie={props.selectedMovie} setIsProceedtoPay={setIsProceedtoPay} />
    );
}

export default BookSnacks;