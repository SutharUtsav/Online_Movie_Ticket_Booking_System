import React, { useState, useEffect } from 'react';
import styles from './booking.module.css'
import axios from 'axios';
import BookSnacks from './BookSnacks';
import useWindowDimensions from "../useWindowDimensions";

const BookingSeat = (props) => {

    const {height,width}=useWindowDimensions();
  

    const selectedSeats = [];
    const raws = 8;
    const cols = 8;
    const theater = [];

    for (var i = 0; i < raws; i++) {
        const raw = [];
        for (var j = 0; j < cols; j++) {
            if (i === 0) {
                raw.push({
                    seat_price: 200,
                    seat_type: "A" + (j + 1).toString(),
                    selected: false,
                })
            }
            else if (i === 1) {
                raw.push({
                    seat_price: 180,
                    seat_type: "B" + (j + 1).toString(),
                    selected: false,
                })
            }
            else if (i === 2) {
                raw.push({
                    seat_price: 150,
                    seat_type: "C" + (j + 1).toString(),
                    selected: false,
                })
            }
            else if (i === 3) {
                raw.push({
                    seat_price: 120,
                    seat_type: "D" + (j + 1).toString(),
                    selected: false,
                })
            }
            else if (i === 4) {
                raw.push({
                    seat_price: 100,
                    seat_type: "E" + (j + 1).toString(),
                    selected: false,
                })
            }
            else if (i === 5) {
                raw.push({
                    seat_price: 100,
                    seat_type: "F" + (j + 1).toString(),
                    selected: false,
                })
            }
            else if (i === 6) {
                raw.push({
                    seat_price: 80,
                    seat_type: "G" + (j + 1).toString(),
                    selected: false,
                })
            }
            else if (i === 7) {
                raw.push({
                    seat_price: 80,
                    seat_type: "H" + (j + 1).toString(),
                    selected: false,
                })
            }
        }
        theater.push(raw);
    }

    const [seats, setSeats] = useState([]);
    const [selectSeat, setSelectSeat] = useState([]);
    const [isSeatSelected, setIsSeatSelected] = useState(false)

    useEffect(() => {
        // if(props.user.id === undefined){
        //     alert("You are not logged in")
        //     props.setIsMovieSelected(false)
        // }
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

    function displaySeat(seat, index1, index2) {
        var state = true
        seats.forEach((st) => {
            if (st.seat_show_id === props.selectedShow.id & st.seat_type === seat.seat_type) {
                state = false;
            }
        })

        if (!state) {
            return (raws / 2 === (index1 + 1) ? (
                cols / 2 === (index2 + 1) ? (
                    <div key={index2} className={styles.seat_occupied} style={ width>=1024 ? { marginBottom: "5pc", marginRight: "5pc" } : width>=425 ? {width:"2pc",height:"2pc",margin:"10px 2pc 2pc 10px"}: {width:"1pc",height:"1pc",margin:"10px 2pc 2pc 10px"}}></div>
                ) : (
                    index2 === 0 ? (
                        <div key={index2} className={styles.seat_occupied} style={width>=1024 ?{ marginBottom: "5pc" }: width>=425 ? {width:"2pc",height:"2pc",margin:"10px 10px 2pc 10px"}:{width:"1pc",height:"1pc",margin:"10px 10px 2pc 10px"}}></div>
                    ) : (
                        index2 === (raws - 1) ? (
                            <div key={index2} className={styles.seat_occupied} style={width>=1024 ?{ marginBottom: "5pc" }:width>=425 ? {width:"2pc",height:"2pc",margin:"10px 10px 2pc 10px"}:{width:"1pc",height:"1pc",margin:"10px 10px 2pc 10px"}}></div>
                        ) : (
                            <div key={index2} className={styles.seat_occupied} style={width>=1024 ?{ marginBottom: "5pc" }:width>=425 ? {width:"2pc",height:"2pc",margin:"10px 10px 2pc 10px"}:{width:"1pc",height:"1pc",margin:"10px 10px 2pc 10px"}}></div>
                        )))
            ) : (
                cols / 2 === (index2 + 1) ? (
                    <div key={index2} className={styles.seat_occupied} style={width>=1024 ?{ marginRight: "5pc" }: width>=425 ? {width:"2pc",height:"2pc",margin:"10px 2pc 10px 10px"}:{width:"1pc",height:"1pc",margin:"10px 2pc 10px 10px"}}></div>
                ) : (<div key={index2} className={styles.seat_occupied} style={width>=1024 ?{ }: width>=425 ? {width:"2pc",height:"2pc",margin:"10px"}:{width:"1pc",height:"1pc",margin:"10px"}}></div>)
            ))

        }
        else {
            return (raws / 2 === (index1 + 1) ? (
                cols / 2 === (index2 + 1) ? (
                    <div key={index2} className={styles.seat} style={width>=1024 ?{ marginBottom: "5pc", marginRight: "5pc" }: width>=425 ? {width:"2pc",height:"2pc",margin:"10px 2pc 2pc 10px"}:{width:"1pc",height:"1pc",margin:"10px 2pc 2pc 10px" }} onClick={
                        (e) => {
                            //console.log(seat.selected)
                            seat.selected = !seat.selected;
                            console.log(seat.selected)
                            if (seat.selected === true) {
                                e.target.className = styles.seat_selected
                                var getSelectesSeats1 = JSON.parse(localStorage.getItem('selectedSeats'))
                                if (getSelectesSeats1 === 0) {
                                    selectedSeats.push(seat)
                                    localStorage.setItem('selectedSeats', JSON.stringify(selectedSeats));
                                }
                                else {
                                    selectedSeats.push(seat)
                                    localStorage.setItem('selectedSeats', JSON.stringify(selectedSeats));
                                }

                                const sts = []
                                selectedSeats.forEach((st) => {
                                    if (st !== null) {
                                        sts.push(st)
                                    }
                                })
                                localStorage.setItem('selectedSeats', JSON.stringify(sts));


                            }
                            else {
                                e.target.className = styles.seat
                                var getSelectesSeats = JSON.parse(localStorage.getItem('selectedSeats'))
                                getSelectesSeats.forEach((st, index) => {
                                    if (st.seat_type === seat.seat_type & st !== null) {
                                        delete selectedSeats[index]
                                    }
                                })
                                const sts = []
                                selectedSeats.forEach((st) => {
                                    if (st !== null) {
                                        sts.push(st)
                                    }
                                })
                                localStorage.setItem('selectedSeats', JSON.stringify(sts));
                            }
                        }
                    }>
                        <span className={styles.tooltiptext}>{seat.seat_type} - {seat.seat_price}Rs.</span>
                    </div>
                ) : (
                    index2 === 0 ? (
                        <div key={index2} className={styles.seat} style={width>=1024 ?{ marginBottom: "5pc" }: width>=425?{width:"2pc",height:"2pc",margin:"10px 10px 2pc 10px"}:{width:"1pc",height:"1pc",margin:"10px 10px 2pc 10px"}} onClick={
                            (e) => {
                                seat.selected = !seat.selected;
                                if (seat.selected === true) {
                                    e.target.className = styles.seat_selected
                                    var getSelectesSeats1 = JSON.parse(localStorage.getItem('selectedSeats'))
                                    if (getSelectesSeats1 === 0) {
                                        selectedSeats.push(seat)
                                        localStorage.setItem('selectedSeats', JSON.stringify(selectedSeats));
                                    }
                                    else {
                                        selectedSeats.push(seat)
                                        localStorage.setItem('selectedSeats', JSON.stringify(selectedSeats));
                                    }

                                    const sts = []
                                    selectedSeats.forEach((st) => {
                                        if (st !== null) {
                                            sts.push(st)
                                        }
                                    })
                                    localStorage.setItem('selectedSeats', JSON.stringify(sts));


                                }
                                else {
                                    e.target.className = styles.seat
                                    var getSelectesSeats = JSON.parse(localStorage.getItem('selectedSeats'))
                                    getSelectesSeats.forEach((st, index) => {
                                        if (st.seat_type === seat.seat_type & st !== null) {
                                            delete selectedSeats[index]
                                        }
                                    })
                                    const sts = []
                                    selectedSeats.forEach((st) => {
                                        if (st !== null) {
                                            sts.push(st)
                                        }
                                    })
                                    localStorage.setItem('selectedSeats', JSON.stringify(sts));
                                }
                            }
                        }>
                            <span className={styles.tooltiptext}>{seat.seat_type} - {seat.seat_price}Rs.</span>
                            <div style={width>=1024 ?{ marginTop: "4pc", width: "37px", border: "none", borderRadius: "25px" }:{marginTop: "1.5pc", width: "35px",height:"24px", border: "none", borderRadius: "20px"}} className="btn btn-light"><i className="fa fa-arrow-left" style={width>=1024 ?{ display: "content" }:{display:"block",fontSize:"12px"}} aria-hidden="true"></i></div>
                        </div>) : (
                        index2 === (raws - 1) ? (<div key={index2} className={styles.seat} style={width>=1024 ?{ marginBottom: "5pc" }:width>=425?{width:"2pc",height:"2pc",margin:"10px 10px 2pc 10px"}:{width:"1pc",height:"1pc",margin:"10px 10px 2pc 10px"}} onClick={
                            (e) => {
                                seat.selected = !seat.selected;
                                if (seat.selected === true) {
                                    e.target.className = styles.seat_selected
                                    var getSelectesSeats1 = JSON.parse(localStorage.getItem('selectedSeats'))
                                    if (getSelectesSeats1 === 0) {
                                        selectedSeats.push(seat)
                                        localStorage.setItem('selectedSeats', JSON.stringify(selectedSeats));
                                    }
                                    else {
                                        selectedSeats.push(seat)
                                        localStorage.setItem('selectedSeats', JSON.stringify(selectedSeats));
                                    }

                                    const sts = []
                                    selectedSeats.forEach((st) => {
                                        if (st !== null) {
                                            sts.push(st)
                                        }
                                    })
                                    localStorage.setItem('selectedSeats', JSON.stringify(sts));


                                }
                                else {
                                    e.target.className = styles.seat
                                    var getSelectesSeats = JSON.parse(localStorage.getItem('selectedSeats'))
                                    getSelectesSeats.forEach((st, index) => {
                                        if (st.seat_type === seat.seat_type & st !== null) {
                                            delete selectedSeats[index]
                                        }
                                    })
                                    const sts = []
                                    selectedSeats.forEach((st) => {
                                        if (st !== null) {
                                            sts.push(st)
                                        }
                                    })
                                    localStorage.setItem('selectedSeats', JSON.stringify(sts));
                                }
                            }
                        }>
                            <span className={styles.tooltiptext}>{seat.seat_type} - {seat.seat_price}Rs.</span>
                            <div style={ width>=1024 ?{ marginTop: "4pc", width: "37px", border: "none", borderRadius: "25px" }:{marginTop: "1.5pc", width: "35px",height:"24px", border: "none", borderRadius: "20px"}} className="btn btn-light"><i className="fa fa-arrow-left" style={width>=1024 ?{ display: "content" }:{display:"block",fontSize:"12px"}} aria-hidden="true"></i></div>
                        </div>) : (
                            <div key={index2} className={styles.seat} style={width>=1024 ?{ marginBottom: "5pc" }:width>=425?{width:"2pc",height:"2pc",margin:"10px 10px 2pc 10px"}: {width:"1pc",height:"1pc",margin:"10px 10px 2pc 10px"}} onClick={
                                (e) => {
                                    seat.selected = !seat.selected;
                                    if (seat.selected === true) {
                                        e.target.className = styles.seat_selected
                                        var getSelectesSeats1 = JSON.parse(localStorage.getItem('selectedSeats'))
                                        if (getSelectesSeats1 === 0) {
                                            selectedSeats.push(seat)
                                            localStorage.setItem('selectedSeats', JSON.stringify(selectedSeats));
                                        }
                                        else {
                                            selectedSeats.push(seat)
                                            localStorage.setItem('selectedSeats', JSON.stringify(selectedSeats));
                                        }

                                        const sts = []
                                        selectedSeats.forEach((st) => {
                                            if (st !== null) {
                                                sts.push(st)
                                            }
                                        })
                                        localStorage.setItem('selectedSeats', JSON.stringify(sts));


                                    }
                                    else {
                                        e.target.className = styles.seat
                                        var getSelectesSeats = JSON.parse(localStorage.getItem('selectedSeats'))
                                        getSelectesSeats.forEach((st, index) => {
                                            if (st.seat_type === seat.seat_type & st !== null) {
                                                delete selectedSeats[index]
                                            }
                                        })
                                        const sts = []
                                        selectedSeats.forEach((st) => {
                                            if (st !== null) {
                                                sts.push(st)
                                            }
                                        })
                                        localStorage.setItem('selectedSeats', JSON.stringify(sts));
                                    }
                                }
                            }>
                                <span className={styles.tooltiptext}>{seat.seat_type} - {seat.seat_price}Rs.</span>
                            </div>)))
            ) : (
                cols / 2 === (index2 + 1) ? (
                    <div key={index2} className={styles.seat} style={width>=1024 ?{ marginRight: "5pc" }:width>=425 ? {width:"2pc",height:"2pc",margin:"10px 2pc 10px 10px"}:{width:"1pc",height:"1pc",margin:"10px 2pc 10px 10px"}} onClick={
                        (e) => {
                            seat.selected = !seat.selected;
                            if (seat.selected === true) {
                                e.target.className = styles.seat_selected
                                var getSelectesSeats1 = JSON.parse(localStorage.getItem('selectedSeats'))
                                if (getSelectesSeats1 === 0) {
                                    selectedSeats.push(seat)
                                    localStorage.setItem('selectedSeats', JSON.stringify(selectedSeats));
                                }
                                else {
                                    selectedSeats.push(seat)
                                    localStorage.setItem('selectedSeats', JSON.stringify(selectedSeats));
                                }

                                const sts = []
                                selectedSeats.forEach((st) => {
                                    if (st !== null) {
                                        sts.push(st)
                                    }
                                })
                                localStorage.setItem('selectedSeats', JSON.stringify(sts));

                            }
                            else {
                                e.target.className = styles.seat
                                var getSelectesSeats = JSON.parse(localStorage.getItem('selectedSeats'))
                                getSelectesSeats.forEach((st, index) => {
                                    if (st.seat_type === seat.seat_type & st !== null) {
                                        delete selectedSeats[index]
                                    }
                                })
                                const sts = []
                                selectedSeats.forEach((st) => {
                                    if (st !== null) {
                                        sts.push(st)
                                    }
                                })
                                localStorage.setItem('selectedSeats', JSON.stringify(sts));
                            }
                        }
                    }>
                        <span className={styles.tooltiptext}>{seat.seat_type} - {seat.seat_price}Rs.</span>
                    </div>
                ) : (
                    <div key={index2} className={styles.seat} style={width>=1024 ? {}:width>=425 ? {width:"2pc",height:"2pc",margin:"10px" }:{width:"1pc",height:"1pc",margin:"10px"}} onClick={
                        (e) => {
                            seat.selected = !seat.selected;
                            if (seat.selected === true) {
                                e.target.className = styles.seat_selected
                                var getSelectesSeats1 = JSON.parse(localStorage.getItem('selectedSeats'))

                                if (getSelectesSeats1 === 0) {
                                    selectedSeats.push(seat)
                                    localStorage.setItem('selectedSeats', JSON.stringify(selectedSeats));
                                }
                                else {
                                    selectedSeats.push(seat)
                                    localStorage.setItem('selectedSeats', JSON.stringify(selectedSeats));
                                }

                                const sts = []
                                selectedSeats.forEach((st) => {
                                    if (st !== null) {
                                        sts.push(st)
                                    }
                                })
                                localStorage.setItem('selectedSeats', JSON.stringify(sts));


                            }
                            else {
                                e.target.className = styles.seat
                                var getSelectesSeats = JSON.parse(localStorage.getItem('selectedSeats'))
                                getSelectesSeats.forEach((st, index) => {
                                    if (st.seat_type === seat.seat_type & st !== null) {
                                        delete selectedSeats[index]
                                    }
                                })
                                const sts = []
                                selectedSeats.forEach((st) => {
                                    if (st !== null) {
                                        sts.push(st)
                                    }
                                })
                                localStorage.setItem('selectedSeats', JSON.stringify(sts));
                            }
                        }
                    }>
                        <span className={styles.tooltiptext}>{seat.seat_type} - {seat.seat_price}Rs.</span>
                    </div>
                )

            ))

        }

    }

    function addSeat() {
        var selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'))
        var array = []
        if (selectedSeats !== null) {
            selectedSeats.forEach((seat) => {
                if (seat.selected === true) {
                    array.push(seat)
                    setSelectSeat(array)
                }

            })
            //localStorage.removeItem("selectedSeats")
            if(array.length >0 ){
                setIsSeatSelected(true)
            }
            else{
                alert("Please Select Seats")
            }
        }
        else {
            alert("Please Select Seats")
        }

        

    }


    return (!isSeatSelected ?
        (
            <div style={{ color: "white" }}>
                <button className={styles.back_btn} onClick={() => {
                    localStorage.removeItem('selectedSeats')
                    props.setIsShowSelected(false)
                }}><i className="fa fa-arrow-left" aria-hidden="true"></i></button>

                <div style={  width >=1024? { marginLeft: "16%", marginRight: "23%" }:{}}>
                    <ul className={styles.showcase} style={  width >=1024? {}:{justifyContent:"unset"}}>
                        <li>
                            <div className={styles.seat} style={width >=1024 ?{}:{width:"1pc",height:"1pc"}}></div>
                            N/A
                        </li>

                        <li>
                            <div className={styles.seat_selected} style={width >=1024 ?{}:{width:"1pc",height:"1pc"}}></div>
                            Selected
                        </li>

                        <li>
                            <div className={styles.seat_occupied} style={width >=1024 ?{}:{width:"1pc",height:"1pc"}}></div>
                            Occupied
                        </li>
                    </ul>

                    <div className={styles.container} style={  width >=1024? {}:{marginLeft:"2pc"}}>
                        {theater.map((raw, index1) => (
                            <div key={index1} className={styles.row}>
                                {raw.map((seat, index2) => (
                                    <span key={index2}>
                                        {displaySeat(seat, index1, index2)}
                                    </span>
                                ))}
                            </div>

                        ))}
                        <div className={styles.screen}><p style={{ color: "black", textAlign: "center" }}>screen</p></div>

                    </div>
                    <div className="form-group col-lg-12 mx-auto mb-0">
                        <button className="btn btn-outline-info py-2 font-weight-bold d-grid col-6 mx-auto" onClick={addSeat}>Proceed...</button>
                    </div>
                </div>


            </div>) : (
            <BookSnacks setIsMovieSelected={props.setIsMovieSelected} user={props.user} setIsSeatSelected={setIsSeatSelected} selectedShow={props.selectedShow} selectedSeat={selectSeat} selectedMovie={props.selectedMovie} />
        ));
}

export default BookingSeat;
