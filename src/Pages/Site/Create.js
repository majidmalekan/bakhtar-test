import React, {useState} from 'react'
import Sidebar from "../../Components/Sidebar";
import {Form, Button, Row} from 'react-bootstrap'
import api from './../../Api/api';
function Sites() {
    const [state, setState] = useState({});
    const onChange = (e) => {
        const {name, value, type, files} = e.target;
        const newVal = type === "file" ? files[0] : value;
        setState({
            ...state,
            [name]: newVal
        });
    };
    const labels = [
        {
            label: 'نام سایت',
            type: 'text',
            placeholder: 'لطفا نام سایت را وارد کنید',
            name: 'name',
        },
        {
            label: 'دامنه سایت',
            type: 'text',
            placeholder: 'لطفا دامنه سایت را وارد کنید',
            name: 'url',
        },
        {
            label: 'لوگوی سایت',
            type: 'file',
            placeholder: 'لطفا لوگوی سایت را انتخاب کنید',
            name: 'file',
        },
        {
            label: 'consumer_key',
            type: 'text',
            placeholder: 'لطفا consumer_key سایت را وارد کنید',
            as: 'textarea',
            name: 'consumer_key',
        },
        {
            label: 'consumer_secret_key',
            type: 'text',
            placeholder: 'لطفا consumer_secret_key سایت را وارد کنید',
            as: 'textarea',
            name: 'consumer_secret_key',
        },
        {
            label: 'وضعیت',
            type: 'text',
            placeholder: 'لطفا وضعیت سایت را انتخاب کنید',
            name: 'status',
        },

    ];

    const create = () =>
    {
        let fd=new FormData();
        fd.append('name',state.name)
        fd.append('status',state.status)
        fd.append('consumer_secret_key',state.consumer_secret_key)
        fd.append('consumer_key',state.consumer_key)
        fd.append('url',state.url)
        fd.append('file',state.file)
        api.post('/site',fd,{
            headers: {
                'Content-Type': 'multipart/form-data',
                Accept: 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('access_token'),
            }
        }).then(response=>{

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