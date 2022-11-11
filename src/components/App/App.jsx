import React, { useState } from 'react';
import './App.css';
import Main from './Main/Main';
import Game from '../Game/Game';

const App = (props) => {
	return (
		<div className='App'>
			<Game id='game-left' game={ 0 } />

			<Main />

			<Game id='game-right' game={ 1 } />
		</div>
	);
};

export default App;