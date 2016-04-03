import React from 'react';
import { script, characters } from 'reducers/panels';
import { characterOfTag } from 'utils';
import uniq from 'lodash.uniq';

const template = require('react-jade').compileFile(__dirname + '/Panel.jade');

export default class Panel extends React.Component {
  characters() {
    const { book, panel } = this.props;
    return uniq(characters(panel).map((tag) => characterOfTag(book, tag)));
  }

  render() {
    const { panel } = this.props;
    return template({
      script: script(panel),
      characters: this.characters(panel),
      ...this.props
    });
  }
}
