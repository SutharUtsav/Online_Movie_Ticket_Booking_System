import React from 'react'
import styles from './Pscreen.module.css';


export default function Pscreen() {
    return (
        <div className={styles.main}>

            <div className="container" style={{ marginTop: "7%" }}>
                <div className="row align-items-center" style={{ justifyContent: "center" }}>

                    <div className="col-md-7 col-lg-6 ml-auto">
                        <div className="row">

                            <div className="input-group col-lg-6 mb-4">
                                <div className="input-group-prepend">
                                    <span className="input-group-text bg-white px-4 border-md border-right-0" style={{ height: "50px" }} >
                                        <i className="fa fa-user"></i>
                                    </span>
                                </div>
                                <input id="Name" type="text" name="name" placeholder="Full Name" className="form-control bg-white border-left-0 border-md" />;
                            </div>

                            <div className="input-group col-lg-6 mb-4">
                                <div className="input-group-prepend">
                                    <span className="input-group-text bg-white px-4 border-md border-right-0" style={{ height: "50px" }}>
                                        <i className="fa fa-user fa-envelope"></i>

                                    </span>
                                </div>
                                <input id="Email" type="email" name="email" placeholder="Email" className="form-control bg-white border-left-0 border-md" />;
                            </div>

                            <div className="input-group col-lg-6 mb-4">
                                <div className="input-group-prepend">
                                    <span className="input-group-text bg-white px-4 border-md border-right-0" style={{ height: "50px" }}>
                                        <i className="fa fa-thin fa-phone"></i>

                                    </span>
                                </div>
                                <input id="Phone Number" type="number" name="phonenumber" placeholder="Phone Number" className="form-control bg-white border-left-0 border-md" />;
                            </div>

                            <div className="input-group col-lg-6 mb-4">
                                <div className="input-group-prepend">
                                    <span className="input-group-text bg-white px-4 border-md border-right-0" style={{ height: "50px" }}>
                                        <i className="fa fa-plus-square"></i>

                                    </span>
                                </div>
                                <input id="Seat" type="number" name="seat" placeholder="No. of Seats" className="form-control bg-white border-left-0 border-md" />;
                            </div>

                            <div className="input-group col-lg-6 mb-4">
                                <div className="input-group-prepend">
                                    <span className="input-group-text bg-white px-4 border-md border-right-0" style={{ height: "50px" }}>
                                    <i className="fa fa-regular fa-calendar"></i>

                                    </span>
                                </div>
                                <input id="date" type="date" name="date" className="form-control bg-white border-left-0 border-md" />;
                            </div>

                            <div className="input-group col-lg-6 mb-4">
                                <div className="input-group-prepend">
                                    <span className="input-group-text bg-white px-4 border-md border-right-0" style={{ height: "50px" }}>
                                    <i className="fa fa-regular fa-comment"></i>

                                    </span>
                                </div>
                                <input id="req" type="text" name="req" placeholder="Your Requirements" className="form-control bg-white border-left-0 border-md" />;
                            </div>

                            <div className="form-group col-lg-12 mx-auto mb-0">
                                <input type="submit" className="btn btn-outline-warning py-2 font-weight-bold d-grid col-6 mx-auto" value="Send Request" />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    );
}
