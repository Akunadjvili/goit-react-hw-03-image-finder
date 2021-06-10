import React from 'react';
import ReactDOM from 'react-dom';

import 'modern-normalize/modern-normalize.css';
import './styles.css';
import App from './App';
import styles from './App.module.css';

ReactDOM.render(
  <React.StrictMode>
    <App className={styles.App} />
  </React.StrictMode>,
  document.getElementById('root'),
);
