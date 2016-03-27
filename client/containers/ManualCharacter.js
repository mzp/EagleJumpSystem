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

  name(tag) {
    const book = this.currentBook();
    return nameOfTag(book, tag);
  }

  guide() {
    const { characters } = this.currentBook();
    return zip(KEYS, characters.map((x) => x.name));
  }

  select(index) {
    const { faceAction: { setTag } } = this.props;
    const { characters } = this.currentBook();
    setTag(characters[index].tag)
  }

  render() {
    const panel = this.currentPanel();
    const keymap = {};
    let handlers = {};

    KEYS.forEach((key, i) => {
      keymap[`select-${key}`] = key;
      handlers[`select-${key}`] = this.select.bind(this, i);
    });

    const content = template({
      VolumeSelect,
      panel,
      name: ::this.name,
      guide: ::this.guide,
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
