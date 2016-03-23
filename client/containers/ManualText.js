import React from 'react';
import { connect } from 'react-redux';
import volumeActions from '../actions/volume';
import { bindActionCreators } from 'redux';
import VolumeSelect from '../components/VolumeSelect';

const template = require('react-jade').compileFile(__dirname + '/ManualText.jade');

class ManualText extends React.Component {
  render() {
    return template({
      VolumeSelect,
      ...this.props
    });
  }
}

export default connect(
    (state)=> state,
    (dispatch) => {
      return { volumeAction: bindActionCreators(volumeActions, dispatch) }
    }
  )(ManualText);
