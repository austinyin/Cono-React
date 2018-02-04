import React, {Component} from 'react'


const ScrollHOC = (WrappedComponent) => {
    return class ScrollHOC extends Component {
        constructor(props, context) {
            super(props, context);
            this.handleScroll = this.handleScroll.bind(this)
        }

        handleScroll() {
            const distance = this.documentElem.clientHeight - this.guidElem.getBoundingClientRect().top
            this.refs.wrapChild.receiveDistance(distance)
        }

        componentDidMount() {
            window.addEventListener('scroll', this.handleScroll);
            this.guidElem = this.refs.scrollGuide;
            this.documentElem = document.documentElement
        }

        componentWillUnmount() {
            window.removeEventListener('scroll', this.handleScroll);
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