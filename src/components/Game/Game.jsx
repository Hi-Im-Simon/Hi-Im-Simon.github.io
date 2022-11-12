import './Game.css'; 
import { useEffect, useState } from 'react';

import * as Games from '../../lib//games/gamesIndex';

const Game = (props) => {
	const [Game, setGame] = useState(false);
	const [boolButtons, setBoolButtons] = useState({});

	function startGame(spawnTitle=false) {
		if (Game) Game.kill();
		const element = document.getElementById(props.id);
		setGame(new Games[props.gameName](element, spawnTitle));
	}

	useEffect(() => {
		// if game is not yet rendered, render it
		startGame(true);
		// disable warnings about argument passing in case any are needed in the future
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div
			className='Game' 
			id={ props.id }
		>
			<button 
				className='reset'
				onClick={ () => startGame() }
			>
				Reset
			</button>
			{ Game.boolButtons &&
				Object.keys(Game.boolButtons).map(key => 
					<button key={ key }
						className={ key }
						onClick={ () => {
							Game.boolButtons[key] = !Game.boolButtons[key];
							setBoolButtons({ ...boolButtons, [key]: Game.boolButtons[key] });
						}}
						style={ boolButtons[key] ? { background: 'green' } : { background: 'red' } }
					>
						{ key }
					</button>
				)
			}
		</div>
	);
};

export default Game;