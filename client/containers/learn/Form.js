import React from 'react';
import connect from 'containers/supports/connect';
import characterAction from 'actions/characters';
import serverAction from 'actions/server';
import LogViewer from 'components/LogViewer';
import ConfirmButton from 'components/ConfirmButton';
import { nameOfTag, selectedClassName } from 'utils';
import { currentBook } from 'reducers/books';

const template = require('react-jade').compileFile(__dirname + '/Form.jade');

class Form extends React.Component {
  name(tag) {
    const { books } = this.props;
    const book = books.find((book) => book.selected);
    return nameOfTag(book, tag);
  }

  start() {
    const { books, characters, characterAction } = this.props;
    const book = books.find((book) => book.selected);
    const tags = Object.keys(characters).filter((tag) => (characters[tag] || {}).selected);
    characterAction.learn(book.id, tags);
  }

  render() {
    const { books } = this.props;
    const book = currentBook(books);
    const currentTags = book.characters.map((c) => c.tag);
    return template({
      book,
      currentTags,
      name: ::this.name,
      start: ::this.start,
      ConfirmButton, LogViewer,
      selectedClassName,
      ...this.props
    });
  }
}

export default connect({ characterAction, serverAction })(Form);
