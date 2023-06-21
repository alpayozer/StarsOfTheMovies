import { useContext } from "react";
import { Container } from 'react-bootstrap';

import { Typography, Box, styled } from "@mui/material";
import { Delete } from '@mui/icons-material';
import { Card , Alert,notification} from 'antd';
import styles from "../../../css/MovieDetailComment.module.css"
import { API } from '../../../service/api';
import { DataContext } from "../../../context/DataProvider";
import {ML} from '../../../i18next.js';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { BiDislike, BiLike } from "react-icons/bi";
import { Row, Col } from "antd";
const Component = styled(Box)`
    margin-top: 30px;
    background: #F5F5F5;
    padding: 10px;
    
`;

// const Container = styled(Box)`
//     display: flex;
//     margin-bottom: 5px;
// `;

const Name = styled(Typography)`
    font-weight: 600,
    font-size: 18px;
    margin-right: 20px;
`;

const StyledDate = styled(Typography)`
    font-size: 14px;
    color: #878787;
`;

const DeleteIcon = styled(Delete)`
    margin-left: auto;

`;



const Comment = ({ comment, setToggle }) => {

    const { account } = useContext(DataContext)
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type) => {
      api[type]({
        message: ML('basarili'),
        description:
        ML('yorumSilme'),
      });
    };
    const removeComment = async () => {
        await API.deleteComment(comment._id);
        setToggle(prev => !prev);
        openNotificationWithIcon('success')
    }

    return (
        // <Component>
        //     <Container>
        //         <Name>{comment.name}</Name>
        //         <StyledDate>{new Date(comment.date).toDateString()}</StyledDate>
        //         {comment.name === account.username &&
        //         <>
        //          {/* <BiLike style={{marginLeft:"20px"}}  size={20}/>
        //          <BiDislike style={{marginLeft:"10px"}} size={20} /> */}
        //          <DeleteIcon onClick={() => removeComment()} />
        //         </>
        //          }
        //     </Container>
        //     <Typography>{comment.comments}</Typography>
        // </Component>
        <Container>
{contextHolder}
        <Card className={styles.card}
            size="small"
            headStyle={{ color: 'white', borderColor: 'grey' }}
            title={comment.name}
            extra={
                <>
                <span style={{ color: "white" }}>{new Date(comment.date).toDateString()}</span>
                    {comment.name === account.username && <>
                        {/* <BiLike style={{marginLeft:"20px"}}  size={20}/>
                              <BiDislike style={{marginLeft:"10px"}} size={20} /> */}
                        <DeleteIcon style={{color:"white",marginLeft:"10px"}} onClick={() => removeComment()} />
                    </>
                    }
                    
                </>
            }
            >
            <p>{comment.comments}</p>

        </Card>
            </Container>
    )
}

export default Comment;