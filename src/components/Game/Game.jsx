import './Game.css'; 
import { useEffect, useRef } from 'react';
import Matter from 'matter-js';
import { renderGame } from './game1';

const Game = (props) => {

	useEffect(() => {
		const [Engine, Render] = renderGame(props.id);
		return () => {	// on re-render: remove currently generated canvas and engine to prevent multiple canvas generations
			Matter.World.clear(Engine.world);
			Matter.Render.stop(Render);
			// prevent memory leak
			Render.canvas.remove();
			Render.canvas = null;
			Render.context = null;
			Render.textures = {};
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