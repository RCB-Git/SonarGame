
class Boat {
    constructor(sx, sy) {
        this.x = sx;
        this.y = sy;
        this.cPos = new cPoint(this.x, this.y);
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
    }
    update() {
        this.fcooldown++;
        this.fcooldown = constrain(this.fcooldown, 0, 100);
        this.cPos = new cPoint(this.x, this.y);

        this.x += this.v.x;
        this.y += this.v.y;

        this.pos = new cPoint(this.x, this.y);
        this.v.mult(this.friction)
        if (this.controlled)
            this.controlls();

    }
    display() {
        
        push();
        let size = 14;
        translate(this.x, this.y)
        rotate(this.heading);
        line(0, 0, -size, size / 2);
        line(0, 0, -size, -size / 2);
        if (false) {
            stroke(255, 0, 0)
            point(0, -size / 2);
            stroke(0, 255, 0)
            point(0, size / 2);
        }
        pop();
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

    checkCollide(shapeIn) {
        let resetPos;
      
        if (shapeIn.checkP(this.cPos)) {
           
            resetPos = shapeIn.getReturnTo(this.cPos); 
            this.x = resetPos.x;
            this.y = resetPos.y;
            return true;
        }
        return false
    }
    ping() {
        if (this.fcooldown == 100) {
            this.fcooldown = 0;
            let ping = new Sound(this.pos, 100, 'SonarOut.ogg')
            ping.soundOff()
        }
    }
}


