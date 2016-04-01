import React from 'react';
import { browserHistory } from 'react-router'
import serverAction from 'actions/server';
import LogViewer from 'components/LogViewer';
import connect from 'containers/supports/connect';
import { currentBook } from 'reducers/books';

const template = require('react-jade').compileFile(__dirname + '/Form.jade');

class Form extends React.Component {
  selectFiles(e) {
    const { volume, serverAction: { upload }} = this.props;
    upload(volume.book_id, volume.volume, e.target.files);
  }

  render() {
    const { volume } = this.props;
    if(!volume.book_id) { return <div />; }
    return template({
      LogViewer,
      selectFiles: ::this.selectFiles,
      ...this.props
    });
  }
}

export default connect({ serverAction })(Form);
