class Game {
    constructor(state, StartLevel) {
  
        this.Level= {}
        this.loadLevel(StartLevel);
        
    console.log((this.Level["Terrain"]))
  
    
    

        
        // if (this.Level.PlayerSpawns != null) {
        //     this.thisSub = new Boat(this.Level.PlayerSpawns[0]);
        //     this.thisSub.controlled = true;

        //     this.otherSubs = [new Boat(this.Level.PlayerSpawns[0]), new Boat(this.Level.PlayerSpawns[0])];
        //     for (let i = 0; i < this.otherSubs.length; i++) {
        //         this.otherSubs[i].controlled = false;
        //     }
        // }
    }


    update() {
        if (this.thisSub!=null) {
            this.thisSub.update();
            this.thisSub.display();
            this.thisSub.checkCollide(this.Level.Terrain);
        }

       // this.debug()
    }
    debug() {
        let debugterrain = true;
        let debugsubs = false;

        if (debugterrain)
            for (let i = 0; i < this.Level.terrain.length; i++) {
                this.Level.terrain[i].display();
            }
        if (debugsubs)
            for (let i = 0; i < this.otherSubs.length; i++) {
                this.otherSubs[i].display();
            }

    }

    // JSON handler 
    loadLevel(num) {
        let name = 'Levels/' + num + '.json';
  
        this.Level = loadJSON(name)

   
    }
    
    // JSON handler 


    addSub(x, y, heading) {
        this.otherSubs.push(new Boat(x, y));
        this.otherSubs[this.otherSubs.length].heading = heading;
    }



}
// sweeper or ping?
// sweeper would be a swinging arm that hasm  a tone based on how far it gets 