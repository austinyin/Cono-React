import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './Home'
import Tweet from './Tweet'
import UserCenter from './UserCenter'
import Explore from "src/Main/Explore";
import ExlorePeople from "src/Main/Explore/ExlorePeople/ExlorePeople";
import SettingCenter from "src/Main/SettingCenter";
import MultiSelect from "src/components/MultiSelect";

const MainRouter = () => (
    <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/test" component={MultiSelect}/>
        <Route exact path="/tweet/:id" component={Tweet}/>
        <Route exact path="/explore" component={Explore}/>
        <Route exact path="/explore/people" component={ExlorePeople}/>
        <Route path='/account' component={SettingCenter}/>
        <Route exact path="/user/:user" component={UserCenter}/>
    </Switch>

)

export default MainRouter
