import './Game.css'; 
import { useEffect, useRef } from 'react';
import Matter from 'matter-js';
import { renderGame } from '../../scripts/renderGame';

const Game = (props) => {

	useEffect((props) => {
		const [Engine, Render] = renderGame(props.id, props.game);
		return () => {	// on re-render: remove currently generated canvas and engine to prevent multiple canvas generations
			if (Engine && Render) {
				Matter.World.clear(Engine.world);
				Matter.Render.stop(Render);
				// prevent memory leak
				Render.canvas.remove();
				Render.canvas = null;
				Render.context = null;
				Render.textures = {};
			}
		};
	}, []);

	return (
		<div
			className='Game' 
			id={ props.id }
		/>
	);
};

export default Game;