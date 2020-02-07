import React, { useState } from 'react';
import './App.css';
import NewTweet from './components/NewTweet/NewTweet';
import Media from './components/Media/Media';
import Tweet from './components/Tweet/Tweet';

function App() {
  const [tweets, setTweets] = useState([]);

  const [activeRoute, setActiveRoute] = useState('tweets');

  const changeRoute = route => {
    setActiveRoute(route);
  }

  const renderActiveRoute = () => {
    if (activeRoute === 'tweets') {
      return (
        <React.Fragment>
          <NewTweet />
          <Tweet tweet={testTweet} />
        </React.Fragment>
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

const testTweet = {
  message: "Something about cats.",
  user: {
    name: "IAMA Cat Person",
    handle: "catperson",
    gravatar: "xyz",
    identity: "us-west-2-234mlfkjerlkm"
  },
  likes: 2,
  retweets: 17,
  timestamp: "2016-07-30 21:24:37"
};

export default App;
