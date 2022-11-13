import './Game.css'; 
import { useEffect, useState } from 'react';

import * as Games from '../../lib//games/gamesIndex';

const Game = (props) => {
	const [Game, setGame] = useState(false);
	const [boolButtons, setBoolButtons] = useState({});
	const [isMenu, setIsMenu] = useState(false);

	function startGame(firstRender=false) {
		if (Game) Game.kill();
		const element = document.getElementById(props.id);
		setGame(new Games[props.gameName](element, firstRender));
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
			<div className='menu' style={ props.id === 'game-left' ? { left: 0 } : { right: 0 } }>
				<div className='menu-toggle noselect' onClick={ () => setIsMenu(!isMenu) }>{ isMenu ? '/\\' : '\\/' }</div>

				<div className='buttons' style={ isMenu ? { display: 'block' } : { display: 'none' } }>
					<button 
						className='reset'
						onClick={ () => {
							startGame();
							setBoolButtons({ ...Game._boolButtonsDefault });
						}}
					>reset</button>

					{ Game.boolButtons &&
						Object.keys(Game.boolButtons).map(key => 
							<button key={ key }
								className={ `${ key } bool` }
								onClick={ () => {
									Game.boolButtons[key] = !Game.boolButtons[key];
									setBoolButtons({ ...boolButtons, [key]: Game.boolButtons[key] });
								}}
								style={ Game.boolButtons[key] ? { background: '#5da365' } : { background: '#f75959' } }
							>
								{ key.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase() }
							</button>
						)
					}

					{ Game.functionalButtons &&
						Object.keys(Game.functionalButtons).map(key => 
							<button key={ key }
								className={ `${ key } functional` }
								onClick={ () => Game.functionalButtons[key]() }
							>
								{ key.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase() }
							</button>
						)
					}
				</div>
			</div>
		</div>
	);
};

export default Game;