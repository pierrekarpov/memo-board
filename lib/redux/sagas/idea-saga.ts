import * as _ from 'lodash'

import {
    getIdeas,
} from '@lib/api';
import { Action } from '@lib/models';
import {
    IDEAS_FETCH_REQUEST,
    IDEAS_FETCH_SUCCESS,
    IDEAS_FETCH_FAIL
} from '@lib/redux/actions';

import { call, put, takeLatest } from 'redux-saga/effects';


const getAESourceSaga = function* (action: Action): any {
    try {
        const response = yield call(getIdeas, action.payload);
        yield put({ type: IDEAS_FETCH_SUCCESS, response });
        return response;
    } catch (e) {
        console.error(e)
        yield put({ type: IDEAS_FETCH_FAIL, response: e });
    }
};


export default [
    takeLatest(IDEAS_FETCH_REQUEST, getAESourceSaga),

]