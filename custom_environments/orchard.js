//see space: https://cospac.es/6g5Z
//FREEZES APP AS OF AUGUST 1, 2017

//sky
var mood = 1;
Scene.scheduleRepeating(function() {
    if (mood > 0) {
    mood -= 0.001;
    Scene.setMood(mood);
    }
}, 3);

//ground
//change color / Cube.setPaintTexture(); to add texture to shape / use image(s) instead
for (var i = -30; i < 30; i++) {
    for (var j = -30; j < 30; j++) {
        var Cube = Scene.createItem('Cuboid', i, j, 0);
        Cube.setHeight(0.1);
        Cube.setColor(0, 200, 100); //divide individual values by Math.random() to get different colors
    }
}

//trees
for (var i = -30; i < 30; i+=10) {
    for (var j = -30; j < 30; j+=10) {
        var Tree = Scene.createItem('LP_Tree3', i, j, 0);
    }
}

//insert cone and maybe change color for mountains
//insert houses for neighborhood

//hilly environment
/*
for (var i = -30; i < 30; i+=25) {
    for (var j = -30; j < 30; j+=25) {
        var Hill = Scene.createItem('LP_Stone', i, j, -2);
        Hill.setColor(0, 200, 100);
        Hill.setScale(10);
    }
}
*/

//fences
for (var i = 0; i < 11; i+=1.5) {
    var fence = Scene.createItem("LP_Fence", i, 5, 0);
    if (i > 4.5) {
        fence.setPositionAngle(5.5, i-6.5, 0, 0, 0, 5, 1.5708); //90 degrees
    }
}

for (var j = 0; j < 11; j+=1.5) {
    var fence2 = Scene.createItem("LP_Fence", 5, j, 0);
    fence2.setPositionAngle(j-6, -1.5, 0, 0, 0, 5, 3.14159); //180 degrees
    if (j < 5) {
        fence2.setPositionAngle(-1, j-0.5, 0, 0, 0, 5, 4.71239); //270 degrees
    }
}

//insert anything in place of fences (buildings, roads, brick walls, chairs, flags, images, etc.)
//enlarge/reduce/elongate/etc.:
//manipulate the numbers in the loop and/or the x and y positions of setPositionAngle()
