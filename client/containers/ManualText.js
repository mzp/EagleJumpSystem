import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { HotKeys } from 'react-hotkeys';
import volumeActions from '../actions/volume';
import panelActions from '../actions/panels';
import VolumeSelect from '../components/VolumeSelect';
import ConfirmButton from '../components/ConfirmButton';

const template = require('react-jade').compileFile(__dirname + '/ManualText.jade');

class ManualText extends React.Component {
  submit(e) {
    e.preventDefault();

    const {
      panels,
      panelAction: { saveScript }
    } = this.props;
    const panel = panels.find((panel) => panel.selected);
    saveScript(panel);
  }

  render() {
    const { panels } = this.props;
    const panel = panels.find((panel) => panel.selected);
    const keymap = {
      'submit': 'shift+enter'
    };

    const handlers = {
      'submit': ::this.submit
    };

    const content = template({
      ConfirmButton,
      VolumeSelect,
      panel,
      submit: ::this.submit,
      ...this.props
    });

    return (<HotKeys keyMap={keymap} handlers={handlers}>{content}</HotKeys>);
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
