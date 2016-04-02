import React from 'react';
import { HotKeys } from 'react-hotkeys';
import volumeAction from 'actions/volume';
import panelAction from 'actions/panels';
import VolumeSelect from 'components/VolumeSelect';
import connect from 'containers/supports/connect';
import volumeSync from 'containers/supports/volumeSync';

const template = require('react-jade').compileFile(__dirname + '/Index.jade');

class Index extends React.Component {
  render() {
    const keymap = {
      'submit': 'ctrl+enter',
      'next': 'ctrl+s',
      'prev': 'ctrl+l'
    };

    const content = template({
      VolumeSelect,
      ...this.props
    });

    return (<HotKeys keyMap={keymap}>{content}</HotKeys>);
  }
}

export default connect({ volumeAction })(volumeSync('manual/text', Index));
