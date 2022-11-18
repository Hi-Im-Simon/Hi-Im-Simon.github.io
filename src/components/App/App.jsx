import './App.css';
import React, { } from 'react';
import Main from './Main/Main';
import Game from '../Game/Game';

const App = (props) => {
	return (
		<div className='App'>
			{ window.screen.width >= 1600 &&
				<Game id='game-left' gameName={ 'Game0' } />
			}

			<Main />
			{ window.screen.width >= 1600 &&
				<Game id='game-right' gameName={ 'Game1' } />
			}
		</div>
	);
};

export default App;