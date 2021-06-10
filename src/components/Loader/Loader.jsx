import React from 'react';
import { createPortal } from 'react-dom';

import styles from './Loader.module.css';

const loaderRoot = document.querySelector('#front-root');

function Loader() {
  return createPortal(
    <div className={styles.Spinner}>
      <div className={styles.Spinner__overlay}>
        <div className={styles.Spinner__roller}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>,
    loaderRoot,
  );
}

export default Loader;
