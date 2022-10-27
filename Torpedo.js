class Torpedo {
    constructor(spos, heading, v) {
        this.heading = heading;
        this.pos = spos;
        this.v = p5.Vector.fromAngle(heading).mult(v);
        this.kz = 50;
        this.fuze = 60;
    }
    update() {
        this.pos.add(v)

        point(this.pos.x, this.pos.y)

        
    }

}