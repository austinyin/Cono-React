import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './Home'
import Tweet from './Tweet'
import UserCenter from './UserCenter'
import Explore from "src/Main/Explore";
import ExlorePeople from "src/Main/Explore/ExlorePeople/ExlorePeople";
import Account from "src/extra/Account";
import SettingCenter from "src/Main/SettingCenter";
import MultiSelect from "src/components/MultiSelect";
import Snapshot from "src/Main/Snapshot";

const MainRouter = () => (
    <switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/test" component={MultiSelect}/>
        <Route exact path="/tweet/:id" component={Tweet}/>
        <Route exact path="/explore" component={Explore}/>
        <Route exact path="/explore/people" component={ExlorePeople}/>
        <Route exact path='/account' component={Account}/>
        <Route path='/setting' component={SettingCenter}/>
        <Route path='/snapshot/:user' component={Snapshot}/>
        <Route exact path="/user/:user" component={UserCenter}/>
    </switch>

)

export default MainRouter
