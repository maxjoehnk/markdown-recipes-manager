import rootReducer, { AppState } from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, Store } from 'redux';

export { AppState } from './reducers';

declare global {
    export interface NodeModule {
        hot: any;
    }
}

export default function setupStore(preloadedState?: AppState): Store<AppState> {
    const composedEnhancers = composeWithDevTools();

    let store: Store<AppState>;

    if (preloadedState) {
        store = createStore(rootReducer, preloadedState, composedEnhancers);
    } else {
        store = createStore(rootReducer, composedEnhancers);
    }

    if (process.env.NODE_ENV !== 'production' && module.hot) {
        module.hot.accept('./reducers', () =>
            store.replaceReducer(rootReducer)
        );
    }

    return store;
}
