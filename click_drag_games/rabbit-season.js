//see space: https://cospac.es/3LCw

//just change item ids for your own to customize your own game - make the dog chase a bird, or a car, or make a human chase the runaway dog, or a car/bike chase like the movies
//can also change the ".setText()" values or "move()" values to change the game

//possible extension: end game if time exceeds x number of seconds

var camera = Scene.getCamera(); //gets camera item

var dog = Scene.createItem("LP_Dog", 0, 0, 0); //creates a dog at the default camera position
dog.addMoveCollisionInteraction(); //enables the dog to be clicked and dragged to move around the scene and catch the rabbits, will collide with other items

//generates a random number between a minimum and maximum
function randNumBetween(min, max) {
    return Math.random() * (max - min) + min;
}

//if called on, will...
function makeRabbit() {
    //make a rabbit at a random position between x positions -5 and 5, and y positions -5 and 5
    var rabbit = Scene.createItem("LP_Rabbit", randNumBetween(-5, 5), randNumBetween(-5, 5), 0);
    
    //repeatedly move rabbits a random number of units between -3 and 3 along the x and y axis
    Scene.scheduleRepeating(function() {
        rabbit.move(randNumBetween(-3, 3), randNumBetween(-3, 3));
        var rPos = rabbit.getPosition(); //get the rabbit's position
        
        //if the rabbit position goes over a set limit (i.e. too far from the dog)...
        if (rPos.x < -10 || rPos.x > 10 || rPos.y < -10 || rPos.y > 10) {
            rabbit.moveTo(0, 0, 0); //move the rabbit back to the cenre of the grid
            
            //if the rabbit is back at the center of the grid...
            if (rPos.x === 0 && rPos.y === 0) {
                //go back to moving randomly
                rabbit.move(randNumBetween(-3, 3), randNumBetween(-3, 3));
            }
        }
    }, 1);
}

//var rabbits = [];
var score = 0; //sets variable "score" to value of 0

/*var rabbitMaker = Scene.scheduleRepeating(function() {
    var newRabbit = makeRabbit();
    rabbits.push(newRabbit);
    if (rabbits.length > 5) {
        rabbitMaker.dispose();
    }
}, 0);*/

makeRabbit(); //calling make rabbit function to make a rabbit

//gives user the option to use keyboard keys n, s, e, and w, standing for north, south, east, and west
//not really practical in VR right now, but syncing controls is an option for it to work
//onButtonDown is an undocumented function and may be subject to change in the future
Scene.onButtonDown(function() {
    dog.move(0, 2); //moves dog in a position direction along the y axis
}, "n");
Scene.onButtonDown(function() {
    dog.move(0, -2); //moves dog in a negative direction along the y axis
}, "s");
Scene.onButtonDown(function() {
    dog.move(2, 0); //moves dog in a positive direction along the x axis
}, "e");
Scene.onButtonDown(function() {
    dog.move(-2, 0); //moves dog in a negative direction along the x axis
}, "w");

//if dog collided with rabbit (i.e. caught the rabbit)
dog.onCollisionEnter(function(rabbit) {
    //var index = rabbits.indexOf(this);
    //rabbits.splice(index, 1);
    rabbit.deleteFromScene(); //delete rabbit from scene
    dog.say("Woof!"); //dog lets out a gratified woof
    score++; //add 1 to score
});

//if dog comes out of collision with rabbit, stop barking
dog.onCollisionExit(function(rabbit) {
    dog.say("");
})

//assumes you have created an item directly in the scene and gave it a custom name of "scoreboard"
//to create an item click library > building blocks or library > 3D low poly items
//to name an item, double click on the item in the scene > click the second icon in the pop-up menu, type desired name, hit enter to save changes
var scoreboard = Scene.getItem("scoreboard"); 

scoreboard.setText("Catch the rabbit! Click and drag the dog!"); //write text on scoreboard

scoreboard.showInfoPanel("Catch the rabbit!", null, "Click and drag the dog!", true); //write instructions in pop-up at the beginning of the game so that players know what to do

//repeatedly...
Scene.scheduleRepeating(function() {
    var dPos = dog.getPosition(); //get dog's position
    camera.setPosition(dPos.x, dPos.y-5, 1.75); //sets camera's position to follow the dog wherever it goes
    //scoreboard.setText("Rabbits:" + score + "/6");
    
    //if score is 1...
    if (score === 1) {
        //show user messages
        scoreboard.setText(/*"You caught them all!"*/ "You caught 'em!"); 
        scoreboard.showInfoPanel("You caught 'em!", null, null, true, function() {
            //end the game
            Space.finishPlayMode('67d45f92ab27de23acb9e4ae0e8b2536a96296b24b91a5a7990a05b7a173783d');
        });
        dog.say("*pants heavily*"); //show that dog is tired, but happy :)
    }
}, 0);
