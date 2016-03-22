import React from 'react';
const template = require('react-jade').compileFile(__dirname + '/VolumeSelect.jade');

export default class VolumeSelect extends React.Component {
  render() {
    return template({
      ...this.props
    });
  }
}
