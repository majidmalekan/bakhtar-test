import React, {useState, useEffect} from 'react'
import Sidebar from "../../Components/Sidebar";
import {Button, Col, Row, Modal, Table} from 'react-bootstrap'
import {Link} from "react-router-dom";
import Api from "../../Api/api";
import {FaTrash} from 'react-icons/fa';
import {FiEdit} from 'react-icons/fi';
import {BsCheckLg} from 'react-icons/bs'
import {FaSkullCrossbones} from 'react-icons/fa'

function Sites() {
    const [Data, setData] = useState([]);
    const [Id, setId] = useState();
    const [Show, setShow] = useState(false);
    const headings = [
        {
            heading: 'ردیف',
        },
        {
            heading: 'نام سایت',
        },
        {
            heading: 'دامنه سایت',
        },
        {
            heading: 'وضعیت سایت',
        },
        {
            heading: 'تاریخ ایجاد',
        },
        {
            heading: 'عملیات',
        },

    ];
    useEffect(() => {
            setTimeout(() => {
                    Api.get('/site/')
                        .then(response => {
                                console.log(response);
                                if (response.success === true) {
                                    setData(response.data.data)
                                }

                            }
                        ).catch(function (error) {
                            console.log(error.data.message);
                        }
                    )
                }, 300
            )
        }, []
    );
    const destroy = () => {
        Api.delete('/site/' + Id)
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
                    <Button variant="secondary" onClick={() => setShow(false)}>
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
                        <Link to='/site/create'>
                            <Button>
                                سایت جدید
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
                                        <td>
                                            <a href={item.url}>
                                                {item.url}
                                            </a>
                                        </td>
                                        <td>
                                            {item.status === 'enable' ?
                                                <span style={{color: '#00bfa4'}}>
                                                    <BsCheckLg style={{marginLeft: '8px'}}/>
                                                    فعال
                                                </span>
                                                : <span style={{color: '#ad1010'}}>
                                                    <FaSkullCrossbones style={{marginLeft: '8px'}}/>
                                                    غیرفعال
                                                </span>}
                                        </td>
                                        <td>{item.created_at}</td>
                                        <td>
                                            <Row>

                                                <Col>
                                                    <Button variant="danger" onClick={() => {
                                                        setShow(true);
                                                        setId(item.id)
                                                    }}>
                                                        <FaTrash/>
                                                    </Button>
                                                </Col>

                                                <Col>
                                                    <Button variant="primary">
                                                        <Link to={{pathname: `/site/` + item.id}}>
                                                            <FiEdit className="iconEdit"/>
                                                        </Link>
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