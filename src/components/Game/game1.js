import Matter from 'matter-js';

const createParts = (ch, cw, sr) => {
    let walls = [
        // add static objects
        Matter.Bodies.rectangle(cw / 2, -500, cw, 1000, { isStatic: true }),       // top
        Matter.Bodies.rectangle(-500, ch / 2, 1000, ch, { isStatic: true }),       // left
        Matter.Bodies.rectangle(cw / 2, ch + 500, cw, 1000, { isStatic: true }),   // bottom
        Matter.Bodies.rectangle(cw + 500, ch / 2, 1000, ch, { isStatic: true }),   // right
    ];

    let letters = [
        // Matter.Bodies.circle(cw/2, sr*100, sr*50),
        Matter.Bodies.fromVertices(cw / 2, sr * 100, [
            { x: -20, y: 0 },
            { x: 0, y: 50 },
            { x: 25, y: 25 },
            { x: 50, y: 50 },
            { x: 50, y: 0 }
        ]),
        Matter.Bodies.circle(cw / 3, sr * 50, sr * 50),
    ];

    for (let part of letters) {
        part.restitution = 0.25;
    }

    return [...walls, ...letters];
};

export const runGame = (id) => {
    let Engine = Matter.Engine.create();
    const ch = document.body.clientHeight;
    const cw = ch / 3;  // adjust game window width here
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
    // 
    const Mouse = Matter.Mouse.create(Render.canvas);
    const MouseConstraint = Matter.MouseConstraint.create(Engine, {
        mouse: Mouse,
        constraint: {
            render: { visible: false },
        },
    });
    Render.mouse = Mouse;

    const parts = createParts(ch, cw, sr);

    Matter.World.add(Engine.world, [
        ...parts,
        MouseConstraint,
    ]);

    Matter.Runner.run(Engine);
    Matter.Render.run(Render);

    return [Engine, Render];
};