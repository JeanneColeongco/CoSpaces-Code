//clears the scene with the exception of the items with these unique ids
//note that any items you create will have their own ids
//double click on items then click the first icon in the drop down that pops up to access them
function clearWithout() {
    Scene.getItems().forEach(function(item) {
        if(item.id() !== "jhQlZHx1Vp" && //camera
        item.id() !== "IM76dkNzE5" && //hud pivot
        item.id() !== "a7mnFAUKlz" && //scoreboard
        item.id() !== "p75QJwda5M" && //menu button
        item.id() !== "3boBy4pikv" && //how to play
        item.id() !== "1LOddouqRv" && //heart3
        item.id() !== "Y00bLu1NP3" && //heart2
        item.id() !== "DEDXiUxLa0") //heart1 
        item.deleteFromScene();
    });
}

//Function for calculating position of targets and deciding their properties
var cubeMaker = {
  randNumBetween: function(min, max) {
    return Math.random() * (max - min) + min;
   
    /*max-min = difference
    max = 12
    min = 5
    difference 7
    1*7 + 5 = 12
    value * difference + min
    value * (max - min) + min
    0 <= value <=1
    
    value = 1
    1 * (max-min) + min
    max - min + min
    max

    value = 0
    0 * (max-min) + min
    0 + min
    min*/

  }
};

//creates cube instance/object (sort of abstract idea of something named Cube)
function Cube() {
  this.item = {}; 
}

//since cube is an object, when referring to a specific instance of that object (e.g. one specific cube)
//".item"" must follow the object itself (e.g. self, this, or lion)

//response to player actions on cube
Cube.prototype.bindEvents = function() {
  var self = this;
  this.item.onActivate(function() {
    self.remove(); //calls remove function on cube
    clickCounter ++; //gives the user a point
  });
  return this;
};

//generate spawn position of cube
Cube.prototype.getSpawnPos = function() {
  var a = cubeMaker.randNumBetween(0, Math.PI * 2); // get a random position around center (player item)
  var radius = 15;//distance of spawn from player

  return {
    //a number between -1 and 1 multiplied by the radius of 15 to generate position around player item
    x: Math.cos(a) * radius,
    y: Math.sin(a) * radius,
    z: 0
  };
};

//generate cube
Cube.prototype.spawn = function() {
  var spawnPos = this.getSpawnPos();
  this.item = Scene.createItem('Cuboid', spawnPos.x, spawnPos.y, spawnPos.z); 
  //can create items other than a cube by using a different id from "Cuboid" (see CoSpaces API for list of ids)
  return this;
};

//what happens when cube is clicked
Cube.prototype.remove = function() {
  var index = enemies.indexOf(this);
  enemies.splice(index, 1); //removes cube from "enemies" array
  this.item.deleteFromScene();
};


/*
 * Let the game begin
 *
 */

//initializing variables
var enemies = [];
var clickCounter = 0;

//repeatedly generating cubes, attaching relevant funcitons, adding all created cubes to "enemies" array
Scene.scheduleRepeating(function() {
  var cube = new Cube();
  cube.spawn().bindEvents();
  enemies.push(cube);
}, 3);

//ends the game if called on
function endState() {
  Space.finishPlayMode('67d45f92ab27de23acb9e4ae0e8b2536a96296b24b91a5a7990a05b7a173783d');
}

/*checks if a certain # of points were achieved 
before calling clearWithout function
replacing any remaining cubes with a win notice
then ends the game
*/
Scene.scheduleRepeating(function() {
  if (clickCounter === 10) {
      clearWithout();
      var endBoard = Scene.createTextBillboard(1, 10, 1);
      endBoard.setTextColor(0, 255, 0);
      endBoard.setText('YOU WON!');
      Scene.schedule(endState, 2);
  }
  
  //menu buttons
  var back = Scene.getItem("Back to Menu");
  back.onActivate(function() {
    clearWithout(); //clears scene if game is exited so that game resumes fresh if restarted
    Space.goTo("D1jcKhBNIfhV9S4wVLNHtw");
  });
  var howToPlay = Scene.getItem("How to Play");
  howToPlay.onActivate(function() {
      howToPlay.showInfoPanel("How to Play", null, "Click the cubes to earn points!", true, null);
  });


  /*
  *
  * HUD - Heads-Up Display
  *
  */
  var cameraH = Scene.getCamera(); //gets camera item

  //Enter ItemID or custom name here
  //make sure to create in-scene and attach all items you want to be following the camera view to the pivot object
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

  //repeatedly updating scoreboard text
  var score = Scene.getItem("score");
  score.setFontSize(0.2);
  score.setText("Score:" + clickCounter + "\nTime:" + Math.floor(Scene.currentTime()));
                                          //rounds down the current time of the scene (scene time starts at 0 and increases)
}, 0);
