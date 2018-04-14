import React from 'react'
import MainRouter from './router'
import Nav from "src/components/Nav";
import Dialog from 'components/Dialog'
import {connect} from "react-redux";
import {MainTag} from "src/Main/style";
import Animations from "src/extra/Animations";

const Main = ({match, account}) => (
    <MainTag>
        {/*导航占位*/}
        <div className="nav-holder"/>
        <div className="nav-con">
            <Nav account={account}/>
        </div>
            <Dialog/>
            <Animations/>
        <MainRouter match={match}/>
    </MainTag>
);


function mapStateToProps(state) {
    return {
        account: state.Account,
    }
}

function mapDispatchToProps(dispatch) {
    return {}
}

export default connect(
    mapStateToProps,
    null
)(Main)

