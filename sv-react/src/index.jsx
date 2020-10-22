import React from 'react';
import { render } from 'react-dom';

import { createStore } from "redux"
import partidaReducer from "./redux/reducers.js"
import { Provider } from "react-redux"

import { App } from './App';

// setup fake backend
import { configureFakeBackend } from './_helpers';
configureFakeBackend();

const store = createStore(partidaReducer);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);
