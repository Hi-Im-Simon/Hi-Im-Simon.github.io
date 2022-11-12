import Matter from 'matter-js';
import Game from './Game';
const lettersVerts = require('../static/letters.json');

export default class Game0 extends Game {
    constructor(...args) {
        super(...args);
        
        this._addMouseControl();
    }

    _createParts() {
        let letters = [];
        let spawn = 0;
        for (let letter of ['H', 'i', '-', 'I', 'm', '-', 'S', 'i', 'm', 'o', 'n']) {
            const part = Matter.Bodies.fromVertices(0, 0, lettersVerts[letter], {
                render: {
                    fillStyle: '#58a6ff',
                }
            });

            Matter.Body.rotate(part, 3 * (Math.PI / 2));
            spawn -= (part.bounds.max.y - part.bounds.min.y + 100);
            Matter.Body.scale(part, 2 * this.sr, 2 * this.sr);
            Matter.Body.setPosition(part, { x: this.cw / 2, y: spawn });
            Matter.Body.setMass(part, 2000);
            letters.push(part);
        }

        let otherParts = [
            Matter.Bodies.circle(this.cw / 3, this.sr * 50, this.sr * 50),
        ];
        for (let part of otherParts) {
            part.restitution = 0.25;
        }

        this.showParts([...this._createWalls(), ...letters, ...otherParts]);
    }
}