import React from 'react'
import PropTypes from 'prop-types';

import './style.scss'
import {TweetFullCardType} from "src/components/TweetFullCard/model";
import {PositionIconTag, IconTypeToPosition} from "src/shared/styleJs/common/componentStyle";
import {Rotate180Icon} from "src/components/Slider/style";


class Slider extends React.Component {
    constructor(props) {
        super(props);
        this.changeImage = this.changeImage.bind(this);
        this.state={
            imageIndex: 0,
            imageTotal: this.props.images.length,
            directIcons: {left: false,right: false}
        }
    }

    componentDidMount(){
        if(this.state.imageTotal > 1) {
            this.setState({
                directIcons: {left: false,right: true}
            })
        }
    }

    changeImage(e){
        const {"imageIndex":nowIndex,"imageTotal":total} = this.state

        const className = e.target.className
        const directIcons = Object.assign({},this.state.directIcons)
        let afterIndex = null;
        if(nowIndex > 0 && className.includes('left')){
            afterIndex = nowIndex-1;
            if(afterIndex===0){
                directIcons.left = false
            }
            directIcons.right = true
        }
        if(nowIndex < total-1 && className.includes('right')){
            afterIndex = nowIndex+1
            if(afterIndex===total-1){
                directIcons.right = false
            }
            directIcons.left = true
        }
        this.setState({
            imageIndex: afterIndex,
            directIcons: directIcons
        })
    }



    render() {
        const type = this.context.TweetFullCardType;
        const images = this.props.images
        const nowImage = images.length>0? images[this.state.imageIndex].image : "http://127.0.0.1:8000/media/%E6%8E%A8%E6%96%87%E5%9B%BE%E7%89%87/2018/02/17/tweet.jpg"
        const {directIcons} = this.state
        return(
            <div id="slider">
                <div className="slider-left-button-con">
                    <PositionIconTag
                        hide={!directIcons.left}
                        width="30px"
                        height="30px"
                        type={IconTypeToPosition.leftDirection.type}
                        className="slider-left-button"
                        onClick={this.changeImage}
                    />
                </div>
                <div className="img-con">
                    <img className={type===TweetFullCardType.common? "img-fluid index-image": ''} src={nowImage} alt=""/>
                </div>
                <div className="slider-right-button-con ">
                    <PositionIconTag
                        hide={!directIcons.right}
                        width="30px"
                        height="30px"
                        type={IconTypeToPosition.rightDirection.type}
                        className="slider-right-button"
                        onClick={this.changeImage}
                    />
                </div>
                {type===TweetFullCardType.common?
                    <div className="slider-dots">
                        <ul>
                            {images.length>0? images.map((v,k) => {
                                return <li key={v.id} className={this.state.imageIndex === k? 'dot-active' : ''}>.</li>
                            }):null}

                        </ul>
                    </div> : null
                }

            </div>
        )
    }
}

Slider.contextTypes = {
    TweetFullCardType: PropTypes.string.isRequired,
}

export default Slider