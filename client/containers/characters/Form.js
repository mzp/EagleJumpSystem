import React from 'react';
import serverAction from 'actions/server';
import connect from 'containers/supports/connect';
import BatchForm from 'components/batch-form/Form';

class Form extends BatchForm {
  run() {
    const { serverAction: { infer }, volume } = this.props;
    infer(volume.book_id, volume.volume);
  }

  icon() {
    return 'group';
  }
}

export default connect({ serverAction })(Form);
