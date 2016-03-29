import React from 'react';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router'
import { connect } from 'react-redux';
import bookActions from 'actions/books';
import demoActions from 'actions/demo';

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
    const book = books.find((book) => book.selected);
    run(book.id, e.target.files[0], () => {
      browserHistory.push('/demo/result');
    });
  }

  render() {
    const book = this.currentBook();
    if(!book) { return <div />; }
    return template({
      book,
      selectFile: ::this.selectFile,
      ...this.props
    });
  }

  currentBook() {
    const { books } = this.props;
    return books.find((book) => book.selected);
  }

  sync() {
    const { bookAction: { select }, params: { id } } = this.props;
    const book = this.currentBook();

    if (!book || book.id != id) {
      select(id);
    }
  }
}

export default connect(
    (state)=> state,
    (dispatch) => {
      return {
        bookAction: bindActionCreators(bookActions, dispatch),
        demoAction: bindActionCreators(demoActions, dispatch)
      }
    }
  )(Form);
