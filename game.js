class Game {
    constructor(state, StartLevel) {

        this.Level = LoadedLevels[StartLevel];
        this.Subs = [];
        this.Torpedoes = [];

        for (let i = 0; i < this.Level.PlayerSpawns.length; i++)
        if(i == 0)
            this.addSub(new cPoint(this.Level.PlayerSpawns[i].x, this.Level.PlayerSpawns[i].y), true);
            else 
            this.addSub(new cPoint(this.Level.PlayerSpawns[i].x, this.Level.PlayerSpawns[i].y), false);

        
    }

    update() {
        this.Level.debug();

        this.Subs.forEach(element => {
            element.display();
            element.update();
            if (element.controlled) {
                element.checkCollide(this.Level.Terrain)
                element.collectResponses(this.Level.Terrain, this.Subs, this.Torpedoes);
                element.checkTorpedoes(this.Torpedoes);
            }
        });

    }

    setLevel(i) {
        this.Level = LoadedLevels[i];
        this.resetSubs();
    }
    resetSubs() {
        this.Subs.forEach(sub => {
            // sub.pos = 
            let spawn = (this.Level.PlayerSpawns[0]);
            sub.pos = new cPoint(spawn.x, spawn.y)
        });
    }
    addSub(pos, iscont) {
        this.Subs.push(new Boat(pos, iscont, this.Level))
    }


}
