import React from 'react';
import { browserHistory } from 'react-router'
import bookAction from 'actions/books';
import demoAction from 'actions/demo';
import connect from 'containers/supports/connect';
import { currentBook } from 'reducers/books';

const template = require('react-jade').compileFile(__dirname + '/Form.jade');

class Form extends React.Component {
  componentDidMount() {
    this.sync();
  }

  componentDidUpdate() {
    this.sync();
  }

  selectFile(e) {
    const { books, demoAction: { run } } = this.props;
    const book = currentBook(books);
    run(book.id, e.target.files[0], () => {
      browserHistory.push('/demo/result');
    });
  }

  render() {
    const book = currentBook(this.props.books);
    if(!book) { return <div />; }
    return template({
      book,
      selectFile: ::this.selectFile,
      ...this.props
    });
  }

  sync() {
    const { books, bookAction: { select }, params: { id } } = this.props;
    const book = currentBook(books);

    if (!book || book.id != id) {
      select(id);
    }
  }
}

export default connect({ bookAction, demoAction })(Form);
