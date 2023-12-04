import React, { useState, useEffect, useContext } from 'react';

import { styled, Box, TextareaAutosize, InputBase, FormControl, Grid } from '@mui/material';
import { AddCircle as Add } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { Col, Row, Input, notification , Button} from 'antd';
import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';
import smurf from '../../assets/icons8-smurf.svg'
import { ML } from '../../i18next';

const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin: 0
    },
    height: "100vh",
    minHeight: "100"
}));

const Image = styled('img')({
    width: '80%',
    height: '50vh',
    objectFit: 'cover',
    borderRadius: "10px"
});

const StyledFormControl = styled(FormControl)`
    margin-top: 10px;
    display: flex;
`;

const InputTextField = styled(InputBase)`
    flex: 1;
    margin: 0 30px;
    font-size: 25px;
`;

const Textarea = styled(TextareaAutosize)`
    width: 100%;
    border: none;
    margin-top: 50px;
    font-size: 18px;
    &:focus-visible {
        outline: none;
    }
`;

const initialMovie = {
    title: '',
    year: "",
    actors: "",
    directors: "",
    time: "",
    description: '',
    picture: '',
    categories: '',
    trailer:"",
    createdAt: Date.now()
}

const CreatePost = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [api, contextHolder] = notification.useNotification();
    const [movie, setMovie] = useState(initialMovie);
    const [file, setFile] = useState('');
    const { account } = useContext(DataContext);

    const url = movie.picture ? movie.picture : 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';

    useEffect(() => {
        const getImage = async () => {
            if (file) {
                const data = new FormData();
                data.append("name", file.name);
                data.append("file", file);

                const response = await API.uploadFile(data);
                movie.picture = response.data;
            }
        }
        getImage();
    }, [file])

    const openNotificationWithIcon = (type) => {
        api[type]({
            message: ML('basarili'),
            description:
                ML('filmYüklemeBasarili'),
        });
    };
    const saveMovie = async () => {
        await API.createPost(movie);
        await openNotificationWithIcon('success');
        // navigate('/');
    }

    const handleChange = (e) => {
        setMovie({ ...movie, [e.target.name]: e.target.value });
    }

    return (
        <Container>
            {contextHolder}
            <Row>
                <Col span={12}>
                    <Container>
                        <Image src={url} alt="post" />
                    </Container>
                </Col>
                <Col span={12}>
                    <Container>
                        <StyledFormControl>
                            <label htmlFor="fileInput">
                                <Add style={{ color: "#FA9503" }} fontSize="large" color="action" />
                                <span style={{ color: "white" }}> {ML('filmAfisi')} </span>
                            </label>
                            <input
                                type="file"
                                id="fileInput"
                                style={{ display: "none" }}
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                            <Row style={{ marginTop: "1%" }}>
                                <Input name='title' onChange={(e) => handleChange(e)} placeholder='Film Başlığı' />
                            </Row>
                            <Row style={{ marginTop: "1%" }}>
                                <Input name='year' onChange={(e) => handleChange(e)} placeholder='Film Yılı' />

                            </Row>
                            <Row style={{ marginTop: "1%" }}>
                                <Input name='actors' onChange={(e) => handleChange(e)} placeholder='Oyuncular' />

                            </Row>
                            <Row style={{ marginTop: "1%" }}>
                                <Input name='directors' onChange={(e) => handleChange(e)} placeholder='Yönetmen' />
                            </Row>
                            <Row style={{ marginTop: "1%" }}>
                                <Input name='categories' onChange={(e) => handleChange(e)} placeholder='Kategori' />
                            </Row>
                            <Row style={{ marginTop: "1%" }}>
                                <Input name='time' onChange={(e) => handleChange(e)} placeholder='Süre' />
                            </Row>
                            <Row style={{ marginTop: "1%" }}>
                                <Input name='trailer' onChange={(e) => handleChange(e)} placeholder='Film fragmanı' />
                            </Row>
                            <Row style={{ marginTop: "1%" }}>
                                <Input name='description' onChange={(e) => handleChange(e)} placeholder='Film açıklaması' />
                            </Row>
                            
                            <Button style={{ marginTop: "1%", backgroundColor: "#FA9503", color: "white", textDecoration: "none", border: "none" , height:"4vh"}} 
                            onClick={() => saveMovie()} variant="contained" color="primary"> {<img style={{marginRight:"1%"}} src={smurf} width={30} height={30}/>}
                            Filmi yükle</Button>
                        </StyledFormControl>
                    </Container>
                </Col>
            </Row>


        </Container>
    )
}

export default CreatePost;