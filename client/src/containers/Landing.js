import React from 'react';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';

import addPotentialUser from '../graphql/addPotentialUser.graphql';

import Main from '../components/Landing/Main';

const withMutation = graphql(addPotentialUser, {
  props: ({ mutate }) => ({
    submitUser: (email) => mutate({ variables: { email } }),
  })
});

const Landing = ({ submitUser }) => <Main submitUser={submitUser} />;

Landing.propTypes = {
  submitUser: PropTypes.func.isRequired
};

export default withMutation(Landing);
