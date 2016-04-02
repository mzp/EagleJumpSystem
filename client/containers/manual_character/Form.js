import React from 'react';
import { HotKeys } from 'react-hotkeys';
import panelAction from 'actions/panels';
import ConfirmButton from 'components/ConfirmButton';
import connect from 'containers/supports/connect';
import { currentPanel } from 'reducers/panels';
import { nameOfTag, selectedClassName } from 'utils';

const template = require('react-jade').compileFile(__dirname + '/Form.jade');

const KEYS = ['a', 'o', 'e', 'i', 'u', 'i', 'd', 'h', 't', 'n', 's', '-'];

class Form extends React.Component {
  submit(e) {
    e.preventDefault();

    const { panelAction: { saveCharacters } } = this.props;
    saveCharacters(this.currentPanel());
  }

  currentPanel() {
    const { panels } = this.props;
    return currentPanel(panels);
  }

  currentBook() {
    const { books } = this.props;
    const { book_id } = this.currentPanel();
    return books.find((book) => book.id == book_id);
  }

  currentCharacters() {
    return this.currentBook().characters;
  }

  name(tag) {
    const book = this.currentBook();
    return nameOfTag(book, tag);
  }

  switchEditArea() {
    const { panelAction: { switchEditArea }} = this.props;
    switchEditArea();
  }

  select(index) {
    const { panelAction: { setTag, setOtherTag } } = this.props;
    const { characters } = this.currentBook();
    const { editTag } = this.currentPanel();

    if(characters[index]) {
      if(editTag) {
        setTag(characters[index].tag);
      } else {
        setOtherTag(characters[index].tag);
      }
    }
  }

  render() {
    const panel = this.currentPanel();
    const keymap = {
    };
    let handlers = {
      'switch': ::this.switchEditArea,
      'submit': ::this.submit
    };

    KEYS.forEach((key, i) => {
      keymap[`select-${key}`] = key;
      handlers[`select-${key}`] = this.select.bind(this, i);
    });

    const content = template({
      ConfirmButton,
      panel,
      submit: ::this.submit,
      name: ::this.name,
      KEYS: KEYS,
      currentCharacters: ::this.currentCharacters,
      selectedClassName,
      ...this.props
    });

    return (<HotKeys keyMap={keymap} handlers={handlers}>{content}</HotKeys>);
  }
}

export default connect({ panelAction })(Form);
