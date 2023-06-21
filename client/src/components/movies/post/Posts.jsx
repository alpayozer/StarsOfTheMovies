import { useEffect, useState } from 'react';

import { Grid, Box } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';

// import { getAllPosts } from '../../../service/api';
import { API } from '../../../service/api';

//components
import Post from './Post';
import {ML} from "../../../i18next.js";

const Posts = () => {
    const [posts, getPosts] = useState([]);
    
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');
    const title = searchParams.get('title');

    useEffect(() => {
        const fetchData = async () => { 
            let response = await API.getAllPosts({ title : title ,category:category || "" });
            if (response.isSuccess) {
                getPosts(response.data);
            }
        }
        fetchData();
    }, [category,title]);

    return (
        <>
            {
                posts?.length ? posts.map(post => (
                    <Grid item lg={2} sm={4} xs={12}>
                        <Link style={{textDecoration: 'none', color: 'inherit'}} to={`/movies/details/${post._id}`}>
                            <Post post={post} />
                        </Link>
                    </Grid>
                )) : <Box style={{color: '878787', margin: '30px 80px', fontSize: 18}}>
                        {ML('üzgünüz')}
                    </Box>
            }
        </>
    )
}

export default Posts;