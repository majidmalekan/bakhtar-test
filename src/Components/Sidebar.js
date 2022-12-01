import React from 'react'
import './../Assests/CSS/sidebar.css'
import {CgWebsite} from 'react-icons/cg'
import {FiUser} from 'react-icons/fi'
import {BiRepost} from 'react-icons/bi'
import {FaHome} from 'react-icons/fa'
import {Link, useLocation} from "react-router-dom";

function Sidebar() {
    let location = useLocation();
    console.log(location.pathname)
    let navbarItem = [
        {name: 'صفحه اصلی', icon: FaHome, to: '/dashboard'},
        {name: 'مدیریت سایت ها', icon: CgWebsite, to: '/site'},
        {name: 'مدیریت کاربران', icon: FiUser, to: '/user'},
        {name: 'مدیریت پست ها', icon: BiRepost, to: '/post'},
    ];
    const title = 'سامانه باختر';
    return (
        <nav id="sidebar">
            <h1>
                <p className="logo text-decoration-none">
                    {title}
                </p>
            </h1>
            <ul className="list-unstyled components mb-5">
                {
                    navbarItem.map((item, key) => {
                        return (
                            <li className={item.to === location.pathname ? "active" : ""}>
                                <Link to={item.to} activeClassName="active">
                                    <item.icon style={{marginLeft: '8px', fontSize: '22px'}}/>
                                    {item.name}
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>

        </nav>
    )
}

export default Sidebar