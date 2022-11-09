import React, { useState } from 'react';
import './App.css';
import Main from './Main/Main';
import Game from '../Game/Game';

const App = (props) => {
	const [windowSize, setWindowSize] = useState({
		height: window.innerHeight,
		width: window.innerWidth
	});

	React.useEffect(() => {
		function handleResize() {
			setWindowSize({
				height: window.innerHeight,
				width: window.innerWidth
			});
		}
		window.addEventListener('resize', handleResize);
		return () => { window.removeEventListener('resize', handleResize) };
	});

	return (
		<div className='App'>
			{ (windowSize.width > 1000) &&
				<Game id='game-left' />
			}

			<Main />

			{ (windowSize.width > 1300) &&
				<Game id='game-right' />
			}
		</div>
	);
};

export default App;