
let game;

let deltaT; // time since last frame. Usefull for consistency 
let lastT;

let LoadedLevels = [];
let mouse;

let started = false
let state = 0;

let pixelated;
let padding = 30;

let StageNames = ["liminal", "Welcome", "Spelunking", "Leap", "precision", "Interfereance","you are not alone." ]

function preload() {
    pixelated = loadFont('Fonts/slkscr.ttf');
    for (let index = 0; index <= 2; index++) {
        LoadedLevels.push(loadJSON('Levels/' + index + '.json',));
    }

}

function setup() {
    frameRate(60)
    createCanvas(1200, 850);
    background(60)
    for (let index = 0; index < LoadedLevels.length; index++) {
        const element = LoadedLevels[index];
        LoadedLevels[index] = new LEVEL(LoadedLevels[index]);
    }

    textFont(pixelated)
}

function draw() {

    mouse = new cPoint(mouseX, mouseY)
    // console.log("Frame Rate = "+frameRate())
    deltaT = millis() - lastT;
    lastT = millis();
    deltaT /= 1000;

    background(60, 15);
    cFormat(0)
    push()
    shapeEditor();
    pop()
    gameHandler();

    SFX();

    cFormat(3)
    text("flying blind V1.0 ... 'Y' to start.", padding, padding - 5)
    if(started)
    text("stage:  "+ StageNames[game.levelnum],2* width/3,padding-5)

}

function gameHandler() {

    if (started)
        game.update();



}


function startGame() {
    game = new Game(true, 1);
    started = true;
}

function cFormat(c) {
    if (c == 0) {
        stroke(255);
        strokeWeight(4);
        noFill();
    }
    if (c == 1) {
        stroke(0, 255, 0);
        strokeWeight(1);
        noFill();
    }
    if (c == 3) {
        stroke(255);
        strokeWeight(1);
        fill(255);
        textSize(30);
        textFont(pixelated);
    }

}
function SFX() { 
    function cFilter() {
        border();
        push()
        noStroke();
        fill(0, 200, 0, 0); // tint
        rect(0, 0, width, height)

        pop();
        stroke(60, 15)
        strokeWeight(2);
        let iter = 6
        for (let i = 0; i < height; i += iter)
            line(0, i, width, i);
        for (let i = 0; i < width; i += iter)
            line(i, 0, i, height);

    }
    function border() {
        cFormat(0);
        fill(60);
        noStroke();

        rect(0, 0, padding, height)
        rect(0, 0, width, padding)
        rect(width, height, - width, -padding)
        rect(width, height, -padding, -height)
        // to erase stray lines

        noFill();
        stroke(255)
        push();
        translate(padding, padding)
        rect(0, 0, width - padding * 2, height - padding * 2)
        //draws border
        pop();
    }
    cFilter();
}














let levelData = {};
levelData.Terrain = [];
levelData.WinZones = [];
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
        levelData.PlayerSpawns[i].display();
    }
    for (let i = 0; i < levelData.WinZones.length; i += 1) {
        stroke(50, 255, 50)
        levelData.WinZones[i].display();
    }
    strokeWeight(1);
    line(mouseX, mouseY, snap * Math.floor(mouseX / snap), snap * Math.floor(mouseY / snap))

}
function keyPressed() {
    if (true) {
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

        if (key == "e" && editorVertexes.length > 2) {
            levelData.WinZones.push(new cShape(0, 0, editorVertexes));
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
     
    }
  
        if (key == "y" && !started) {
            startGame();
        }

    
}