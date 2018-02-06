import React, {Component} from 'react'
import axios from 'axios'


export default (WrappedComponent) => {
    class NewComponent extends Component {
        constructor(props, context) {
            super(props, context);
            this.handleScroll = this.handleScroll.bind(this);
            this.init = this.init.bind(this)
            this.state = {
                props:props,
                fixed: false,
                recomConStyle: {}
            }
        }
        init(){
            window.addEventListener('scroll', this.handleScroll);
        }
        componentWillMount() {
            this.wrappedComponent = this.refs.wrappedComponent;
            this.init()
        }
        handleScroll(){
            const bannerElem = this.refs.wrappedComponent.refs.banner
            let offBot = bannerElem.offsetTop + bannerElem.clientHeight
            if(document.documentElement.scrollTop > offBot && this.state.fixed === false){
                this.setState({
                    fixed: true,
                })
            } else if(document.documentElement.scrollTop < offBot && this.state.fixed === true){
                this.setState({
                    fixed: false,
                })
            }
        }


        render() {
            return <WrappedComponent props={this.state.props} fixed={this.state.fixed} ref="wrappedComponent"/>
        }
    }

    return NewComponent
}