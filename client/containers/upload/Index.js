import React from 'react';
import volumeAction from 'actions/volume';
import serverAction from 'actions/server';
import connect from 'containers/supports/connect';
import LogViewer from 'components/LogViewer';
import VolumeSelect from 'components/VolumeSelect';

const template = require('react-jade').compileFile(__dirname + '/Index.jade');

class Upload extends React.Component {
  selectFiles(e) {
    const { volume, serverAction: { upload }} = this.props;
    upload(volume.book_id, volume.volume, e.target.files);
  }

  render() {
    return template({
      selectFiles: ::this.selectFiles,
      LogViewer,
      VolumeSelect,
      ...this.props
    });
  }
}

export default connect({ volumeAction, serverAction })(Upload);
