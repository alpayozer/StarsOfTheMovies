import { useState, useEffect, useContext } from 'react';

import {  Table, TableHead, TableRow, TableCell, TableBody, styled } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';
import { DataContext } from '../../context/DataProvider';
import { Button} from 'antd';
import { categories } from '../../constants/data';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Container } from 'react-bootstrap';
import princess from '../../assets/icons8-princess.svg';
import {ML} from "../../i18next.js";

const Categories = () => {
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');
    const { account } = useContext(DataContext);

    return (
        <>
            {
                account.username === "admin" &&
                <>
                <Container>
                    <Link to={`/create`} style={{ textDecoration: 'none' }}>
                        <Button style={{backgroundColor:"#FA9503" , color:"white",textDecoration:"none",marginBottom:"2%", float:"right",border:"none",height:"4vh"}} >{<img style={{marginRight:"1%"}} src={princess} width={30} height={30}/>}{ML('yeniFilmEkle')}</Button>
                    </Link>
                </Container>
                    
                </>
            }
            <Container>
                <Row style={{ justifyContent: "space-around" }}>

                    <Col style={{  maxWidth: "90px", height: "30px", textAlign: "center", borderRadius: "3px",borderStyle:"dashed", borderColor:"white" , stroke:"white"}}>
                        <Link style={{ color: "white", textDecoration: "none" }} to={"/movies"}>
                            All</Link>
                    </Col>
                    {categories.map(category => (
                        <Col style={{  maxWidth: "90px", height: "30px", textAlign: "center", borderRadius: "10px" , borderRadius: "3px",borderStyle:"dashed", borderColor:"white"}}>
                            <Link style={{ color: "white", textDecoration: "none" }} to={`/movies/?category=${category.type}`}>
                                {category.type}</Link>
                        </Col>
                    ))}
                </Row>
            </Container>


        </>
    )
}

export default Categories;