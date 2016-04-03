import React from 'react';
import VolumeSelect from 'components/VolumeSelect';

const template = require('react-jade').compileFile(__dirname + '/Index.jade');

export default class Index extends React.Component {
  componentWillUpdate() {
    const main = this.refs.main;

    if(main.scrollTop + main.offsetHeight <= main.scrollHeight) {
      main.scrollTop = main.scrollHeight - main.offsetHeight;
    }
  }

  render() {
    return template({
      VolumeSelect,
      ...this.props
    });
  }
}
