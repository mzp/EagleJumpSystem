import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router'
import { render } from 'react-dom';
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from './store/configureStore';
import BookIndex from 'containers/books/Index';
import BookForm from 'containers/books/Form';
import DemoIndex from 'containers/demo/Index';
import DemoForm from 'containers/demo/Form';
import DemoResult from 'containers/demo/result';
import TextIndex from 'containers/text/Index';
import TextForm from 'containers/text/Form';
import UploadIndex from 'containers/upload/Index';
import UploadForm from 'containers/upload/Form';
import FaceIndex from 'containers/faces/Index';
import FaceForm from 'containers/faces/Form';
import LearnIndex from 'containers/learn/Index';
import LearnForm from 'containers/learn/Form';
import CharacterIndex from 'containers/characters/Index';
import CharacterForm from 'containers/characters/Form';
import ManualCharacter from './containers/ManualCharacter';
import ManualTextIndex from 'containers/manual_text/Index';
import ManualTextPanelIndex from 'containers/manual_text/PanelIndex';
import ManualTextForm from 'containers/manual_text/Form';

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
          <Route path="/faces" component={FaceIndex}>
            <Route path="/faces/:book_id/:volume" component={FaceForm} />
          </Route>
          <Route path="/characters" component={CharacterIndex}>
            <Route path="/characters/:book_id/:volume" component={CharacterForm} />
          </Route>
          <Route path="/learn" component={LearnIndex}>
            <Route path="/learn/:id" component={LearnForm} />
          </Route>
          <Route path="/manual/character" component={ManualCharacter} />
          <Route path="/manual/text" component={ManualTextIndex}>
            <Route path="/manual/text/:book_id/:volume" component={ManualTextPanelIndex}>
              <Route path="/manual/text/:book_id/:volume/form" component={ManualTextForm} />
            </Route>
          </Route>
          <Route path="/text" component={TextIndex}>
            <Route path="/text/:book_id/:volume" component={TextForm} />
          </Route>
          <Route path="/upload" component={UploadIndex}>
            <Route path="/upload/:book_id/:volume" component={UploadForm} />
          </Route>
        </Router>
      </Provider>,
      root);
}
