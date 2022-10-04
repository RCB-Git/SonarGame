const firebaseConfig = {
    apiKey: "AIzaSyDrX8mbRID7cW94h-4fJud2AT8tAEa3SgY",
    authDomain: "basejson-e3d09.firebaseapp.com",
    databaseURL: "https://basejson-e3d09-default-rtdb.firebaseio.com",
    projectId: "basejson-e3d09",
    storageBucket: "basejson-e3d09.appspot.com",
    messagingSenderId: "312881790697",
    appId: "1:312881790697:web:765f9624b524f59006fa78",
    measurementId: "G-24W046N5TX",
};

// let tGame;
var tboat;

function setup() {
    createCanvas(1000, 950);
// let tGame = new game();
 tboat = new Boat(100,100);
}

function draw() {
    background(60);
    stroke(255);
    strokeWeight(4);
    noFill();

this.tboat.update();
this.tboat.display();


}

function clamp(value, clamp){
    value = Math.min(Math.max(value, -clamp), clamp)
    if (value < .001 && value > -.001)
    value =0;
    return value;
    }
    
let levelData = {};
levelData.Players = [];
levelData.Terrain = [];
levelData.Enemies = [];
levelData.Props = [];



// let editorVertexes = [];
// function shapeEditor() {
//     for (let i = 0; i < editorVertexes.length; i += 2)
//         point(editorVertexes[i], editorVertexes[i + 1]);

//     for (let i = 0; i < levelData.Terrain.length; i++)
//         levelData.Terrain[i].display();
// }
// function keyPressed() {
//     if (key == " ") {
//         editorVertexes.push(mouseX);
//         editorVertexes.push(mouseY);
//     }
//     if (key == "q" && editorVertexes.length > 2) {
//         levelData.Terrain.push(new cShape(0, 0, editorVertexes));
//         editorVertexes = [];
//     }
//     if (key == "d") {
//         levelData.Terrain.splice(null, levelData.Terrain.length); //delete most recent shape??
//         editorVertexes = [];
//     }
//     if (key == "s") {
//         saveJSON(levelData, "levelData");
//     }
//     return false;
// }
