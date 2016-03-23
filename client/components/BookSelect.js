import React from 'react';
const template = require('react-jade').compileFile(__dirname + '/BookSelect.jade');

export default class BookSelect extends React.Component {
  render() {
    return template({
      ...this.props
    });
  }
}
