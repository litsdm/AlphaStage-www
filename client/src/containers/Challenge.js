import React from 'react';
import { graphql, compose } from 'react-apollo';

import scoreboardUsers from '../graphql/scoreboardUsers.graphql';
import setHighScore from '../graphql/setHighScore.graphql';
import userHighScore from '../graphql/userHighScore.graphql';

import Game from '../lib/reactInvaders/ReactInvaders';

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
        scoreboardUsers: data.scoreboardUsers,
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

const Contest = () => (
  <div>
    <Game />
  </div>
);

export default withData(Contest);
