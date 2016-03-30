import React from 'react';
import bookAction from 'actions/books';
import connect from 'containers/supports/connect';
import { currentBook } from 'reducers/books';

const template = require('react-jade').compileFile(__dirname + '/Form.jade');

class Form extends React.Component {
  render() {
    const book = currentBook(this.props.books);
    if(!book) { return <div />; }
    return template({ book, ...this.props });
  }
}

export default connect({ bookAction })(Form);
