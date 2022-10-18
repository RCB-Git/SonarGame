class LEVEL {

    constructor(jsonin) {
        this.root = jsonin;

        this.Terrain = [];
        this.Enemies;
        this.PlayerSpawns=[];

 

        this.loadAll();

        
    }
    loadAll() {

        for (let index = 0; index < this.root.Terrain.length; index++) {
            let v = [];
            const element = this.root.Terrain[index].vert;
            for (let j = 0; j < element.length; j++)
            v.push(element[j].x, element[j].y);
            
            this.Terrain.push(new cShape(0, 0, v))
        }
        for (let index = 0; index < this.root.PlayerSpawns.length; index++) {
           this.PlayerSpawns.push(this.root.PlayerSpawns[0])
        }
    }
    debug() {
        for (let index = 0; index < this.Terrain.length; index++) {
            this.Terrain[index].display();
        }
        

    }

   

}