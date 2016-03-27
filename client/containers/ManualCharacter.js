import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const template = require('react-jade').compileFile(__dirname + '/ManualCharacter.jade');

class ManualCharacter extends React.Component {
  render() {
    return template({});
  }
}

export default connect(
    (state)=> state,
    (dispatch) => ({}),
  )(ManualCharacter);
