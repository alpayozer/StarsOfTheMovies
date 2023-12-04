import React, { useState, useEffect } from 'react';
import { Button , notification} from 'antd';
import { Box, styled, FormControl } from '@mui/material';
import { AddCircle as Add } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { Col, Row ,Input } from 'antd';
import melody from '../../assets/icons8-cookie-monster.svg'
import { API } from '../../service/api';
import { ML } from '../../i18next';

const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin: 0
    },
    height:"100vh",
    minHeight:"100"
}));

const Image = styled('img')({
    width: '80%',
    height: '50vh',
    objectFit: 'cover',
    borderRadius:"10px"
});

const StyledFormControl = styled(FormControl)`
    margin-top: 10px;
    display: flex;
`;

const initialMovie = {
    title: '',
    year:"",
    actors:"",
    directors:"",
    time:"",
    description: '',
    picture: '',
    categories: '',
    trailer:"",
    createdAt:Date.now()
}

const Update = () => {
    const navigate = useNavigate();

    const [movie, setMovie] = useState(initialMovie);
    const [file, setFile] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [api, contextHolder] = notification.useNotification();
    const { id } = useParams();

    const url = 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';
    
    useEffect(() => {
        const fetchData = async () => {
            let response = await API.getPostById(id);
            if (response.isSuccess) {
                setMovie(response.data);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        const getImage = async () => { 
            if(file) {
                const data = new FormData();
                data.append("name", file.name);
                data.append("file", file);
                
                const response = await API.uploadFile(data);
                if (response.isSuccess) {
                    movie.picture = response.data;
                    setImageURL(response.data);    
                }
            }
        }
        getImage();
    }, [file])
    const openNotificationWithIcon = (type) => {
        api[type]({
            message: ML('basarili'),
            description:
                ML('filmGüncellemeBasarili'),
        });
    };
    const updateBlogPost = async () => {
        await API.updatePost(movie);
        await openNotificationWithIcon('success');
        //navigate(`/movies/details/${id}`);
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
                    <Image src={movie.picture || url} alt="post" />
                </Container>
                </Col>
            
            <Col span={12}>
            <Container>
                <StyledFormControl>
                <label htmlFor="fileInput">
                    <Add style={{ color: "#FA9503" }}  fontSize="large" color="action" />
                    <span style={{ color: "white" }}> {ML('filmAfisi')} </span>
                </label>
                <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <Row style={{marginTop:"1%"}}>
                    <Input value={movie.title} name='title' onChange={(e)=> handleChange(e)} placeholder='Film Başlığı' />
                </Row>
                <Row style={{marginTop:"1%"}}>
                <Input value={movie.year} name='year' onChange={(e)=> handleChange(e)} placeholder='Film Yılı'/>
                    
                </Row>
                <Row style={{marginTop:"1%"}}>
                <Input value={movie.actors} name='actors' onChange={(e)=> handleChange(e)} placeholder='Oyuncular'/>
                  
                </Row>
                <Row style={{marginTop:"1%"}}>
                <Input value={movie.directors} name='directors' onChange={(e)=> handleChange(e)} placeholder='Yönetmen'/>
                </Row>
                <Row style={{marginTop:"1%"}}>
                <Input value={movie.categories} name='categories' onChange={(e)=> handleChange(e)} placeholder='Kategori'/>
                </Row>
                <Row style={{marginTop:"1%"}}>
                <Input value={movie.time} name='time' onChange={(e)=> handleChange(e)} placeholder='Süre'/>
                </Row>
                <Row style={{marginTop:"1%"}}>
                <Input value={movie.trailer} name='trailer' onChange={(e)=> handleChange(e)} placeholder='Film fragmanı'/>
                </Row>
                <Row style={{marginTop:"1%"}}>
                <Input value={movie.description} name='description' onChange={(e)=> handleChange(e)} placeholder='Film açıklaması'/>
                </Row>
                <Button style={{marginTop:"1%",backgroundColor:"#FA9503",color:"white",textDecoration:"none",border:"none",height:"4vh"}} 
                onClick={() => updateBlogPost()} variant="contained" color="primary">{<img style={{marginRight:"1%"}} src={melody} width={30} height={30}/>}
                Filmi Güncelle</Button>
            </StyledFormControl>
            </Container>
            </Col>

            
            </Row>
        </Container>
        
    )
}

export default Update;