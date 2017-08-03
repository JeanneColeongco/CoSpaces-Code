//clears the scene with the exception of the items with these ids
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

//Function for calculating position of objects and deciding their properties
var objectMaker = {
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

  },
  //objects can inherit functionalities from other objects
  inheritsFrom: function(child, parent) {
    child.prototype = Object.create(parent.prototype);
  }
};

//makes player object
function Player() {
  this.item = Scene.createItem('LP_Wom', 0, 0, 0);
  this.item.setOpacity(0);
}

//makes lion object
function Lion() {
  this.item = {}; 
  this.modelId = 'LP_Lion'; //can change into any low poly object or building blocks object in CoSpaces library
  this.groanSound = Scene.loadSound('fHGMS7QwlStLVhW4oWNyUTMPDd8Ctw6gSVmzKMWc6hv'); //having trouble getting this to render onHover
}

//since lion is an object, when referring to a specific instance of that object (e.g. one specific lion)
//".item"" must follow the object itself (e.g. self, this, or lion)
Lion.prototype.bindEvents = function() {
  var self = this;
  this.item.onHover(function(isHovered){
    if (isHovered) {
      self.item.say("I'm gonna get you!");
      //this.groanSound.play();
    }
    else {
      self.item.say('');
      this.groanSound.play(true);
    }
  });
  //shrinks the lion when clicked until it disappears from the scene
  var scale = 2;
  this.item.onActivate(function() {
    clickCounter++;
    var shrinkTarget = Scene.scheduleRepeating(function() {
      var index = enemies.indexOf(this);
      enemies.splice(index, 1); //removes lion from "enemies" array
       scale -= 0.1; //rate at which lion's size decreases
       self.item.setScale(scale)
       if(scale < 0) {
         shrinkTarget.dispose(); //stops decreasing if size is already 0
       }
     }, 0); 
     /*changing 0 to a larger number will make the change happen fewer times
     which makes the visual not as smooth
     changing 0 to a smaller number will make the change happen more times,
     making it appear to be happening faster
     */
  });
  return this;
};

Lion.prototype.getSpawnPos = function() {
  var a = objectMaker.randNumBetween(0, Math.PI * 2); // get a random position around center
  var radius = 15;//distance of spawn

  return {
    //a number between -1 and 1 multiplied by the radius of 15 to generate position
    x: Math.cos(a) * radius,
    y: Math.sin(a) * radius,
    z: 0
  };
};

Lion.prototype.spawn = function() {
  var spawnPos = this.getSpawnPos();
  this.item = Scene.createItem(this.modelId, spawnPos.x, spawnPos.y, spawnPos.z);
  this.item.faceTo(player.item);
  return this;
};

//makes the lion slowly move closer to the player
Lion.prototype.followPlayer = function() {
  var playerPos = player.item.getPosition();
  var distanceToPlayer = this.item.distanceToItem(player.item);
  this.item.moveLinear(playerPos.x, playerPos.y, playerPos.z, distanceToPlayer + 0.25);
  return this;
};

//ends the game if called on
function endState() {
  Space.finishPlayMode('67d45f92ab27de23acb9e4ae0e8b2536a96296b24b91a5a7990a05b7a173783d');
}

//the values of life-lost-but-not-zero showInfoPanel
var config = {
    title: "Think fast!",
    imgId: "39JbTTpDttOeHyemvjwbkJofO18KU7eLEJO2Z77SFiX",
    description: "Hit the X below to shake the lion off!",
    autoHide: true,
};

//checks how close lion has gotten to player
Lion.prototype.checkLimits = function() {
  var distanceToPlayer = this.item.distanceToItem(player.item);
  if (distanceToPlayer < 1) {
    if(lives > 0){
      lives--; //decreases lives by 1 if the lion gets to the player
    }
    if (lives <= 0) {
      lives = 0; //sets lives to 0 to avoid negative numbers (just in case)
      //what happens when player loses
      var cube = Scene.createItem("Cuboid", 0, 5, 0);
      cube.setOpacity(0);
      cube.showInfoPanel("You got devoured!", "39JbTTpDttOeHyemvjwbkJofO18KU7eLEJO2Z77SFiX", "Better luck next time!", true, null);
      Scene.schedule(endState, 3);
    }
    else {
      //if the lion got to the player but the player is not down to 0 lives,
      //the player gets a chance to "shake the lion off"
      var cube = Scene.createItem("Cuboid", 0, 5, 0);
      cube.setOpacity(0);
      //life-lost-but-not-zero showInfoPanel
      cube.showInfoPanel(config.title, config.imgId, config.description, config.autoHide, null);
    }
  }
  return this;
};

//same as lion
//makes bird
function Bird() {
  this.item = {};
  this.modelId = 'LP_BlackBird';
  this.groanSound = Scene.loadSound('uaNVby17Z5t2FsG7KJCCjnDYYaKU8ln49hVb3CoHjLP');
}

//exactly the same as lion unless otherwise declared...
objectMaker.inheritsFrom(Bird, Lion);

//...declaring otherwise
Bird.prototype.spawn = function() {
  var spawnPos = this.getSpawnPos();
  this.item = Scene.createItem(this.modelId, spawnPos.x, spawnPos.y, 3);
  this.item.faceTo(player.item);
  this.item.playIdleAnimation('Fly');
  return this;
};

/*
Bird.prototype.bindEvents = function() {
  var self = this;
  // the key is self.item.* 
  this.item.onHover(function(isHovered){
    if (isHovered) {
      self.item.say("I'm gonna get you!");
      this.groanSound.play();
    }
    else {
      self.item.say('');
    }
  });
  var scale = 1;
  this.item.onActivate(function() {
    clickCounter++;
    var index = enemies.indexOf(this);
    enemies.splice(index, 1);
    var shrinkTarget = Scene.scheduleRepeating(function() {
       scale -= 0.1;
       self.item.setScale(scale)
       if(scale < 0) {
         shrinkTarget.dispose();
       }
     }, 0);
  });
  return this;
};
*/

//same as lion/bird
//makes tree
function Tree() {
  this.item = {};
  this.modelId = 'LP_Tree3';
}

//exactly the same as lion/bird unless otherwise declared...
objectMaker.inheritsFrom(Tree, Lion);

//...declaring otherwise
Tree.prototype.spawn = function() {
  var treePos = this.getSpawnPos();
  this.item = Scene.createItem(this.modelId, treePos.x, treePos.y, treePos.z);
  return this;
}

Tree.prototype.getSpawnPos = function() {
  var a = objectMaker.randNumBetween(0, Math.PI * 2); // get a random position around center
  var radius = objectMaker.randNumBetween(15, 100);//distance of spawn

  return {
    x: Math.cos(a) * radius,
    y: Math.sin(a) * radius,
    z: 0
  };
};

//slowly changes the color of the tree by changing the individual r, g, b (red, green, blue) values
Tree.prototype.bindEvents = function() {
  var self = this;
  var r = 0;
  this.item.onActivate(function() {
    var makeYellow = Scene.scheduleRepeating(function() {
      r += 1.5; //increments r 
      self.item.setColor(r, 255, 0);
      if (r === 255) {
        makeYellow.dispose(); //stops incrementing if r is already at highest possible value (for colors)
      }
    }, 0);
  });
  return this;
};

//same as lion/bird/tree
//makes rock
function Rock() {
  this.item = {};
  this.modelId = 'LP_Stone';
}

//exactly the same as tree unless otherwise declared...
objectMaker.inheritsFrom(Rock, Tree);

//...declaring otherwise
Rock.prototype.spawn = function() {
  var rockPos = this.getSpawnPos();
  this.item = Scene.createItem(this.modelId, rockPos.x, rockPos.y, rockPos.z);
  return this;
}

Rock.prototype.bindEvents = function() {
  var self = this;
  self.item.onHover(function(isHovered){
    if (isHovered) { 
      Scene.loadSound('hf5p0KKv6ts3bpSO1dP7AMP500DW6bToSdBu5wFgyre').play(true);
    }
  });

  //turns rock into a bunch of flowers when clicked
  var flowers = "LP_Flowers";
  var rockPos = this.item.getPosition(); //gets position of clicked rock
  this.item.onActivate(function() {
    self.item.deleteFromScene(); //deleting rock
    Scene.createItem(flowers, rockPos.x, rockPos.y, 0); //putting flowers
  });
  return this;
};

//if called on, changes scene if player wins
function winstate() {
        var endBoard = Scene.createTextBillboard(1, 5, 1);
        endBoard.setTextColor(0, 255, 0);
        endBoard.setText('YOU WON!');
        this.sound = "UMkKGgBwdBTeuFEkPJDm7JmyJipZKyMvtlN1bTSVAdh";

        var rainbowCount = 200;
        var rainbows = [];

        function getRandPos() {
            var min = -50;
            var max = 50;
            return {
              x: Math.random() * (max - min) + min,
              y: Math.random() * (max - min) + min
            };
        }

        for(var i = 0; i < rainbowCount; i++) {
            var pos = getRandPos();
            var rainbow = Scene.createItem('Rainbow', pos.x, pos.y, 0);
            rainbows.push(rainbow);
        }
      }

/*
 * Let the game begin 
 *
 */
Scene.loadSound('QX2UX8AxgQRjx9KuK1TEjT19TTiLwrU9szSHo4Apaum').play(true);

//initializing variables
var player = new Player();
var enemies = [];
var clickCounter = 0;
var mood = 1; 
var lives = 3;
var time = 0;
var timer = Scene.scheduleRepeating(function() {
    time++; //incrementing the time in seconds by 1 every second
  }, 1);

//for every item in "enemies" array (all birds and lions)
//make sure they move towards the player
//check if they've already reached the player and act accordingly
//check if they've been clicked and act accordingly
var handler = Scene.scheduleRepeating(function() {
  enemies.forEach(function(enemy) {
    enemy.followPlayer().checkLimits();

    //wasn't this for making the hover work initially? why does it affect their movement now?
    enemy.bindEvents();
  });
}, 0);

//if a life has been lost, turn a heart invisible
//assumes there are 3 items named "3", "2", "1" on the scene 
var livesManager = Scene.scheduleRepeating(function() {
  var heart3 = Scene.getItem("3");
  var heart2 = Scene.getItem("2");
  var heart1 = Scene.getItem("1");
  if (lives === 2) {
    heart3.setOpacity(0);     
  }
  if (lives === 1) {
    heart2.setOpacity(0);     
  }
  if (lives === 0) {
    heart1.setOpacity(0);     
  }
}, 0)

//creates a new lion/bird/tree/rock every 3 seconds and calls applicable functions
//adds lion and bird into enemies array
var spawnGen = Scene.scheduleRepeating(function() {
  //sets day/night time lighting
  if (mood > 0) {
    mood -= 0.001; //slowly turns daytime lighting into night
    Scene.setMood(mood);
  }
  
  var lion = new Lion();
  var bird = new Bird();
  var tree = new Tree();
  var rock = new Rock();

  lion.spawn().bindEvents();
  bird.spawn().bindEvents();
  tree.spawn().bindEvents();
  rock.spawn().bindEvents();

  enemies.push(lion, bird);
  
}, 3);

/*
*
* HUD - Heads-Up Display
*
*/
var HUD = Scene.scheduleRepeating(function() {
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
      pivot.setRelativeToCamera(offsetX, offsetY, offsetZ, d.x * sinA,d.y * sinA, d.z * sinA, cosA);
                                //(0 , 0 , 3, somenumber, 0, 0, somenumber)
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
  score.setText("Score: " + clickCounter + "\nTime: " + time + "\nLives: " + lives);
}, 0);

//repeatedly checking if player has reached a certain # of points before:
//stopping the timer
//clearing without select items
//stopping creating new enemies
//setting up the win scene
Scene.scheduleRepeating(function() {
  if (clickCounter === 10) {
      timer.dispose();
      clearWithout();
      spawnGen.dispose();
      winstate();
  }
}, 0);

//menu buttons
var menu = Scene.scheduleRepeating(function() {
  var back = Scene.getItem("Back to Menu");
  back.onActivate(function() {
    clearWithout(); //clears scene if game is exited so that game resumes fresh if restarted
    Space.goTo("D1jcKhBNIfhV9S4wVLNHtw");
  });
  
  var howToPlay = Scene.getItem("How to Play");
  howToPlay.onActivate(function() {
      howToPlay.showInfoPanel("How to Play", null, "Click the carnivorous animals before they eat you!", true, null);
  });
}, 0);
