import React from 'react';
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { func, object } from 'prop-types';

import client from '../client';

import { removeUser } from '../actions/user';
import addPotentialUser from '../graphql/addPotentialUser.graphql';

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

const withMutation = graphql(addPotentialUser, {
  props: ({ mutate }) => ({
    submitUser: (email) => mutate({ variables: { email } }),
  })
});

const Landing = ({ submitUser, user, logout }) =>
  <Main submitUser={submitUser} user={user} logout={logout} />;

Landing.propTypes = {
  logout: func.isRequired,
  submitUser: func.isRequired,
  user: object
};

Landing.defaultProps = {
  user: null
};

const LandingWithData = withMutation(Landing);

export default connect(mapStateToProps, mapDispatchToProps)(LandingWithData);
