import React from 'react';
import serverAction from 'actions/server';
import BatchForm from 'components/batch-form/Form';
import connect from 'containers/supports/connect';

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
