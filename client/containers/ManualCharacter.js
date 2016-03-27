import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import volumeActions from '../actions/volume';
import panelActions from '../actions/panels';
import VolumeSelect from '../components/VolumeSelect';

const template = require('react-jade').compileFile(__dirname + '/ManualCharacter.jade');

class ManualCharacter extends React.Component {
  render() {
    return template({
      VolumeSelect,
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
