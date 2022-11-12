import './Game.css'; 
import { useEffect, useRef } from 'react';
import Matter from 'matter-js';

import Game0 from '../../scripts/Game0';
import Game1 from '../../scripts/Game1';

const Game = (props) => {

	useEffect(() => {
		let Game = false;
		if (props.game === 0) Game = new Game0(document.getElementById(props.id));
		if (props.game === 1) Game = new Game1(document.getElementById(props.id));

		// on re-render: remove currently generated canvas and engine to prevent multiple canvas generations
		return () => { if (Game) Game.kill() };
	}, []);

	return (
		<div
			className='Game' 
			id={ props.id }
		/>
	);
};

export default Game;