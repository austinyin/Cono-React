import {fork, all} from "redux-saga/effects";
import * as HomeSagas from "src/Main/Home/saga";
import * as ExploreSaga from 'src/Main/Explore/saga'
import * as UserSaga from 'src/Main/UserCenter/saga'
import * as AccountSaga from 'src/extra/Account/saga'
import * as DialogSaga from 'src/components/Dialog/saga'
import * as RelationSaga from 'src/extra/Relation/saga'
import * as SearchSaga from 'src/extra/Search/saga'

export default function* rootSaga() {
    yield all([
        ...Object.values(HomeSagas),
        ...Object.values(ExploreSaga),
        ...Object.values(UserSaga),
        ...Object.values(AccountSaga),
        ...Object.values(DialogSaga),
        ...Object.values(RelationSaga),
        ...Object.values(SearchSaga),
    ].map(fork));
}


