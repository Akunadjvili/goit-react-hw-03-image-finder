import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './ImageGallery.module.css';

import ImageGalleryItem from './../ImageGalleryItem';

class ImageGallery extends Component {
  static defaultProps = {
    imageList: [],
    onClick: () => {},
  };

  static propTypes = {
    imageList: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
      }).isRequired,
    ),
    onClick: PropTypes.func,
  };

  scrollTo = ref => {
    if (ref) {
      // ref.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  };

  render() {
    const { imageList, onClick } = this.props;
    return (
      <>
        <ul
          className={styles.ImageGallery}
          onClick={onClick}
          ref={this.scrollTo}
        >
          {imageList.map(image => {
            return <ImageGalleryItem key={image.id} image={image} />;
          })}
        </ul>
      </>
    );
  }
}

export default ImageGallery;
