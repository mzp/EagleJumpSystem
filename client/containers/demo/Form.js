import React from 'react';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router'
import { connect } from 'react-redux';
import bookActions from 'actions/books';
import demoActions from 'actions/demo';
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
    console.log('render');
    const book = currentBook(this.props.books);
    if(!book) { return <div />; }
    return template({
      book,
      selectFile: ::this.selectFile,
      ...this.props
    });
  }

  sync() {
    console.log('sync');
    const { books, bookAction: { select }, params: { id } } = this.props;
    const book = currentBook(books);

    if (!book || book.id != id) {
      select(id);
    }
  }
}

export default connect(
    (state) => state,
    (dispatch) => {
      return {
        bookAction: bindActionCreators(bookActions, dispatch),
        demoAction: bindActionCreators(demoActions, dispatch)
      }
    }
  )(Form);
