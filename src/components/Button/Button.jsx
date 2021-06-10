import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.css';

class Button extends Component {
  static defaultProps = { onClick: () => {} };
  static propTypes = { onClick: PropTypes.func };

  render() {
    const { onClick, children } = this.props;

    return (
      <button className={styles.Button} onClick={onClick} type="button">
        {children}
      </button>
    );
  }
}

export default Button;
