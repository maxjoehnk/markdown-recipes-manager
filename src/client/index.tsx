import * as React from 'react';
import { hydrate } from 'react-dom';
import Bootstrap from '../components/bootstrap';
import setupStore, { AppState } from '../store';
import { Store } from 'redux';

declare global {
    interface Window {
        __PRELOADED_STATE__: AppState;
    }
}

function renderApp(store: Store<AppState>) {
    const app = document.getElementById('app');
    hydrate(<Bootstrap store={store} />, app);
}

const store = setupStore(window.__PRELOADED_STATE__);

renderApp(store);
