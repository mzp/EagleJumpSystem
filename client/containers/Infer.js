import React from 'react';
import { connect } from 'react-redux';
import actions from '../actions/volume';
import { bindActionCreators } from 'redux';
import LogViewer from '../components/LogViewer';
import VolumeSelect from '../components/VolumeSelect';
import ConfirmButton from '../components/ConfirmButton';

const template = require('react-jade').compileFile(__dirname + '/Infer.jade');

class Infer extends React.Component {
  run() {
    const { infer, volume } = this.props;
    infer(volume.book_id, volume.volume);
  }

  render() {
    return template({
      ConfirmButton,
      LogViewer,
      VolumeSelect,
      run: ::this.run,
      ...this.props
    });
  }
}

export default connect(
    (state)=> state,
    (dispatch) => bindActionCreators(actions, dispatch)
  )(Infer);
