import React from "react";
import Carousel from "react-bootstrap/Carousel";
import { API } from "../../service/api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from 'react-router-dom';
import styles from "../../css/Slider.module.css"

const CarouselSlider = () => {
  const [index, setIndex] = useState(0);
  const [posts, getPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      let response = await API.getLastMovies();
      if (response.isSuccess) {
        getPosts(response.data);
      }
    };
    fetchData();
  }, [posts]);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      {posts?.length ? (
        posts.map((post) => (
        //   <Link to={`/movies/details/${post._id}`}>
            <Carousel.Item className={styles.image} onClick={() => navigate(`/movies/details/${post._id}`)}>
              <img
                className="d-block w-100"
                src={post.picture}
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>{post.title}</h3>
                <p>{post.description}</p>
              </Carousel.Caption>
            </Carousel.Item>
        //   </Link>
        ))
      ) : undefined}
      {/* <Carousel.Item>
        <img
          className="d-block w-100"
          src="holder.js/800x400?text=First slide&bg=373940"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="holder.js/800x400?text=Second slide&bg=282c34"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="holder.js/800x400?text=Third slide&bg=20232a"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item> */}
    </Carousel>
  );
};

export default CarouselSlider;
