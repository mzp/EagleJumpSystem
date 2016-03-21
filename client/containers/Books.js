import React from 'react';
import { connect } from 'react-redux';

const template = require('react-jade').compileFile(__dirname + '/Books.jade');

class Books extends React.Component {
  render() {
    return template({});
  }
}
export default connect(
    (state)=> state,
  )(Books);
