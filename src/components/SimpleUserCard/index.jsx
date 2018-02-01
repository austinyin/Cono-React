import React from 'react'
import './style.scss'

class SimpleUserCard extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div id="SimpleUserCard">
                <div className="suc-left">
                    <a href="" className="img-con" >
                        <img className="img "  src={require("src/assets/img/avatar/avatar.jpg")}/>
                    </a>
                    <a href="" className="infos-con ">
                        <span className="left-item left-title">{this.props.title}</span>
                        <span className="left-item left-subtitle">{this.props.subtitle}</span>
                    </a>
                </div>
                {this.props.middle ? <div className="suc-middle">middle</div> : ''}
                {this.props.right ? <div className="suc-right">right</div> : ''}
            </div>
        )
    }
}

export default SimpleUserCard