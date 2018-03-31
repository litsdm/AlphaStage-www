import React from 'react';
import { string } from 'prop-types';
import styles from './DownloadSection.scss';

import pattern from '../../resources/pattern.png';

const DownloadSection = ({ version }) => (
  <div className={styles.Container} style={{ background: `url(${pattern})` }}>
    <h1>Download Alpha Stage now!</h1>
    <div className={styles.Divider} />
    <div className={styles.Buttons}>
      <a
        href={`https://github.com/cdiezmoran/AlphaStage-2.0/releases/download/v${version}/alpha-stage-setup-${version}.exe`}
        download
      >
        <i className="fa fa-windows" />
        Download for Windows
      </a>
      <a
        href={`https://github.com/cdiezmoran/AlphaStage-2.0/releases/download/v${version}/alpha-stage-${version}.dmg`}
        download
      >
        <i className="fa fa-apple" />
        Download for MacOS
      </a>
    </div>
  </div>
);

DownloadSection.propTypes = {
  version: string
};

DownloadSection.defaultProps = {
  version: '0.1.0'
};

export default DownloadSection;
