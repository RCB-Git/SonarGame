class Game {
    constructor(state) {

        this.activeLevel;
        this.thisSub = new Boat(100, 100);
        this.thisSub.controlled = true;
        this.otherSubs = new Boat(100,100);
        this.terrain;
    }

 
    update() {
        this.thisSub.update();
        this.thisSub.display();
        this.thisSub.checkCollide(levelData.Terrain);

      
    }

    loadLevel(num) {
        this.activeLevel = fetch("Levels/" +num + ".json");
        print(this.activeLevel);
    }

    
    
 }
// sweeper or ping?
// sweeper would be a swinging arm that hasm  a tone based on how far it gets 