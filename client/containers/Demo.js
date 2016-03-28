import React from 'react';
import { connect } from 'react-redux';
import bookActions from '../actions/books';
import demoActions from '../actions/demo';
import { bindActionCreators } from 'redux';
import BookSelect from '../components/BookSelect';

const template = require('react-jade').compileFile(__dirname + '/Demo.jade');

class Demo extends React.Component {
  selectFile(e) {
    const { books, demoAction: { run } } = this.props;
    const book = books.find((book) => book.selected);
    run(book.id, e.target.files[0]);
  }

  render() {
    const { books } = this.props;
    const book = books.find((book) => book.selected);
    return template({
      book,
      BookSelect,
      selectFile: ::this.selectFile,
      ...this.props
    });
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
  )(Demo);
