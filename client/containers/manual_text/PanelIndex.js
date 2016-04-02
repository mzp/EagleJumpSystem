import React from 'react';
import panelAction from 'actions/panels';
import connect from 'containers/supports/connect';
import panelSync from 'containers/supports/panelSync';
import Base from 'components/panel-form/PanelIndex';
import { selectedClassName } from 'utils';

const template = require('react-jade').compileFile(__dirname + '/Panel.jade');

class PanelIndex extends Base {
  next(e) {
    e.preventDefault();
    this.props.panelAction.next();
  }

  prev(e) {
    e.preventDefault();
    this.props.panelAction.prev();
  }

  handlers() {
    return {
      'next': ::this.next,
      'prev': ::this.prev
    };
  }

  panelComponent(panel) {
    return template({ panel, selectedClassName });
  }
}

export default connect({ panelAction })(panelSync('manual/text', PanelIndex));
