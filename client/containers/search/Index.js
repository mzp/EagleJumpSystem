import React from 'react';
import { browserHistory } from 'react-router'
import bookAction from 'actions/books';
import queryAction from 'actions/query';
import bookSync from 'containers/supports/bookSync';
import connect from 'containers/supports/connect';
import BookSelect from 'components/BookSelect';
import { currentBook } from 'reducers/books';

const template = require('react-jade').compileFile(__dirname + '/Index.jade');

class Index extends React.Component {
  componentWillMount() {
    const { queryAction: { script }, location: { query: { q } } } = this.props;

    if(q) {
      script(path);
    }
  }

  componentDidUpdate() {
    const {
      books,
      query: { script },
      location: { query: { q } }
    } = this.props;

    const book = currentBook(books);

    if (script && script != q) {
      browserHistory.push(`/search/${book.id}?q=${script}`);
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
