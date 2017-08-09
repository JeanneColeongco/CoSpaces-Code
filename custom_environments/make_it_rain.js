//see space: https://cospac.es/UX66
//FREEZES APP AS OF AUGUST 1, 2017

//ground
//change color / Cube.setPaintTexture(); to add texture to shape / use image(s) instead
for (var i = -30; i < 30; i++) {
    for (var j = -30; j < 30; j++) {
        var Cube = Scene.createItem('Cuboid', i, j, 0);
        Cube.setHeight(0.1);
        Cube.setColor(0, 200, 100); //divide individual values by Math.random() to get different colors
    }
}

function randNumBetween(min, max) {
    return Math.random() * (max - min) + min;
  }

//var cloudID = ["LP_Cloud1", "LP_Cloud2", "LP_Cloud3"];

var cloudCount = 200;

var clouds = [];

var drops = [];

function randPos() {
  var min = -100;
  var max = 100;
  return {
    x: Math.random() * (max-min) + min,
    y: Math.random() * (max-min) + min,
    z: randNumBetween(15, 100)
  }
}

for (var a = 0; a < cloudCount; a++) {
  var pos = randPos();
    var cloud = Scene.createItem("LP_Cloud2", pos.x, pos.y, pos.z);
    clouds.push(cloud);
  }

var xPositions = [];
var yPositions = [];
var zPositions = [];
function getRandPos(Min, Max) {
    var min = Min;
    var max = Max;
    return Math.random() * (max - min) + min;
}

var id = "LP_Egg";

for (var i = 0; i < 100; i++) {
    xPositions.push(getRandPos(-100,100));
    yPositions.push(getRandPos(-100,100));
    zPositions.push(getRandPos(15,100));
}

var drops = [];
for (var i = 0; i < 100; i++) {
    var drop = Scene.createItem(id, xPositions[i], yPositions[i], zPositions[i]) 
    //could make it literally rain cats and dogs by changing ID parameter
    drop.setScale(0.5);
    drop.setColor(217, 229, 240); 
    drops.push(drop);
}


Scene.scheduleRepeating(function() {
    
    drops.forEach(function(drop) {
        var pos = drop.getPosition();
        var newZ = pos.z - 5; //slow drop speed by decreasing number to 1 (snowflakes fall)
        var newX = pos.x;
        var newY = pos.y;
        if (newZ < 0) {
            newZ = 100;
            newX = getRandPos(-100,100);
            newY = getRandPos(-100,100);
        }
        
        drop.setPosition(newX, newY, newZ);
    });
    
}, 0);

var mood = 0;
Scene.scheduleRepeating(function() {
    if (mood < 1) {
        mood += 0.001;
        Scene.setMood(mood);
    }
}, 3);
