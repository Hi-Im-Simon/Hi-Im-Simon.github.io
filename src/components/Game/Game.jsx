import './Game.css'; 
import { useEffect, useRef } from 'react';
import { Engine, Render, Bodies, World } from 'matter-js';

const Game = (props) => {
	const scene = useRef();
	const isPressed = useRef(false);
	const engine = useRef(Engine.create());

	useEffect(() => {
		const cw = 450;
		const ch = document.body.clientHeight;

		const render = Render.create({
			element: scene.current,
			engine: engine.current,
			options: {
				width: cw,
				height: ch,
				wireframes: false,
				background: 'transparent',
			}
		});

		// add borders
		World.add(engine.current.world, [
			Bodies.rectangle(cw / 2, -10, cw, 20, { isStatic: true }),
			Bodies.rectangle(-10, ch / 2, 20, ch, { isStatic: true }),
			Bodies.rectangle(cw / 2, ch + 10, cw, 20, { isStatic: true }),
			Bodies.rectangle(cw + 10, ch / 2, 20, ch, { isStatic: true })
		]);

		Engine.run(engine.current);
		Render.run(render);

		return () => {
			Render.stop(render);
			World.clear(engine.current.world);
			Engine.clear(engine.current);
			render.canvas.remove();
			render.canvas = null;
			render.context = null;
			render.textures = {};
		}
	}, [])

	const handleDown = () => {
		isPressed.current = true;
	}

	const handleUp = () => {
		isPressed.current = false;
	}

	const handleAddCircle = e => {
		if (isPressed.current) {
			const ball = Bodies.circle(
				e.clientX,
				e.clientY,
				10 + Math.random() * 30,
				{
					mass: 10,
					restitution: 0.9,
					friction: 0.005,
					render: {
						fillStyle: '#0000ff'
					}
				});
			World.add(engine.current.world, [ball])
		}
	}

	return (
		<div className='Game' id={ props.id }
			onMouseDown={ handleDown }
			onMouseUp={ handleUp }
			onMouseMove={ handleAddCircle }
		>
			<div ref={ scene } style={{ width: '100%', height: '100%' }} />
		</div>
	);
};

export default Game;