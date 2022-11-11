import Matter from 'matter-js';

Matter.Common.setDecomp(require('poly-decomp'));

const letters = require('./letters.json');

const createStaringParts = (ch, cw, sr) => {
    let walls = [
        // add static objects
        // Matter.Bodies.rectangle(cw / 2, -500, cw, 1000, { isStatic: true }),       // top
        Matter.Bodies.rectangle(-500, ch * 5, 1000, ch * 10, { isStatic: true }),       // left
        Matter.Bodies.rectangle(cw / 2, ch + 500, cw, 1000, { isStatic: true }),   // bottom
        Matter.Bodies.rectangle(cw + 500, ch * 5, 1000, ch * 10, { isStatic: true }),   // right
    ];

    let otherParts = [
        Matter.Bodies.circle(cw / 3, sr * 50, sr * 50),
    ];

    for (let part of otherParts) {
        part.restitution = 0.25;
    }

    return [...walls, ...otherParts];
};

export const renderGame = (id) => {
    let Engine = Matter.Engine.create();
    const ch = document.body.clientHeight;
    const cw = ch / 2;  // adjust game window width here
    const sr = ch / 925;    // size ratio (base = 1)

    const Render = Matter.Render.create({
        element: document.getElementById(id),
        engine: Engine,
        options: {
            width: cw,
            height: ch,
            wireframes: false,
            background: 'transparent',
        }
    });
    
    const Mouse = Matter.Mouse.create(Render.canvas);
    const MouseConstraint = Matter.MouseConstraint.create(Engine, {
        mouse: Mouse,
        constraint: {
            render: { visible: false },
        },
    });
    Render.mouse = Mouse;

    Matter.World.add(Engine.world, [
        ...createStaringParts(ch, cw, sr),
        MouseConstraint,
    ]);

    // additional engine settings
    Engine.world.gravity.y = 0.1;
    Matter.Runner.run(Engine);
    Matter.Render.run(Render);
    
    // set delay to spawn other parts
    let parts = ['H', 'i', '-', 'I', 'm', '-', 'S', 'i', 'm', 'o', 'n'];
    let spawn = 0;
    for (let i = 0; i < parts.length; i++) {
        const part = Matter.Bodies.fromVertices(0, 0, letters[parts[i]], {
            render: {
                fillStyle: '#58a6ff',
            }
        });
        Matter.Body.rotate(part, 3 * (Math.PI / 2));
        spawn -= (part.bounds.max.y - part.bounds.min.y + 100);
        Matter.Body.scale(part, 2 * sr, 2 * sr);
        Matter.Body.setPosition(part, { x: cw / 2,  y: spawn });
        
        Matter.World.add(Engine.world, part);

    }

    return [Engine, Render];
};