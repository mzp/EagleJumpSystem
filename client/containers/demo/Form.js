import React from 'react';
import { browserHistory } from 'react-router'
import demoAction from 'actions/demo';
import bookAction from 'actions/books';
import connect from 'containers/supports/connect';
import { currentBook } from 'reducers/books';

const template = require('react-jade').compileFile(__dirname + '/Form.jade');

class Form extends React.Component {
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
}

export default connect({ demoAction })(Form);
