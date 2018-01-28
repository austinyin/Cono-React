import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import Home from './Home'
import UserCenter from './UserCenter'

const MainRouter = ({match}) => (
    <Switch>
        <Route exact path={`${match.url}/`} component={Home}/>
        <Route path={`${match.url}/user`} component={UserCenter}/>
    </Switch>

)

export default MainRouter
