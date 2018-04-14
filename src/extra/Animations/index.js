import React, {Component} from 'react'
import {AnimationsTag} from "src/extra/Animations/style";
import PropTypes from 'prop-types';
import {Loading} from "src/extra/Animations/Loading";
import {connect} from "react-redux";
import {isAnimating} from "src/extra/Animations/reducer";

class Animations extends Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {
        const {effcts,isAnimating} = this.props.Animations
        const {loading} = effcts
        return (
            isAnimating && <AnimationsTag>
                {loading && (
                    <div className="loading-wrapper">
                        <Loading/>
                    </div>
                )}
            </AnimationsTag>
        )
    }
}

Animations.propTypes = {
    Animations: PropTypes.object,
};

function mapStateToProps(state) {
    return {
        Animations: state.Animations
    }
}


export default connect(
    mapStateToProps,
    null
)(Animations)

