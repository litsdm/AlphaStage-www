import React from 'react';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { array, func, object, number } from 'prop-types';

import scoreboardUsers from '../graphql/scoreboardUsers.graphql';
import setHighScore from '../graphql/setHighScore.graphql';
import userHighScore from '../graphql/userHighScore.graphql';

import Challenge from '../components/Challenge/Challenge';

const mapStateToProps = ({ user }) => (
  {
    user
  }
);

const queriesToRefetch = (id) => (
  [
    {
      query: scoreboardUsers,
    },
    {
      query: userHighScore,
      variables: { id }
    }
  ]
);

const withData = compose(
  graphql(setHighScore, {
    props: ({ mutate }) => ({
      setScore: (id, score) =>
        mutate({ variables: { id, score }, refetchQueries: queriesToRefetch(id) }),
    }),
  }),
  graphql(scoreboardUsers, {
    props: ({ data }) => {
      if (!data.scoreboardUsers) return { loading: data.loading };
      if (data.error) return { hasErrors: true };
      return {
        scoreUsers: data.scoreboardUsers,
      };
    }
  }),
  graphql(userHighScore, {
    props: ({ data }) => {
      if (!data.user) return { loading: data.loading };
      if (data.error) return { hasErrors: true };
      return {
        highScore: data.user.highScore || 0,
      };
    },
    options: ({ user }) => ({ variables: { id: user._id } })
  })
);

const Contest = ({ highScore, setScore, scoreUsers, user }) => (
  <Challenge
    highScore={highScore}
    setHighScore={setScore}
    scoreboardUsers={scoreUsers}
    user={user}
  />
);


Contest.propTypes = {
  highScore: number,
  setScore: func.isRequired,
  scoreUsers: array,
  user: object
};

Contest.defaultProps = {
  highScore: 0,
  scoreUsers: [],
  user: {}
};

const ContestWithData = withData(Contest);

export default connect(mapStateToProps, null)(ContestWithData);
