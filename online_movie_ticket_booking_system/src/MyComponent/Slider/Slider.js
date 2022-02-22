import React from 'react';
import styles from './slider.module.css'
import { Carousel } from 'react-bootstrap';


const Slider = (props) => {
  return (
    <>
      <Carousel fade={true} pause={false} className={styles.container_slider}>
        {props.banners.map((banner, index) => (
          <Carousel.Item key={index} interval={3000}>
            <img
              className="d-block w-100"
              src={process.env.PUBLIC_URL + "/Movies/" + banner.movie_banner}
              alt="Movie-Banner" />
            <Carousel.Caption>
              <h3>{banner.movie_name}</h3>
            </Carousel.Caption>
          </Carousel.Item>
        ))}

      </Carousel>
    </>
  );
}

export default Slider;