import React, { Component } from 'react';
import { func, string } from 'prop-types';
import uuid from 'uuid/v4';
import toastr from 'toastr';
import styles from './AccessModal.scss';

import Modal from '../Modal';

class AccessModal extends Component {
  state = {
    additionalInfo: '',
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

  onChange = ({ target: { name, value } }) => this.setState({ [name]: value });

  submit = () => {
    const { submitApplication } = this.props;
    const { additionalInfo, links } = this.state;
    let hasLink = false;

    const application = { additionalInfo, links };

    links.forEach(link => {
      if (link) hasLink = true;
    });

    if (!hasLink && !additionalInfo) {
      toastr.error('Please add at least one link or fill the additional info section.');
      return;
    }

    submitApplication(application);

    toastr.success('Application sent!');
    document.getElementById('accessModal').style.display = 'none';
  }

  render() {
    const { id } = this.props;
    const { linkFields, additionalInfo } = this.state;
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
            <p className={styles.Description}>(Only required if no link is given)</p>
          </div>
          <div className={styles.ColumnRight}>
            <textarea
              name="additionalInfo"
              className={styles.TextArea}
              placeholder="Anything else you would like to tell us."
              value={additionalInfo}
              onChange={this.onChange}
            />
          </div>
        </div>
        <div className={styles.Footer}>
          <button className={styles.PrimaryButton} onClick={this.submit}>Submit</button>
        </div>
      </Modal>
    );
  }
}

AccessModal.propTypes = {
  id: string.isRequired,
  submitApplication: func.isRequired
};

export default AccessModal;
