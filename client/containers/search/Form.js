import React from 'react';
import queryAction from 'actions/query';
import connect from 'containers/supports/connect';

const template = require('react-jade').compileFile(__dirname + '/Form.jade');

class Form extends React.Component {
  onChange(e) {
    const { queryAction: { script } } = this.props;
    script(e.target.value);
  }

  render() {
    return template({
      onChange: ::this.onChange,
      ...this.props
    });
  }
}

export default connect({ queryAction })(Form);
