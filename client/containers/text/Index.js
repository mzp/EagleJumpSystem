import React from 'react';
import { connect } from 'react-redux';
import actions from 'actions/volume';
import { bindActionCreators } from 'redux';
import LogViewer from 'components/LogViewer';
import VolumeSelect from 'components/VolumeSelect';
import ConfirmButton from 'components/ConfirmButton';

const template = require('react-jade').compileFile(__dirname + '/Index.jade');

class Text extends React.Component {
  run() {
    const { textDetect, volume } = this.props;
    textDetect(volume.book_id, volume.volume);
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
  )(Text);
