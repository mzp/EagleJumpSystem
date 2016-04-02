import React from 'react';
import { browserHistory } from 'react-router'
import isEqual from 'lodash.isequal';
import isEmpty from 'lodash.isempty';
import bookAction from 'actions/books';
import queryAction from 'actions/query';
import bookSync from 'containers/supports/bookSync';
import connect from 'containers/supports/connect';
import BookSelect from 'components/BookSelect';
import { currentBook } from 'reducers/books';

const template = require('react-jade').compileFile(__dirname + '/Index.jade');

class Index extends React.Component {
  componentWillMount() {
    const { queryAction: { restore }, location: { query } } = this.props;
    const obj = this.parseQuery(query);
    restore(obj);
  }

  parseQuery(obj) {
    const script = obj.q || '';
    const silence = obj.silence == 'true';
    const tags = (obj.tags||'').split(',').filter((str) => !isEmpty(str));

    return { script, silence, tags };
  }

  componentDidUpdate() {
    const { books, query: { script, silence, tags }, location: { query: loc } } = this.props;
    const prev = this.parseQuery(loc);
    const book = currentBook(books);

    if(book && !isEqual({ script, silence, tags }, prev)) {
      browserHistory.push(`/search/${book.id}?q=${script}&silence=${silence}&tags=${tags.join(',')}`);
    }
  }

  render() {
    const { books } = this.props;
    return template({
      BookSelect,
      ...this.props
    });
  }
}

export default connect({ bookAction, queryAction })(bookSync('search', Index));
