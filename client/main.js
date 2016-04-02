import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router'
import { render } from 'react-dom';
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from './store/configureStore';
import BookForm from 'containers/books/Form';
import BookIndex from 'containers/books/Index';
import CharacterForm from 'containers/characters/Form';
import CharacterIndex from 'containers/characters/Index';
import DemoForm from 'containers/demo/Form';
import DemoIndex from 'containers/demo/Index';
import DemoResult from 'containers/demo/result';
import FaceForm from 'containers/faces/Form';
import FaceIndex from 'containers/faces/Index';
import LearnForm from 'containers/learn/Form';
import LearnIndex from 'containers/learn/Index';
import ManualCharacterForm from 'containers/manual_character/Form';
import ManualCharacterIndex from 'containers/manual_character/Index';
import ManualCharacterPanelIndex from 'containers/manual_character/PanelIndex';
import ManualTextForm from 'containers/manual_text/Form';
import ManualTextIndex from 'containers/manual_text/Index';
import ManualTextPanelIndex from 'containers/manual_text/PanelIndex';
import SearchIndex from 'containers/search/Index';
import SearchForm from 'containers/search/Form';
import TextForm from 'containers/text/Form';
import TextIndex from 'containers/text/Index';
import UploadForm from 'containers/upload/Form';
import UploadIndex from 'containers/upload/Index';

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
          <Route path="/characters" component={CharacterIndex}>
            <Route path="/characters/:book_id/:volume" component={CharacterForm} />
          </Route>
          <Route path="/demo" component={DemoIndex}>
            <Route path="/demo/result" component={DemoResult} />
            <Route path="/demo/:id" component={DemoForm} />
          </Route>
          <Route path="/faces" component={FaceIndex}>
            <Route path="/faces/:book_id/:volume" component={FaceForm} />
          </Route>
          <Route path="/learn" component={LearnIndex}>
            <Route path="/learn/:id" component={LearnForm} />
          </Route>
          <Route path="/manual/characters" component={ManualCharacterIndex}>
            <Route path="/manual/characters/:book_id/:volume" component={ManualCharacterPanelIndex}>
              <Route path="/manual/characters/:book_id/:volume/form" component={ManualCharacterForm} />
            </Route>
          </Route>
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
          <Route path="/" component={SearchIndex}>
            <Route path="/search/:id" component={SearchForm} />
          </Route>
        </Router>
      </Provider>,
      root);
}
