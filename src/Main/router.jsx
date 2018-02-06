import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './Home'
import UserCenter from './UserCenter'
import Explore from "src/Main/Explore";
import ExlorePeople from "src/Main/Explore/ExlorePeople/ExlorePeople";
import Account from "src/Account";

const MainRouter = () => (
    <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/explore" component={Explore}/>
        <Route exact path='/account' component={Account} />

        <Route exact path="/explore/people" component={ExlorePeople}/>
        <Route path="/:user" component={UserCenter}/>

    </Switch>

)

export default MainRouter
