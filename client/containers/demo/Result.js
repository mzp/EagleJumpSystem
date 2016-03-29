import React from 'react';
import connect from 'containers/supports/connect';
const template = require('react-jade').compileFile(__dirname + '/Result.jade');

class Result extends React.Component {
  render() {
    return template({
      ...this.props
    });
  }
}

export default connect({})(Result);
