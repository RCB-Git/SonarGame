
let game;

let deltaT; // time since last frame. Usefull for consistency 
let lastT;
function setup() {
    createCanvas(850, 850);
    game = new Game(false,0);
    

}

function draw() {
    deltaT = millis() - lastT;
    lastT = millis();
    background(60);

    stroke(255);
    strokeWeight(4);
    noFill();

    game.update();
    shapeEditor()


}

let levelData = {};
levelData.Players = [];
levelData.Terrain = [];
levelData.Enemies = [];
levelData.PlayerSpawns = [];

let editorVertexes = [];
function shapeEditor() {
    for (let i = 0; i < editorVertexes.length; i += 2)
        point(editorVertexes[i], editorVertexes[i + 1]);

    for (let i = 0; i < levelData.Terrain.length; i++) {
        levelData.Terrain[i].display();
    }
    for (let i = 0; i < levelData.PlayerSpawns.length; i += 1){
        stroke(50,255,50)
        // print("@" + editorVertexes.PlayerSpawns[i].x + " " + editorVertexes.PlayerSpawns[i].y )
        levelData.PlayerSpawns[i].display();}
    
}
function keyPressed() {
    let mouse = new cPoint(mouseX,mouseY);
    if (key == " ") {
        editorVertexes.push(mouse.x);
        editorVertexes.push(mouse.y);
    }
    if (key == "q" && editorVertexes.length > 2) {
        levelData.Terrain.push(new cShape(0, 0, editorVertexes));
        editorVertexes = [];
    }
    if (key == "s") {
       levelData.PlayerSpawns.push(mouse);
       print("new playerspawn at :"+ mouse.x +" "+ mouse.y)
    }


    if (key == "o") {
        saveJSON(levelData, "1");
    }
    return false;
}
