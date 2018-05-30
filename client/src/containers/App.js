import React from 'react';
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';
import PropTypes from 'prop-types';

import { addUser } from '../actions/user';
import userQuery from '../graphql/user.graphql';

const mapDispatchToProps = dispatch => ({
  setUser: user => dispatch(addUser(user)),
});

const withData = graphql(userQuery, {
  props: ({ ownProps: { setUser }, data: { user, loading, error } }) => {
    if (!user) return { loading };
    if (error) return { hasErrors: true };

    if (localStorage.getItem('token')) setUser(user);
    return user;
  },
  options: () => {
    const token = localStorage.getItem('token');
    const user = token ? jwtDecode(token) : {};
    return ({ variables: { id: user._id } });
  }
});

const App = ({ children }) => (
  <div className="content">
    {children}
  </div>
);

App.propTypes = {
  children: PropTypes.node.isRequired
};

const AppWithData = withData(App);

export default connect(null, mapDispatchToProps)(AppWithData);
