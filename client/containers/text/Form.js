import React from 'react';
import serverAction from 'actions/server';
import connect from 'containers/supports/connect';
import BatchForm from 'containers/batch/Form';

class Form extends BatchForm {
  run() {
    const { serverAction: { textDetect }, volume } = this.props;
    textDetect(volume.book_id, volume.volume);
  }

  icon() {
    return 'commenting';
  }
}

export default connect({ serverAction })(Form);
