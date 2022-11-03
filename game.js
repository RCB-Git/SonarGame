class Game {
    constructor(state, StartLevel) {

        this.Level = LoadedLevels[StartLevel];
        this.Player = new Boat(new cPoint(this.Level.PlayerSpawns[0].x, this.Level.PlayerSpawns[0].y), true);
        this.Enemies = [];
        this.Torpedoes = [];
        this.BRG = [];
        this.padding = 30;

        this.sonarRange = 200;
    }

    update() {
        this.Level.debug();


        this.Player.update();
        this.Player.display();
        this.Player.checkCollide(this.Level.Terrain);
        this.contactGraph();


        this.Enemies.forEach(element => {
            element.display();
            element.update();
        });

    }

    contactGraph() {
        //sweep
        // this.Player.sweeperAngle +=1; 
        // let ang = this.Player.sweeperAngle;

        // console.log(this.raycast(this.Player.pos, ang, this.sonarRange));


        this.Player.sweeperAngle += 1;
        this.Player.sweeperAngle = this.Player.sweeperAngle % 360;
        let ang = this.Player.sweeperAngle; 
        
        
          this.BRG[ang] = this.raycast(this.Player.pos, radians(ang), this.sonarRange)
        
        push();//1
        translate(this.padding, height - this.padding);
        for (let index = 0; index < this.BRG.length; index++) {
            const element = this.BRG[index];
            point(index, -element)
        }
        let adj = (((this.Player.heading) / (2 * PI)) * 360) % 360;
        line(adj, 0, adj, -this.sonarRange)

        push();//2
        cFormat(1)
        line(ang % 360, 0, ang % 360, -this.sonarRange)
        pop();//2
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

        let vec = p5.Vector.fromAngle(angle, 1)

        let inc = 1;

        for (let i = .5; i < range; i += inc) {
            vec.setMag(i);
            let active = new cPoint(origin.x + vec.x, origin.y + vec.y)
            point(active.x, active.y) // debug point
           
            if(this.checkPT(active) || this.Player.onScreen(this.padding, active))
            return(this.Player.pos.distanceTo(active));
            

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
            
           if(shape.checkP(p))
           return true;
        } 
        return false;
    }
}
