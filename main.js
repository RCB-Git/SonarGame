
let game;

let deltaT; // time since last frame. Usefull for consistency 
let lastT;

let LoadedLevels = [];
let mouse;


function preload() {
    for (let index = 0; index <= 2; index++) {
        LoadedLevels.push(loadJSON('Levels/' + index + '.json',));
    }
   
}

function setup() {
    createCanvas(850, 850);
    background(60)
    for (let index = 0; index < LoadedLevels.length; index++) {
        const element = LoadedLevels[index];
        LoadedLevels[index] = new LEVEL(LoadedLevels[index]);
    }

    game = new Game(false, 2);
}

function draw() {
    mouse = new cPoint(mouseX, mouseY)
    // console.log("Frame Rate = "+frameRate())
    deltaT = millis() - lastT;
    lastT = millis();
    deltaT/=1000;

    background(60,15);
    
   cFormat(0)

    game.update();
    //cFilter();
    //shapeEditor();


}

function cFormat(c){
if(c == 0){
    stroke(255);
    strokeWeight(4);
    noFill();
}
if (c == 1){
        stroke(0,255,0);
    strokeWeight(1);
    noFill();
}

}
function cFilter(){
    push()
    noStroke();
    fill(0,200,0,0); // tint
    rect(0,0, width, height)
pop();
let iter = 6
for(let i = 0; i < height; i +=iter){
    push();
    strokeWeight(2);
    stroke(60,255);
    line(0,i, width, i);
    pop();
}
if(true)
    for (let i = 0; i < width; i += iter) {
        push();
        strokeWeight(.5);
        stroke(60,100);
        line(i, 0, i, height);
        pop();
    }

}

let levelData = {};
levelData.Terrain = [];
levelData.Win = [];
levelData.PlayerSpawns = [];
let snap = 15;

let editorVertexes = [];


function shapeEditor() {
    for (let i = 0; i < editorVertexes.length; i += 2)
        point(editorVertexes[i], editorVertexes[i + 1]);

    for (let i = 0; i < levelData.Terrain.length; i++) {
        levelData.Terrain[i].display();
    }
    for (let i = 0; i < levelData.PlayerSpawns.length; i += 1) {
        stroke(50, 255, 50)
        // print("@" + editorVertexes.PlayerSpawns[i].x + " " + editorVertexes.PlayerSpawns[i].y )
        levelData.PlayerSpawns[i].display();
    }
    strokeWeight(1);
    line(mouseX, mouseY, snap * Math.floor(mouseX / snap), snap * Math.floor(mouseY / snap) )

}
function keyPressed() {
    let mouse = new cPoint(mouseX, mouseY);
    push();
    
    mouse = new cPoint(snap * Math.floor(mouseX / snap), snap * Math.floor(mouseY / snap));
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
        print("new playerspawn at :" + mouse.x + " " + mouse.y)
    }


    if (key == "o") {
        saveJSON(levelData, "1");
    }
    pop();
    return false;

}
