import React from 'react'
import './style.scss'

class UserHeader extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div id="userHeader">
                <div className="row">
                    <div className="col-4">
                        <div className="img-con">
                            <img src="" alt=""/>
                        </div>
                    </div>
                    <div className="col-8 user-infos">
                        <div className="row">
                            <h4>userName</h4>
                            <span className="veri-icon"></span>
                            <div>
                                <button></button>
                            </div>
                            <div>
                                <button></button>
                            </div>
                        </div>
                        <div className="row">
                            <div>
                                <span>123</span>帖子
                            </div>
                            <div>
                                <span>123</span>关注者
                            </div>
                            <div>
                                正在关注<span>123</span>
                            </div>
                        </div>
                        <div className="row">
                            <span className="info-user-fullName">userName</span>
                            <span className="info-self-desc">self describe</span>
                        </div>
                        <div className="row">
                            <a href="">
                                <span>shop.worldstarhiphop.com</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default UserHeader