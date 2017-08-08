//see space: https://cospac.es/5wxD
//navigate to scene 1 using the toggle at the bottom of the scene
//click the beaker contents to start the reaction

//possible extensions/customizations: change the start and/or end color of the reaction, change the color/shape of the catalyst/enzyme/base/what-have-you, change the color/size of bubbles, make bubbles that rise up from the beaker into the "air", make different catalysts/enzymes/bases/what-have-you and/or different beaker contents for different reactions, etc.

function delay() { //wrapping everything in a function for later use

    //if called on, draws beaker (tall, four-sided, translucent container)
    //could make it so it's parametered and can draw a beaker anywhere on the screen
    function beaker() {
        var opacity = 0.5; //translucent (mimicking glass)
        var width = 0.01; //very thin
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
        side2.setPositionAngle(2, 3, 0, 0, 0, 5, 1.5708); //90 degree rotation from default position

        var side3 = Scene.createItem("Cuboid", 0, 0, 0);
        side3.setOpacity(opacity);
        side3.setWidth(width);
        side3.setHeight(height);
        side3.setLength(length);
        side3.setPositionAngle(0, 1, 0, 0, 0, 5, 3.14159); //180 degree rotation from default position

        var side4 = Scene.createItem("Cuboid", 0, 0, 0);
        side4.setOpacity(opacity);
        side4.setWidth(width);
        side4.setHeight(height);
        side4.setLength(length);
        side4.setPositionAngle(-2, 3, 0, 0, 0, 5, 4.71239); //270 degree rotation from default position
    }

    beaker(); //calling beaker function (drawing beaker in designated space)

    //beaker contents, can be anything really
    var acid = Scene.createItem("Cuboid", 0, 3, 0);
    acid.setScale(3.8);
    acid.setColor(255, 0, 0); //coloring "acid" red

    //if called, changes color of beaker contents using individual r, g, b (red, green, blue) values
    function changeColor() {
        var color = 0; //can use one variable since I want change to happen at a regular pace to the same end number for both g and b values, if end numbers are different, different variables will be needed
        
        //change the color of the red acid to light pink
        var makePink = Scene.scheduleRepeating(function() {
          color += 2;
          acid.setColor(255, color, color);
            
          //if desired end number for g and b values is reached...
          if (color === 200) {
            makePink.dispose(); //...stop incrementing those values
          }
        }, 0);
    }

    //helper function to generate random values
    function randNumBetween (min, max) {
        return Math.random() * (max - min) + min;
    }

    //tried to make bubbles scale up and down so it looks like they're growing and shrinking...
    //haven't worked it out properly yet.

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
                    bubble.deleteFromScene();
                    /*var scale = 0.01;
                    var shrink = Scene.scheduleRepeating(function() {
                                bubble.setScale(scale);
                                scale-=0.1;
                    }, 0);*/
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

    //if beaker contents is clicked... 
    acid.onActivate(function() {
        //a catalyst/enzyme/what-have-you is dropped in...
        var base = Scene.scheduleRepeating(function() {
            var cube = Scene.createItem("Cuboid", 0, 3, 5); //cube starts above the beaker
            cube.setColor(100, 100, 100); //color cube gray
            cube.moveLinear(0, 3, 0, 1); //cube is slowly lowered down into the beaker
            
            //and the appropriate functions are called to simulate the reaction if the catalyst/enzyme makes contact with the beaker contents
            cube.onCollisionEnter(function() {
                bubbleUp(); //making bubbles sound
                changeColor(); //changing color of beaker contents
                
                //getting rid of catalyst/enzyme/base/what-have-you
                base.dispose(); 
                cube.deleteFromScene(); 
                
                //makes bubbles
                var makeBubble = Scene.scheduleRepeating(function() {
                    //creates a bubble at a random position within the beaker walls
                    var bubble = Scene.createItem("LP_Sphere", randNumBetween(-1.8, 1.7), randNumBetween(1.3, 4.7), 3.5);
                    bubble.setColor(255, 255, 255); //color bubbles white
                    bubbles.push(bubble); //adds each generated bubble into bubble array
                    
                    //if the length of bubbles array (i.e. number of generated bubbles) exceeds 80...
                    if (bubbles.length > 80) {
                        makeBubble.dispose(); //stop making bubbles
                        bubbles.forEach(function(bubble) {
                            bubble.deleteFromScene(); //delete bubbles from scene
                            
                            //remove bubbles from bubbles array
                            var index = bubbles.indexOf(bubble);
                            bubbles.splice(index, 1);
                        })
                    }
                }, 0);

            });
        }, 1);
    })
}

Scene.schedule(delay, 2); //calling function from earlier 2 seconds after program initiates
//this gives the user time to get into VR mode and be able to click on Scene items
//otherwise, onActivate won't work
                                                 
