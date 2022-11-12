import React, {  } from 'react';
import './App.css';
import Main from './Main/Main';
import Game from '../Game/Game';

const App = (props) => {
	return (
		<div className='App'>
			<Game id='game-left' gameName={ 'Game0' } />

			<Main />

			<Game id='game-right' gameName={ 'Game1' } />
		</div>
	);
};

export default App;