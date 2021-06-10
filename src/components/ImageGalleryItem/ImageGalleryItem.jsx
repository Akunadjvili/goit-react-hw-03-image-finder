import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css';

class ImageGalleryItem extends Component {
  static defaultProps = {};
  static propTypes = {
    image: PropTypes.shape({
      id: PropTypes.number.isRequired,
      small: PropTypes.string.isRequired,
      hint: PropTypes.string,
    }).isRequired,
  };
  render() {
    const {
      image: { small, hint },
    } = this.props;

    return (
      <li className={styles.ImageGalleryItem}>
        <img
          src={small}
          alt={hint}
          className={styles['ImageGalleryItem-image']}
        />
      </li>
    );
  }
}

export default ImageGalleryItem;
