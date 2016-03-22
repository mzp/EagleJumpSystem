import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import configureStore from '../store/configureStore';
import Text from '../containers/Text';

const store = configureStore();
const mountNode = document.getElementById('root');

render(
  <Provider store={store}><Text /></Provider>,
  mountNode);
