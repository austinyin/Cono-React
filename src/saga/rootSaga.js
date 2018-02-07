import {fork, all} from "redux-saga/effects";
import * as HomeSagas from "src/Main/Home/saga";
import * as ExploreSaga from 'src/Main/Explore/saga'
import * as UserSaga from 'src/Main/UserCenter/saga'
import * as AccountSaga from 'src/Account/saga'
import * as DialogSaga from 'src/components/Dialog/saga'

export default function* rootSaga() {
    yield all([
        ...Object.values(HomeSagas),
        ...Object.values(ExploreSaga),
        ...Object.values(UserSaga),
        ...Object.values(AccountSaga),
        ...Object.values(DialogSaga),
    ].map(fork));
}