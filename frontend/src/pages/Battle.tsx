import React from 'react';
import {
  FaUserFriends,
  FaFighterJet,
  FaTrophy,
  FaTimesCircle,
} from 'react-icons/fa';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Instructions() {
  const theme = 'dark';
  return (
    <div className="instructions-container text-white">
      <h1 className="center-text header-lg">Instructions</h1>
      <ol className="container-sm grid grid-cols-3 gap-4 center-text battle-instructions">
        <li className="flex flex-col items-center">
          <h3 className="header-sm">Enter two users</h3>
          <FaUserFriends
            className="bg-white"
            color="rgb(255, 191, 116)"
            size={140}
          />
        </li>
        <li className="flex flex-col items-center">
          <h3 className="header-sm">Battle</h3>
          <FaFighterJet className="bg-white" color="#727272" size={140} />
        </li>
        <li className="flex flex-col items-center">
          <h3 className="header-sm">See the winners</h3>
          <FaTrophy
            className={`bg-white`}
            color="rgb(255, 215, 0)"
            size={140}
          />
        </li>
      </ol>
    </div>
  );
}

function PlayerInput({ onSubmit, label }) {
  const [username, setUsername] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(username);
  };

  const handleChange = (event) => setUsername(event.target.value);

  return (
    <form className="column player text-white" onSubmit={handleSubmit}>
      <label htmlFor="username" className="player-label ">
        {label}
      </label>
      <div className="row player-inputs">
        <input
          type="text"
          id="username"
          className="input-white text-black"
          placeholder="github username"
          autoComplete="off"
          value={username}
          onChange={handleChange}
        />
        <button
          className="btn bg-custom-light-green"
          type="submit"
          disabled={!username}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

function PlayerPreview({ username, onReset, label }) {
  return (
    <div className="column player flex justify-between">
      <h3 className="player-label text-white">{label}</h3>
      <div className={`row bg-white`}>
        <div className="player-info">
          <img
            className="avatar-small"
            src={`https://github.com/${username}.png?size=200`}
            alt={`Avatar for ${username}`}
          />
          <a href={`https://github.com/${username}`} className="link">
            {username}
          </a>
        </div>
        <button className="btn-clear flex-center" onClick={onReset}>
          <FaTimesCircle color="rgb(194, 57, 42)" size={26} />
        </button>
      </div>
    </div>
  );
}

export default function Battle() {
  const [playerOne, setPlayerOne] = React.useState(null);
  const [playerTwo, setPlayerTwo] = React.useState(null);

  const handleSubmit = (id, player) =>
    id === 'playerOne' ? setPlayerOne(player) : setPlayerTwo(player);

  const handleReset = (id) =>
    id === 'playerOne' ? setPlayerOne(null) : setPlayerTwo(null);

  return (
    <React.Fragment>
      <Instructions />
      <div className="players-container">
        <h1 className="center-text header-lg text-white">Players</h1>
        <div className="row space-around">
          {playerOne === null ? (
            <PlayerInput
              label="Player One"
              onSubmit={(player) => handleSubmit('playerOne', player)}
            />
          ) : (
            <PlayerPreview
              username={playerOne}
              label="Player One"
              onReset={() => handleReset('playerOne')}
            />
          )}

          {playerTwo === null ? (
            <PlayerInput
              label="Player Two"
              onSubmit={(player) => handleSubmit('playerTwo', player)}
            />
          ) : (
            <PlayerPreview
              username={playerTwo}
              label="Player Two"
              onReset={() => handleReset('playerTwo')}
            />
          )}
        </div>

        {playerOne && playerTwo && (
          <Link
            className="btn light-btn btn-space"
            to={{
              pathname: '/battle/results',
              search: `?playerOne=${playerOne}&playerTwo=${playerTwo}`,
            }}
          >
            Battle
          </Link>
        )}
      </div>
    </React.Fragment>
  );
}
