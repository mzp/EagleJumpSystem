import React from 'react';

export default class ConfirmButton extends React.Component {
  render() {
    const { icon, onClick, autoFocus } = this.props;
    return (
        <div className="confirmButton">
          <button className="confirmButton_button pure-button pure-button-primary" onClick={onClick} autoFocus={autoFocus}>
            <i className={"fa fa-" + icon}></i>
          </button>
        </div>)
  }
}
