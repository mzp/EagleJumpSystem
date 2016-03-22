import React from 'react';
import { connect } from 'react-redux';
import actions from '../actions/volume';
import { bindActionCreators } from 'redux';
import LogViewer from '../components/LogViewer';
import VolumeSelect from '../components/VolumeSelect';

const template = require('react-jade').compileFile(__dirname + '/Upload.jade');

class Upload extends React.Component {
  selectFiles(e) {
    const { volume, upload } = this.props;
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

export default connect(
    (state)=> state,
    (dispatch) => bindActionCreators(actions, dispatch)
  )(Upload);