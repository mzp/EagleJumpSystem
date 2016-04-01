import React from 'react';
import serverAction from 'actions/server';
import LogViewer from 'components/LogViewer';
import ConfirmButton from 'components/ConfirmButton';
import connect from 'containers/supports/connect';

const template = require('react-jade').compileFile(__dirname + '/Form.jade');

class Form extends React.Component {
  run() {
    const { serverAction: { textDetect }, volume } = this.props;
    textDetect(volume.book_id, volume.volume);
  }

  render() {
    return template({
      LogViewer,
      ConfirmButton,
      run: ::this.run,
      ...this.props
    });
  }
}

export default connect({ serverAction })(Form);
