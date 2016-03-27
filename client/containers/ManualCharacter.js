import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import volumeActions from '../actions/volume';
import panelActions from '../actions/panels';
import VolumeSelect from '../components/VolumeSelect';
import { nameOfTag } from '../utils';

const template = require('react-jade').compileFile(__dirname + '/ManualCharacter.jade');

class ManualCharacter extends React.Component {
  selectedPanel() {
    const { panels } = this.props;
    return panels.find((panel) => panel.selected);
  }

  name(tag) {
    const { books } = this.props;
    const { book_id } = this.selectedPanel();
    const book = books.find((book) => book.id == book_id);
    return nameOfTag(book, tag);
  }

  render() {
    const panel = this.selectedPanel();

    return template({
      VolumeSelect,
      panel,
      name: ::this.name,
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
