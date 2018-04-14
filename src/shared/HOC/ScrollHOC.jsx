/**
 * 窗口滚动高级组件
 * 用于触底刷新
 */
import React, {Component} from 'react'

const ScrollHOC = (WrappedComponent) => {
    return class ScrollHOC extends Component {
        constructor(props, context) {
            super(props, context);
            this.handleScroll = this.handleScroll.bind(this)
            this.onWindowResize = this.onWindowResize.bind(this)
        }

        handleScroll() {
            const {scrollGuide,wrapChild} = this.refs
            const distance = document.documentElement.clientHeight - scrollGuide.getBoundingClientRect().top
            wrapChild.receiveDistance(distance)
            this.sendScrollTop()
        }

        onWindowResize(){
            this.sendScrollTop()
        }

        sendScrollTop(){
            const resizeScrollTopReciever = this.refs.wrapChild.resizeScrollTopReciever
            resizeScrollTopReciever && resizeScrollTopReciever(document.documentElement.scrollTop)
        }

        componentDidMount() {
            window.addEventListener('scroll', this.handleScroll);
            window.addEventListener('resize', this.onWindowResize);
        }

        componentWillUnmount() {
            window.removeEventListener('scroll', this.handleScroll);
            window.removeEventListener('resize', this.onWindowResize);
        }



        render() {
            return(
                <WrappedComponent ref="wrapChild" {...this.props} >
                    <div ref="scrollGuide" className="scroll-guide"/>
                    <div ref="haha"/>
                </WrappedComponent>
            )
        }
    }
};


export default ScrollHOC;