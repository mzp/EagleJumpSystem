import React from 'react';
import { connect } from 'react-redux';
import bookActions from '../actions/books';
import characterActions from '../actions/characters';
import { bindActionCreators } from 'redux';
import BookSelect from '../components/BookSelect';
import LogViewer from '../components/LogViewer';
import ConfirmButton from '../components/ConfirmButton';

const template = require('react-jade').compileFile(__dirname + '/Learn.jade');

class Learn extends React.Component {
  name(tag) {
    const { books } = this.props;
    const book = books.find((book) => book.selected);
    const character = book.characters.find((character) => character.tag == tag);
    if (character) {
      return character.name
    }
  }

  start() {
    const { books, characters, characterAction } = this.props;
    const book = books.find((book) => book.selected);
    const tags = Object.keys(characters).filter((tag) => (characters[tag] || {}).selected);
    characterAction.learn(book.id, tags);
  }

  render() {
    const { books } = this.props;
    const book = books.find((book) => book.selected);
    const currentTags = book ?
      book.characters.map((c) => c.tag) : [];
    return template({
      book,
      currentTags,
      name: ::this.name,
      start: ::this.start,
      BookSelect, ConfirmButton, LogViewer,
      ...this.props
    });
  }
}

export default connect(
    (state)=> state,
    (dispatch) => {
      return {
        bookAction: bindActionCreators(bookActions, dispatch),
        characterAction: bindActionCreators(characterActions, dispatch)
      }
    }
  )(Learn);
