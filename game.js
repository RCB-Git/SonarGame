class Game {
    constructor(state, StartLevel) {
    
        this.stagenum = StartLevel;
        this.Level = LoadedLevels[StartLevel];
       this.Subs = []; 
        for(let i =0; i < this.Level.PlayerSpawns.length ; i++)
       this.addSub(new cPoint(this.Level.PlayerSpawns[i].x,this.Level.PlayerSpawns[i].y) ,true);
    }


    update() {
     this.Level.debug();
        this.Subs.forEach(element => {
         element.display();
            element.update();
            if(element.controlled){
           // element.checkCollide(this.Level.Terrain)
            element.collectResponses(this.Level.Terrain,[],[]);
            }
        });
    
    }
    setLevel(i){
        this.Level = LoadedLevels[i];
    }

    addSub(pos,iscont){
        this.Subs.push(new Boat(pos)) 
    }
    

}
