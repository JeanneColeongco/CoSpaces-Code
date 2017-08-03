//environment created at https://studio.cospaces.io/#Gallery:37B06gl01mqnXFuMN90knO (copied to my spaces July 26, 2017)
//see space: https://cospac.es/GdU3

var camera = Scene.getCamera(); //gets camera item

//creating/initializing scoreboard
var stats = Scene.createTextBillboard(-2, -18, 2);
stats.setText("Click the signs and choose thier correct meaning! Click me to start!");
var time = 0;
var points = 0;

//scoreboard at work
stats.onActivate(function() {
    var timer = Scene.scheduleRepeating(function() {
        time++; //increments time by 1 every second
        stats.setText("Score: " + points + "\nTime: " + time);
    }, 1);
});

//creating car
var car = Scene.createItem("LP_Car", 0.5, -20.5, 0);
car.setColor(150, 0, 0);
car.setScale(0.8);

/*
*
Let the game begin
*
*/

//why does this break everything if I include it?
//var engine = Scene.loadSound("G50xr5mne1YvshUNmal8LrPaPYXLU4qGnUyetjF4kih").play(true);
//engine.setVolume(0.5);

//declaring variable choiceA for later use...
var choiceA;

//if called will delete choiceA from scene
function deleteChoiceA() {
    choiceA.deleteFromScene();
}

Scene.scheduleRepeating(function() {
    var camPos = camera.getPosition(); //gets camera item

    //setting position of stats and car relative to camera...
    //since it's inside a scheduleRepeating function...
    //it looks like they're moving forward in tandem with camera view
    stats.setPosition(camPos.x-1.75, camPos.y+5, camPos.z+0.25);
    car.setPosition(camPos.x+0.5, camPos.y+5, 0);
    //possibly use camera.getDirection in the future...
    //to be able to generate billboards in the direction the camera is facing...
    //enabling fruitful left/right turns 

    /*
    every item created in CoSpaces has it's own unique id
    that can be used to access the item via getItem 
    */
    var yieldSign = Scene.getItem("dvayVrrAch"); 
    //if sign is clicked, show a bunch of choices
    yieldSign.onActivate(function() {
        //one choice player could make and the results if that choice is clicked
        choiceA = Scene.createTextBillboard(0, camPos.y+5, 3);
        choiceA.setText("Yield, check to see that it's safe before crossing the intersection.");
        choiceA.onActivate(function() {
            points++;
            choiceA.setText("You're right! Keep going!");
            Scene.schedule(deleteChoiceA, 1);
            choiceB.deleteFromScene();
            choiceC.deleteFromScene();
        });

        //one choice player could make and the results if that choice is clicked
        var choiceB = Scene.createTextBillboard(0, camPos.y+5, 2);
        choiceB.setText("Stop, come to a full stop before crossing the intersection.");
        choiceB.onActivate(function() {
            choiceB.setText("Oops! Try again!");
        });

        //one choice player could make and the results if that choice is clicked
        var choiceC = Scene.createTextBillboard(0, camPos.y+5, 1);
        choiceC.setText("Warning, cross the intersection at your own risk.");
        choiceC.onActivate(function() {
            choiceC.setText("Oops! Try again!");
        });
    });

    var noEntrySign = Scene.getItem("qCEP4ibpfV");
    //if sign is clicked, show a bunch of choices
    noEntrySign.onActivate(function() {
        //one choice player could make and the results if that choice is clicked
        choiceA = Scene.createTextBillboard(0, camPos.y+5, 3);
        choiceA.setText("Do not enter due to oncoming traffic.");
        choiceA.onActivate(function() {
            points++;
            choiceA.setText("You're right! Keep going!");
            Scene.schedule(deleteChoiceA, 1);
            choiceB.deleteFromScene();
            choiceC.deleteFromScene();
        });

        //one choice player could make and the results if that choice is clicked
        var choiceB = Scene.createTextBillboard(0, camPos.y+5, 2);
        choiceB.setText("Private property, keep out.");
        choiceB.onActivate(function() {
            choiceB.setText("Oops! Try again!");
        });

        //one choice player could make and the results if that choice is clicked
        var choiceC = Scene.createTextBillboard(0, camPos.y+5, 1);
        choiceC.setText("Warning, enter at your own risk.");
        choiceC.onActivate(function() {
            choiceC.setText("Oops! Try again!");
        });
    });

    var speedLimitSign = Scene.getItem("lqf0ZIQJt0");
    //if sign is clicked, show a bunch of choices
    speedLimitSign.onActivate(function() {
        //one choice player could make and the results if that choice is clicked
        choiceA = Scene.createTextBillboard(0, camPos.y+5, 3);
        choiceA.setText("The maximum speed limit is 55 kilometers.");
        choiceA.onActivate(function() {
            points++;
            choiceA.setText("You're right! Keep going!");
            Scene.schedule(deleteChoiceA, 1);
            choiceB.deleteFromScene();
            choiceC.deleteFromScene();
        });

        //one choice player could make and the results if that choice is clicked
        var choiceB = Scene.createTextBillboard(0, camPos.y+5, 2);
        choiceB.setText("The minimum speed limit is 55 kilometers.");
        choiceB.onActivate(function() {
            choiceB.setText("Oops! Try again!");
        });

        //one choice player could make and the results if that choice is clicked
        var choiceC = Scene.createTextBillboard(0, camPos.y+5, 1);
        choiceC.setText("The mean speed limit is 55 kilometers.");
        choiceC.onActivate(function() {
            choiceC.setText("Oops! Try again!");
        });
    });

    //if camera reaches the edge of the cityscape street...
    //give it a new location at the beginning of a new street
    //...just a sort of temporary fix until I can figure out how to use getDirection
    if (camPos.x >= -1 && camPos.y > 15) {
        camera.setPosition(-9, -24, 0.75);
    }

    //copy, paste, edit, repeat!

}, 0);



//glitching for some reason...
/*
*
HUD - Heads-Up Display
*
*/

/*
//accessing the camera item
var camera = Scene.getCamera();

//accessing the pivot item (cube)
var pivot = Scene.getItem("HUD-Pivot");
pivot.setOpacity(0);

//accessing the scoreboard item
var scoreboard = Scene.getItem("Start");

//designating the HUD position based on camera position
function updateHud(offsetX, offsetY, offsetZ){
    //Quaternion Magic
    var d = {x: 1, y: 0, z: 0};
    var angle = Math.PI * 0.5;
    var sinA = Math.sin(angle * 0.5);
    var cosA = Math.cos(angle * 0.5);
    pivot.setRelativeToCamera(offsetX,offsetY,offsetZ,d.x * sinA,d.y * sinA,d.z * sinA,cosA);
}

//updating HUD position repeatedly many times a second so that it follows the camera
Scene.scheduleRepeating(function(){
    updateHud(0,0,3);
}, 0);
*/
