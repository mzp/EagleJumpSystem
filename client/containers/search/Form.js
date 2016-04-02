import React from 'react';
import DebounceInput from 'react-debounce-input';
import queryAction from 'actions/query';
import connect from 'containers/supports/connect';
import { currentBook } from 'reducers/books';
import get from 'lodash.get';

const template = require('react-jade').compileFile(__dirname + '/Form.jade');

class Form extends React.Component {
  onChange(e) {
    const { queryAction: { script } } = this.props;
    script(e.target.value);
  }

  componentWillUpdate() {
    const { refs: { query }, props: { query: { script }, books } } = this;
    const book = currentBook(books);

    if(book.id != get(this.state, 'id', null)) {
      query.setState({ ...query.state, value: script });
      this.setState({ id: book.id });
    }
  }

  render() {
    return template({
      DebounceInput,
      onChange: ::this.onChange,
      ...this.props
    });
  }
}

export default connect({ queryAction })(Form);
