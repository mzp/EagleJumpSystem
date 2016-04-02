import React from 'react';
import { HotKeys } from 'react-hotkeys';
import { browserHistory } from 'react-router'

const template = require('react-jade').compileFile(__dirname + '/PanelIndex.jade');

export default class PanelIndex extends React.Component {
  handlers() {
    return {};
  }
  panelComponent(panel) {
  }

  render() {
    const handlers = this.handlers();
    const content = template({ panelComponent: ::this.panelComponent, ...this.props });
    return (<HotKeys handlers={handlers}>{content}</HotKeys>);
  }
}
