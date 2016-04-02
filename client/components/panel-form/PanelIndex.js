import React from 'react';
import { HotKeys } from 'react-hotkeys';
import { browserHistory } from 'react-router'
import { selectedClassName } from 'utils';

const template = require('react-jade').compileFile(__dirname + '/PanelIndex.jade');

export default class PanelIndex extends React.Component {
  handlers() {
    return {};
  }
  render() {
    const handlers = this.handlers();
    const content = template({ selectedClassName, ...this.props });
    return (<HotKeys handlers={handlers}>{content}</HotKeys>);
  }
}
