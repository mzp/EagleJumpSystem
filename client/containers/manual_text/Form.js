import React from 'react';
import { HotKeys } from 'react-hotkeys';
import connect from 'containers/supports/connect';
import { currentPanel } from 'reducers/panels';
import panelAction from 'actions/panels';
import ConfirmButton from 'components/ConfirmButton';

const template = require('react-jade').compileFile(__dirname + '/Form.jade');

class Form extends React.Component {
  submit(e) {
    e.preventDefault();

    const {
      panels,
      panelAction: { saveScript }
    } = this.props;
    const panel = currentPanel(panels);
    saveScript(panel);
  }

  render() {
    const { panels } = this.props;
    const panel = currentPanel(panels);

    if(!panel) { return <div />; }

    const handlers = {
      'submit': ::this.submit
    };
    const content = template({
      ConfirmButton,
      panel,
      submit: ::this.submit,
      ...this.props
    });

    return (<HotKeys handlers={handlers}>{content}</HotKeys>);
  }
}

export default connect({ panelAction })(Form);
