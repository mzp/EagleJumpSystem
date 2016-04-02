import React from 'react';
import { browserHistory } from 'react-router'
import panelAction from 'actions/panels';
import { currentPanel } from 'reducers/panels';

export default function panelSync(prefix, Inner) {
  class Component extends React.Component {
    componentWillMount() {
      const { dispatch, location: { query: { path } } } = this.props;

      if(path) {
        dispatch(panelAction.select(path));
      }
    }

    componentDidUpdate() {
      const {
        panels,
        volume: { book_id, volume },
        location: { query: { path } }
      } = this.props;

      const panel = currentPanel(panels);
      if (panel && panel.path != path) {
        browserHistory.push(`/${prefix}/${book_id}/${volume}/form?path=${panel.path}`);
      }
    }

    render() {
      return <Inner {...this.props} {...this.state} />;
    }
  }

  return Component;
}
