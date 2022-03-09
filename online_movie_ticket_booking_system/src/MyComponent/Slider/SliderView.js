import React from 'react';
import styles from './slider.module.css'
import { Carousel } from 'react-bootstrap';
import Slider from 'react-slick';


const SliderView = (props) => {
  const settings = {
    centerMode: true,
    infinite: true,
    centerPadding: "80px",
    slidesToShow: 1,
    slideToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 3000,
    cssEase: "ease-out"
  }

  function playtrailer(e) {

    window.location.assign(e.target.value)
  }

  return (props.searchData === "") ? (
    <div style={{ color: "white" }}>
      <center><h3 style={{ margin: "20px" }}>Upcoming Movies</h3></center>
      <Slider {...settings} className={styles.container_slider}>

        {props.banners.map((banner, index) => (
          <Carousel.Item key={index} interval={2000}>
            <img
              className="d-block w-100"
              src={process.env.PUBLIC_URL + "/Movies/" + banner.movie_banner}
              alt="Movie-Banner" width="860px" height="500px" />
            <Carousel.Caption>
              <button className="py-2 font-weight-bold" style={{background:"white",border:"none",outlineStyle:"ridge",borderRadius:"30px",width:"3pc",height:"3pc",color:"red"}} value={banner.movie_trailer_link} onClick={playtrailer} ><i className="fa fa-play mx-1" style={{textSize:"small"}} aria-hidden="true"></i> </button><h4 style={{display:"inline",marginLeft:"1pc"}}>Watch Trailer</h4>
            </Carousel.Caption>
          </Carousel.Item>
        ))}

      </Slider>

    </div>) : ("")
}

export default SliderView;