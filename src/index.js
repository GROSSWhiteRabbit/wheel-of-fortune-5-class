import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppWithDb from './components/AppWithDb';
import {Provider} from 'react-redux';
import store from './store/store';


ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
      <AppWithDb />
    </Provider>
    
  </React.StrictMode>,
  document.getElementById('root')
);


