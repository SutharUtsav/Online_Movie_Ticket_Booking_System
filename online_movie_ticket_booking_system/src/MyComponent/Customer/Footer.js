import React from 'react';
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div style={{bottom:0}}>
      <div className="d-flex flex-column h-100">


        <section className="hero text-white py-5 flex-grow-1">
          <div className="container py-4">
            <div className="row" style={{justifyContent:"center",marginLeft:"8pc"}}>
              <div className="col-lg-6">
              <div><img src='/movie_logo.png' alt="movie-logo" style={{height:"inherit"}}></img></div>
                <p className="fst-italic text-white" style={{marginLeft:"7pc"}}> Thank you for visiting ...</p>
              </div>
            </div>
          </div>
        </section>



        <footer className=" text-white mainfooter" role="contentinfo">
          <div className="footer-middle">
            <div className="container">
              <div className="row">
                <div className="col-md-3 col-sm-6">
                  <div className="footer-pad">
                    <h4>General</h4>
                    <ul className="list-unstyled">
                      <li><Link to="#"></Link></li>
                      <li><Link to="#">About us</Link></li>
                      <li><Link to="#">FAQ's</Link></li>
                      <li><Link to="#">Career</Link></li>
                      <li><Link to="#">Investor</Link></li>
                      <li><Link to="#">News and Updates</Link></li>
                      <li><Link to="#">Feedback</Link></li>
                      <li><Link to="#">Contact us</Link></li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6">

                  <div className="footer-pad">
                    <h4>Exculsives</h4>
                    <ul className="list-unstyled">
                      <li><Link to="#">Offers</Link></li>
                      <li><Link to="#">Gift Cards</Link></li>
                      <li><Link to="#">Trailers</Link></li>
                      <li><Link to="#">Privacy Policy</Link></li>
                      <li><Link to="#">Help</Link></li>
                      <li><Link to="#">Event</Link></li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6">
                  <div className="footer-pad">
                    <h4>Cinamas</h4>
                    <ul className="list-unstyled">
                      <li><Link to="#">Movies Now showing</Link></li>
                      <li><Link to="#">Upcoming Movies</Link></li>
                      <li><Link to="#">Movie Reviews</Link></li>
                      <li><Link to="#">Movie Celebrities</Link></li>
                      <li>
                        <Link to="#"></Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-3">
                  <h4>Follow Us</h4>
                  <ul className="social-network social-circle">
                    <li><Link to="#" className="icoFacebook" title="Facebook"><i className="fLink fa-facebook"></i></Link></li>
                    <li><Link to="#" className="icoLinkedin" title="Linkedin"><i className="fLink fa-linkedin"></i></Link></li>
                  </ul>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 copy">
                  <p className="text-center">&copy; Copyright 2023  All rights reserved.</p>
                </div>
              </div>


            </div>
          </div>
        </footer>

      </div>
    </div>
  )
}

export default Footer
