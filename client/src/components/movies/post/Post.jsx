
import { styled, Box, Typography } from '@mui/material';
import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import { BsStarFill } from "react-icons/bs";
import 'bootstrap/dist/css/bootstrap.min.css';
import { MdInfo,MdAddCircle } from "react-icons/md";
import styles from "../../../css/MoviesCard.module.css";
import { Col, Row } from 'react-bootstrap';
import { SiYoutubemusic } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from 'react';
import { API } from '../../../service/api';
// import { Col, Row } from 'antd';
import { DataContext } from '../../../context/DataProvider';

const Container = styled(Box)`
    border: 1px solid #d3cede;
    border-radius: 10px;
    margin: 10px;
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 350px;
    & > img, & > p {
        padding: 0 5px 5px 5px;
    }
`;

const Image = styled('img')({
    width: '100%',
    objectFit: 'cover',
    borderRadius: '10px 10px 0 0',
    height: 150
});

const Text = styled(Typography)`
    color: #878787
    font-size: 12px;
`;

const Heading = styled(Typography)`
    font-size: 18px;
    font-weight: 600
`;

const Details = styled(Typography)`
    font-size: 14px;
    word-break: break-word;
`;
const values ={
    userId:"",
    movieId:""
}
const Post = ({ post }) => {
    const url = post.picture ? post.picture : 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80';
    const { account } = useContext(DataContext);
    const [rates, setRates] = useState([]);
    
    const [watchlist,setWatchlist]= useState(values);
    
    const addEllipsis = (str, limit) => {
        return str.length > limit ? str.substring(0, limit) + '...' : str;
    } 

    useEffect(async() => {
        setWatchlist({...watchlist,userId:account.name,movieId:post._id})
        const getRate = async () => {
            const response = await API.getRates(post._id);
            if (response.isSuccess) {
                setRates(response.data);
            }
        }
        await getRate();
        console.log(rates+"post sayfasındaki rate");
    }, []);

    const addWatchlist = async()=>{
        // await setWatchlist({...watchlist,userId:account.name,movieId:movie._id})
        await API.addWatchlist(watchlist);
        alert("izleme listesine eklendi");
        console.log(watchlist);
    }

    return (
        // <Container>
        //     <Image src={url} alt="post" />
        //     <Text>{post.categories}</Text>
        //     <Heading>{addEllipsis(post.title, 20)}</Heading>
        //     <Text>Year: {post.year}</Text>
        //     <Text>Time: {post.time}</Text>
        //     <Details>{addEllipsis(post.description, 100)}</Details>
        // </Container>
        <div className={styles.movie_card}>
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
                        <Card.Title className={styles.title}>{post.title}</Card.Title>
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
                                <SiYoutubemusic className={styles.youtubeicon} />
                            {/* </Link> */}
                        </Col>
                        <Col>
                            {/* <Link to=""> */}
                                <MdAddCircle onClick={addWatchlist} className={styles.watchlisticon}/>
                            {/* </Link> */}
                        </Col>
                    </Row>
                </Card.Footer>
            </Card>
        </div>
    )
}

export default Post;