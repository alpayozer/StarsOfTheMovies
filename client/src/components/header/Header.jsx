import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import styles from "../../css/Header.module.css";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, Space,Button } from 'antd';
import Form from 'react-bootstrap/Form';
import Offcanvas from 'react-bootstrap/Offcanvas';
import star from "../../assets/logo.png";
import Popcorn from "../../assets/popcorn-2.png";
import bmo from "../../assets/bmo.svg"
import { useNavigate, useLocation } from 'react-router-dom';
import { API } from '../../service/api';
import { DataContext } from "../../context/DataProvider";
import { useContext } from "react";
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import {Language} from '../../i18next.js';
import {ML} from '../../i18next.js';
const { Search } = Input;

const items = [
    {
        key: 'Yıldız',
        label: ML('yildizFilmler'),

    },
    {
        key: 'Kategoriler',
        label: ML('kategoriler'),
        children: [
            {
                key: 'Komedi',
                label: ML('komedi'),
            },
            {
                key: 'Romantik',
                label: ML('romantik'),
            },
            {
                key: 'Korku',
                label: ML('korku'),
            },
            {
                key: 'Aksiyon',
                label: ML('aksiyon'),
            },
            {
                key: 'Drama',
                label: ML('drama'),
            },

        ],
    },

];

const Header = () => {
    const navigate = useNavigate();
    const { account } = useContext(DataContext);
    const [search, setSearch] = useState("");
    const onSearch = (value) =>{
        navigate(`/movies/?title=${value}`);
        setSearch("");
    }
    const logOut = async () => {
        const token = sessionStorage.getItem("accessToken")
        let response = await API.userLogout(token);
        if (response.isSuccess) {

            navigate('/login');
        } else {
            console.log('Something went wrong! please try again later');
        }
    }

    return (
        <Container className={styles.body}>
            <Navbar variant='dark' className={styles.navbar}>
                <Container>
                    <Navbar.Brand onClick={() => navigate("/")}>
                        <img
                            src={star}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            alt="React Bootstrap logo"
                        />
                    </Navbar.Brand>
                    <Dropdown className={styles.navbarMenu}
                        menu={{
                            items,
                            onClick: ({ key }) => {
                                console.log(`Click on item ${key}`);
                                navigate(`/movies/?category=${key}`)
                            }
                        }}
                    >
                        <a onClick={(e) => e.preventDefault()}>
                            <Space>
                                <img
                                    src={Popcorn}
                                    width="20"
                                    height="20"
                                    className="d-inline-block align-top"
                                    alt="React Bootstrap logo"
                                />

                            </Space>
                        </a>
                    </Dropdown>
                    {/* <Form className={styles.navbarSearch}>
                        <Form.Control
                            type="search"
                            placeholder="Aramak istediğiniz filmi giriniz"
                            className="me-2"
                            aria-label="Search"
                            onChange={(e)=>{setSearch(e.target.value);
                            console.log(search);}}
                        />
                    </Form> */}
                    <Search className={styles.navbarSearch} placeholder='Aramak istediğiniz filmi giriniz' value={search} onChange={(e)=>setSearch(e.target.value)} onSearch={onSearch} enterButton/>
                    <Navbar.Toggle />
                    <Navbar.Offcanvas
                        placement="end"
                    >
                        <Offcanvas.Header closeButton>
                        </Offcanvas.Header >
                        <Offcanvas.Body >
                            <Nav className="justify-content-end flex-grow-1 pe-3">

                                <Nav.Link onClick={() => navigate("/movies")}>{ML('filmler')}</Nav.Link>
                                <Nav.Link onClick={() => navigate("/watchlist")}>{ML('izlemeListesi')}</Nav.Link>
                                {account.username ==="" ? 
                                <Nav.Link className={styles.signIn} href="/login">{ML('girisButonu')}</Nav.Link> 
                                :
                                <NavDropdown
                                    title={<span>{account.username} </span>}
                                >
                                    <NavDropdown.Item onClick={() => navigate("/profile")}>{ML('profile')}</NavDropdown.Item>
                                    <NavDropdown.Item onClick={() => navigate("/login")}>{ML('cikisYap')}</NavDropdown.Item>
                                </NavDropdown>}
                                
                            <div>
                            <Language />
                            </div>
                                {/* <NavDropdown
                                    //</Nav>title={<img src={bmo} width={30} height={30} />}>
                                    //<NavDropdown.Item onClick={() => {
                                      //  console.log("tr");
                                        //localStorage.setItem("dil", "tr");
                                    //}} href="#action3">TR</NavDropdown.Item>
                                    //<NavDropdown.Item href="#action4">
                                      //  ENG
                                    //</NavDropdown.Item>
                                    >
                                    <Language />
                                </NavDropdown> */}
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </Container>
    )
}

export default Header;