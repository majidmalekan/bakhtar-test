import React, {useState, useEffect} from 'react'
import Sidebar from "../../Components/Sidebar";
import {Table, Button, Col, Row, Modal} from 'react-bootstrap'
import {Link} from "react-router-dom";
import Api from "../../Api/api";
import {FaTrash} from 'react-icons/fa';
import {FiEdit} from 'react-icons/fi'

function Sites() {
    const [Data, setData] = useState([]);
    const [Show, setShow] = useState(false);
    const [Id, setId] = useState();

    const headings = [
        {
            heading: 'ردیف',
        },
        {
            heading: 'نام',
        },
        {
            heading: 'ایمیل',
        },
        {
            heading: 'شماره تماس',
        },
        {
            heading: 'نقش',
        },
        {
            heading: 'تاریخ ایجاد',
        },
        {
            heading: 'عملیات',
        },

    ];
    useEffect(() => {
            Api.get('/user')
                .then(response => {
                        if (response.success === true) {
                            setData(response.data.data)
                        }
                    }
                ).catch(function (error) {
                    console.log(error.data.message);
                }
            )
        }, []
    );
    const destroy = () => {
        Api.delete('/user/'+Id)
            .then(response => {
                    if (response.success === true) {
                        window.location.reload();
                    }

                }
            ).catch(function (error) {
                console.log(error.data.message);
            }
        )
    };
    return (
        <>
            <Modal
                show={Show}
                onHide={() => setShow(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>هشدار</Modal.Title>
                </Modal.Header>
                <Modal.Body>از حذف سایت مورد نظر مطمئن هستید؟</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary">
                        خیر
                    </Button>
                    <Button variant="primary" onClick={destroy}>
                        بله
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className="wrapper d-flex align-items-stretch">
                <Sidebar/>
                <div id="content" className="p-4 p-md-5 pt-5">
                    <div className="mb-3 d-flex justify-content-between">
                        <Link to='/user/create'>
                            <Button>
                                کاربر جدید
                            </Button>
                        </Link>
                        <Button variant="secondary">
                            انتخاب همه
                        </Button>
                    </div>

                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            {
                                headings.map((item, key) => {
                                        return (
                                            <th> {item.heading} </th>
                                        )
                                    }
                                )
                            }
                        </tr>
                        </thead>
                        <tbody>
                        {
                            Data.map((item, key) => {
                                return (
                                    <tr>
                                        <td>{key + 1}</td>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.phone}</td>
                                        <td>{item.role}</td>
                                        <td>{item.created_at}</td>
                                        <td>
                                            <Row>

                                                <Col>
                                                    <Button variant="danger" onClick={() => {
                                                        setShow(true);
                                                        setId(item.id);
                                                    }}>
                                                        <FaTrash/>
                                                    </Button>
                                                </Col>

                                                <Col>
                                                    <Button variant="primary">
                                                        <FiEdit className="iconEdit"/>
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                        </tbody>
                    </Table>
                </div>
            </div>
        </>
    )
}

export default Sites