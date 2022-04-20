import * as _ from 'lodash'

import { Action } from '@lib/models';
import {
    IDEAS_FETCH_REQUEST,
    IDEAS_FETCH_SUCCESS,
    IDEAS_FETCH_FAIL,
    IDEAS_UPLOAD_REQUEST,
    IDEAS_UPLOAD_SUCCESS,
    IDEAS_UPLOAD_FAIL,
    IDEAS_DELETE_REQUEST,
    IDEAS_DELETE_SUCCESS,
    IDEAS_DELETE_FAIL,
} from '@lib/redux/actions';

import { call, put, takeLatest } from 'redux-saga/effects';

const KEY = 'ideas'

// if (!process.browser || !localStorage) return;
// localStorage.setItem(key, jwt);
// return process.browser && localStorage.getItem(key);

const getIdeaSaga = function* (action: Action): any {
    try {
        // localStorage.setItem(KEY, JSON.stringify([{
        //     id: 1,
        //     body: 'hey there big bodey',
        //     title: 'title',
        //     createdAt: 123
        // }, {
        //     id: 2,
        //     body: 'hey there big bodey',
        //     title: 'title',
        //     createdAt: 123
        // }]))
        const response = { items: JSON.parse(localStorage.getItem(KEY) as string) }
        console.log('!!!! savedIdeas', response)
        yield put({
            type: IDEAS_FETCH_SUCCESS, response
        });
        return response;
    } catch (e) {
        console.error(e)
        yield put({ type: IDEAS_FETCH_FAIL, response: e });
    }
};


const createIdeaSaga = function* (action: Action): any {
    try {
        const savedIdeas = JSON.parse(localStorage.getItem(KEY) as string)
        const ids = _.map(savedIdeas, i => i.id)
        console.log(ids)
        const newIdea = {
            id: _.max(ids) + 1,
            body: '',
            title: '',
            created_date: Date.now()
        }
        const newIdeas = [...savedIdeas, newIdea]

        localStorage.setItem(KEY, JSON.stringify(newIdeas))
        const response = newIdea
        yield put({
            type: IDEAS_UPLOAD_SUCCESS, response
        });
        return response;
    } catch (e) {
        console.error(e)
        yield put({ type: IDEAS_UPLOAD_FAIL, response: e });
    }
};


const deleteIdeaSaga = function* (action: Action): any {
    try {
        const { id: deletedId } = action.payload.params
        console.log('deletedId', deletedId)
        const savedIdeas = JSON.parse(localStorage.getItem(KEY) as string)
        // const ids = _.map(savedIdeas, i => i.id)
        // console.log(ids)
        // const newIdea = {
        //     id: _.max(ids) + 1,
        //     body: '',
        //     title: '',
        //     created_date: Date.now()
        // }
        const newIdeas = _.filter(savedIdeas, idea => idea.id != deletedId)

        localStorage.setItem(KEY, JSON.stringify(newIdeas))
        const response = deletedId
        yield put({
            type: IDEAS_DELETE_SUCCESS, response
        });
        return response;
    } catch (e) {
        console.error(e)
        yield put({ type: IDEAS_DELETE_FAIL, response: e });
    }
};


// eslint-disable-next-line import/no-anonymous-default-export
export default [
    takeLatest(IDEAS_FETCH_REQUEST, getIdeaSaga),
    takeLatest(IDEAS_UPLOAD_REQUEST, createIdeaSaga),
    takeLatest(IDEAS_DELETE_REQUEST, deleteIdeaSaga),

]