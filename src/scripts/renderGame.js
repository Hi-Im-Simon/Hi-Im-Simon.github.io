import Matter from 'matter-js';
import Game0 from '../scripts/Game0';
import Game1 from '../scripts/Game1';

Matter.Common.setDecomp(require('poly-decomp'));


export const renderGame = (id, gameName) => {
    const ch = document.body.clientHeight;
    const cw = ch / 2;  // adjust game window width here
    const sr = ch / 925;    // size ratio (base = 1)
    
    const Engine = Matter.Engine.create();
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

    let Game = false;
    if (gameName === 0) Game = new Game0(Engine, Render, ch, cw, sr);
    if (gameName === 1) Game = new Game1(Engine, Render, ch, cw, sr);

    if (Game) {
        const Mouse = Matter.Mouse.create(Render.canvas);
        const MouseConstraint = Matter.MouseConstraint.create(Engine, {
            mouse: Mouse,
            constraint: {
                render: { visible: false },
            },
        });
        Render.mouse = Mouse;

        // create visible elements
        Matter.World.add(Engine.world, MouseConstraint);
        Game.createParts();
        Game.bindEvents();

        // additional engine settings
        Engine.world.gravity.y = 0.2;
    }
    
    Matter.Runner.run(Engine);
    Matter.Render.run(Render);

    return [Engine, Render];
};