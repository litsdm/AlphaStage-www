import React from 'react';
import { string } from 'prop-types';
import styles from './DownloadSection.scss';

import Access from '../Access';

import pattern from '../../resources/pattern.png';

const DownloadSection = ({ version, status }) => (
  <div className={styles.Container} style={{ background: `url(${pattern})` }}>
    <h1>Download Alpha Stage now!</h1>
    <div className={styles.Divider} />
    <Access version={version} status={status} downloadSection />
  </div>
);

DownloadSection.propTypes = {
  version: string,
  status: string
};

DownloadSection.defaultProps = {
  version: '0.1.0',
  status: 'development'
};

export default DownloadSection;
