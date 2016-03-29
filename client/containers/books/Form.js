import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from 'actions/books';

const template = require('react-jade').compileFile(__dirname + '/Form.jade');

class Form extends React.Component {
  componentDidMount() {
    this.sync();
  }

  componentDidUpdate() {
    this.sync();
  }

  render() {
    const book = this.currentBook();
    if(!book) { return <div />; }
    return template({ book, ...this.props });
  }

  currentBook() {
    const { books } = this.props;
    return books.find((book) => book.selected);
  }

  sync() {
    const { select, params: { id } } = this.props;
    const book = this.currentBook();

    if (!book || book.id != id) {
      select(id);
    }
  }
}

export default connect(
    (state)=> state,
    (dispatch) => bindActionCreators(actions, dispatch)
  )(Form);
