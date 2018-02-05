import React from 'react'
import MainRouter from './router'
import Nav from "src/components/Nav";
import DialogCenter from 'components/Dialog'
import {connect} from "react-redux";

const Main = ({ match,account }) => (
    <div>
        <div className="nav-con">
            <Nav account={account}/>
        </div>
        <DialogCenter/>
        <MainRouter match={match}/>
    </div>
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

