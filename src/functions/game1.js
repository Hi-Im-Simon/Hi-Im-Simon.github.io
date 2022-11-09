import * as Matter from 'matter-js';

export function startGame() {
    let engine = Matter.Engine.create();
    let render = Matter.Render.create({
        element: document.getElementById('game-left'),
        engine: engine
    });

    render.canvas.width = 290;

    let ground = Matter.Bodies.rectangle(400, 600, 290, 300, { isStatic: true });
    let box1 = Matter.Bodies.rectangle(400, 200, 80, 80);
    let box2 = Matter.Bodies.rectangle(450, 50, 80, 80);

    Matter.World.add(engine.world, [box1, box2, ground]);
    Matter.Engine.run(engine);
    Matter.Render.run(render);
}