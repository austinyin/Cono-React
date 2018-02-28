import React, {Component} from 'react'
import {TweetFullCardType} from "src/components/TweetFullCard/model";


const ResizeHoc = (WrappedComponent) => {
    return class ScrollHOC extends Component {
        constructor(props, context) {
            super(props, context);
            this.onResize = this.onResize.bind(this)
            this.state = {
                nowType: window.innerWidth < 935 ? TweetFullCardType.common : TweetFullCardType.dialog
            }
        }

        componentDidMount() {
            window.addEventListener('resize', this.onResize);
        }

        componentWillUnmount() {
            window.removeEventListener('resize', this.onResize);
        }

        onResize(e) {
            const {nowType} = this.state
            let afterType = null
            if (e.target.innerWidth < 935 && nowType!==TweetFullCardType.common) {
                afterType = TweetFullCardType.common
            }
            if (e.target.innerWidth > 935 && nowType!==TweetFullCardType.dialog) {
                afterType = TweetFullCardType.dialog
            }
            if(afterType){
                this.setState({
                    nowType: afterType
                })
            }

        }





        render() {
            return(
                <WrappedComponent ref="wrapChild" {...this.props} nowType={this.state.nowType}/>
            )
        }
    }
};

export default ResizeHoc;