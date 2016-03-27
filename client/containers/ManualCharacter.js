import React from 'react';
import { connect } from 'react-redux';
import { HotKeys } from 'react-hotkeys';
import { bindActionCreators } from 'redux';
import zip from 'lodash.zip';
import volumeActions from '../actions/volume';
import panelActions from '../actions/panels';
import VolumeSelect from '../components/VolumeSelect';
import ConfirmButton from '../components/ConfirmButton';
import { nameOfTag, selectedClassName } from '../utils';

const template = require('react-jade').compileFile(__dirname + '/ManualCharacter.jade');

const KEYS = ['a', 'o', 'e', 'i', 'u', 'i', 'd', 'h', 't', 'n', 's', '-'];

class ManualCharacter extends React.Component {
  submit(e) {
    e.preventDefault();

    const { panelAction: { saveCharacters } } = this.props;
    saveCharacters(this.currentPanel());
  }

  next(e) {
    e.preventDefault();
    const { panelAction: { next } } = this.props;
    next();
  }

  prev(e) {
    e.preventDefault();
    const { panelAction: { prev } } = this.props;
    prev();
  }

  currentPanel() {
    const { panels } = this.props;
    return panels.find((panel) => panel.selected);
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

    if(editTag) {
      setTag(characters[index].tag);
    } else {
      setOtherTag(characters[index].tag);
    }
  }

  render() {
    const panel = this.currentPanel();
    const keymap = {
      'switch': 'ctrl+o',
      'submit': 'ctrl+enter',
      'next': 'ctrl+s',
      'prev': 'ctrl+l'
    };
    let handlers = {
      'switch': ::this.switchEditArea,
      'submit': ::this.submit,
      'next': ::this.next,
      'prev': ::this.prev
    };

    KEYS.forEach((key, i) => {
      keymap[`select-${key}`] = key;
      handlers[`select-${key}`] = this.select.bind(this, i);
    });

    const content = template({
      VolumeSelect,
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

export default connect(
    (state)=> state,
    (dispatch) => ({
      volumeAction: bindActionCreators(volumeActions, dispatch),
      panelAction: bindActionCreators(panelActions, dispatch)
    }),
  )(ManualCharacter);
