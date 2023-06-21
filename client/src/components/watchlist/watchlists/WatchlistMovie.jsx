
import { styled, Box, Typography } from '@mui/material';
import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import { BsStarFill } from "react-icons/bs";
import 'bootstrap/dist/css/bootstrap.min.css';
import { MdInfo, MdAddCircle, MdDelete } from "react-icons/md";
import styles from "../../../css/MoviesCard.module.css";
import { Col, Row } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from 'react';
import { API } from '../../../service/api';
// import { Col, Row } from 'antd';
import { DataContext } from '../../../context/DataProvider';
import {  Alert, notification } from 'antd';


const WatchlistMovie = ({ movie, id }) => {
    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = (type) => {
        api[type]({
            message: 'Başarılı',
            description:
                'Film listeden başarıyla kaldırıldı.',
        });
    };

    const removeWatchlist = async () => {
        await API.deleteWatchlist(id);
        console.log(id + "silindi");
        openNotificationWithIcon('success')
    }


    const url = movie.picture ? movie.picture : 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80';
    return (
        <div className={styles.movie_card}>
            {contextHolder}
            <Card className={styles.movie_card_body}>
                <Card.Img className={styles.movie_card_image} src={url} />
                <Card.Body className={styles.movie_card_inner_body}>
                    <Card.Body className={styles.up_body}>
                        <Row>
                            <Col md={1}>
                                <BsStarFill className={styles.icon} />
                            </Col>
                            <Col md={4}><Card.Text className={styles.imdb}>20</Card.Text></Col>
                        </Row>
                        <Card.Title className={styles.title}>{movie.title}</Card.Title>
                    </Card.Body>
                </Card.Body>
                <Card.Footer style={{ textAlign: "center" }} className="text-muted">
                    <Row >
                        {/* <Col>                            
                        <Link to={`details/${post._id}`}>
                            <MdInfo className={styles.detailicon} />
                        </Link>
                    </Col> */}
                        <Col>
                            {/* <Link target='_blank' to={trailer}> */}
                            <MdInfo className={styles.watchlisticon} />

                            {/* </Link> */}
                        </Col>
                        <Col>
                            {/* <Link to=""> */}
                            <MdDelete onClick={() => removeWatchlist()} className={styles.watchlisticon} />
                            {/* </Link> */}
                        </Col>
                    </Row>
                </Card.Footer>
            </Card>
        </div>
    )
}

export default WatchlistMovie;