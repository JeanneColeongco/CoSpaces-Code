//see space: https://cospac.es/GYws

//customization/extension suggestions (also in lesson plan): you're only able to click on one car while the others race against you, you can only click on one car while chasing a second, you can only click one car and need to avoid/stop so you don't hit randomly spawning obstacles, etc.

//game instructions: Help clear the way! Click the rock to get rid of it! You can only click on the rocks saying even numbers! Click the cars to move them forward!
//created instructions billboard and set text directly in the scene

function delay() { //wrapping everything in a function for later use
    
    //initializing variables
    var time = 0;
    var cleared = 0;

    //repeatedly check "time" and "cleared" values to display them on the billboard
    Scene.scheduleRepeating(function() {
        var board = Scene.getItem("board");
        //the above assumes you created a billboard and named it "timer"
        //create a billbaord: Library > Building Blocks > third item from the left > drag to scene
        //name an item: double click on it in the scene, hover over the second icon, type desired name
        board.setText("Cleared: " + cleared + "\nTime: " + time);
        time++; //increment time by 1 every second
    }, 1);

    var items = []; //declare empty array for later use

    //generate a random number between a minimum and maximum
    function randNumBetween(min, max) {
        return Math.random() * (max - min) + min;
    }

    var count = 2; //assigns value of 2 to variable "count"

    //assigns value of -2 to variable "i"...
    //if "i" value is less than "count" value...
    //incrememnt "i" by 1...
    for (var i = -2; i < count; i++) { 
        //create a car at x position i and y position 5
        var item = Scene.createItem("LP_Car", i, 5, 0);

        //give the car a random color
        item.setColor(randNumBetween(0, 255), randNumBetween(0, 255), randNumBetween(0, 255));
        item.setScale(0.5); //set car size to half the default
        items.push(item); //add car to items array
    }

    //for each car in the items array...
    items.forEach(function(item) {
        //if car is clicked...
        item.onActivate(function() {
            //move car 1 unit along the y axis (forward from default camera view)
            item.move(0, 1);
        });
        //if the car hits the opponent (rock)...
        item.onCollisionEnter(function(opponent) {
            item.deleteFromScene(); //delete the car from the scene
            opponent.showInfoPanel("You crashed!", null, null, null, null); //tell the user he/she crashed
        });
        //repeatedly check if the car's position is more than or equal to 9 (whether or not it has gotten to the end of opponents)
        Scene.scheduleRepeating(function() {
            if (item.getPosition().y >= 9) {
                item.say("Thanks!"); //display user message
                //move car 100 units along the y axis (forward from default camera view, pretty much into the horizon)
                item.move(0, 100); 
            }
        }, 0);
    })

    var opponents = []; //declare empty array for later use

    //initialize variables
    var countI = 2; 
    var countJ = 10;

    //assign value of -2 to variable "i"...
    //if "i" value is less than "countI" value...
    //increment "i" by 1...
    for (var i = -2; i < countI; i++) { 
        //assign value of -2 to variable "j"...
        //if "j" value is less than "countJ" value...
        //increment "j" by 1...
        for (var j = 6; j < countJ; j++) {
            //create rock at x position i and y position j
            var opponent = Scene.createItem("LP_Stone", i, j, 0); 
            opponent.setColor(150, 150, 150); //set rock color to gray
            opponents.push(opponent); //add rock to opponents array
        }
    }

    //delcaring empty arrays for later use
    var nums = [];
    var done = [];

    //for every opponent in the opponents array...
    opponents.forEach(function(opponent) {
        //check if opponent is being hovered over...
        opponent.onHover(function(isHovered) {
            //if it is, display a random number between 0 and 100...
            if (isHovered) {
                var num = Math.round(randNumBetween(0, 100)); 
                nums.push(num); //add number to nums array
                opponent.say(num);
                //if the opponent is clicked...
                opponent.onActivate(function() {
                    //and the number displayed is evenly divisible by two...
                    if (num%2 === 0) {
                        //delete the opponent from the scene...
                        opponent.deleteFromScene();
                        var index = opponents.indexOf(opponent);
                        opponents.splice(index, 1);
                        done.push(opponent); //add deleted opponent to done array
                        //and give the player a point...
                        cleared++;
                    }
                })
            }
            //otherwise, display nothing
            else {
                opponent.say("");
            }
        });
    })
    
}

Scene.schedule(delay, 2); //calling function from earlier 2 seconds after program initiates
//this gives the user time to get into VR mode and be able to click on Scene items
//otherwise, onActivate won't work
