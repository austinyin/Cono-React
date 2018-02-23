import React from 'react'
import MainRouter from './router'
import Nav from "src/components/Nav";
import Dialog from 'components/Dialog'
import {connect} from "react-redux";
import {MainTag} from "src/Main/style";

const Main = ({match, account}) => (
    <MainTag>
        <div className="nav-holder"/>
        <div className="nav-con">
            <Nav account={account}/>
        </div>
        <Dialog/>
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
    mapDispatchToProps
)(Main)

