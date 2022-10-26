class Boat {
    constructor(startpos, controlled, startLevel) {

        this.Level = startLevel

        this.health = 3;
        this.pos = startpos
        this.heading = 0;
        this.v = createVector(0, 0);
        if(controlled != null)
        this.controlled = controlled;
        

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
        
        this.pID;
    }

    update() {

        this.fcooldown += 1;
        this.fcooldown = constrain(this.fcooldown, 0, 100);

        this.pos.add(this.v)
        this.v.mult(this.friction)

        if (this.controlled)
            this.controlls();
        this.onScreen(30);

        print(this.bearingTo(new cPoint(mouseX,mouseY)));
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

    fire() {

    }
    ping() {

    }

    collectResponses(TerrainFactors, SubFactors, otherFactors) {
        let response = {};
        response.T = [];
        response.S = [];
        response.O = [];
        circle(this.pos.x, this.pos.y, 400)
        TerrainFactors.forEach(shape => {
            strokeWeight(1);
            let side = shape.getClosestSide(this.pos);
            let cp = side.PLD(this.pos);
            line(this.pos.x,this.pos.y, cp.x, cp.y)

            response.T.push(this.bearingTo(cp));
        });

        SubFactors.forEach(sub => {
            response.S.push(this.bearingTo(sub))
        });

        otherFactors.forEach(other => {
            response.O.push(this.bearingTo(other.pos));
        });
    }

    controlls() {
        let acceladj = this.accel *deltaT; 
        let slewadg = this.slewSpeed *deltaT; 
        let add = createVector(0, 0);

        if (keyIsDown(87))// w
            add.add(p5.Vector.fromAngle(this.heading, acceladj))
        if (keyIsDown(83))//s
            add.add(p5.Vector.fromAngle(this.heading, -acceladj * .25))
        if (keyIsDown(65))//a
            this.slewfloat -= slewadj;
        if (keyIsDown(68))//d
            this.slewfloat += slewadj;
        if (keyIsDown(32))//spacebar
            this.ping()
        if (keyIsDown(70))//spacebar
            this.fire()
        if (this.v.mag() < .001)
            this.v.mult(0)
        //Fix values

        this.slewfloat = constrain(this.slewfloat, -this.maxslew, this.maxslew) * this.slewfriction;
        this.heading += this.slewfloat;

        // this.v.limit();
        this.v.add(add);

    }

    

    bearingTo(p) {
        let mh = p5.Vector.fromAngle(this.heading).mult(100)
        let th = createVector(p.x - this.pos.x, p.y - this.pos.y)
        let ang = mh.angleBetween(th);
        return ang;
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
    checkTorpedoes(torpedoesIn) {
        torpedoesIn.forEach(torpedo => {
            if (this.pos.dist(torpedo.pos) <= torpedo.kz && torpedo.armed)
                health--;
        });
    }

    onScreen(padding) {
        line(padding, padding, padding, height - padding);
        line(padding, height - padding, width - padding, height - padding)
        line(width - padding, height - padding, width - padding, padding)
        line(width - padding, padding, padding, padding)
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

