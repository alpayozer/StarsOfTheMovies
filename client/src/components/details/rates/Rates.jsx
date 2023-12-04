import React from 'react';

import { Rate } from 'antd';
import RatePage from "./RatePage"
import { useState, useEffect, useContext } from 'react';
import { Row,Col } from 'react-bootstrap';
import { Button, Modal } from 'antd';
import { MdPlaylistAdd, MdStar, MdOutlineNotStarted } from "react-icons/md";

import { API } from '../../../service/api';
import { Tooltip, Tag } from 'antd';

const initialValue = {
    movieId: '',
    rate: 0,
}
const Rates = ({ movie }) => {
    const [rate, setRate] = useState(initialValue);
    const [rates, setRates] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    let rateSum=0;

    useEffect(() => {
        const getRate = async () => {
            const response = await API.getRates(movie._id);
            if (response.isSuccess) {
                setRates(response.data);
            }
        }
        getRate();
        console.log(rates+"getRATE");
    }, [movie]);

    const handleChange = (e) => {
        setRate({
            ...rate,
            movieId: movie._id,
            rate: e
        });
        console.log(e + "handle change");
    }

    const addRate = async () => {
        await API.newRate(rate);
        console.log(rate + "ekleme alanı Rate");
        setRate(initialValue)
        // setToggle(prev => !prev);
    }
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = async () => {
        await addRate();
        setIsModalOpen(false);
        console.log(rate + "ekleme alanı OK");

    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        // <Rate onChange={(e) => handleChange(e)} style={{ alignItems: "center", marginLeft: "150px" }} />
        <>
        <Row>
            <Col md={2}><MdStar onClick={showModal} size={25} /></Col>
            <Modal title="Filmi Puanla" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Rate onChange={(e) => handleChange(e)} style={{ alignItems: "center", marginLeft: "150px" }} />
            </Modal>
            {
                rates && rates.length > 0 && rates.map(rate => {
                    // console.log(rate.rate+"map");
                    rateSum+=rate.rate;
                }
                )          
            }
            {/* <RatePage rate={rateSum} length={rates.length}/> */}
            {/* <div>ORTALAMA{rateSum = rateSum / rates.length}</div> */}
            <Col md={3}><Tag color="geekblue">{(rateSum = rateSum / rates.length).toFixed(1)}</Tag></Col>
        </Row>
            
            
            
        </>
    )
}

export default Rates;