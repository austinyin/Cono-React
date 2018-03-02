import React, {Component} from 'react'



const ScrollHOC = (WrappedComponent) => {
    return class ScrollHOC extends Component {
        constructor(props, context) {
            super(props, context);
            this.handleScroll = this.handleScroll.bind(this)
            this.onWindowResize = this.onWindowResize.bind(this)
        }



        handleScroll() {
            const distance = this.documentElem.clientHeight - this.guidElem.getBoundingClientRect().top
            this.refs.wrapChild.receiveDistance(distance)

            this.sendScrollTop()
        }

        onWindowResize(){
            this.sendScrollTop()
        }

        sendScrollTop(){
            const resizeScrollTopReciever = this.refs.wrapChild.resizeScrollTopReciever
            resizeScrollTopReciever && resizeScrollTopReciever(this.documentElem.scrollTop)
        }

        componentDidMount() {
            window.addEventListener('scroll', this.handleScroll);
            window.addEventListener('resize', this.onWindowResize);
            this.guidElem = this.refs.scrollGuide;
            this.documentElem = document.documentElement
        }

        componentWillUnmount() {
            window.removeEventListener('scroll', this.handleScroll);
            window.removeEventListener('resize', this.onWindowResize);
        }



        render() {
            return(
                <WrappedComponent ref="wrapChild" {...this.props} >
                    <div ref="scrollGuide" className="scroll-guide"/>
                </WrappedComponent>
            )
        }
    }
};

export default ScrollHOC;