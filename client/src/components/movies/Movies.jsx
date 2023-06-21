
import { Grid } from '@mui/material';

//components
import Categories from './Categories';
import Posts from './post/Posts';
import { Col, Divider, Row } from 'antd';
import { Container } from 'react-bootstrap';
const style = { background: '#0092ff', padding: '8px 0' };

const Movies = () => {

    return (
       <Container>

        <Grid style={{minHeight:"100vh",marginTop:"3%"}}>
            <Grid item lg={2} xs={12} sm={2}>
                <Categories />
            </Grid>
            <Grid style={{marginTop:"3%"}} container item xs={12} sm={12} md={12} lg={12}>
                <Posts />
            </Grid>
        </Grid>
       </Container>
    )
}

export default Movies;