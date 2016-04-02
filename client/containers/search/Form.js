import React from 'react';
import DebounceInput from 'react-debounce-input';
import queryAction from 'actions/query';
import connect from 'containers/supports/connect';
import Panel from 'containers/search/Panel';
import { currentBook } from 'reducers/books';
import get from 'lodash.get';

const template = require('react-jade').compileFile(__dirname + '/Form.jade');

class Form extends React.Component {
  onScriptChange(e) {
    const { queryAction: { script } } = this.props;
    script(e.target.value);
  }

  onTagSelect(event) {
    const { queryAction: { tag } } = this.props;
    const { value, checked } = event.target;
    tag(value, checked);
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
    const { books } = this.props;

    const book = currentBook(books);
    return template({
      DebounceInput,
      Panel,
      book,
      onScriptChange: ::this.onScriptChange,
      onTagSelect: ::this.onTagSelect,
      ...this.props
    });
  }
}

export default connect({ queryAction })(Form);
