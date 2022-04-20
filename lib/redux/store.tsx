import { applyMiddleware, createStore, combineReducers } from "redux";
import createSagaMiddleware, { SagaMiddleware } from "redux-saga";
import { createWrapper } from "next-redux-wrapper";

import reducers from "@lib/redux/reducers";
import rootSaga from "@lib/redux/sagas";

const rootReducer = combineReducers({ ...reducers });

const bindMiddleware = (middleware: SagaMiddleware<object>[]) => {
    if (process.env.NODE_ENV !== "production") {
        const { composeWithDevTools } = require("redux-devtools-extension");
        return composeWithDevTools(applyMiddleware(...middleware));
    }
    return applyMiddleware(...middleware);
};

export const makeStore = (_context: any) => {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(rootReducer, bindMiddleware([sagaMiddleware]));

    Object.assign(store, {
        sagaTask: sagaMiddleware.run(rootSaga),
    });

    return store;
};

export const wrapper = createWrapper(makeStore, { debug: true });
