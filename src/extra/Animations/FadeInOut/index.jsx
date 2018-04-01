import React from 'react'
import {CSSTransition} from 'react-transition-group'

import './style.scss'

export const FadeInoutTransition = (props) => (
    <CSSTransition
        {...props}
        classNames="fadeInOutTranslate"
        timeout={1000}
        mountOnEnter={true}
        unmountOnExit={true}
    />
)