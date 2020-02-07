import React from 'react';

import Avatar from './Avatar';
import Message from './Message';
import Author from './Author';
import Time from './Time';
import ReplyButton from './ReplyButton';
import RetweetButton from './RetweetButton';
import LikeButton from './LikeButton';
import MoreOptionsButton from './MoreOptionsButton';

function Tweet({ tweet }) {
  return (
    <div className="tweet">
      <Avatar hash={tweet.user.gravatar} />
      <div className="content">
        <Author author={tweet.user} />
        <Time time={tweet.timestamp} />
        <Message text={tweet.message} />
        <div className="buttons">
          <ReplyButton />
          <RetweetButton count={tweet.retweets} />
          <LikeButton count={tweet.likes} />
          <MoreOptionsButton />
        </div>
      </div>
    </div>
  );
}

export default Tweet;
