import React from 'react';
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div style={{bottom:0}}>
      <div class="d-flex flex-column h-100">


        <section class="hero bg-black text-white py-5 flex-grow-1">
          <div class="container py-4">
            <div class="row">
              <div class="col-lg-6">

                <p class="fst-italic text-white"> Footer!</p>
              </div>
            </div>
          </div>
        </section>



        <footer class="bg-black text-white mainfooter" role="contentinfo">
          <div class="footer-middle">
            <div class="container">
              <div class="row">
                <div class="col-md-3 col-sm-6">
                  <div class="footer-pad">
                    <h4>General</h4>
                    <ul class="list-unstyled">
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
                <div class="col-md-3 col-sm-6">

                  <div class="footer-pad">
                    <h4>Exculsives</h4>
                    <ul class="list-unstyled">
                      <li><Link to="#">Offers</Link></li>
                      <li><Link to="#">Gift Cards</Link></li>
                      <li><Link to="#">Trailers</Link></li>
                      <li><Link to="#">Privacy Policy</Link></li>
                      <li><Link to="#">Help</Link></li>
                      <li><Link to="#">Event</Link></li>
                    </ul>
                  </div>
                </div>
                <div class="col-md-3 col-sm-6">
                  <div class="footer-pad">
                    <h4>Cinamas</h4>
                    <ul class="list-unstyled">
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
                <div class="col-md-3">
                  <h4>Follow Us</h4>
                  <ul class="social-network social-circle">
                    <li><Link to="#" class="icoFacebook" title="Facebook"><i class="fLink fa-facebook"></i></Link></li>
                    <li><Link to="#" class="icoLinkedin" title="Linkedin"><i class="fLink fa-linkedin"></i></Link></li>
                  </ul>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12 copy">
                  <p class="text-center">&copy; Copyright 2022 - Company Name.  All rights reserved.</p>
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
