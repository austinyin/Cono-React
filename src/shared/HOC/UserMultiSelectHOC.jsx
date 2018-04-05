/**
 * 返回用户的朋友列表
 */
import React, {Component} from 'react'
import connect from "react-redux/es/connect/connect";
import {compose} from "redux";


const UserMultiSelectHOC = (WrappedComponent) => {
    return class UserMultiSelectHOC extends Component {
        constructor(props) {
            super(props);
            this.state = {
                friendList: []
            }
        }

        componentDidMount() {
            const {loginUser} = this.props
            if(loginUser.relations_obj&&loginUser.relations_obj.friendList.length>0){
                const filterList = loginUser.relations_obj.friendList.map(user =>{
                    return {label: user.username, value: user.username}
                })
                this.setState({
                    friendList:filterList
                })
            }
        }


        render() {
            return (
                <WrappedComponent ref={elem => this.child=elem} {...this.props} itemList={this.state.friendList}/>
            )
        }
    }
};

export function mapStateToProps(state) {
    return {
        loginUser:state.Account.user
    }
}


export default compose(
    connect(
        mapStateToProps,
        null
    ),
    UserMultiSelectHOC,
)


