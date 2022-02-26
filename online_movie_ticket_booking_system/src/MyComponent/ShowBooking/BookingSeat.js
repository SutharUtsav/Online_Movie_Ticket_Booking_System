import React, { useState, useEffect } from 'react';
import styles from './booking.module.css'
import axios from 'axios';

const BookingSeat = (props) => {
    const raws = 8;
    const cols = 8;
    const theater = [];
    for (var i = 0; i < raws; i++) {
        const raw = [];
        for (var j = 0; j < cols; j++) {
            if (i === 0) {
                raw.push({
                    seat_price: 200,
                    seat_type: "A1",
                    selected:false
                })
            }
            else if (i === 1) {
                raw.push({
                    seat_price: 180,
                    seat_type: "A2",
                    selected:false,
                })
            }
            else if (i === 2) {
                raw.push({
                    seat_price: 150,
                    seat_type: "B1",
                    selected:false,
                })
            }
            else if (i === 3) {
                raw.push({
                    seat_price: 120,
                    seat_type: "B2",
                    selected:false,
                })
            }
            else if (i === 4) {
                raw.push({
                    seat_price: 100,
                    seat_type: "C1",
                    selected:false,
                })
            }
            else if (i === 5) {
                raw.push({
                    seat_price: 100,
                    seat_type: "C2",
                    selected:false,
                })
            }
            else if (i === 6) {
                raw.push({
                    seat_price: 80,
                    seat_type: "D1",
                    selected:false,
                })
            }
            else if (i === 7) {
                raw.push({
                    seat_price: 80,
                    seat_type: "D1",
                    selected:false,
                })
            }
        }
        theater.push(raw);
    }

    const [seats, setSeats] = useState([]);
    // const [totalPrice,setTotalPrice] = useState(0);
    // const [totalSelectedSeats,setTotalSelectedSeats]=useState(0);

    useEffect(() => {
        let isMounted = true; //for cleanup
        try {
            axios.get('http://localhost:3001/api/getSeats').then((response) => {
                if (isMounted) {
                    setSeats(response.data.seats)
                }
            })
            return () => { isMounted = false };
        }
        catch (error) {
            console.log(error)
        }
    }, [])

    function displaySeat(seat, index) {
        seats.forEach((st) => {
            if (st.seat_show_id === props.selectedShow.id) {
                if(st.seat_status === "Occupied"){
                    return (
                        <div key={index} className={styles.seat_occupied}></div>
                    )
                }

            }
        })

        return (
            <div key={index} className={styles.seat} onClick={
                (e)=>{
                // console.log(seat.selected)
                seat.selected = !seat.selected;
                if(seat.selected===true){
                    e.target.className=styles.seat_selected
                }
                else{
                    e.target.className=styles.seat
                    // var tmp = totalPrice - seat.seat_price
                    // if(tmp > 0){
                    //     totalPrice = tmp
                    // }
                    // tmp = totalSelectedSeats -1;
                    // if(tmp > 0){
                    //     totalSelectedSeats = tmp;
                    // }
                }
                }
            }>
                <span className={styles.tooltiptext}>{seat.seat_type} - {seat.seat_price}Rs.</span>
            </div>
        )
    }

    function addSeat(){

    }
    return (
        <div style={{ color: "white", height: "100%", marginLeft: "16%", marginRight: "23%" }}>
            <button className={styles.back_btn} onClick={() => { props.setIsShowSelected(false) }}><i className="fa fa-arrow-left" aria-hidden="true"></i></button>

            <ul className={styles.showcase}>
                <li>
                    <div className={styles.seat}></div>
                    N/A
                </li>

                <li>
                    <div className={styles.seat_selected}></div>
                    Selected
                </li>

                <li>
                    <div className={styles.seat_occupied}></div>
                    Occupied
                </li>
            </ul>

            <div className={styles.container}>
                {/* <div className={styles.screen}></div> */}
                {theater.map((raw, index1) => (
                    <div key={index1} className={styles.row}>
                        {raw.map((seat, index2) => (
                            displaySeat(seat, index2)
                        ))}
                    </div>

                ))}
                <p className={styles.text}>
                    You have selected <span id="count">0</span> seats for a price of Ruppee <span id="total">0</span>
                </p>
            </div>
            <div className="form-group col-lg-12 mx-auto mb-0">
                <button className="btn btn-outline-info py-2 font-weight-bold d-grid col-6 mx-auto" onClick={addSeat}>Proceed...</button>
            </div>


        </div>);
}

export default BookingSeat;