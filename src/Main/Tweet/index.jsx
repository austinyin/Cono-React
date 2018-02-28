import React from 'react'

import withRouter from "react-router-dom/es/withRouter";
import {TweetTag} from "src/Main/Tweet/style";
import {getTweetApi} from "src/Main/Tweet/api";
import TweetFullCard from 'components/TweetFullCard'
import {TweetFullCardType} from "src/components/TweetFullCard/model";
import PropTypes from 'prop-types';


class Tweet extends React.Component {
    constructor(props,context) {
        super(props,context);
        this.onWindowResize = this.onWindowResize.bind(this);
        this.state = {
            data: null,
            type: TweetFullCardType.dialog,
        }

    }

    getChildContext() {
        return {TweetFullCardType: this.state.type};
    }

    componentDidMount() {
        // 视频事件绑定
        this.init()
    }


    init() {
        window.addEventListener('resize', this.onWindowResize)
        const tweetId = this.props.match.params.id
        getTweetApi(tweetId).then(data => {
            this.setState({
                data: data
            })
        })
    }

    onWindowResize(e) {
        if (e.target.innerWidth < 935) {
            this.setState({
                type: TweetFullCardType.common
            })
        }
    }


    render() {
        const {data,type} = this.state
        return (
            <TweetTag>
                {data && (
                    <TweetFullCard
                        tweetData={data}
                        type={type}
                    />
                )}
            </TweetTag>
        )
    }
}

Tweet.childContextTypes = {
    TweetFullCardType: PropTypes.string,
}


export default withRouter(Tweet)