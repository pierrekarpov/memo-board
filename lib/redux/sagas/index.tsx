export * from './idea-saga'
import { all } from 'redux-saga/effects'

import ideaSaga from './idea-saga'

export default function* rootSaga() {
    yield all([...ideaSaga])
}
