import * as React from 'react';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import App from './app';

export interface BootstrapProps {
    store: Store;
}

export default ({ store }: BootstrapProps) => (
    <Provider store={store}>
        <App />
    </Provider>
);
