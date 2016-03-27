import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import zip from 'lodash.zip';
import volumeActions from '../actions/volume';
import panelActions from '../actions/panels';
import VolumeSelect from '../components/VolumeSelect';
import { nameOfTag } from '../utils';

const template = require('react-jade').compileFile(__dirname + '/ManualCharacter.jade');

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
    const keys = ['a', 'o', 'e', 'i', 'u', 'i', 'd', 'h', 't', 'n', 's', '-'];
    return zip(keys, characters.map((x) => x.name));
  }

  render() {
    const panel = this.currentPanel();

    return template({
      VolumeSelect,
      panel,
      name: ::this.name,
      guide: ::this.guide,
      ...this.props
    });
  }
}

export default connect(
    (state)=> state,
    (dispatch) => ({
      volumeAction: bindActionCreators(volumeActions, dispatch),
      panelAction: bindActionCreators(panelActions, dispatch)
    }),
  )(ManualCharacter);
