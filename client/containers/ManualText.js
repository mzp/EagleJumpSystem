import React from 'react';
import { connect } from 'react-redux';
import volumeActions from '../actions/volume';
import panelActions from '../actions/panels';
import { bindActionCreators } from 'redux';
import VolumeSelect from '../components/VolumeSelect';
import ConfirmButton from '../components/ConfirmButton';

const template = require('react-jade').compileFile(__dirname + '/ManualText.jade');

class ManualText extends React.Component {
  change() {
  }

  submit() {
  }

  render() {
    const { panels } = this.props;
    const panel = panels.find((panel) => panel.selected);
    return template({
      ConfirmButton,
      VolumeSelect,
      change: ::this.change,
      submit: ::this.submit,
      panel,
      ...this.props
    });
  }
}

export default connect(
    (state)=> state,
    (dispatch) => {
      return {
        volumeAction: bindActionCreators(volumeActions, dispatch),
        panelAction: bindActionCreators(panelActions, dispatch)
      }
    }
  )(ManualText);
