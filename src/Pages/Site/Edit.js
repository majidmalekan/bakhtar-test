import React, {useEffect, useState,} from 'react'
import Sidebar from "../../Components/Sidebar";
import {Form, Button, Row} from 'react-bootstrap'
import api from './../../Api/api';
import Api from "../../Api/api";
import {useLocation, useParams} from 'react-router-dom'

function Edit() {
    const [state, setState] = useState({});
    const [Data, setData] = useState();
    const [Render, setRender] = useState();
    const {siteId} = useParams();

    const onChange = (e) => {
        const {name, value, type, files} = e.target;
        const newVal = type === "file" ? files[0] : value;
        setState({
            ...state,
            [name]: newVal
        });
    };

    useEffect(() => {
            Api.get('/site/' + siteId)
                .then(response => {
                        if (response.success === true) {
                            setData(response.data);
                            setRender(true);
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
            name: 'logo',
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

    const create = () => {
        api.post('/site', state).then(response => {

        })
    };
    return (

        <>
            <div className="wrapper d-flex align-items-stretch">
                <Sidebar/>
                <div id="content" className="p-4 p-md-5 pt-5">
                    <Form>
                        {Render ?
                            <>
                                <Button variant="primary" onClick={() => {
                                    setRender(false)
                                }}>
                                    ویرایش
                                </Button>
                                {labels.map((item, key) => {
                                    return (
                                        <Form.Group className="mt-3" controlId="formBasicEmail">
                                            <Form.Label>{item.label}</Form.Label>
                                            <Form.Control
                                                as={item.as}
                                                readOnly
                                                type={item.type}
                                                value={Data[item.name]}
                                                name={item.name}
                                            />
                                        </Form.Group>

                                    )
                                })
                                }
                            </> :
                            <>
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
                                <div className="d-flex justify-content-between">

                                    <Button
                                        variant="success"
                                        onClick={create}>
                                        ایجاد
                                    </Button>

                                    <Button
                                        variant="danger"
                                        onClick={()=>{setRender(true)}}>
                                        انصراف
                                    </Button>
                                </div>

                            </>

                        }


                    </Form>
                </div>
            </div>
        </>
    )
}

export default Edit