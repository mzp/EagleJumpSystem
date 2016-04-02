import React from 'react';
import { HotKeys } from 'react-hotkeys';
import { browserHistory } from 'react-router'
import panelAction from 'actions/panels';
import connect from 'containers/supports/connect';
import { currentPanel } from 'reducers/panels';
import { selectedClassName } from 'utils';

const template = require('react-jade').compileFile(__dirname + '/PanelIndex.jade');

class PanelIndex extends React.Component {
  componentWillMount() {
    const { panelAction, location: { query: { path } } } = this.props;
    panelAction.select(path);
  }

  componentDidUpdate() {
    const {
      panels,
      volume: { book_id, volume },
      location: { query: { path } }
    } = this.props;

    const panel = currentPanel(panels);
    if (panel && panel.path != path) {
      browserHistory.push(`/manual/text/${book_id}/${volume}/form?path=${panel.path}`);
    }
  }

  next(e) {
    e.preventDefault();
    this.props.panelAction.next();
  }

  prev(e) {
    e.preventDefault();
    this.props.panelAction.prev();
  }

  render() {
    const handlers = {
      'next': ::this.next,
      'prev': ::this.prev
    };
    const content = template({ selectedClassName, ...this.props });
    return (<HotKeys handlers={handlers}>{content}</HotKeys>);
  }
}

export default connect({ panelAction })(PanelIndex);
