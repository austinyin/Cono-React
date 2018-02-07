import React from 'react'
import './style.scss'
import Link from "react-router-dom/es/Link";

class SimpleUserCard extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div id="SimpleUserCard" className={this.props.verticle ? 'd-flex flex-column' : ''}>
                <div className={this.props.verticle ? 'd-flex flex-column suc-left' : 'suc-left'}>
                    <Link to={`/${this.props.title}`} className="img-con">
                        <img className="img " src={require("src/assets/img/avatar/avatar.jpg")}/>
                    </Link>
                    <Link to={`/${this.props.title}`} className="infos-con">
                        <span className="left-item left-title">{this.props.title}</span>
                        <span className="left-item left-subtitle">{this.props.subtitle}</span>
                    </Link>
                </div>
                {this.props.middle ? <div className="suc-middle">middle</div> : ''}
                {this.props.followButton ? <div className="suc-right">
                    <button>关注</button>
                </div> : ''}
            </div>
        )
    }
}

export default SimpleUserCard