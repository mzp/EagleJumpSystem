import React from 'react';
import volumeAction from 'actions/volume';
import connect from 'containers/supports/connect';
import volumeSync from 'containers/supports/volumeSync';
import LogViewer from 'components/LogViewer';
import VolumeSelect from 'components/VolumeSelect';

const template = require('react-jade').compileFile(__dirname + '/Index.jade');

class Index extends React.Component {
 render() {
    return template({
      LogViewer,
      VolumeSelect,
      ...this.props
    });
  }
}

export default connect({ volumeAction })(volumeSync('upload', Index));
