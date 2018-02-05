import React from 'react'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as DialogCenterActions from './actions'

import './style.scss'


class Dialog extends React.Component {
    constructor(props) {
        super(props);
        this.dialogHide = this.dialogHide.bind(this);
        this.state = {
            dialogVisible: this.props.dialogVisible,
            dialogElems: this.props.elems
        }
    }

    init() {

    }

    componentDidMount() {
        this.init()
    }

    componentWillReceiveProps(nextProps) {
        // 将state 与redux 同步
        this.setState({
            dialogVisible: nextProps.dialogVisible,
            dialogElems: nextProps.dialogElems,
        })
    }

    componentWillUnmount() {
        // 清空列表
        this.dialogHide()
    }

    dialogHide() {
        this.props.dialogDisplay(false);

    }

    render() {
        return (
            this.state.dialogVisible ?
            <div id="dialogCenter">
                <div className="dialog-buttons-con">
                    <ul>
                        {this.props.dialogElems.map((v,k) => {
                            return (
                                <li>
                                    <button className="dialog-button" onClick={v.func}>{v.text}</button>
                                </li>
                            )
                        })}

                        <li>
                            <button className="dialog-button" onClick={this.dialogHide}>取消</button>
                        </li>
                    </ul>
                </div>
                <div className="dialog-bac"/>


            </div>
                : null

        )
    }
}

function mapStateToProps(state) {
    return {
        dialogVisible: state.Dialog.visible,
        dialogElems: state.Dialog.dialogElems,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dialogDisplay: bindActionCreators(DialogCenterActions.dialogDisplaySet, dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dialog)
