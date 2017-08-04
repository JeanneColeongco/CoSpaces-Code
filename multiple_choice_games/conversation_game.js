//see space: https://cospac.es/OGlt

//just edit the ".say()" and ".setText()" values to customize the game to your needs

//clears scene without camera so that player perspective is maintained
Scene.clearWithoutCameras = function() {
    Scene.getItems().filter(function(item) {        
        var isCamera = false;
        for(var prop in item) {
            //checks all items in the scene and their properties...
            //finds property unique to the camera item...
            //knows that the connected item must therefore be the camera item...
            if(prop === 'setFov') isCamera = true;
        }
        //...anything else is deleted
        if(!isCamera) item.deleteFromScene();
        
    });
};

//character select instructions billboard
var charSel = Scene.createTextBillboard(0, 5, 3);
charSel.setText("Select Character then click Play");

//creating player character forms
var playerChar1 = Scene.createItem("LP_Wom", -3, 7, 0);
playerChar1.setPositionAngle(-3, 7, 0, 0, 0, 10, 3.14159); //180 degree rotation to face camera
var playerChar2 = Scene.createItem("LP_Man", 3, 7, 0);
playerChar2.setPositionAngle(3, 7, 0, 0, 0, 10, 3.14159); //180 degree rotation to face camera

//declaring variable playerID for later use...
var playerID;

//if player 1 (woman) is clicked, set the value of playerID variable to that of the woman...
playerChar1.onActivate(function() {
    playerID = "LP_Wom";
    playerChar1.setOpacity(0.5);
    //could also insert game code here, but would have to do the same for playerChar2
    //which would be hard for later debugging/modifying
});

//if player 2 (man) is clicked, set the value of playerID variable to that of the man...
playerChar2.onActivate(function() {
    playerID = "LP_Man";
    playerChar2.setOpacity(0.5);
});

//if button is clicked, clear the scene without the camera and start the game
var button = Scene.getItem("Play");
button.onActivate(function() { 
    Scene.clearWithoutCameras();

    //creates game character
    var character = Scene.createItem("LP_Wom", 0, 10, 0);
    character.setPositionAngle(0, 10, 0, 0, 0, 10, 3.14159); //180 degree rotation to face camera

    //creates player character using playerID set from earlier depending on whether woman or man was clicked
    var player = Scene.createItem(playerID, 0, -1, 0);

    //if called on, makes game character start the conversation 
    function init() {
        character.say("Hi!")
    };
    //calling conversation start after one second
    Scene.schedule(init, 1);

    //one choice player could make and the results if that choice is clicked
    var response1 = Scene.createTextBillboard(-5, 5, 0);
    response1.setText("Hi!")
    response1.onActivate(function() {
        player.say("Hi!");
        Scene.schedule(next, 1);
        response1.deleteFromScene();
        response2.deleteFromScene();
        response3.deleteFromScene();
    })

    //if called on, handles game character response to player's wrong choice
    function tryAgain() {
        character.say("Uh...");
        var tryAgain = Scene.createTextBillboard(0, 5, 3);
        tryAgain.setText("Try Again");
        tryAgain.onActivate(function() {
            tryAgain.deleteFromScene();
            init();
        })
    }

    //one choice player could make and the results if that choice is clicked
    var response2 = Scene.createTextBillboard(0, 5, 0);
    response2.setText("Bye!")
    response2.onActivate(function() {
        player.say("Bye!");
        Scene.schedule(tryAgain, 1);
    })

    //one choice player could make and the results if that choice is clicked
    var response3 = Scene.createTextBillboard(5, 5, 0);
    response3.setText("kljdgosdji!")
    response3.onActivate(function() {
        player.say("kljdgosdji!");
        Scene.schedule(tryAgain, 1);
    })

    //if called, makes game character continue the conversation if correct choice was clicked by player
    function next() {
        character.say("How's it going?");

        //one choice player could make and the results if that choice is clicked
        var response1 = Scene.createTextBillboard(-5, 5, 0);
        response1.setText("Good! And you?")
        response1.onActivate(function() {
            player.say("Good! And you?");
            Scene.schedule(final, 1);
            response1.deleteFromScene();
            response2.deleteFromScene();
            response3.deleteFromScene();
        })

        //if called, handles game character response to player's wrong choice
        function tryAgain() {
            character.say("Uh...");
            var tryAgain = Scene.createTextBillboard(0, 5, 3);
            tryAgain.setText("Try Again");
            tryAgain.onActivate(function() {
                tryAgain.deleteFromScene();
                next();
            })
        }

        //one choice player could make and the results if that choice is clicked
        var response2 = Scene.createTextBillboard(0, 5, 0);
        response2.setText("No.")
        response2.onActivate(function() {
            player.say("No.");
            Scene.schedule(tryAgain, 1);
        })

        //one choice player could make and the results if that choice is clicked
        var response3 = Scene.createTextBillboard(5, 5, 0);
        response3.setText("Yes?")
        response3.onActivate(function() {
            player.say("Yes?");
            Scene.schedule(tryAgain, 1);
        })

        //if called, makes game character end the conversation if correct choice was clicked by player
        function final() {
            character.say("Good, thank you!")
            var win = Scene.createTextBillboard(0, 5, 3);
            win.setText("Awesome job!");
        }
    }

    //copy/paste/edit repeat! 
    //use "next" function so that the response variable names can stay the same...
    //then you can just change the values of the speech bubbles and choices...
    //you could even make it so that there's no wrong answer, just different reactions to different answers
});
