import { Store } from '@lib/utils';
import produce from 'immer';
import { Error } from '@lib/utils';
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
    IDEAS_UPDATE_REQUEST,
    IDEAS_UPDATE_SUCCESS,
    IDEAS_UPDATE_FAIL,
} from '@lib/redux/actions'


type IdeaState = {
    isLoading: boolean;
    items: any[];
    newIdea?: any;
    error: string;
};

export const initialState: IdeaState = {
    isLoading: false,
    items: [],
    newIdea: undefined,
    error: ''
};

export const ideas = produce((draft, action) => {
    const { type, response } = action;
    switch (type) {
        case IDEAS_FETCH_REQUEST:
        case IDEAS_UPLOAD_REQUEST:
        case IDEAS_DELETE_REQUEST:
        case IDEAS_UPDATE_REQUEST:
            draft.isLoading = true;
            draft.newIdea = undefined
            break;


        case IDEAS_FETCH_SUCCESS:
            draft.items = Store.setAll(response.items);
            draft.isLoading = false;
            break;

        case IDEAS_UPLOAD_SUCCESS:
            draft.items = Store.upsertOne(response, draft.items)
            draft.newIdea = response
            draft.isLoading = false;
            break;

        case IDEAS_UPDATE_SUCCESS:
            console.log(response)
            draft.items = Store.upsertOne(response, draft.items)
            draft.isLoading = false;
            break;

        case IDEAS_DELETE_SUCCESS:
            draft.items = Store.removeOne(response, draft.items)
            draft.newIdea = undefined
            draft.isLoading = false;
            break


        case IDEAS_FETCH_FAIL:
        case IDEAS_UPLOAD_FAIL:
        case IDEAS_DELETE_FAIL:
        case IDEAS_UPDATE_FAIL:
            draft.error = Error.getErrorMessage(response);
            draft.isLoading = false;
            draft.newIdea = undefined
            break;

    }
}, initialState)