import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import configureStore from '../store/configureStore';
import Upload from '../containers/Upload';

const store = configureStore();
const mountNode = document.getElementById('root');

render(
  <Provider store={store}><Upload /></Provider>,
  mountNode);
