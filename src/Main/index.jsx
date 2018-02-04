import React from 'react'
import MainRouter from './router'
import Nav from "src/components/Nav";


const Main = ({ match }) => (
    <div>
        <div className="nav-con">
            <Nav/>
        </div>
        <MainRouter match={match}/>
    </div>
);

export default Main

