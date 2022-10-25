class Boat {
    constructor(startpos) {

        this.pos = startpos
        this.heading = 0;
        this.v = createVector(0, 0);
        this.controlled = true;

        //movement controlls
        this.accel = .01;
        this.maxspeed = .5;
        this.friction = .98

        this.slewSpeed = .006;
        this.slewfloat = 0;
        this.slewfriction = .95;
        this.maxslew = .01;

        //actions
        this.fcooldown = 100;
        this.pcooldown = 100;

        this.pID;
    }
    update() {

        this.fcooldown += 1;
        this.fcooldown = constrain(this.fcooldown, 0, 100);

        this.pos.add(this.v)

        this.v.mult(this.friction)
        if (this.controlled)
            this.controlls();
        this.onScreen();
    }
    display() {
        push();
        let size = 14;
        translate(this.pos.x, this.pos.y)
        rotate(this.heading);
        line(0, 0, -size, size / 2);
        line(0, 0, -size, -size / 2);
        pop();
    }

    ping() {


    }
    controlls() {

        let add = createVector(0, 0);

        if (keyIsDown(87))// w
            add.add(p5.Vector.fromAngle(this.heading, this.accel))
        if (keyIsDown(83))//s
            add.add(p5.Vector.fromAngle(this.heading, -this.accel * .25))
        if (keyIsDown(65))//a
            this.slewfloat -= this.slewSpeed;
        if (keyIsDown(68))//d
            this.slewfloat += this.slewSpeed;
        if (keyIsDown(32))//spacebar
            this.ping()

        //Fix values

        this.slewfloat = constrain(this.slewfloat, -this.maxslew, this.maxslew) * this.slewfriction;
        this.heading += this.slewfloat;

        this.v.limit();
        this.v.add(add);
    }

    collectResponses(TerrainFactors, SubFactors, otherFactors) {
        let response = {};
        response.T = [];
        response.S = [];
        response.O = [];
        
        TerrainFactors.forEach(shape => {
           let side = shape.getClosestSide(this.pos);
            // let cp = side.PLD(this.pos);
            // strokeWeight(1);
            // line(this.pos.x, this.pos.y, cp.x, cp.y);
            // response.T.push(this.bearingTo(cp));
        });

        SubFactors.forEach(sub => {
            response.S.push(this.pos.dist(sub))
        });

        otherFactors.forEach(other => {

        });

    }

    bearingTo(p) {
        let vec = createVector(this.pos.x - p.x, this.pos.y - p.y)
        return vec.angleBetween(p5.Vector.fromAngle(this.heading));
    }

    //collision zone
    checkCollide(shapesIn) {
        let resetPos;
        let collided = false
        shapesIn.forEach(shape => {
            if (shape.checkP(this.pos)) {
                this.pos = shape.getReturnTo(this.pos);
                collided = true;
            }
        });
        return collided;
    }

    onScreen() {
        let padding = 5;
        if (this.pos.x > width - padding) {
            this.pos.x = width - padding - .1;
            this.v.x = 0
        }
        if (this.pos.x < 0 + padding) {
            this.pos.x = .1 + padding;
            this.v.x = 0
        }

        if (this.pos.y > height - padding) {
            this.pos.y = height - padding - .1;
            this.v.y = 0
        }
        if (this.pos.y < 0 + padding) {
            this.pos.y = .1 + padding;
            this.v.y = 0
        }
    }

}

