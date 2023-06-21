import React from "react";
import Post from "../movies/post/Post";
import { useEffect, useState } from "react";
import { API } from "../../service/api";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Grid, Box } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';
import {ML} from '../../i18next.js';
const CardSlider = () => {
  const [posts, getPosts] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => { 
        let response = await API.getAllPosts({});
        if (response.isSuccess) {
            getPosts(response.data);
        }
    }
    fetchData();
}, []);

  const data = posts?.length ? posts.map(post => (
        <Grid item lg={2} sm={4} xs={12}>
            <Link style={{textDecoration: 'none', color: 'inherit'}} to={`/movies/details/${post._id}`}>
                <Post post={post} />
            </Link>
        </Grid>
    )) : <Box style={{color: '878787', margin: '30px 80px', fontSize: 18}}>
            {ML('noData')}
        </Box>


  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 8,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1300 },
      items: 6,
    },
    smallDesktop: {
      breakpoint: { max: 1300, min: 1024 },
      items: 4,
    },
    largeTablet: {
      breakpoint: { max: 1024, min: 700 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 700, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  // const [posts, getPosts] = useState([]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     let response = await API.getLastMovies();
  //     if (response.isSuccess) {
  //       getPosts(response.data);
  //     }
  //   };
  //   fetchData();
  // }, [posts]);
  return (
    <Carousel responsive={responsive}>
        {data}
    </Carousel>
  );
};

export default CardSlider;
