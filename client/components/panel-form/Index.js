import React from 'react';
import { HotKeys } from 'react-hotkeys';
import VolumeSelect from 'components/VolumeSelect';

const template = require('react-jade').compileFile(__dirname + '/Index.jade');

export default class Index extends React.Component {
  render() {
    const keymap = {
      'switch': 'ctrl+o',
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
