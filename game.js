class Game {
    constructor(state, StartLevel) {

        this.Level = LoadedLevels[StartLevel];
        this.Player = new Boat(new cPoint(this.Level.PlayerSpawns[0].x, this.Level.PlayerSpawns[0].y), true);
        this.Enemies = [];
        this.Torpedoes = [];
        this.BRG = [];
        this.padding = 30;

        this.sonarRange = 200;
        {
        this.monitor = new cShape(0, 0, [this.padding, height - this.padding,
        this.padding, height - this.padding - this.sonarRange,
        this.padding + 360, height - this.padding - this.sonarRange,
        this.padding + 360, height - this.padding]);
        }
    }

    update() {
        // this.Level.debug();

        this.Player.update();
        this.Player.display();
        
        if (!noclip){
            this.Player.checkCollide(this.Level.Terrain);
            // console.log(this.offmonitor(mouse))
            this.Player.pos = this.offmonitor(this.Player.pos)
        }
        this.contactGraph();


        this.Enemies.forEach(element => {
            element.display();
            element.update();
        });

        this.border();
    }

    contactGraph() {
        this.Player.sweeperAngle += 1;
        this.Player.sweeperAngle = this.Player.sweeperAngle % 360;
        let ang = this.Player.sweeperAngle;


        this.BRG[ang] = this.raycast(this.Player.pos, radians(ang), this.sonarRange)

        push();//1
        {
            translate(this.padding, height - this.padding);
            fill(60)
            rect(0,0,360,-this.sonarRange)
            let shift = mouseX;
            for (let index = shift; index < this.BRG.length; index++) {
                const element = this.BRG[index];
                // if(index%30 == 0 )
                // text(index, this.sonarRange, index);
                point(index, -element)
            }
            let adj = degrees(this.Player.heading) % 360
            if (adj < 0)
                adj = 360 + adj;
            push();//2
            {
                cFormat(1)
                stroke(255);
                line(ang % 360, 0, ang % 360, -this.sonarRange)//sweep
                stroke(0, 255, 0)
                line(adj, 0, adj, -this.sonarRange)//0deg
                stroke(255, 0, 0)
                line((adj + 180) % 360, 0, (adj + 180) % 360, -this.sonarRange)//180
                cFormat(0)
                rect(0, 0, 360, -this.sonarRange)//border
            }
            pop();//2
        }
        pop();//1
    }

    setLevel(i) {
        this.Level = LoadedLevels[i];
        this.resetSubs();
    }
    resetPlayer() {
        this.Player.pos = new cPoint(this.Level.PlayerSpawns[i].x, this.Level.PlayerSpawns[i].y);
    }
    addSub(pos, iscont) {
        this.Enemies.push(new Boat(pos, iscont, this.Level))
    }

    raycast(origin, angle, range) {

        let vec = p5.Vector.fromAngle(angle, range)
        if (!lidar)
            line(origin.x, origin.y, vec.x + origin.x, vec.y + origin.y)
        let inc = 1;

        for (let i = .5; i < range; i += inc) {
            vec.setMag(i);
            let active = new cPoint(origin.x + vec.x, origin.y + vec.y)
            if (lidar)
                point(active.x, active.y) // debug point

            if (this.checkPT(active) || this.Player.onScreen(this.padding, active))
                return (this.Player.pos.distanceTo(active));


            this.Enemies.forEach(boat => {
                if (boat.pos.distanceTo(active) < boat.sonarCoef)
                    return [acitive.distanceTo(origin), 1]
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

    border() {
        cFormat(0);
        fill(60);
        noStroke();

        rect(0, 0, this.padding, height)
        rect(0, 0, width, this.padding)
        rect(width, height, - width, -this.padding)
        rect(width, height, -this.padding, -height)
        noFill();
        stroke(255)
        push();
        translate(this.padding, this.padding)
        rect(0, 0, width - this.padding * 2, height - this.padding * 2)
        pop();
    }

   
    offmonitor(p) {
       if(this.monitor.checkP(p))
       return(this.monitor.getReturnTo(p));

       return p;
    }
}
//cheats to make me not go insane
let noclip = false;
let lidar = true;
let swiftness = 0;
let ice = 1; 
