import React, {useEffect, useState} from 'react'
import {Card, Container, Row, Form, Button} from "react-bootstrap";
import WordPress from './../../Assests/Images/Logo/BakhtarLogo.png'
import './../../Assests/CSS/main.css'
import Api from './../../Api/api'
import history from './../../Components/history'

function Login() {
    const [Username, setUsername] = useState();
    const [Password, setPassword] = useState();
    // const [Message, setMessage] = useState();
    const [Remember, setRemember] = useState(false);
    const login = () => {
        let data = {username: Username, password: Password};
        Api.post('/login', data)
            .then(response => {
                    if (response.success === true) {
                        sessionStorage.setItem('access_token', response.data.access_token);
                        if (sessionStorage.getItem('access_token') !== null) {
                            window.location.replace('./site')
                        }
                    }
                }
            ).catch(function (error) {
                // alert.show(error.data.message);
            }
        )
    };

    const changeUsername = (event) => {
        setUsername(event.target.value)
    };
    const changePassword = (event) => {
        setPassword(event.target.value)
    };
    const changeRemember = (event) => {
        setRemember(event.target.checked)
    };
    return (
        <body className="min-vh-100 d-flex align-items-center" style={{backgroundColor: '#f9f6f6'}}>
        <Container>
            <Row className="w-75 justify-content-center m-auto">
                <img src={WordPress} style={{width: '40%'}} alt="لوگوی وردپرس"/>
            </Row>
            <Row className="mt-3">
                <Card className="m-auto w-50">
                    <Card.Body className="w-100 m-auto">
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>شماره تماس یا ایمیل</Form.Label>
                                <Form.Control onChange={changeUsername} type="text"
                                              placeholder="شماره تماس یا ایمیل خود را وارد کنید"/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>گذرواژه</Form.Label>
                                <Form.Control onChange={changePassword} type="password"
                                              placeholder="گذرواژه خود را وارد کنید"/>
                            </Form.Group>
                            <Form.Group className="mb-3 d-flex" controlId="formBasicCheckbox">
                                <Form.Check onChange={changeRemember} type="checkbox" label="مرا بخاطر بسپار"/>
                                <Button variant="primary" className="marginRightAuto" onClick={login}>
                                    ورود
                                </Button>
                            </Form.Group>

                        </Form>
                    </Card.Body>
                </Card>
            </Row>
        </Container>
        </body>
    )
}

export default Login