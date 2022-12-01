import React from 'react'
import './../Assests/CSS/404.css'
import {Link} from 'react-router-dom'
function NotFound() {
    return (
        <div id="notfound">
            <div className="notfound">
                <div className="notfound-404">
                    <h1>404</h1>
                    <h2>شما وارد یک لینک مرده شده اید</h2>
                </div>
                <Link to="/">صفحه ورود</Link>
            </div>
        </div>
    )
}

export default NotFound