import React from 'react';
import { connect } from 'react-redux';
import actions from '../actions/books';
import { bindActionCreators } from 'redux';
import BookSelect from '../components/BookSelect';
import ConfirmButton from '../components/ConfirmButton';

const template = require('react-jade').compileFile(__dirname + '/Learn.jade');

class Learn extends React.Component {
  render() {
    return template({
      BookSelect, ConfirmButton,
      ...this.props
    });
  }
}

export default connect(
    (state)=> state,
    (dispatch) => bindActionCreators(actions, dispatch)
  )(Learn);
