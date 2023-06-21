import { useState,useEffect } from 'react';
import { API } from '../../../service/api';
import { Container } from 'react-bootstrap';
import { Grid } from '@mui/material';
import WatchlistMovie from './WatchlistMovie';


const Watchlist = ({movieId,watchId}) => {
    const [movie, setMovie] = useState({});

    useEffect(() => {
        const fetchMovie = async () => {
            let response = await API.getPostById(movieId);
            if (response.isSuccess) {
                setMovie(response.data);
            }
        }
        fetchMovie();
    }, []);
    
    return (
            <WatchlistMovie  movie={movie} id={watchId} />
    )
}

export default Watchlist;