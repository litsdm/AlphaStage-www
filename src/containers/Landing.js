import React from 'react';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { func, object } from 'prop-types';

import client from '../client';

import { removeUser } from '../actions/user';
import addPotentialUser from '../graphql/addPotentialUser.graphql';
import createApplication from '../graphql/createApplication.graphql';

import Main from '../components/Landing/Main';

const mapStateToProps = ({ user }) => (
  {
    user
  }
);

const mapDispatchToProps = dispatch => ({
  logout: () => {
    localStorage.removeItem('token');
    dispatch(removeUser());
    client.resetStore();
  }
});

const withMutation = compose(
  graphql(addPotentialUser, {
    props: ({ mutate }) => ({
      submitUser: (email) => mutate({ variables: { email } }),
    })
  }),
  graphql(createApplication, {
    props: ({ ownProps: { user }, mutate }) => ({
      submitApplication: (input) => mutate({ variables: { input: { ...input, userId: user._id } } })
    })
  })
);

const Landing = ({ submitUser, user, logout, submitApplication }) => (
  <Main
    submitUser={submitUser}
    user={user}
    logout={logout}
    submitApplication={submitApplication}
  />
);

Landing.propTypes = {
  logout: func.isRequired,
  submitApplication: func.isRequired,
  submitUser: func.isRequired,
  user: object
};

Landing.defaultProps = {
  user: null
};

const LandingWithData = withMutation(Landing);

export default connect(mapStateToProps, mapDispatchToProps)(LandingWithData);
