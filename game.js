class Game {
    constructor(state, StartLevel) {
    
        this.stagenum = StartLevel;
        this.Level = LoadedLevels[StartLevel];

       // this.mySub = new Boat(this.Level.PlayerSpawns); 
        this.otherSubs = [];

    }


    update() {
        this.Level.debug();

    }
    setLevel(i){
        this.Level = LoadedLevels[i];
    }


    

}
// sweeper or ping?
// sweeper would be a swinging arm that hasm  a tone based on how far it gets 