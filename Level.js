class LEVEL {

    constructor(jsonin) {
        this.root = jsonin;

        this.Terrain = [];
        this.WinZones = [];
        this.Enemies;
        this.PlayerSpawns = [];




        this.loadAll();


    }
    loadAll() {

        for (let index = 0; index < this.root.Terrain.length; index++) {
            let v = [];
            const shape = this.root.Terrain[index].vert;

            for (let j = 0; j < shape.length; j++)
                v.push(shape[j].x, shape[j].y);

            this.Terrain.push(new cShape(0, 0, v))
        }

        for (let index = 0; index < this.root.WinZones.length; index++) {
            let v = [];
            const shape = this.root.WinZones[index].vert;

            for (let j = 0; j < shape.length; j++)
                v.push(shape[j].x, shape[j].y);

            this.WinZones.push(new cShape(0, 0, v))
        }

        for (let index = 0; index < this.root.PlayerSpawns.length; index++) {
            this.PlayerSpawns.push(this.root.PlayerSpawns[0])
        }

    }
    debug() {
        for (let index = 0; index < this.Terrain.length; index++) {
            this.Terrain[index].display();
        }

        for (let index = 0; index < this.WinZones.length; index++) {
            const element = this.WinZones[index];
            element.display();

        }
    }
}