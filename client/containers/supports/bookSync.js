import React from 'react';
import { browserHistory } from 'react-router'
import bookAction from 'actions/books';
import { currentBook } from 'reducers/books';

export default function bookSync(prefix, Inner) {
  class Component extends React.Component {
    componentWillMount() {
      const { dispatch, params: { id } } = this.props;
      dispatch(bookAction.select(id));
    }

    componentDidUpdate() {
      const { books, params: { id } } = this.props;
      const book = currentBook(books);
      if (book && book.id != id) {
        browserHistory.push(`/${prefix}/${book.id}`);
      }
    }

    render() {
      return <Inner {...this.props} {...this.state} />;
    }
  }

  return Component;
}
