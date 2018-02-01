import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import Nav from 'components/Nav'
import './style.scss'
import TweetFullCard from "src/components/TweetFullCard";
import HomeRightBar from "src/Main/Home/HomeRightBar/HomeRightBar";

import * as TweetListActions from './actions'

class Home extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.listUpdate = this.listUpdate.bind(this)
        this.test = this.test.bind(this)
        this.state = {
            nowPage: this.props.nowPage,
            list: [],
            // childHeight: 0,
            windowHeight: 0
        }

    }

    listUpdate(size){
        if (!this.updating) {
            this.updating = true
            getArticleList(this.state.nextPage, size).then(res => {
                this.setState({
                    list: this.state.list.concat(res.data.results),
                })
                this.props.increase(size/9)
            }).then(() => {
                this.setState({
                    nextPage: this.props.nextPage
                }, () => {
                    this.updating = false;
                    console.log(this.updating)
                })
            })
        }
    }

    init() {

    }

    componentDidMount() {
        this.init()
    }

    componentWillReceiveProps(nextProps) {
        console.log('nextProps',nextProps)
    }

    test(){
        this.props.TweetNextPage();
    }



    render() {
        return (
            <div id="home">
                <div className="nav-con">
                    <Nav/>
                    <div>
                        <button onClick={this.test}>testtest</button>
                    </div>
                </div>
                <div className="container main">
                    <div className="row">
                        <div className="main-left-con col-8">
                            <TweetFullCard/>
                        </div>
                        <div className="main-right-con col-4">
                            <HomeRightBar/>
                        </div>
                    </div>
                </div>

            </div>

        )
    }
}

function mapStateToProps(state) {
    return {
        nowPage: state.TweetList.nowPage
    }
}

function mapDispatchToProps(dispatch) {
    return {
        testAction: bindActionCreators(TweetListActions.testAction, dispatch),
        TweetNextPage: bindActionCreators(TweetListActions.tweetNextPage, dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)