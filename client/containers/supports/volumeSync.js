import React from 'react';
import { browserHistory } from 'react-router'
import volumeAction from 'actions/volume';
import { currentBook } from 'reducers/books';

export default function volumeSync(prefix, Inner) {
  class Component extends React.Component {
    componentWillMount() {
      const { dispatch, params: { book_id, volume } } = this.props;
      if(book_id) {
        dispatch(volumeAction.select(book_id, volume));
      }
    }

    componentDidUpdate() {
      const { volume, params: { book_id, volume: volume_id } } = this.props;
      if(volume.book_id != book_id || volume.volume != volume_id) {
        browserHistory.push(`/${prefix}/${volume.book_id}/${volume.volume}`);
      }
    }

    render() {
      return <Inner {...this.props} {...this.state} />;
    }
  }

  return Component;
}
