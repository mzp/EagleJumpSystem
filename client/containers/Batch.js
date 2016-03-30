import React from 'react';
import serverAction from 'actions/server';
import connect from 'containers/supports/connect';
import LogViewer from 'components/LogViewer';

class Batch extends React.Component {
  componentWillMount() {
    const { serverAction: { restore } , params: { id } } = this.props;
    if(id) {
      restore(id);
    }
  }

  fetch() {
   const { log: { id }, serverAction: { fetch } } = this.props;
   fetch(id);
  }

  render() {
    const { log: { content } } = this.props;
    return <LogViewer value={content} polling={::this.fetch} interval={1000} />;
  }
}

export default connect({ serverAction })(Batch);
