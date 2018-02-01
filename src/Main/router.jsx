import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import Home from './Home'
import UserCenter from './UserCenter'

const MainRouter = () => (
    <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/user" component={UserCenter}/>
    </Switch>

)

export default MainRouter
