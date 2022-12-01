import React, {useEffect, useState} from 'react'
import Sidebar from "../../Components/Sidebar";
import {Form, Button, Row} from 'react-bootstrap'
import api from './../../Api/api';
import Api from "../../Api/api";
function Sites() {
    const [state, setState] = useState({});
    const [Data, setData] = useState({});

    const onChange = (e) => {
        const {name, value, type, files} = e.target;
        const newVal = type === "file" ? files[0] : value;
        setState({
            ...state,
            [name]: newVal
        });
    };
    useEffect(() => {
            Api.get('/role')
                .then(response => {
                    console.log(response)
                        if (response.success === true) {
                            setData(response.data)
                        }
                    }
                ).catch(function (error) {
                    console.log(error.data.message);
                }
            )
        }, []
    );
    const labels = [
        {
            label: 'نام کاربر',
            type: 'text',
            placeholder: 'لطفا نام کاربر را وارد کنید',
            name: 'name',
        },
        {
            label: 'ایمیل',
            type: 'text',
            placeholder: 'لطفا ایمیل را وارد کنید',
            name: 'email',
        },
        {
            label: 'شماره تماس',
            type: 'text',
            placeholder: 'لطفا شماره تماس  را انتخاب کنید',
            name: 'phone',
        },
        {
            label: 'گذرواژه',
            type: 'text',
            placeholder: 'لطفا گذرواژه را وارد کنید',
            name: 'password',
        },
        {
            label: ' تایید گذرواژه',
            type: 'text',
            placeholder: 'لطفا گذرواژه را تکرار کنید',
            name: 'password_confirmation',
        },
        // {
        //     label: 'نقش',
        //     type: 'text',
        //     placeholder: 'لطفا وضعیت سایت را انتخاب کنید',
        //     name: 'role',
        //     as:'select',
        //     options:[
        //         {
        //             d
        //         },
        //     ]
        // },

    ];

    const create = () =>
    {
        api.post('/user',state).then(response=>{
            if (response.success===true)
            {
                window.location.replace('/user')
            }
        })
    };

    return (

        <>
            <div className="wrapper d-flex align-items-stretch">
                <Sidebar/>
                <div id="content" className="p-4 p-md-5 pt-5">

                    <Form>
                        {
                            labels.map((item, key) => {
                                return (

                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>{item.label}</Form.Label>
                                        <Form.Control
                                            as={item.as}
                                            onChange={onChange}
                                            type={item.type}
                                            placeholder={item.placeholder}
                                            name={item.name}
                                        />
                                    </Form.Group>

                                )
                            })
                        }

                        <Button variant="success" onClick={create}>
                            ایجاد
                        </Button>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default Sites