import React, { useState, useEffect, useContext } from 'react';

import { TextField, Box, Button, Typography, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Container, Row } from "react-bootstrap";
import styles from "../../css/Login.module.css"
import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';
import { ML}  from '../../i18next.js';

const Component = styled(Box)`
    width: 400px;
    margin: auto;
    padding-top:150px;
`;

const Image = styled('img')({
    width: 100,
    display: 'flex',
    margin: 'auto',
    padding: '50px 0 0'
});

const Wrapper = styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    & > div, & > button, & > p {
        margin-top: 20px;
    }
`;

const LoginButton = styled(Button)`
    text-transform: none;
    background: #FA9503;
    color: #fff;
    height: 48px;
    border-radius: 2px;
`;

const SignupButton = styled(Button)`
    text-transform: none;
    background: #fff;
    color: #FA9503;
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

const Text = styled(Typography)`
    color: #878787;
    font-size: 12px;
`;

const Error = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`

const loginInitialValues = {
    username: '',
    password: ''
};

const signupInitialValues = {
    name: '',
    username: '',
    password: '',
};
// { isUserAuthenticated } props olarak geliyordu
const Login = ({ isUserAuthenticated }) => {
    const [login, setLogin] = useState(loginInitialValues);
    const [signup, setSignup] = useState(signupInitialValues);
    const [error, showError] = useState('');
    const [account, toggleAccount] = useState('login');

    const navigate = useNavigate();
    const { setAccount } = useContext(DataContext);

    const imageURL = 'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png';

    useEffect(() => {
        showError(false);
    }, [login])

    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    }

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    }

    const loginUser = async () => {
        let response = await API.userLogin(login);
        if (response.isSuccess) {
            showError('');

            sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
            sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
            setAccount({ name: response.data.name, username: response.data.username });
            isUserAuthenticated(true)
            setLogin(loginInitialValues);
            navigate('/');
        } else {
            showError('Something went wrong! please try again later');
        }
    }

    const signupUser = async () => {
        let response = await API.userSignup(signup);
        if (response.isSuccess) {
            showError('');
            setSignup(signupInitialValues);
            toggleAccount('login');
        } else {
            showError('Something went wrong! please try again later');
        }
    }

    const toggleSignup = () => {
        account === 'signup' ? toggleAccount('login') : toggleAccount('signup');
    }

    return (
        <div className={styles.body}>

        <Component>
            <Box>
            
                {
                    account === 'login' ?
                    
                    <Wrapper>
                        <h1 className={styles.title}>{ML('giris')}</h1>
                            <TextField style={{backgroundColor:"white",borderRadius:"2px",boxShadow:"0px 0px 20px white"}} variant="standard" value={login.username} onChange={(e) => onValueChange(e)} name='username' label={ML('isimAlanı')} />
                            <TextField style={{backgroundColor:"white",borderRadius:"2px",boxShadow:"0px 0px 20px white"}} variant="standard" value={login.password} onChange={(e) => onValueChange(e)} name='password' label={ML('soyisimAlanı')} />

                            {error && <Error>{error}</Error>}

                            <LoginButton variant="contained" onClick={() => loginUser()} >{ML('girisButonu')}</LoginButton>
                            <Text style={{ textAlign: 'center' }}>{ML('yada')}</Text>
                            <SignupButton onClick={() => toggleSignup()} style={{ marginBottom: 50 }}>{ML('kayıtOl')}</SignupButton>
                        </Wrapper> :
                        <Wrapper>
                        <h1 className={styles.title}>Kayıt Ol</h1>

                            <TextField variant="standard" onChange={(e) => onInputChange(e)} name='name' label='Enter Name' />
                            <TextField variant="standard" onChange={(e) => onInputChange(e)} name='username' label='Enter Username' />
                            <TextField variant="standard" onChange={(e) => onInputChange(e)} name='password' label='Enter Password' />

                            <SignupButton onClick={() => signupUser()} >Signup</SignupButton>
                            <Text style={{ textAlign: 'center' }}>OR</Text>
                            <LoginButton variant="contained" onClick={() => toggleSignup()}>Already have an account</LoginButton>
                        </Wrapper>
                }
            </Box>
        </Component>
                </div>
        // <div className={styles.body}>
        //     <div className={styles.login_container}>
        //     <Component>
        //     <Box>
        //     <Wrapper>
        //             <h1 className={styles.title}>Giriş Yap</h1>
        //             {/* <Row >
        //                 <input
        //                 className={styles.input}
        //                 type="text"
        //                 placeholder="Adı"
        //                 onChange={(e) => onInputChange(e)}
        //                 name='name' 
        //                 />
        //             </Row> */}
        //              <Row >
        //                 <input
        //                 className={styles.input}
        //                 type="text"
        //                 placeholder="Kullanıcı Adı"
        //                 onChange={(e) => onInputChange(e)}
        //                 name='username' 
        //                 />
        //             </Row>
        //             <Row>
        //                 <input
        //                 className={styles.input}
        //                 type="password"
        //                 placeholder="Şifre"
        //                 onChange={(e) => onInputChange(e)}
        //                 name='password'
        //                 />
        //             </Row>
        //             <Row>
        //                 <button onClick={() => loginUser()} className={styles.button}>Giriş Yap</button>
        //             </Row>
        //             <Row>
        //                 <p className={styles.text}>Hesabınız yok mu ?<a className={styles.text} href="/signup">Kayıt olunuz</a></p>
        //             </Row>
        //             </Wrapper>    
        //             </Box> 
        //             </Component>          
        //     </div>
        //     </div>
    )
}

export default Login;