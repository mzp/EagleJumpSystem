import React from 'react';
import { browserHistory } from 'react-router'
import { selectedClassName } from 'utils';

const template = require('react-jade').compileFile(__dirname + '/BookSelect.jade');

export default class BookSelect extends React.Component {
  onClick(id) {
    const { path } = this.props;
    browserHistory.push(`${path}/${id}`);
  }

  render() {
    return template({
      selectedClassName,
      onClick: ::this.onClick,
      ...this.props
    });
  }
}
