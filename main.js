
let game;

let deltaT; // time since last frame. Usefull for consistency 
let lastT;
function setup() {
    createCanvas(850, 850);
    game = new Game(false);
    game.loadlevel(1);
    
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
levelData.Props = [];

let editorVertexes = [];
function shapeEditor() {
    for (let i = 0; i < editorVertexes.length; i += 2)
        point(editorVertexes[i], editorVertexes[i + 1]);

    for (let i = 0; i < levelData.Terrain.length; i++) {
        levelData.Terrain[i].display();
    }
}
function keyPressed() {
    if (key == " ") {
        editorVertexes.push(mouseX);
        editorVertexes.push(mouseY);
    }
    if (key == "q" && editorVertexes.length > 2) {
        levelData.Terrain.push(new cShape(0, 0, editorVertexes));
        editorVertexes = [];
    }

    if (key == "s") {
        saveJSON(levelData, "1");
    }
    return false;
}
