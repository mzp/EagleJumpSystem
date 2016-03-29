import React from 'react';
import { connect } from 'react-redux';
import BookSelect from 'components/BookSelect';

const template = require('react-jade').compileFile(__dirname + '/Index.jade');

class Index extends React.Component {
  render() {
    const { books } = this.props;
    return template({
      BookSelect,
      ...this.props
    });
  }
}

export default connect((state)=> state)(Index);
