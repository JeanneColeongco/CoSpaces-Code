Scene.clearWithoutCameras = function() {
    Scene.getItems().filter(function(item) {
        var isCamera = false;
        for(var prop in item) {
            if(prop === 'setFov') isCamera = true;
        }
        if(!isCamera) item.deleteFromScene();
    });
};

var marker = Scene.getItem('marker');
var button = Scene.getItem('button');

var buttonPos;

button.setOpacity(0);

//button.addMoveOnSphereInteraction();

button.addMoveOnItemInteraction(marker)
Scene.scheduleRepeating(function() {
  buttonPos = button.getPosition();
  camera.item.moveLinear(buttonPos.x, buttonPos.y, 1.7, 2);
}, 0);


Scene.renderShadows(false);

//Function for calculating position of targets and deciding their properties
var maker = {
  randNumBetween: function(min, max) {
    return Math.random() * (max - min) + min;

  },
  inheritsFrom: function(child, parent) {
    child.prototype = Object.create(parent.prototype);
  }
};

function Camera() {
  this.item = Scene.getCamera();
}

function Elephant() {
  this.item = {}; 
  this.modelID = 'LP_Elephant';
  this.sound = "8QdhikA36OXWCcedjDo44ZbN9cD0u9UpYbPOcy6MBn1"
}

Elephant.prototype.bindEvents = function() {
  var self = this;
  this.item.onHover(function(isHovered) {
    if (isHovered) {
      self.item.say("Get out of my way!");
      this.sound.play(true);
    }
    else {
      self.item.say("");
    }
  })
  this.item.onActivate(function() {
    self.item.deleteFromScene();
    self.remove();
    clickCounter++;
  });
  return this;
};

Elephant.prototype.getSpawnPos = function() {
  var a = maker.randNumBetween(0, Math.PI * 2); // get a random position around center
  var radius = maker.randNumBetween(10, 20);//distance of spawn

  return {
    //a number between -1 and 1 multiplied by the radius of 15 to generate position
    x: Math.cos(a) * radius,
    y: Math.sin(a) * radius,
    z: 0
  };
};

Elephant.prototype.spawn = function() {
  var spawnPos = this.getSpawnPos();
  this.item = Scene.createItem(this.modelID, spawnPos.x, spawnPos.y, spawnPos.z);
  this.item.faceTo(camera.item);
  return this;
};

/*
Elephant.prototype.getSpawnPos2 = function() {
  var a = maker.randNumBetween(0, Math.PI * 2); // get a random position around center
  var radius = maker.randNumBetween(10, 50);//distance of spawn

  return {
    //a number between -1 and 1 multiplied by the radius of 15 to generate position
    x: Math.cos(a) * radius,
    y: Math.sin(a) * radius,
    z: 0
  };
};
*/

Elephant.prototype.remove = function() {
  //var spawnPos2 = this.getSpawnPos2();
  //var position = this.item.getPosition();
  var index = enemies.indexOf(this);
  enemies.splice(index, 1);
  camera.item.move(0.25, 0.25);
  //camera.item.move(maker.randNumBetween(-2, 2), maker.randNumBetween(-2, 2));
  //camera.item.moveLinear(spawnPos2.x, spawnPos2.y, 1.7, 1);
};

Elephant.prototype.followPlayer = function() {
  var playerPos = camera.item.getPosition();
  var distanceToPlayer = this.item.distanceToItem(camera.item);
  this.item.moveLinear(playerPos.x, playerPos.y, 0, distanceToPlayer + 2);
  return this;
};

function endState() {
  Space.finishPlayMode('67d45f92ab27de23acb9e4ae0e8b2536a96296b24b91a5a7990a05b7a173783d');
}

Elephant.prototype.checkLimits = function() {
  var distanceToPlayer = this.item.distanceToItem(camera.item);
  Space.log(distanceToPlayer);
  if (distanceToPlayer < 4) {
    this.item.deleteFromScene();
    var cube = Scene.createItem("Cuboid", 0, 5, 5);
    cube.setOpacity(0);
    cube.showInfoPanel("You got trampled!", "zrXBNtJlGHTUbpldwGaO1h5wTyR8so4535BEkmAiScs", "Better luck next time!", true, null);
    Scene.schedule(endState, 3);
  }
  return this;
};

/**
 * Init
 *
 */

var camera = new Camera();
var enemies = [];
var mood = 1;

Scene.scheduleRepeating(function() {
  enemies.forEach(function(enemy) {
    enemy.followPlayer().checkLimits();
    enemy.bindEvents();
  });
}, 0);


var spawnGen = Scene.scheduleRepeating(function() {

  var elephant = new Elephant();

  elephant.spawn().bindEvents();

  enemies.push(elephant);

}, 1);

Scene.scheduleRepeating(function() {
  if (mood > 0) {
    mood -= 0.001;
    Scene.setMood(mood);
  }
}, 3)

Scene.scheduleRepeating(function() {
  var back = Scene.getItem("Back to Menu");
  back.onActivate(function() {
    Space.goTo("D1jcKhBNIfhV9S4wVLNHtw");
  });
  
  var howToPlay = Scene.getItem("How to Play");
  howToPlay.onActivate(function() {
      howToPlay.showInfoPanel("How to Play", null, "Click the elephants to avoid getting trampled by them!", true, null);
  });

  var cameraH = Scene.getCamera();

  //Enter ItemID or custom name here
  var pivot = Scene.getItem("HUD-Pivot");

  //Enter ItemIDs or custom names here
  var score = Scene.getItem("score");

  function updateHud(offsetX, offsetY, offsetZ){
      //Quaternion Magic
      var d = {x: 1, y: 0, z: 0};
      var angle = Math.PI * 0.5;
      var sinA = Math.sin(angle * 0.5);
      var cosA = Math.cos(angle * 0.5);
      pivot.setRelativeToCamera(offsetX,offsetY,offsetZ,d.x * sinA,d.y * sinA,d.z * sinA,cosA);
  }

  Scene.scheduleRepeating(function(){
      updateHud(0,0,3);
  },0);

  //Turn pivot object invisible so it does not block clicks
  pivot.setOpacity(0);
  var time =  Math.floor(Scene.currentTime());
  score.setFontSize(0.2);
  score.setText("Time:" + time);

  if (time === 20) {
      Scene.clearWithoutCameras();
      spawnGen.dispose();
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
}, 0);
