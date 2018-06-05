import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { node } from 'prop-types';
import { Widget, addResponseMessage } from 'react-chat-widget';

import { addUser } from '../actions/user';
import userQuery from '../graphql/user.graphql';

import logo from '../resources/logo.png';

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

class App extends Component {
  componentDidMount() {
    addResponseMessage('Hi I\'m Carlos, Alpha Stage\'s developer, is there anything I can do for you?');
  }

  handleNewUserMessage = (newMessage) => {
    console.log(`New message incomig! ${newMessage}`);
    // Now send the message throught the backend API
  }

  render() {
    const { children } = this.props;

    return (
      <div className="content">
        {children}
        <Widget
          handleNewUserMessage={this.handleNewUserMessage}
          profileAvatar={logo}
          title="Welcome"
          subtitle="Talk directly Alpha Stage's Dev."
        />
      </div>
    );
  }
}

App.propTypes = {
  children: node.isRequired
};

const AppWithData = withData(App);

export default connect(null, mapDispatchToProps)(AppWithData);
