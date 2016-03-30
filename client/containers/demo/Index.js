import React from 'react';
import { browserHistory } from 'react-router'
import bookAction from 'actions/books';
import bookSync from 'containers/supports/bookSync';
import connect from 'containers/supports/connect';
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

export default connect({ bookAction })(bookSync('demo', Index));
