import React from 'react'
import MainRouter from './router'
import UserCenter from "src/Main/UserCenter";
import {Route, Switch, Redirect, Link} from 'react-router-dom'

import Home from "src/Main/Home";


const Main = ({ match }) => (
    <div>
        <MainRouter match={match}/>
    </div>
);

export default Main

