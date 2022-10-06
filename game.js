class Game {
    constructor(state) {

        this.activeLevel;
        this.thisSub = new Boat(100, 100);
        this.thisSub.controlled = true;
        this.otherSubs;
        this.terrain;
    }

 
    update() {
        this.thisSub.update();
        this.thisSub.display();
        this.thisSub.checkCollide(); 
        this.otherSubs.forEach(update());
    }

    loadLevel(num) {
        this.activeLevel = fetch("Levels/" +num + ".json");
        print(this.activeLevel);
    }
    
 }
// sweeper or ping?
// sweeper would be a swinging arm that has a tone based on how far it gets 