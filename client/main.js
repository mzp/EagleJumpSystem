import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import Books from './containers/Books';
import Faces from './containers/Faces';
import Text from './containers/Text';
import Upload from './containers/Upload';
import Learn from './containers/Learn';
import Infer from './containers/Infer';

[
  ['books-root', Books],
  ['faces-root', Faces],
  ['text-root', Text],
  ['upload-root', Upload],
  ['learn-root', Learn],
  ['infer-root', Infer]
].forEach(([id, Container]) => {
  const mountNode = document.getElementById(id);
  if(mountNode) {
    const store = configureStore();
    render(
        <Provider store={store}><Container /></Provider>,
        mountNode);
  }
});

