import React, { useState } from 'react';

function NewTweet ({ addTweet }) {
  const [newTweet, setNewTweet] = useState('');

  const handleChange = (event) => {
    setNewTweet(event.target.value);
  }

  const handleClick = (event) => {
    console.log(newTweet);

    addTweet(newTweet);

    setNewTweet('');
  }

  return (
    <div className="flex justify-center items-center w-1/3 border-2 px-2 py-3">
      <div className="w-full">
        <textarea className="appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Whats Up?" onChange={handleChange} value={newTweet}></ textarea>
      </div>
      <div className="ml-2">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline" onClick={handleClick}>
          Tweet
        </button>
      </div>
    </div>
  );
}

export default NewTweet;
