import React from 'react';
import connect from 'containers/supports/connect';
import bookAction from 'actions/books';
import { currentBook } from 'reducers/books';

const template = require('react-jade').compileFile(__dirname + '/Form.jade');

class Form extends React.Component {
  componentDidMount() {
    this.sync();
  }

  componentDidUpdate() {
    this.sync();
  }

  render() {
    const book = currentBook(this.props.books);
    if(!book) { return <div />; }
    return template({ book, ...this.props });
  }

  sync() {
    const { books, bookAction: { select }, params: { id } } = this.props;
    const book = currentBook(books);

    if (!book || book.id != id) {
      select(id);
    }
  }
}

export default connect({ bookAction })(Form);
