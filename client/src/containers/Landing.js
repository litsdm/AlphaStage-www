import React from 'react';
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { func, object } from 'prop-types';

import addPotentialUser from '../graphql/addPotentialUser.graphql';

import Main from '../components/Landing/Main';

const mapStateToProps = ({ user }) => (
  {
    user
  }
);

const withMutation = graphql(addPotentialUser, {
  props: ({ mutate }) => ({
    submitUser: (email) => mutate({ variables: { email } }),
  })
});

const Landing = ({ submitUser, user }) => <Main submitUser={submitUser} user={user} />;

Landing.propTypes = {
  submitUser: func.isRequired,
  user: object
};

Landing.defaultProps = {
  user: null
};

const LandingWithData = withMutation(Landing);

export default connect(mapStateToProps, null)(LandingWithData);
