//see space: https://cospac.es/aEbD
//navigate to scene 2 using toggle at the bottom of the scene

//slightly modified version of simple_circuit

//need to move lightbulb 1 first before the other lightbulbs will work...
//...weird glitch

function delay() { //wrapping everything in a function for later use
    
    //marker
    var marker = Scene.getItem('marker');

    //cube (battery)
    var cube = Scene.getItem("battery");
    cube.say("I'm a battery! I'll power your circuit!");
    var cubePos;
    cube.addMoveOnItemInteraction(marker, function() {
        cubePos = cube.getPosition();
        cube.say('x: ' + cubePos.x.toFixed(2) + ', y: ' + cubePos.y.toFixed(2));
        if (cubePos.x >= 1 && cubePos.x <= 2 && cubePos.y >= 0 && cubePos.y <= 1) {
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
    sphere.say("I'm light bulb one! Turn me on!");
    var spherePos;
    sphere.addMoveOnItemInteraction(marker, function() {
        spherePos = sphere.getPosition();
        sphere.say('x: ' + spherePos.x.toFixed(2) + ', y: ' + spherePos.y.toFixed(2));
        if (spherePos.x >= 1.5 && spherePos.x <= 2.5 && spherePos.y >= 2.5 && spherePos.y <= 3.5 /*||
        spherePos.x >= 3 && spherePos.x <= 4 && spherePos.y >= 2.5 && spherePos.y <= 3.5 ||
        spherePos.x >= 4.5 && spherePos.x <= 5.5 && spherePos.y >= 2.5 && spherePos.y <= 3.5*/) {
            sphere.say("Looking good!")
        }
        else {
            sphere.say("Hmm... It doesn't look like I fit here.")
        }
    });

    //sphere2 (lightbulb)
    var sphere2 = Scene.createItem("Ellipsoid", -1.75, 3, 0);
    sphere2.setScale(0.25);
    sphere2.setColor(255, 255, 255);
    sphere2.say("I'm light bulb two! Turn me on!");
    var sphere2Pos;
    sphere2.addMoveOnItemInteraction(marker, function() {
        sphere2Pos = sphere2.getPosition();
        sphere2.say('x: ' + sphere2Pos.x.toFixed(2) + ', y: ' + sphere2Pos.y.toFixed(2));
        if (/*sphere2Pos.x >= 1.5 && sphere2Pos.x <= 2.5 && sphere2Pos.y >= 2.5 && sphere2Pos.y <= 3.5 ||*/
        sphere2Pos.x >= 3 && sphere2Pos.x <= 4 && sphere2Pos.y >= 2.5 && sphere2Pos.y <= 3.5 /*||
        sphere2Pos.x >= 4.5 && sphere2Pos.x <= 5.5 && sphere2Pos.y >= 2.5 && sphere2Pos.y <= 3.5*/) {
            sphere2.say("Looking good!")
        }
        else {
            sphere2.say("Hmm... It doesn't look like I fit here.")
        }
    });

    var sphere3 = Scene.createItem("Ellipsoid", -1.75, 4, 0);
    sphere3.setScale(0.25);
    sphere3.setColor(255, 255, 255);
    sphere3.say("I'm light bulb three! Turn me on!");
    var sphere3Pos;
    sphere3.addMoveOnItemInteraction(marker, function() {
        sphere3Pos = sphere3.getPosition();
        sphere3.say('x: ' + sphere3Pos.x.toFixed(2) + ', y: ' + sphere3Pos.y.toFixed(2));
        if (/*sphere3Pos.x >= 1.5 && sphere3Pos.x <= 2.5 && sphere3Pos.y >= 2.5 && sphere3Pos.y <= 3.5 ||
        sphere3Pos.x >= 3 && sphere3Pos.x <= 4 && sphere3Pos.y >= 2.5 && sphere3Pos.y <= 3.5 ||*/
        sphere3Pos.x >= 4.5 && sphere3Pos.x <= 5.5 && sphere3Pos.y >= 2.5 && sphere3Pos.y <= 3.5) {
            sphere3.say("Looking good!")
        }
        else {
            sphere3.say("Hmm... It doesn't look like I fit here.")
        }
    });

    //button (switch)
    var button = Scene.createItem("Hemiellipsoid", 5.5, 6.25, 0);
    button.setScale(0.35);
    button.setColor(220, 50, 50);
    button.say("I'm a switch! I control the flow of electricity!");
    var buttonPos;
    button.addMoveOnItemInteraction(marker, function() {
        buttonPos = button.getPosition();
        button.say('x: ' + buttonPos.x.toFixed(2) + ', y: ' + buttonPos.y.toFixed(2));
        if (buttonPos.x >= 0.5 && buttonPos.x <= 1.5 && buttonPos.y >= 4 && buttonPos.y <= 5) {
            button.say("Looking good!");
        }
        else {
            button.say("Hmm... It doesn't look like I fit here.")
        }
    });

    function zap() {
        var zap = Scene.loadSound("gSXja8WsHLN1RmGENSRjrKacG4jffL1Fyv2FDvL2LpQ");
        zap.play(false);
        Scene.schedule(zap.stop, 2);
    };

    //the big handler
    Scene.scheduleRepeating(function() {
        Scene.renderShadows(false);
        if (buttonPos.x >= 0.5 && buttonPos.x <= 1.5 && buttonPos.y >= 4 && buttonPos.y <= 5) {
        button.onActivate(function() {
            /*
            if (cubePos.x >= 1 && cubePos.x <= 2 && cubePos.y >= 0 && cubePos.y <= 1) {
                if (buttonPos.x >= 0.5 && buttonPos.x <= 1.5 && buttonPos.y >= 4 && buttonPos.y <= 5) {
                    if (spherePos.x >= 1.5 && spherePos.x <= 2.5 && spherePos.y >= 2.5 && spherePos.y <= 3.5 ||
                    sphere2Pos.x >= 3 && sphere2Pos.x <= 4 && sphere2Pos.y >= 2.5 && sphere2Pos.y <= 3.5 ||
                    sphere3Pos.x >= 4.5 && sphere3Pos.x <= 5.5 && sphere3Pos.y >= 2.5 && sphere3Pos.y <= 3.5) */
            if (cubePos.x >= 1 && cubePos.x <= 2 && cubePos.y >= 0 && cubePos.y <= 1) {

                    if (spherePos.x >= 1.5 && spherePos.x <= 2.5 && spherePos.y >= 2.5 && spherePos.y <= 3.5 /*||
                    spherePos.x >= 3 && spherePos.x <= 4 && spherePos.y >= 2.5 && spherePos.y <= 3.5 ||
                    spherePos.x >= 4.5 && spherePos.x <= 5.5 && spherePos.y >= 2.5 && spherePos.y <= 3.5*/) {
                            sphere.setColor(255, 255, 0);
                            sphere.say("I'm on!");
                            zap();
                            var electricity = Scene.createItem("LP_Lightning", spherePos.x, spherePos.y, spherePos.z+0.5);
                    }
                    if (/*sphere2Pos.x >= 1.5 && sphere2Pos.x <= 2.5 && sphere2Pos.y >= 2.5 && sphere2Pos.y <= 3.5 ||*/
                    sphere2Pos.x >= 3 && sphere2Pos.x <= 4 && sphere2Pos.y >= 2.5 && sphere2Pos.y <= 3.5 /*||
                    sphere2Pos.x >= 4.5 && sphere2Pos.x <= 5.5 && sphere2Pos.y >= 2.5 && sphere2Pos.y <= 3.5*/) {
                            sphere2.setColor(255, 255, 0);
                            sphere2.say("I'm on!");
                            zap();
                            var electricity2 = Scene.createItem("LP_Lightning", sphere2Pos.x, sphere2Pos.y, sphere2Pos.z+0.5);
                    }
                    if (/*sphere3Pos.x >= 1.5 && sphere3Pos.x <= 2.5 && sphere3Pos.y >= 2.5 && sphere3Pos.y <= 3.5 ||
                    sphere3Pos.x >= 3 && sphere3Pos.x <= 4 && sphere3Pos.y >= 2.5 && sphere3Pos.y <= 3.5 ||*/
                    sphere3Pos.x >= 4.5 && sphere3Pos.x <= 5.5 && sphere3Pos.y >= 2.5 && sphere3Pos.y <= 3.5) {
                            sphere3.setColor(255, 255, 0);
                            sphere3.say("I'm on!");
                            zap();
                            var electricity3 = Scene.createItem("LP_Lightning", sphere3Pos.x, sphere3Pos.y, sphere3Pos.z+0.5);
                    }
                }

    /*
            if (cubePos.x >= 1 && cubePos.x <= 2 && cubePos.y >= 0 && cubePos.y <= 1) {
                if (buttonPos.x >= 0.5 && buttonPos.x <= 1.5 && buttonPos.y >= 4 && buttonPos.y <= 5) {

                }
            }

            if (cubePos.x >= 1 && cubePos.x <= 2 && cubePos.y >= 0 && cubePos.y <= 1) {
                if (buttonPos.x >= 0.5 && buttonPos.x <= 1.5 && buttonPos.y >= 4 && buttonPos.y <= 5) {

                }
            }

          */          
        })
        }
    }, 0);
}

Scene.schedule(delay, 2); //calling function from earlier 2 seconds after program initiates
//this gives the user time to get into VR mode and be able to click on Scene items
//otherwise, onActivate won't work
