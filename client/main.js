import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router'
import { render } from 'react-dom';
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from './store/configureStore';
import BookIndex from 'containers/books/Index';
import BookForm from 'containers/books/Form';
import DemoIndex from './containers/demo/index';
import DemoForm from './containers/demo/form';
import DemoResult from './containers/demo/result';
import Faces from './containers/Faces';
import Infer from './containers/Infer';
import Learn from './containers/Learn';
import ManualCharacter from './containers/ManualCharacter';
import ManualText from './containers/ManualText';
import Text from './containers/Text';
import Upload from './containers/Upload';

const root = document.getElementById('root');
if(root) {
  const store = configureStore();
  const history = syncHistoryWithStore(browserHistory, store);
  render(
      <Provider store={store}>
        <Router history={history}>
          <Route path="/books" component={BookIndex}>
            <Route path="/books/:id" component={BookForm} />
          </Route>
          <Route path="/demo" component={DemoIndex}>
            <Route path="/demo/result" component={DemoResult} />
            <Route path="/demo/:id" component={DemoForm} />
          </Route>
          <Route path="/faces" component={Faces} />
          <Route path="/infer" component={Infer} />
          <Route path="/learn" component={Learn} />
          <Route path="/manual_character" component={ManualCharacter} />
          <Route path="/manual_text" component={ManualText} />
          <Route path="/text" component={Text} />
          <Route path="/upload" component={Upload} />
        </Router>
      </Provider>,
      root);
}
