import React from 'react';
import { selectedClassName } from 'utils';

const template = require('react-jade').compileFile(__dirname + '/BookSelect.jade');

export default class BookSelect extends React.Component {
  render() {
    return template({
      selectedClassName,
      ...this.props
    });
  }
}
