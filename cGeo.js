
class cShape {
    constructor(x, y, pts) {
        this.vert = [];
        this.sides = [];

        this.vel = createVector(0, 0);

        this.xPos = 0;
        this.yPos = 0;

        this.max = 0;
        this.recalculate();




        for (let i = 0; i < pts.length; i += 2) {
            this.vert.push(new cPoint(pts[i], pts[i + 1]));
            let d = dist(this.xPos, this.yPos, pts[i], pts[i + 1]);
            if (d > this.max) this.max = d;
        }
        this.recalculate();

        if (pts.length % 2 != 0) print("Odd number of vertexes, failure likely");
    }

    display() {
        point(this.xPos, this.yPos); // show center
        circle(this.xPos, this.yPos, 2 * this.max); // show C-range

        this.move();

        for (let i = 0; i < this.sides.length; i++)
            this.sides[i].display();


    } // draws the shape

    move() {
        for (let i = 0; i < this.vert.length; i++) { this.vert[i].add(this.vel); }

        this.recalculate();
    }

    recalculate() {
        //mathmatical center
        let xSum = 0;
        let ySum = 0;

        for (let i = 0; i < this.vert.length; i++) {
            xSum += this.vert[i].x;
            ySum += this.vert[i].y;

        }
        this.xPos = xSum / this.vert.length;
        this.yPos = ySum / this.vert.length;

        this.sides = [];

        for (let i = 0; i < this.vert.length; i++) {
            this.sides.push(
                new cLine(
                    this.vert[i],
                    this.vert[(i + 1) % this.vert.length]
                )
            );

        }
    }


    checkP(p) {

        //  if (dist(p.x, p.y, this.xPos, this.yPos) <= this.max) {
        let count = 0;
        for (let i = 0; i < this.sides.length; i++) {
            if (this.sides[i].reachTest(p)) count++;
        }
        if (count % 2 == 1) return true;
        // } else
        return false;
    } // check if a given point is inside the bounds of this shape. return bool
    checkS(s) {
        if (dist(s.xPos, s.yPos, this.xPos, this.yPos) <= this.max + s.max) {
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
       let index = 0
        let min = this.sides[0].PLD(p, true);
        this.sides.forEach(side => {
            if(p.dist(side.PLD(p,true)) < min )
            min = side;
            
        });
        return min;
    }

    getReturnTo(p) {
        let POC = this.getClosestSide(p).PLI(p); // point of collision
        let POR = createVector(POC.x - this.xPos, POC.y - this.yPos); //point of return
        let dupe = POR;
        dupe.normalize().mult(.1);
        POR.add(dupe);

        return (new cPoint(POC.x + POR.x, POC.y + POR.y))

    } //boots out ,1 px along a line intersecting with the center


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

    // slide(p, orig, by) {

    //     let delta = createVector(orig.x - p.x, orig.y - p.y).normalize().add(by);
    //     line(delta.x + orig.x, delta.y + orig.y, orig.x, orig.y);
    //     orig.x = delta.x + orig.x;
    //     orig.y = delta.y + orig.y;

    // }

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



    PLI(p) {
        let out = this.slope * (p.x - this.p1.x) + this.p1.y;
        if (out == Infinity || out == -Infinity)
            return new cPoint(this.p1.x, p.y);
        return new cPoint(p.x, out);
    }//finds vertical line intersect


    //IMPORTANT SHIT HERE 
    PLD(p, qdistance) {

        let out;
        if (this.p1.x == this.p2.x) return (new cPoint(this.p1.x, p.y))
        if (this.p1.y == this.p2.y) return (new cPoint(p.x, this.p1.y))
        this.slope = (this.p1.y - this.p2.y) / (this.p1.x - this.p2.x); // resets slope just in case. can be omitted if trimming
        let invs = -1 / this.slope;
        let x = (this.slope * this.p1.x - invs * p.x + p.y - this.p1.y) / (this.slope - invs);
        let y = invs * (x - p.x) + p.y
        out = new cPoint(x, y);

        //ensures it is in bounds

        let xbound = !(x > this.p1.x && x <= this.p2.x) || (x <= this.p1.x && x > this.p2.x);
        let ybound = !(y > this.p1.y && y <= this.p2.y) || (y <= this.p1.y && y > this.p2.y);
        if (xbound || ybound)
            if (p.dist(this.p1) > p.dist(this.p2))
                out = this.p2;
            else
                out = this.p1

        strokeWeight(1)
        
        line(p.x, p.y, out.x, out.y);

        if (qdistance != null) {
            return p.dist(out)
        }
        return out;
    } // THIS IS NOT THE BROKEN BIT
    debugPLD(p)
    {   
        let pld = this.PLD(p)
        strokeWeight(1)
        line(p.x,p.y, pld.x, pld.y)
        strokeWeight(5)
    }
} // accepts two cPoint objects, from and to
