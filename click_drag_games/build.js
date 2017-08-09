//see space: https://cospac.es/Iv0o

//just use your own item ids to customize your own game (e.g. spheres instead of cubes)
//possible extensions: rules for the game, win and lose states, scorekeeper, timekeeper, game instructions
//e.g. for each tower of 5 blocks, you get 1 point
//e.g. block tower tetris wherein colors matter (or don't matter)

//IMPORTANT NOTE: make sure your camera is set to Fly rather than Walk (default), otherwise you'll have trouble stacking more than 2 blocks
//Double click camera item > click second icon > select Fly

/*
*
* HUD - Heads-Up Display - doesn't work because pointer is always at centre of scene
*
*/

/*
var camera = Scene.getCamera();
var camPos = camera.getPosition(); 
var camDir = camera.getDirection(); 

//Enter ItemID or custom name here
//make sure to create in-scene attach all items you want to be following the camera view to the pivot object
//which can be any object placed just below the camera
//full explanation here: https://groups.google.com/forum/?utm_medium=email&utm_source=footer#!searchin/cospaces-scripting/HUD%7Csort:relevance/cospaces-scripting/-fxLVUhHsZs/1_IhIR6zBgAJ
var pivot = Scene.getItem("HUD-Pivot");

function updateHud(offsetX, offsetY, offsetZ){
    //Quaternion Magic
    //values that set the HUD a certain distance away from the camera and in a particular orientation
    var d = {x: 1, y: 0, z: 0};
    var angle = Math.PI * 0.5;
    var sinA = Math.sin(angle * 0.5);
    var cosA = Math.cos(angle * 0.5);
    pivot.setRelativeToCamera(offsetX,offsetY,offsetZ,d.x * sinA,d.y * sinA,d.z * sinA,cosA);
}

//repeatedly updates HUD position many times a second for smooth display
Scene.scheduleRepeating(function(){
    updateHud(0,0,3);
},0);

//Turn pivot object invisible so it does not block clicks
pivot.setOpacity(0);
*/

//color select, not working out right now...
/*
var r;
var g;
var b;

Scene.scheduleRepeating(function() {
    var red = Scene.getItem("red");
red.setColor(255, 0, 0);
red.onActivate(function() {
    var r = 255;
    var g = 0;
    var b = 0;
});

var green = Scene.getItem("green");
green.setColor(0, 255, 0);
green.onActivate(function() {
    var r = 0;
    var g = 255;
    var b = 0;
});

var blue = Scene.getItem("blue");
blue.setColor(0, 0, 255);
blue.onActivate(function() {
    var r = 0;
    var g = 0;
    var b = 255;
});

var random = Scene.getItem("random");
random.setColor(150, 150, 150);
random.onActivate(function() {
    var r = randNumBetween(0, 255);
    var g = randNumBetween(0, 255);
    var b = randNumBetween(0, 255);
});

}, 0);
*/


function delay() { //wrapping everything in a function for later use

    /*
    *
    * creating items
    *
    */

    //helper function to generate a random number between a minimum and maximum
    function randNumBetween(min, max) {
        return Math.random() * (max - min) + min;
    }

    //if called on, creates a cube at a random position between -20 and 20 on the x and y axis
    function makeCube() {
        var cube = Scene.createItem("Cuboid", randNumBetween(-20, 20), randNumBetween(-20, 20), 0);
        cube.setColor(randNumBetween(0, 255), randNumBetween(0, 255), randNumBetween(0, 255));

        //gives cube ability to be clicked and dragged, will not phase through other items in scene, will instead collide
        cube.addMoveCollisionInteraction(); //undocumented function may be subject to change in the future

        //if cube is hovered over, it will turn translucent
        cube.onHover(function(isHovered) {
            if (isHovered) {
                cube.setOpacity(0.5);
            }
            else {
                cube.setOpacity(1);
            }
        });
    }

    var cubes = []; //array to store all created cubes

    //makes 10 cubes to start with and adds them to cubes array
    var cubeMaker = Scene.scheduleRepeating(function() {
        var newCube = makeCube();
        cubes.push(makeCube);
        if (cubes.length > 10) {
            cubeMaker.dispose();
        }
    }, 0);

    //button to create new cubes by calling makeCube function
    var createNewCube = Scene.getItem("cubeCreator");
    createNewCube.setBackgroundColor(0, 0, 0);
    createNewCube.setTextColor(255, 255, 255);
    createNewCube.onActivate(function() {
        makeCube();
    });

    /*
    *
    rectangle is the same as cube
    *
    */

    function makeRect() {
        var rect = Scene.createItem("Cuboid", randNumBetween(-20, 20), randNumBetween(-20, 20), 0);
        rect.setColor(randNumBetween(0, 255), randNumBetween(0, 255), randNumBetween(0, 255));
        rect.setLength(2); //extends length of cube so it looks like a rectangle
        rect.addMoveCollisionInteraction();
        rect.onHover(function(isHovered) {
            if (isHovered) {
                rect.setOpacity(0.5);
            }
            else {
                rect.setOpacity(1);
            }
        });
    }

    var rects = [];

    var rectMaker = Scene.scheduleRepeating(function() {
        var newRect = makeRect();
        rects.push(newRect);
        if (rects.length > 10) {
            rectMaker.dispose();
        }
    }, 0);

    var createNewRect = Scene.getItem("rectCreator");
    createNewRect.setBackgroundColor(0, 0, 0);
    createNewRect.setTextColor(255, 255, 255);
    createNewRect.onActivate(function() {
        makeRect();
    })


    /*
    *
    trees is the same as rectangle and cube
    *
    */

    var id = "LP_Tree3"; 
    //separated id from actual createItem declaration to try to get addMoveCollisionInteraction to work on low poly items

    function makeTree() {
        var tree = Scene.createItem(id, randNumBetween(-20, 20), randNumBetween(-20, 20), 0);
        tree.setColor(randNumBetween(0, 255), randNumBetween(0, 255), randNumBetween(0, 255));
        tree.setLength(2);
        tree.addMoveCollisionInteraction(); //doesn't work for low poly items like trees
        tree.onHover(function(isHovered) {
            if (isHovered) {
                tree.setOpacity(0.5);
            }
            else {
                tree.setOpacity(1);
            }
        });
    }

    var trees = [];

    //currently doesn't stop, can't figure out why...
    /*
    var treeMaker = Scene.scheduleRepeating(function() {
        var newTree = makeTree();
        trees.push(newTree);
        if (trees.length > 5) {
            treeMaker.dispose();
        }
    }, 0);
    */

    var createNewTree = Scene.getItem("treeCreator");
    createNewTree.setBackgroundColor(0, 0, 0);
    createNewTree.setTextColor(255, 255, 255);
    createNewTree.onActivate(function() {
        makeTree();
    })

    // copy, paste, edit, repeat!
    
}

Scene.schedule(delay, 2); //calling function from earlier 2 seconds after program initiates
//this gives the user time to get into VR mode and be able to click on Scene items
//otherwise, onActivate won't work
