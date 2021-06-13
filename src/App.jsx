import React, { Component } from 'react';

import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import Modal from './components/Modal';
import Loader from './components/Loader';
import fetchImagesDataPixabay from './api/apiPixabay';
import { scrollTop, scrollBottom } from './utils';

import styles from './App.module.css';

const DEFAULT_STATE_PART = {
  search: '',
  page: 1,
  totalPages: 0,
  url: '',
  hint: '',
  showModal: false,
  loading: false,
  empty: false,
};

class App extends Component {
  state = {
    images: [],
    ...DEFAULT_STATE_PART,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  getLargeImage = small => {
    return this.state.images.find(image => image.small === small);
  };

  onChangeSearchQuery = search => {
    if (this.state.search !== search) {
      this.setState({ images: [], ...DEFAULT_STATE_PART, search });
    } else {
      scrollTop();
    }
  };

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.search !== this.state.search) {
      await this.fetchImages();
    }
  }

  fetchImages = async () => {
    const { search, page } = this.state;
    try {
      this.setState({ loading: true });
      const { data, totalPages } = await fetchImagesDataPixabay(search, page);
      this.setState(prev => {
        return {
          page: prev.page + 1,
          images: [...prev.images, ...data],
          empty: data.length === 0,
          totalPages,
        };
      });
      scrollBottom();
    } catch (error) {
      throw error;
    } finally {
      this.setState({ loading: false });
    }
  };

  onImageClickHandler = event => {
    event.preventDefault();

    const targetEl = event.target;
    if (targetEl.nodeName === 'IMG') {
      const { large, hint } = this.getLargeImage(targetEl.src);
      this.setState({ url: large, hint });
      this.toggleModal();
    }
  };

  render() {
    const { showModal, loading, empty, search } = this.state;
    const { images, url, hint, page, totalPages } = this.state;
    const left = totalPages - page + 1;

    return (
      <>
        <div className={styles.App}>
          <Searchbar onSubmit={this.onChangeSearchQuery} />
          {empty ? (
            <div className={styles.App__message}>
              <p>Images are not found for "{search}"</p>
            </div>
          ) : (
            <>
              <ImageGallery
                imageList={images}
                onClick={this.onImageClickHandler}
              />
              {page - 1 < totalPages && (
                <div className={styles.App__container}>
                  <Button onClick={this.fetchImages}>Load more [{left}]</Button>
                </div>
              )}
            </>
          )}
        </div>
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={url} alt={hint} />
          </Modal>
        )}
        {loading && <Loader />}
      </>
    );
  }
}
export default App;
