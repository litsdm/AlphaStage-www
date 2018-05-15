import React, { Component } from 'react';
import { string } from 'prop-types';
import uuid from 'uuid/v4';
import styles from './AccessModal.scss';

import Modal from '../Modal';

class AccessModal extends Component {
  state = {
    links: [],
    linkFields: []
  };

  componentDidMount() {
    this.addField();
  }

  addField = () => {
    const { linkFields } = this.state;
    if (linkFields.length >= 5) return;

    const index = linkFields.length;
    const field = (
      <label htmlFor={`link${index}`} key={uuid()} className={styles.Tag}>
        Link {index + 1}
        <input
          id={`link${index}`}
          className={styles.Input}
          type="text"
          onChange={this.onLinkChange(index)}
        />
      </label>
    );

    this.setState({ linkFields: [...linkFields, field] });
  }

  onLinkChange = (index) => ({ target: { value } }) => {
    const { links } = this.state;
    links[index] = value;
    this.setState({ links });
  }

  render() {
    const { id } = this.props;
    const { linkFields } = this.state;
    return (
      <Modal id={id} title="Gain Access to Alpha Stage">
        <div className={styles.Row}>
          <div className={styles.ColumnLeft}>
            <p className={styles.Title}>Links</p>
            <p className={styles.Description}>
              Add a link to any of your game projects to show us you are a game developer.
              {' '}Only one is required.
            </p>
          </div>
          <div className={styles.ColumnRight}>
            {linkFields}
            {
              linkFields.length < 5
                ? (
                  <button className={styles.SecondaryButton} onClick={this.addField}>
                    Add Link
                  </button>
                )
                : null
            }
          </div>
        </div>
        <div className={styles.Row}>
          <div className={styles.ColumnLeft}>
            <p className={styles.Title}>Additional Info</p>
            <p className={styles.Description}>(Optional)</p>
          </div>
          <div className={styles.ColumnRight}>
            <textarea
              className={styles.TextArea}
              placeholder="Anything else you would like to tell us."
            />
          </div>
        </div>
        <div className={styles.Footer}>
          <button className={styles.PrimaryButton}>Submit</button>
        </div>
      </Modal>
    );
  }
}

AccessModal.propTypes = {
  id: string.isRequired
};

export default AccessModal;
