import React from 'react'
import Sidebar from "../../Components/Sidebar";

function Sites() {
    return (
        <>
            <div className="wrapper d-flex align-items-stretch">
                <Sidebar/>
                <div id="content" className="p-4 p-md-5 pt-5">
                </div>
            </div>
        </>
    )
}

export default Sites