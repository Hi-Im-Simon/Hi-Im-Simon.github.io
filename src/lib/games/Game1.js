import Matter from 'matter-js';
import Game from './_Game';

export default class Game1 extends Game {
    constructor(...args) {
        super(...args);
        this.mousePosition = false;
        
        this.addMouseControl();
    }

    

    
}