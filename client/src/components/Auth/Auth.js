import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func, object } from 'prop-types';
import jwtDecode from 'jwt-decode';
import { parse } from 'min-qs';
import styles from './styles.scss';

import Login from './Login';
import Signup from './Signup';
import Info from './Info';

import { addUser } from '../../actions/user';

const mapDispatchToProps = dispatch => ({
  addUserFromToken: token => dispatch(addUser(jwtDecode(token))),
});

class Auth extends Component {
  state = {
    isNewUser: false
  }

  componentDidMount() {
    this.setNewUser();
  }

  setNewUser = () => {
    const { location } = this.props;
    const query = parse(location.search.substr(1));
    this.setState({ isNewUser: query.type !== 'login' });
  }

  toggleNewUser = () => {
    this.setState({ isNewUser: !this.state.isNewUser });
  }

  render() {
    const { addUserFromToken, history } = this.props;
    const { isNewUser } = this.state;

    return (
      <div className={styles.Auth}>
        <div className={styles.Draggable} />
        <div className={[styles.AuthBox, isNewUser ? '' : styles.OldUser].join(' ')}>
          {
            isNewUser
            ? (
              <Signup
                switchForm={this.toggleNewUser}
                addUser={addUserFromToken}
                history={history}
              />
            )
            : <Login switchForm={this.toggleNewUser} addUser={addUserFromToken} history={history} />
          }
          <Info
            message={isNewUser ? 'Take your game to the next level!' : 'Welcome back!'}
            isNewUser={isNewUser}
          />
        </div>
      </div>
    );
  }
}

Auth.propTypes = {
  addUserFromToken: func.isRequired,
  history: object.isRequired,
  location: object.isRequired
};

export default connect(null, mapDispatchToProps)(Auth);
