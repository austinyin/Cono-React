import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import PasswordSetting from "src/Main/SettingCenter/PasswordSetting";
import SelfPageSetting from "src/Main/SettingCenter/Edit";

const SettingCenterRouter = () => (
    <Switch>
        <Route exact path="/account/edit" component={SelfPageSetting}/>
        <Route exact path="/account/password/change" component={PasswordSetting}/>
        <Redirect from="/account" to="/account/edit"/>
    </Switch>

)

export default SettingCenterRouter
