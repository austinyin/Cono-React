import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './Home'
import UserCenter from './UserCenter'
import Explore from "src/Main/Explore";
import ExlorePeople from "src/Main/Explore/ExlorePeople/ExlorePeople";
import Account from "src/extra/Account";
import SettingCenter from "src/Main/SettingCenter";

const MainRouter = () => (
    <switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/explore" component={Explore}/>
        <Route exact path="/explore/people" component={ExlorePeople}/>
        <Route exact path='/account' component={Account}/>
        <Route path='/setting' component={SettingCenter}/>
        <Route exact path="/:user" component={UserCenter}/>
    </switch>

)

export default MainRouter
