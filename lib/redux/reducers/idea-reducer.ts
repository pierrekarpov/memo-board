import { Store } from '@lib/utils';
import produce from 'immer';
import { Error } from '@lib/utils';
import {
    IDEAS_FETCH_REQUEST,
    IDEAS_FETCH_SUCCESS,
    IDEAS_FETCH_FAIL,
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
            draft.isLoading = true;
            draft.newIdea = undefined
            break;


        case IDEAS_FETCH_SUCCESS:
            draft.items = Store.setAll(response.items);
            draft.isLoading = false;
            break;


        case IDEAS_FETCH_FAIL:
            draft.error = Error.getErrorMessage(response);
            draft.isLoading = false;
            draft.newIdea = undefined
            break;

    }
}, initialState)