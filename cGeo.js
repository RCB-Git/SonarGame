
class cShape {
    constructor(x, y, pts) {

        this.vert = [];

        if (pts.length % 2 != 0) print("Odd number of vertexes, failure likely");
        for (let i = 0; i < pts.length; i += 2) {
            this.vert.push(new cPoint(pts[i], pts[i + 1]))
        }


        this.sides = [];
        this.vel = createVector(0, 0);


        this.pos = new cPoint(0, 0);

        this.max = 0;
        this.recalculate();


    }

    display() {
        // point(this.pos.x, this.pos.y); // show center
        // circle(this.pos.x, this.pos.y, this.max * 2); // show C-range


        this.move();

        for (let i = 0; i < this.sides.length; i++)
            this.sides[i].display();


    } // draws the shape

    move() {
        for (let i = 0; i < this.vert.length; i++) { this.vert[i].add(this.vel); }

        this.recalculate();
    }

    recalculate() {
        let xSum = 0;
        let ySum = 0;

        for (let i = 0; i < this.vert.length; i++) {
            xSum += this.vert[i].x;
            ySum += this.vert[i].y;

        }
        this.pos.x = xSum / this.vert.length;
        this.pos.y = ySum / this.vert.length;

        this.sides = [];

        for (let i = 0; i < this.vert.length; i++) {
            this.sides.push(
                new cLine(
                    this.vert[i],
                    this.vert[(i + 1) % this.vert.length]
                )
            );

        }
        this.max = -Infinity;
        this.vert.forEach(vertex => {
            let distance = this.pos.dist(vertex)
            if (distance > this.max)
                this.max = distance;
        });
    }


    checkP(p) {

        if (p.dist(this.pos) <= this.max) {
            let count = 0;
            for (let i = 0; i < this.sides.length; i++) {
                if (this.sides[i].reachTest(p)) count++;
            }
            if (count % 2 == 1)
                return true;
        } else
            return false;
    } // check if a given point is inside the bounds of this shape. return bool

    checkS(s) {
        if (dist(s.xPos, s.yPos, this.pos.x, this.pos.y) <= this.max + s.max) {
            for (let i = 0; i < s.vert.length; i++)
                if (this.checkP(s.vert[i])) {
                    return true;
                }
            for (let i = 0; i < this.vert.length; i++)
                if (s.checkP(this.vert[i])) {
                    return true;
                }
        }
        return false;
    } // checks to see if a shape is touching T/F

    getClosestSide(p) {
        let min = Infinity;
        let ref;
        this.sides.forEach(side => {
            let d = side.PLD(p,true);
            if (d < min) {
                min = d;
                ref = side
            }
        });
        return ref; 
    }

    getReturnTo(p) {
        let POC = this.getClosestSide(p).PLD(p); // point of collision
        let POR = createVector(POC.x -p.x, POC.y - p.y ).mult(2); //point of return
        return (new cPoint(POR.x + p.x, POR.y+p.y))
        
    } //boots out based on how far into the shape you are

} // custom Shape object, accepts control point X, Y and an even array of positions to put vertexes. Calls cPoint & cLine as auxilarry classes.



class cPoint {
    constructor(xin, yin) {
        this.x = xin;
        this.y = yin;
    }
    display() {
        point(this.x, this.y)
    }

    dist(p) {
        return dist(p.x, p.y, this.x, this.y)
    }
    cVertex() {
        vertex(this.x, this.y);
    } // Adds a vertex at "this" point
    add(vec) {
        this.x += vec.x;
        this.y += vec.y;
    }
    verif() { print("Sucess") }
} // Custom point object. Accepts an X and Y. Used with cLine and cShape

class cLine {
    constructor(f, t) {
        this.p1 = f;
        this.p2 = t;
        this.slope = (this.p1.y - this.p2.y) / (this.p1.x - this.p2.x);
    }

    display() {
        line(this.p1.x, this.p1.y, this.p2.x, this.p2.y);
        // line(mouseX,0,mouseX,this.slope * (mouseX - this.p1.x) + this.p1.y)
    } // shows the line;

    reachTest(p) {

        if (
            ((p.x > this.p1.x && p.x <= this.p2.x) ||
                (p.x <= this.p1.x && p.x > this.p2.x)) &&
            p.y <= this.slope * (p.x - this.p1.x) + this.p1.y
        ) {
            return true;
        } else return false;
    } // tests if a given point drops down and touches return true;



    // PLI(p) {
    //     let out = this.slope * (p.x - this.p1.x) + this.p1.y;
    //     if (out == Infinity || out == -Infinity)
    //         return new cPoint(this.p1.x, p.y);
    //     return new cPoint(p.x, out);
    // }//finds vertical line intersect


    //IMPORTANT SHIT HERE 
    PLD( p, qdistance) {
        
        let out = new cPoint(0,0);
        if (this.p1.x == this.p2.x) (out = new cPoint(this.p1.x, p.y))
        else 
        if (this.p1.y == this.p2.y) (out = new cPoint(p.x, this.p1.y))

        else {
            this.slope = (this.p1.y - this.p2.y) / (this.p1.x - this.p2.x); // resets slope just in case. can be omitted if trimming
            let invs = -1 / this.slope;
            let x = (this.slope * this.p1.x - invs * p.x + p.y - this.p1.y) / (this.slope - invs);
            let y = invs * (x - p.x) + p.y
            out = new cPoint(x, y);
        }

        let xbound = (out.x >= this.p1.x && out.x <= this.p2.x) || (out.x >= this.p2.x && out.x <= this.p1.x)
        let ybound = (out.y >= this.p1.y && out.y <= this.p2.y) || (out.y >= this.p2.y && out.y <= this.p1.y)

        
        if (!xbound && !ybound) {
            if (p.dist(this.p1) > p.dist(this.p2))
                out = this.p2;
            else out = this.p1;
        }

        //line(p.x, p.y, out.x, out.y)
        if (qdistance != null) {
            return p.dist(out)
        }
        return out;
    }
} // accepts two cPoint objects, from and to
