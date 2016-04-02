import React from 'react';
import VolumeSelect from 'components/VolumeSelect';

const template = require('react-jade').compileFile(__dirname + '/Index.jade');

export default class Index extends React.Component {
  render() {
    return template({
      VolumeSelect,
      ...this.props
    });
  }
}
