//see space: https://cospac.es/5wxD
//navigate to scene 1 using the toggle at the bottom of the scene

//if called on, draws beaker
//could make it so it's parametered and can draw a beaker anywhere on the screen
function beaker() {
    var opacity = 0.5;
    var width = 0.01;
    var height = 5;
    var length = 4;

    var side = Scene.createItem("Cuboid", 0, 5, 0);
    side.setOpacity(opacity);
    side.setWidth(width);
    side.setHeight(height);
    side.setLength(length);

    var side2 = Scene.createItem("Cuboid", 0, 5, 0);
    side2.setOpacity(opacity);
    side2.setWidth(width);
    side2.setHeight(height);
    side2.setLength(length);
    side2.setPositionAngle(2, 3, 0, 0, 0, 5, 1.5708); //90 degrees

    var side3 = Scene.createItem("Cuboid", 0, 0, 0);
    side3.setOpacity(opacity);
    side3.setWidth(width);
    side3.setHeight(height);
    side3.setLength(length);
    side3.setPositionAngle(0, 1, 0, 0, 0, 5, 3.14159); //180 degrees

    var side4 = Scene.createItem("Cuboid", 0, 0, 0);
    side4.setOpacity(opacity);
    side4.setWidth(width);
    side4.setHeight(height);
    side4.setLength(length);
    side4.setPositionAngle(-2, 3, 0, 0, 0, 5, 4.71239); //270 degrees
}

beaker();

//beaker contents, can be anything really
var acid = Scene.createItem("Cuboid", 0, 3, 0);
acid.setScale(3.8);
acid.setColor(255, 0, 0);

//if called, changes color of beaker contents using individual r, g, b (red, green, blue) values
function changeColor() {
    var color = 0;
    var makePink = Scene.scheduleRepeating(function() {
      color += 2;
      acid.setColor(255, color, color);
      if (color === 200) {
        makePink.dispose();
      }
    }, 0);
}

//helper function to generate random values
function randNumBetween (min, max) {
    return Math.random() * (max - min) + min;
}

//tried to make bubbles scale up and down...
//so it looks like they're growing and shrinking...
//haven't worked it out yet.

//var expand = [];
//var shrink = [];
var bubbles = [];

//if called on, bubbles are made and added to "bubbles" array
function bubble() {
    //var bubbles = [];
    var makeBubble = Scene.scheduleRepeating(function() {
        var bubble = Scene.createItem("LP_Sphere", randNumBetween(-1.8, 1.7), randNumBetween(1.3, 4.7), 3.5);
        bubble.setColor(255, 255, 255);
        bubbles.push(bubble);
        /*expand.push(bubble);
        expand.forEach(function(bubble) {
            scale = 1;
            Scene.scheduleRepeating(function() {
                scale+=0.01;
                bubble.setScale(scale);
                if (scale >= 2) {
                    shrink.push(bubble);
                    expand.splice(index, 1);
                    //bubble.setColor(255, 0, 0);
                }
            }, 0);
            var scale = 1;
            var scaleBubble = Scene.scheduleRepeating(function() {
                bubble.setScale(scale);
                scale+=0.1;
                //Space.log(scale);
                if (scale > 5) {
                    var shrink = Scene.scheduleRepeating(function() {
                        bubble.setScale(scale);
                        scale-=0.1;
                    }, 0);
                }
            }, 0);
    },*/

        /*shrink.forEach(function(bubble) {
            scale = 2;
            Scene.scheduleRepeating(function() {
                scale-=0.01;
                bubble.setScale(scale);
                if (scale === 0) {
                    bubble.deleteFromScene();
                }
            }, 0);
        });*/
        //if (scale === 1) {
            //makeBubble.dispose();
            //bubbles.forEach(function(bubble) {
                /*var scale = 0;
                var growBubble = Scene.scheduleRepeating(function() {
                    bubble.setScale(scale);
                    scale+=0.1;
                    if (scale === 1) {
                        //growBubble.dispose();
                        scale--;
                    }
                }, 2);
                }, 1);*/
                //var scale = 1;
                
                //bubble.deleteFromScene();
            //})
        //}
        //if a certain amount of bubbles is reached, delete all the bubbles
        if (bubbles.length > 80) {
            //makeBubble.dispose();
            bubbles.forEach(function(bubble) {
                //bubble.deleteFromScene();
                /*var scale = 0.01;
                var shrink = Scene.scheduleRepeating(function() {
                            bubble.setScale(scale);
                            scale-=0.1;
                }, 0);*/
                bubble.deleteFromScene();
            } 
        }
        //Space.log(bubbles.length);
    }, 0);
}

//if called on, makes bubbles sound
function bubbleUp() {
    var bubbler = Scene.loadSound("jbROmHBPoaM5RYH0eNfIMOLyNXB7egazkUWiBiFWHld");
    bubbler.play(false);
    Scene.schedule(bubbler.stop, 2);
}

//if beaker contents is clicked, a catalyst/enzyme/what-have-you is dropped in...
//and the appropriate functions are called to simulate the reaction
acid.onActivate(function() {
    var i = 0;
    var base = Scene.scheduleRepeating(function() {
        var cube = Scene.createItem("Cuboid", 0, 3, 5);
        cube.setColor(100, 100, 100);
        cube.moveLinear(0, 3, 0, 1);
        var pos = cube.getPosition();
        cube.onCollisionEnter(function() {
            bubbleUp();
            changeColor();
            base.dispose();
            cube.deleteFromScene();
            var makeBubble = Scene.scheduleRepeating(function() {
                var bubble = Scene.createItem("LP_Sphere", randNumBetween(-1.8, 1.7), randNumBetween(1.3, 4.7), 3.5);
                bubble.setColor(255, 255, 255);
                bubbles.push(bubble);
                if (bubbles.length > 80) {
                    makeBubble.dispose();
                    bubbles.forEach(function(bubble) {
                        bubble.deleteFromScene();
                        var index = bubbles.indexOf(bubble);
                        bubbles.splice(index, 1);
                    })
                }
            }, 0);
            
        });
    }, 1);
})
