import './Game.css'; 
import { useEffect, useState } from 'react';

import * as Games from '../../lib//games/gamesIndex';

const Game = (props) => {
	const [Game, _setGame] = useState(false);

	function openGame(gameName) {
		const element = document.getElementById(props.id);
		_setGame(new Games[gameName](element));
	}

	useEffect(() => {
		// if game is not yet rendered, render it
		if (!Game) {
			openGame(props.game);
		} 
		// on re-render: remove currently generated canvas and engine to prevent multiple canvas generations
		// return () => { if (Game) Game.kill() };

		// disable warnings about argument passing
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div
			className='Game' 
			id={ props.id }
		/>
	);
};

export default Game;