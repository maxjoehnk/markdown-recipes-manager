import * as React from 'react';
import { renderToString } from 'react-dom/server';
import Bootstrap from '../components/bootstrap';
import setupStore, { AppState } from '../store';

export function renderApp(): string {
    const store = setupStore();
    const element = React.createElement(Bootstrap, {
        store
    });
    const body = renderToString(element);

    const state = store.getState();

    return template(body, state);
}

const template = (body: string, state: AppState): string => `
    <html>
        <body>
            <div id="app">${body}</div>
            <script>
                window.__PRELOADED_STATE__ = ${JSON.stringify(state)};
            </script>
            <script src="app.bundle.js"></script>
        </body>
    </html>
`;
