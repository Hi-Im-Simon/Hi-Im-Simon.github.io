import Matter from 'matter-js';
import Game from './_Game';

export default class Game1 extends Game {
    constructor(element) {
        super(element);
        this.mousePosition = false;
        this.isPressed = { left: false };

        this.snowColor = 'white';
        this.snowLevel = 0;

        // default values of button states, DON'T CHANGE IN CODE
        this._boolButtonsDefault = {
        };
        // current values of button states
        this.boolButtons = this._boolButtonsDefault;

        this.functionalButtons = {
            
        };

        this._valueButtonsDefault = {
            snowIntensity: -0.9,
            windDirection: -0.01,
        };

        this.valueButtons = this._valueButtonsDefault;

        // set default gravity
        this.Engine.world.gravity.y = 0.05 * this.sr;

        this.showStartingParts();
        this.bindEvents();
        this.addMouseControl();
        this.addMouseEffect();
    }

    // override createWalls to make particles sticky to the bottom
    _createWalls() {
        let walls = [
            // Matter.Bodies.rectangle(cw / 2, -500, cw, 1000, { isStatic: true }),       // top
            Matter.Bodies.rectangle(-500, this.ch * 50, 1000, this.ch * 100, { isStatic: true }),       // left
            Matter.Bodies.rectangle(this.cw / 2, this.ch + 500, this.cw, 1000, { isStatic: true }),   // bottom
            Matter.Bodies.rectangle(this.cw + 500, this.ch * 50, 1000, this.ch * 100, { isStatic: true }),   // right
        ];

        return walls;
    }

    showStartingParts() {
        this.snow = Matter.Bodies.rectangle(this.cw / 2, this.ch * 1.5, this.cw, this.ch, {
            color: this.snowColor,
            isStatic: true,
            isBackground: true,
        });

        let houseX = this.cw / 2;
        let houseY = this.ch - 10 * this.sr;
        let houseWidth = 200 * this.sr;
        let houseHeight = 100 * this.sr;
        let partSize = 10 * this.sr;
        let otherParts = [
            Matter.Bodies.rectangle(houseX, this.ch - (partSize * 2), this.cw, partSize * 4, { isBackground: true, color: 'green' }), // ground background
            this.snow, // append snow here to display it over background
            Matter.Bodies.rectangle(houseX, houseY - (houseHeight / 2), houseWidth, houseHeight, { isBackground: true, color: '#db944b' }), // main background
            Matter.Bodies.rectangle(houseX, houseY - (partSize / 2), houseWidth, partSize, { color: '#7a532a' }), // floor
            Matter.Bodies.rectangle(houseX - (houseWidth / 2), houseY - (houseHeight / 2), partSize, houseHeight, { color: '#7a532a' }), // left wall
            Matter.Bodies.rectangle(houseX + (houseWidth / 2), houseY - (houseHeight / 2), partSize, houseHeight, { color: '#7a532a' }), // right wall
            Matter.Bodies.rectangle(houseX - (houseWidth / 4), houseY - houseHeight - (50 * this.sr), houseWidth / 1.35, partSize, { rotate: -Math.PI / 4, color: '#e55858' }), // left roof
            Matter.Bodies.rectangle(houseX + (houseWidth / 4), houseY - houseHeight - (50 * this.sr), houseWidth / 1.35, partSize, { rotate: Math.PI / 4, color: '#e55858' }), // right roof
        ];

        for (let part of otherParts) {
            part.isStatic = true;
            if (!part.isBackground) part.collisionFilter = { group: 1 };
            if (part.rotate) Matter.Body.rotate(part, part.rotate);
            part.render.fillStyle = part.color;
        }

        this.showParts([...this._createWalls(), ...otherParts]);
    }

    addMouseEffect() {
        if (this.mousePosition) {
            const particle = Matter.Bodies.circle(...this.mousePosition, (Math.random() + 0.5) * this.sr, {
                render: {
                    fillStyle: this.snowColor,
                }
            });

            particle.collisionFilter = { group: 1 };

            // if LMB is pressed and not in building mode, don't remove particles
            // DISABLED
            // if (!this.isPressed.left) {
            setTimeout(() => this.removeParts(particle), 250);
            // }

            this.showParts(particle);
        }

        setTimeout(() => this.addMouseEffect(), 100);
    }

    

    // mergeColliding() {
    //     for (let element0 of this.parts) {
    //         if (element0.dontJoinOnTouch) continue;
    //         for (let element1 of this.parts) {
    //             if (element1.dontJoinOnTouch) continue;
    //             if (element0 !== element1) {
    //                 if (Matter.Collision.collides(element0, element1) != null) {
    //                     // Matter.Body.setParts(element0, [element0, element1]);
    //                     let newElement = Matter.Composite.create({
    //                         parts: [
    //                             ...element0.parts,
    //                             ...element1.parts,
    //                         ],
    //                         render: {
    //                             fillStyle: this.particleColor,
    //                         }
    //                     });
    //                     newElement.dontJoinOnTouch = true;
                        
    //                     this.showParts(newElement);
    //                 }
    //             }
    //         }
    //     }

    //     setTimeout(() => this.mergeColliding(), 100);
    // }

    eventSnowFall() {
        if (this.parts.length < 5000) {
            let intensity = (this.valueButtons.snowIntensity + 1);

            for (let x = 0; x < this.cw / 10; x++) {
                if (intensity / 2 >= Math.random()) {
                    let rand = Math.random();
                    const particle = Matter.Bodies.circle(x * 10, (-100 + (rand * 50)), (rand + 0.5) * this.sr, {
                        render: {
                            fillStyle: this.snowColor,
                        }
                    });

                    particle.isParticle = true;
                    particle.collisionFilter = { group: 1 };
                    this.showParts(particle);
                }
            }
        }
        
        setTimeout(() => this.eventSnowFall(), 100);
    }

    eventHandleSnowfall() {
        for (let part of this.parts) {
            if (part.isParticle) {
                // calculate current wind speed
                let wind = this.valueButtons.windDirection / 10;
                // calculate a random value for future uses
                let randomAdd = ((Math.random() - 0.5) * 500);
                // if particle is below the map, remove it
                if (part.position.y > this.ch - this.snowLevel) {
                    this.removeParts(part);
                    this.snowLevel += 0.001;
                }
                else {
                    // if particle gets on the left or right side of canvas, move it to the other side
                    if (part.position.x < 0) {
                        Matter.Body.setPosition(part, {
                            x: this.cw + (randomAdd * wind),
                            y: part.position.y
                        });
                    } else if (part.position.x > this.cw) {
                        Matter.Body.setPosition(part, {
                            x: 0 - (randomAdd * wind),
                            y: part.position.y
                        });
                    }
                }
                // add random x movement to particles and set its y speed according to snow intensity
                this.setGravity(part, wind + (randomAdd / 10000), (this.valueButtons.snowIntensity + 5) / 50, true);
            }
        }

        setTimeout(() => this.eventHandleSnowfall(), 100);
    }

    eventHandleSnowLevel() {
        Matter.Body.setPosition(this.snow, { x: this.cw / 2, y: (this.ch * 1.5) - this.snowLevel });
        setTimeout(() => this.eventHandleSnowLevel(), 1000);
    }

    bindEvents() {
        // this.eventDetectMousePress();
        this.eventSaveMousePosition();

        this.eventSnowFall();
        this.eventHandleSnowfall();
        this.eventHandleSnowLevel();
    }
}