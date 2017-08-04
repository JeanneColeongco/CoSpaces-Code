//marker - Library > Graphics
var marker = Scene.getItem('marker');

//cube (battery)
var cube = Scene.getItem("battery");
cube.say("I'm a battery! I'll power your circuit!");
var cubePos; //setting global variable for later use...

//enables cube to be clicked and dragged within the boundaries of the marker
cube.addMoveOnItemInteraction(marker, function() {
    //gets item position, output overrided by earlier ".say()" and below if/else statement
    cubePos = cube.getPosition();
    cube.say('x: ' + cubePos.x.toFixed(2) + ', y: ' + cubePos.y.toFixed(2)); 
    
    //checks if item is in place or not
    if (cubePos.x >= 4.5 && cubePos.x <= 5.5 && cubePos.y >= 4.5 && cubePos.y <= 5.5) {
        cube.say("Looking good!");
    }
    else {
        cube.say("Hmm... It doesn't look like I fit here.")
    }
});

//sphere (lightbulb)
var sphere = Scene.createItem("Ellipsoid", -1.75, 2, 0);
sphere.setScale(0.25);
sphere.setColor(255, 255, 255);
sphere.say("I'm a light bulb! Turn me on!");
var spherePos; //setting global variable for later use...

sphere.addMoveOnItemInteraction(marker, function() {
    //gets item position, output overrided by earlier ".say()" and below if/else statement
    spherePos = sphere.getPosition();
    sphere.say('x: ' + spherePos.x.toFixed(2) + ', y: ' + spherePos.y.toFixed(2));

    //checks if item is in place or not
    if (spherePos.x >= 4.5 && spherePos.x <= 5.5 && spherePos.y >= 0 && spherePos.y <= 1) {
        sphere.say("Looking good!")
    }
    else {
        sphere.say("Hmm... It doesn't look like I fit here.")
    }
});

//button (switch)
var button = Scene.createItem("Hemiellipsoid", 5.5, 6.25, 0);
button.setScale(0.35);
button.setColor(220, 50, 50);
button.say("I'm a switch! I control the flow of electricity!");
var buttonPos; //setting global variable for later use...
button.addMoveOnItemInteraction(marker, function() {
    //gets item position, output overrided by earlier ".say()" and below if/else statement
    buttonPos = button.getPosition();
    button.say('x: ' + buttonPos.x.toFixed(2) + ', y: ' + buttonPos.y.toFixed(2));

    //checks if item is in place or not
    if (buttonPos.x >= 0 && buttonPos.x <= 1 && buttonPos.y >= 4 && 5) {
        button.say("Looking good!");
    }
    else {
        button.say("Hmm... It doesn't look like I fit here.")
    }
});

//the big handler
//if button is clicked...
//checks if all items are in place
Scene.scheduleRepeating(function() {
    button.onActivate(function() {
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
            Scene.schedule(zap.stop, 2);
        }
    })
}, 0);
