
let game;

let deltaT; // time since last frame. Usefull for consistency 
let lastT;

let LoadedLevels = [];
let mouse;

let started = false
let state = 0;

let pixelated;
let padding = 30;
let beep;

let StageNames = ["liminal", "Welcome", "Spelunking", "Breadcrumbs", "Precision", "Interfereance", "you are not alone."]
let clean = false

let score = 0;
function preload() {
    pixelated = loadFont('Fonts/slkscr.ttf');
    for (let index = 0; index <= 6; index++) { // IMPORT LEVELS FROM FOLDER CHANGE NUMBER TO INCLUDE MORE
        LoadedLevels.push(loadJSON('Levels/' + index + '.json',));
    }

}

function setup() {
    frameRate(60)
    createCanvas(1200, 850);

    // if(started)
    background(60)
    for (let index = 0; index < LoadedLevels.length; index++) {
        const element = LoadedLevels[index];
        LoadedLevels[index] = new LEVEL(LoadedLevels[index]);
    }

    textFont(pixelated)
    fill(255)
    beep = new p5.Oscillator('square');
    beep.amp(0);
    beep.freq(500);
    beep.start();
}

function draw() {

    if (clean) background(50)
    clean = false;
    mouse = new cPoint(mouseX, mouseY)
    // console.log("Frame Rate = "+frameRate())
    deltaT = millis() - lastT;
    lastT = millis();
    deltaT /= 1000;


    background(60, 15);
    cFormat(0)
    push()
    //shapeEditor();
    pop()
    gameHandler();

    SFX();

    cFormat(3)
    if (!started) {
        text("Diving blind V1.1 ... press  'Y' to start.", padding, padding - 5)
        tutorial();
        clean = true;
    }
    else
        text("Diving blind V1.1 || crash rating:" + score, padding, padding - 5)
    if (started)
        text("stage 0" + game.levelnum + ": " + StageNames[game.levelnum], width - 20 * (14 + StageNames[game.levelnum].length), padding - 5)


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
        // fill(0, 200, 0, 0); // tint
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

let prev;
function tutorial() {
    push()
    let txt = 25;
    translate(padding * 1.5, padding * 1.5)
    textSize(txt)
    function delay(delay, char) {
        let out = ""
        while (out.length < delay)
            out += char;
        return out
    }
    function ctext(str, len, special) {
        if (special == null)
            special = "."
        return (str + delay(len - str.length, special))

    }
    let welcome2 = "\n" +
        "  l" + "\n" +
        " ll" + "\n";
    let welcome = "\n" +
        "∎   ∎  ∎∎∎∎ ∎    ∎∎∎  ∎∎∎∎  ∎∎∎∎∎  ∎∎∎∎    ∎" + "\n" +
        "∎ ∎ ∎  ∎∎   ∎    ∎    ∎  ∎  ∎ ∎ ∎  ∎∎      ∎" + "\n" +
        " ∎ ∎   ∎∎∎∎ ∎∎∎  ∎∎∎  ∎∎∎∎  ∎   ∎  ∎∎∎∎    o" + "\n";
    let str =
        ctext("Bootstrap Initiated", 30) + "\n" +
        welcome + "\n" +
        ctext("Starting Tutorial sequence", 30) + "\n" +
        ctext("-enable audio- ", 30, ' ') + "\n" +
        ctext("Your objective: " + delay(5, " ") + " Locate and enter the green zone to progress", 0) + "\n\n\n" +
        ctext("Controlls:", 15, " ") + "\n" +
        ctext("*use vertical arrows to move forward and back,", 30) + "\n" +
        ctext("*use lateral arrows to rotate", 30, " ") + "\n" +
        ctext("*Use the Sonar monitor to navigate, avoid walls", 30) + "\n\n\n" +
        ctext("Press Y to begin", 30) + "\n" + delay(300, " ") + "\n\n" +
        "Autostart Initiated . . . " + delay(30, " ");

    let prt = str.substring(0, (int)(frameCount * .5));
    let edit = prt;

    while (edit.substring(edit.length - 5) == "     ");
    edit = edit.substring(0, edit.length - 1)
    
    if (frameCount % 50 > 25)

        text(edit, 0, txt)
    else
        text(edit + "|", 0, txt)

    if (prt.length >= str.length) startGame();

    if (prt.substring(prt.length - 1) != prev) {
        beep.amp(.15);
    }
    else
        beep.amp(0)

    prev = prt.substring(prt.length - 1);



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