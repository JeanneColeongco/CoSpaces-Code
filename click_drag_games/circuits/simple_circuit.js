//see space: https://cospac.es/aEbD
//nagivate to scene 1 using the toggle at the bottom of the scene

//just use your own item ids to customize your own game
//e.g. click and drag to match a Library > 3D low poly item with a word (chair, house, etc.)

function delay() { //wrapping everything in a function for later use

    //marker - Library > Graphics
    var marker = Scene.getItem('marker');

    //cube (battery) - Library > Building Blocks > Cube > drag to scene > click to see arrows > click/drag arrows to resize
    var cube = Scene.getItem("battery");
    cube.say("I'm a battery! I'll power your circuit!");
    var cubePos; //setting global variable for later use...

    //enables cube to be clicked and dragged within the boundaries of the marker
    cube.addMoveOnItemInteraction(marker, function() {
        //gets item position, output overrided by earlier ".say()" and below if/else statement
        cubePos = cube.getPosition();
        cube.say('x: ' + cubePos.x.toFixed(2) + ', y: ' + cubePos.y.toFixed(2)); 

        //if item is in place...
        if (cubePos.x >= 4.5 && cubePos.x <= 5.5 && cubePos.y >= 4.5 && cubePos.y <= 5.5) {
            cube.say("Looking good!"); //...say so...
        }
        //...if not...
        else {
            cube.say("Hmm... It doesn't look like I fit here."); //...say so
        }
    });

    //create sphere (lightbulb)      //x position, y position, z position
    var sphere = Scene.createItem("Ellipsoid", -1.75, 2, 0);
    sphere.setScale(0.25); //resize to 1/4 the default
    sphere.setColor(255, 255, 255); //set cube color to white
    sphere.say("I'm a light bulb! Turn me on!");
    var spherePos; //setting global variable for later use...

    //enables sphere to be clicked and dragged within the boundaries of the marker
    sphere.addMoveOnItemInteraction(marker, function() {
        //gets item position, output overrided by earlier ".say()" and below if/else statement
        spherePos = sphere.getPosition();
        sphere.say('x: ' + spherePos.x.toFixed(2) + ', y: ' + spherePos.y.toFixed(2));

        //if item is in place...
        if (spherePos.x >= 4.5 && spherePos.x <= 5.5 && spherePos.y >= 0 && spherePos.y <= 1) {
            sphere.say("Looking good!"); //...say so...
        }
        //...if not...
        else {
            sphere.say("Hmm... It doesn't look like I fit here."); //...say so
        }
    });

    //button (switch)                  //x position, y position, z position
    var button = Scene.createItem("Hemiellipsoid", 5.5, 6.25, 0);
    button.setScale(0.35);
    button.setColor(220, 50, 50);
    button.say("I'm a switch! I control the flow of electricity!");
    var buttonPos; //setting global variable for later use...
    button.addMoveOnItemInteraction(marker, function() {
        //gets item position, output overrided by earlier ".say()" and below if/else statement
        buttonPos = button.getPosition();
        button.say('x: ' + buttonPos.x.toFixed(2) + ', y: ' + buttonPos.y.toFixed(2));

        //if item is in place...
        if (buttonPos.x >= 0 && buttonPos.x <= 1 && buttonPos.y >= 4 && 5) {
            button.say("Looking good!"); //...say so...
        }
        //...if not...
        else {
            button.say("Hmm... It doesn't look like I fit here."); //...say so
        }
    });

    //the big handler
    //repeatedly checks...
    Scene.scheduleRepeating(function() {
        //if button is clicked
        button.onActivate(function() {
            //if all items are in place
            if (cubePos.x >= 4.5 && cubePos.x <= 5.5 && cubePos.y >= 4.5 && cubePos.y <= 5.5 &&
            spherePos.x >= 4.5 && spherePos.x <= 5.5 && spherePos.y >= 0 && spherePos.y <= 1 &&
            buttonPos.x >= 0 && buttonPos.x <= 1 && buttonPos.y >= 4 && 5) {
                sphere.setColor(255, 255, 0); //makes sphere/lightbulb yellow/on

                Scene.renderShadows(false); //prevents lightning from forming dark shadows
                var electricity = Scene.createItem("LP_Lightning", spherePos.x, spherePos.y, spherePos.z+0.5);
                sphere.say("I'm on!");

                //sound when lightbulb is on
                var zap = Scene.loadSound("gSXja8WsHLN1RmGENSRjrKacG4jffL1Fyv2FDvL2LpQ");
                zap.play(false);
                Scene.schedule(zap.stop, 2); //stop sound after playing for 2 seconds
            }
        })
    }, 0);
}

Scene.schedule(delay, 2); //calling function from earlier 2 seconds after program initiates
//this gives the user time to get into VR mode and be able to click on Scene items
//otherwise, onActivate won't work
