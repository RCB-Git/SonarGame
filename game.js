class Game {
    constructor(state) {

    
        this.Terrain = [];
        this.Props = []

        this.thisSub = new Boat(100, 100);
        this.thisSub.controlled = true;

        this.otherSubs = [new Boat(200,200), new Boat(300,300)];
        for (let i = 0; i < this.otherSubs.length; i++) {
            this.otherSubs[i].controlled = false;
        }
    }

 
    update() {
       // print(this.level)
        // this.thisSub.update();
        // this.thisSub.display();
        // this.thisSub.checkCollide(this.level.Terrain);

       this.debug()
    }
    debug(){
        for (let i = 0; i < this.Terrain.length; i++) {
            this.level.Terrain[i].display();
        }
        for (let i = 0; i < this.otherSubs.length; i++) {
            this.otherSubs[i].display();
        }

    }
    loadlevel(num) {
        let name = "levels/" + num + ".json"
        let data;
        fetch(name)
            .then((response) => response.json())
            .then((json) => print(json.Terrain));

            print(data);
    }


    addSub(x,y,heading){
        this.otherSubs.push(new Boat(x,y));
        this.otherSubs[this.otherSubs.length].heading = heading; 
    }

    
    
 }
// sweeper or ping?
// sweeper would be a swinging arm that hasm  a tone based on how far it gets 