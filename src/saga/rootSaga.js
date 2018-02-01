import {fork, all} from "redux-saga/effects";
import * as HomeSagas from "src/Main/Home/saga";

export default function* rootSaga() {
    yield all([
        ...Object.values(HomeSagas),
    ].map(fork));
}