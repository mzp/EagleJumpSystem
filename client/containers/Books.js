import React from 'react';
import { connect } from 'react-redux';
import actions from '../actions/books';
import { bindActionCreators } from 'redux';

const template = require('react-jade').compileFile(__dirname + '/Books.jade');

class Books extends React.Component {
  render() {
    const { books } = this.props;
    const book = books.find((book) => book.selected);
    return template({
      book,
      ...this.props
    });
  }
}

export default connect(
    (state)=> state,
    (dispatch) => bindActionCreators(actions, dispatch)
  )(Books);
