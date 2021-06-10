import React, { Component } from 'react';
import { createPortal } from 'react-dom';

import PropTypes from 'prop-types';
import styles from './Modal.module.css';

const modalRoot = document.querySelector('#front-root');

class Modal extends Component {
  static propTypes = { children: PropTypes.node };

  keyEvent = ({ code }) => {
    switch (code) {
      case 'Escape':
        const { onClose } = this.props;
        onClose();
        break;
      default:
        break;
    }
  };

  backdropOnClickHandler = ({ target, currentTarget }) => {
    if (target === currentTarget) {
      const { onClose } = this.props;
      onClose();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.keyEvent);
    document.body.classList.add('modal-open');
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.keyEvent);
    document.body.classList.remove('modal-open');
  }

  render() {
    const { children } = this.props;

    return createPortal(
      <div className={styles.Overlay} onClick={this.backdropOnClickHandler}>
        <div className={styles.Modal}>{children}</div>
      </div>,
      modalRoot,
    );
  }
}

export default Modal;
