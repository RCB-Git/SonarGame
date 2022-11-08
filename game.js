class Game {
    constructor(state, StartLevel) {

        this.Level = LoadedLevels[StartLevel];
        this.levelnum = StartLevel;
        this.Player = new Boat(new cPoint(this.Level.PlayerSpawns[0].x, this.Level.PlayerSpawns[0].y), true);
        this.Enemies = [];
        this.Torpedoes = [];
        this.BRG = [];
        this.padding = 30;

        this.sonarRange = 150;
        {
            this.monitor = new cShape(0, 0, [
                this.padding, height - this.padding,
                this.padding, height - this.padding - this.sonarRange * 2,
                this.padding + this.sonarRange * 2, height - this.padding - this.sonarRange * 2,
                this.padding + this.sonarRange * 2, height - this.padding]);
        }
        
        this.cPitch = 0;
        this.maxPitch = 800; 
        this.minPitch = 0; 
    }

    update() {
        
        // this.Level.debug();

        fill(60, 1);
        stroke(52, 107, 49);
        this.monitor.display();

        this.Player.update();
        this.Player.display();
        if (this.checkWin(this.Player.pos))
            this.progress();

        if (!noclip) {
            this.Player.checkCollide(this.Level.Terrain);
        }
        this.contactGraph();

        this.Enemies.forEach(element => {
            element.display();
            element.update();
        });

        this.border();
    }

    contactGraph() {
        let inc = 4
        for (let index = 0; index < inc; index++) {
            this.Player.sweeperAngle += 1;
            this.Player.sweeperAngle = this.Player.sweeperAngle % 360;
            let ang = this.Player.sweeperAngle;
            this.BRG[ang] = this.raycast(this.Player.pos, radians(ang), this.sonarRange);
            if(this.BRG[ang] != null){
            tone.freq(( this.BRG[ang][0]/this.sonarRange)*this.maxPitch);
            }
            else
            {
            tone.freq(this.minPitch)
            }
        }
        //every frame raycast in degree increments

        push();//1
        {
            translate(this.padding, height - this.padding);
            fill(60);
            let adj = degrees(this.Player.heading) % 360;
            if (adj < 0)
                adj = 360 + adj;

            let anglevec = new p5.Vector();
            //UI graphics

            {
                push();//2

                this.Player.pos = this.offmonitor(this.Player.pos)
                cFormat(0);


                for (let i = 0; i < inc; i++) {
                    anglevec = p5.Vector.fromAngle(radians(this.Player.sweeperAngle - i)).setMag(this.sonarRange);
                    line(this.sonarRange, -this.sonarRange, this.sonarRange + anglevec.x, - this.sonarRange + anglevec.y);
                }//display line

                //heading
                stroke(0, 255, 0)
                anglevec = p5.Vector.fromAngle(this.Player.heading).setMag(25);
                line(this.sonarRange, -this.sonarRange, this.sonarRange + anglevec.x, - this.sonarRange + anglevec.y)

                //sweeper range table
                cFormat(1)
                stroke(255, 50)
                circle(this.sonarRange, - this.sonarRange, 100)
                circle(this.sonarRange, - this.sonarRange, 200)
                circle(this.sonarRange, - this.sonarRange, 300)


            }
            pop();// UI Graphics



            for (let index = 0; index < this.BRG.length; index++) {
                if (this.BRG[index] != null) {
                    const element = this.BRG[index];
                    let noise = random(-1, 1)
                    anglevec = p5.Vector.fromAngle(radians(index), element[0] + noise)

                    if (element[1] == 0)
                        stroke(255, 255, 255)
                    if (element[1] == 1)
                        stroke(255, 0, 0)
                    if (element[1] == 2)
                        stroke(0, 255, 0)
                    
                    point(anglevec.x + this.sonarRange, anglevec.y - this.sonarRange) //turn this off for sound only navigation
                }


            }


        }
        pop();//1
    }

    setLevel(i) {
        this.Level = LoadedLevels[i];
        this.levelnum = i;
        this.resetSubs();
        this.cleanCanvas();
    }

    resetPlayer() {
        this.BRG = [];
        this.Player.v.mult(0);
        this.Player.pos = new cPoint(this.Level.PlayerSpawns[i].x, this.Level.PlayerSpawns[i].y);
    }

    addSub(pos, iscont) {
        this.Enemies.push(new Boat(pos, iscont, this.Level))
    }

    raycast(origin, angle, range) {

        let vec = p5.Vector.fromAngle(angle, range)


        let inc = 1;
        this.monitor.display();
        for (let i = .5; i < range; i += inc) {
            vec.setMag(i);
            let active = new cPoint(origin.x + vec.x, origin.y + vec.y)
            if (lidar)
                point(active.x, active.y) // debug point
            if (this.monitor.checkP(active))
                line(active.x, active.y,)

            if (this.checkPT(active) || this.Player.onScreen(this.padding, active) || this.monitor.checkP(active))
                return [(this.Player.pos.distanceTo(active)), 0];
            if (this.checkWin(active))
                return [(this.Player.pos.distanceTo(active)), 2];

            for (let index = 0; index < this.Enemies.length; index++) {
                const boat = this.Enemies[index];
                if (boat.pos.distanceTo(active) < boat.sonarCoef) {
                    return [active.distanceTo(origin), 1];
                }
            }
            this.Enemies.forEach(boat => {

            });


        }

    }

    resetSubs() {
        this.Player.pos = new cPoint(this.Level.PlayerSpawns[0].x, this.Level.PlayerSpawns[0].y);
    }

    checkPT(p) {

        for (let index = 0; index < this.Level.Terrain.length; index++) {
            const shape = this.Level.Terrain[index];

            if (shape.checkP(p))
                return true;
        }
        return false;
    }

    checkWin(p) {
        for (let index = 0; index < this.Level.WinZones.length; index++) {
            const shape = this.Level.WinZones[index];

            if (shape.checkP(p))
                return true;
        }
        return false;
    }

    progress() {
        console.log("You Win!!")
        this.setLevel(this.levelnum + 1);
    }

    border() {
        cFormat(0);
        fill(60);
        noStroke();

        rect(0, 0, this.padding, height)
        rect(0, 0, width, this.padding)
        rect(width, height, - width, -this.padding)
        rect(width, height, -this.padding, -height)
        // to erase stray lines

        noFill();
        stroke(255)
        stroke(52, 107, 49);
        push();
        translate(this.padding, this.padding)
        rect(0, 0, width - this.padding * 2, height - this.padding * 2)
        //draws border
        pop();
    }
    offmonitor(p) {
        if (this.monitor.checkP(p))
            return (this.monitor.getReturnTo(p));
        return p;
    }
    cleanCanvas() {
        background(60);
    }
}
//cheats to make me not go insane
let noclip = false;
let lidar = false;
let swiftness = 0;
let ice = 1; 
