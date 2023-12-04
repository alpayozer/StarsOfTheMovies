import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../context/DataProvider';
import { API } from '../../service/api';
import { Container, Row, Col } from 'react-bootstrap';
import Watchlist from './watchlists/Watchlist';
import { Grid } from '@mui/material';


const WatchlistPage = () => {
    const [watchlists, setWatchlists] = useState([]);
    const { account } = useContext(DataContext);


    useEffect(() => {
        const fetchData = async () => {
            let response = await API.getWatchlist(account.name);
            if (response.isSuccess) {
                setWatchlists(response.data);
                console.log(response.data);
            }
        }
        fetchData();
    }, [account])

    return (
        <Container style={{minHeight:"100vh"}}>
            <h1 style={{color:"white",textAlign:"center",fontSize:"35px",marginTop:"3%",marginBottom:"3%"}}>{account.name} adlı kullanıcın izleme listesi</h1>
            <Grid container item xs={12} sm={12} md={12} lg={12}>
                {watchlists.map(watchlist => {
                    return (
                        <Grid item lg={2} sm={4} xs={12}>
                            <Watchlist movieId={watchlist.movieId} watchId={watchlist._id} />
                        </Grid>
                    )
                })}
            </Grid>
        </Container>
    )
}

export default WatchlistPage;