import { legacy_createStore as createStore, applyMiddleware, combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { allReducers } from "./allReducers";

const persistConfig = {
    key: "care-traning",
    storage
};

const reducers = combineReducers({
    allReducers: allReducers
})

// export default reducers;


const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(persistedReducer);

export const persistor = persistStore(store);

export default store;