import React from 'react';
import { connect } from 'react-redux';
import { HotKeys } from 'react-hotkeys';
import { bindActionCreators } from 'redux';
import zip from 'lodash.zip';
import volumeActions from '../actions/volume';
import panelActions from '../actions/panels';
import faceActions from '../actions/faces';
import VolumeSelect from '../components/VolumeSelect';
import { nameOfTag, selectedClassName } from '../utils';

const template = require('react-jade').compileFile(__dirname + '/ManualCharacter.jade');

const KEYS = ['a', 'o', 'e', 'i', 'u', 'i', 'd', 'h', 't', 'n', 's', '-'];

class ManualCharacter extends React.Component {
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
    const { faceAction: { switchEditArea }} = this.props;
    switchEditArea();
  }

  select(index) {
    const { faces: { editTag }, faceAction: { setTag, setOtherTag } } = this.props;
    const { characters } = this.currentBook();

    if(editTag) {
      setTag(characters[index].tag);
    } else {
      setOtherTag(characters[index].tag);
    }
  }

  render() {
    const panel = this.currentPanel();
    const keymap = {
      'switch': 'ctrl+o'
    };
    let handlers = {
      'switch': ::this.switchEditArea
    };

    KEYS.forEach((key, i) => {
      keymap[`select-${key}`] = key;
      handlers[`select-${key}`] = this.select.bind(this, i);
    });

    const content = template({
      VolumeSelect,
      panel,
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
      panelAction: bindActionCreators(panelActions, dispatch),
      faceAction: bindActionCreators(faceActions, dispatch)
    }),
  )(ManualCharacter);
