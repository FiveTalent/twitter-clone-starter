import React, { useState, useEffect } from 'react';
import NewTweet from './components/NewTweet/NewTweet';
import Media from './components/Media/Media';
import Tweet from './components/Tweet/Tweet';
import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react'; // or 'aws-amplify-react-native';
import awsconfig from './aws-exports';
import * as mutations from './graphql/mutations';
import './App.css';

Amplify.configure(awsconfig);

const listTweetsQuery = `query listTweets {
  listTweets {
    items {
      id
      message
      user {
        id
        name
        gravatar
        handle
      }
    }
  }
}`;

function App() {
  const [tweets, setTweets] = useState([]);
  const [activeRoute, setActiveRoute] = useState('tweets');
  const [user, setUser] = useState(null);

  useEffect(() => {
    listTweets();
  }, []);

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(user => setUser(user))
      .catch(() => console.log("Not signed in"));
  }, []);

  const addTweet = async (message) => {
    try {
      const input = {
        message: message,
        tweetUserId: user.attributes.sub // get this from current logged in user.
      }

      await API.graphql(graphqlOperation(mutations.createTweet, { input: input })); // Using imported mustation from generated file
    } catch (err) {
      console.error(err);
    }
  }

  const listTweets = async () => {
    const allTweets = await API.graphql(graphqlOperation(listTweetsQuery)); // Using our custom query 'listTweetsQuery'

    setTweets(allTweets.data.listTweets.items);
  }

  const changeRoute = route => {
    setActiveRoute(route);
  }

  const renderActiveRoute = () => {
    if (activeRoute === 'tweets') {
      return (
        <>
          <NewTweet addTweet={addTweet} />

          {tweets.map(tweet => <Tweet tweet={tweet} key={tweet.id} />)}
        </>
      );
    }

    return <Media />
  }

  return (
    <div className="flex flex-col justify-center items-center pt-12">
      <div className="flex w-full justify-center">
        <div className={`${activeRoute === "tweets" ? "underline" : ""} m-4 cursor-pointer`} onClick={() => changeRoute("tweets")}>Tweets</div>
        <div className={`${activeRoute === "media" ? "underline" : ""} m-4 cursor-pointer`} onClick={() => changeRoute("media")}>Media</div>
      </div>

      {renderActiveRoute()}
    </div>
  );
}

export default withAuthenticator(App, true);
