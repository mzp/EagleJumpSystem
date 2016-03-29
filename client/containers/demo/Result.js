import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
const template = require('react-jade').compileFile(__dirname + '/Result.jade');

class Result extends React.Component {
  render() {
    return template({
      ...this.props
    });
  }
}

export default connect((state)=> state)(Result);
