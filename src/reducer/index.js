import { combineReducers } from 'redux'
import TweetList from 'Main/Home/reducer'
import Explore from 'Main/Explore/reducer'
import User from 'Main/UserCenter/reducer'
import Account from 'src/Account/reducer'
import Dialog from 'src/components/Dialog/reducer'

export default combineReducers({
    TweetList,
    Explore,
    User,
    Account,
    Dialog
})