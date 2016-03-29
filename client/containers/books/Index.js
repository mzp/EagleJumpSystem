import React from 'react';
import bookAction from 'actions/books';
import BookSelect from 'components/BookSelect';
import connect from 'containers/supports/connect';
import { currentBook } from 'reducers/books';

const template = require('react-jade').compileFile(__dirname + '/Index.jade');

class Index extends React.Component {
  render() {
    const { books } = this.props;
    const book = currentBook(books);
    return template({
      book,
      BookSelect,
      ...this.props
    });
  }
}

export default connect({ bookAction })(Index);
