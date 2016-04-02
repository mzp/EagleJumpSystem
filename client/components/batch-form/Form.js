import React from 'react';
import LogViewer from 'components/LogViewer';
import ConfirmButton from 'components/ConfirmButton';

const template = require('react-jade').compileFile(__dirname + '/Form.jade');

export default class Form extends React.Component {
  run() {
    // Implement subclass
  }

  icon() {
    // Implement subclass
  }

  render() {
    return template({
      LogViewer,
      ConfirmButton,
      icon: this.icon(),
      run: ::this.run,
      ...this.props
    });
  }
}
