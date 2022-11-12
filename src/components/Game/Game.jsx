import './Game.css'; 
import { useEffect, useState } from 'react';

import * as Games from '../../lib//games/gamesIndex';

const Game = (props) => {
	const [Game, setGame] = useState(false);
	const [functionalButtons, setFunctionalButtons] = useState({});

	function startGame() {
		if (Game) Game.kill();
		const element = document.getElementById(props.id);
		setGame(new Games[props.gameName](element));
	}

	useEffect(() => {
		// if game is not yet rendered, render it
		startGame();
		// disable warnings about argument passing
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
			{ Game.functionalButtons &&
				Object.keys(Game.functionalButtons).map(key => 
					<button key={ key }
						className={ key }
						onClick={ () => {
							Game.functionalButtons[key] = !Game.functionalButtons[key];
							setFunctionalButtons({ ...functionalButtons, [key]: Game.functionalButtons[key] });
						}}
						style={ functionalButtons[key] ? { background: 'green' } : { background: 'red' } }
					>
						{ key }
					</button>
				)
			}
		</div>
	);
};

export default Game;