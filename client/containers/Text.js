import React from 'react';
import { connect } from 'react-redux';
import actions from '../actions/volume';
import { bindActionCreators } from 'redux';
import VolumeSelect from '../components/VolumeSelect';
import ConfirmButton from '../components/ConfirmButton';

const template = require('react-jade').compileFile(__dirname + '/Text.jade');

class Text extends React.Component {
  render() {
    return template({
      ConfirmButton,
      VolumeSelect,
      ...this.props
    });
  }
}

export default connect(
    (state)=> state,
    (dispatch) => bindActionCreators(actions, dispatch)
  )(Text);
