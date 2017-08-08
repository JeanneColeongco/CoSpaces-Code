//see space: https://cospac.es/5wxD
//navigate to scene 2 using the toggle at the bottom of the scene

//possible extensions/customizations: a solid to gas reaction, a water cycle simulation, Hvap/Hfus equations display that updates repeatedly as the values change due to the progress of the reaction, add different water levels to initialize with, etc.

function delay() { //wrapping everything in a function for later use
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

    beaker(); //creating beaker by calling beaker function

    //helper function to generate random values
    function randNumBetween (min, max) {
        return Math.random() * (max - min) + min;
    }

    var bubbles = []; //creating empty bubbles array for later use

    //if called on, bubbles are made and added to "bubbles" array
    function bubble() {
        var makeBubble = Scene.scheduleRepeating(function() {
            //generates bubbles at random locations within the beaker limits
            var bubble = Scene.createItem("LP_Sphere", randNumBetween(-1.8, 1.7), randNumBetween(1.3, 4.7), 3.5);
            bubble.setColor(255, 255, 255); //colors bubbles white
            bubbles.push(bubble); //adds bubbles to bubbles array

            //if a certain number of bubbles are made...
            
            
            
            if (bubbles.length > 25) {
                bubbles.forEach(function(bubble) {
                    //all the bubbles start to decrease with the water level before getting deleted from the scene and the bubbles array
                    bubble.move(0, 0, -3.5, function() {bubble.deleteFromScene(); var index = bubbles.indexOf(bubble);
                            bubbles.splice(index, 1);});
                });
                makeBubble.dispose(); //the function stops making bubbles
            }
        }, 0);
    }

    //if called on, makes bubbles sound
    function bubbleUp() {
        var bubbler = Scene.loadSound("jbROmHBPoaM5RYH0eNfIMOLyNXB7egazkUWiBiFWHld");
        bubbler.play(false);
        Scene.schedule(bubbler.stop, 2);
    }

    //clickable billboard to start the evaporation reaction
    var evap = Scene.createTextBillboard(2, 0, 0);
    evap.setText("Boil the water");
    
    //if called on, calls for bubbles to be created and for the bubbles to sound
    function bubbling() {
        bubble();
        bubbleUp();
    }
    
    //if billboard is clicked...
    evap.onActivate(function() {
        //create "water" 
        var water = Scene.createItem("Cuboid", 0, 3, 0);
        water.setScale(3.8); //set size to fit beaker space
        water.setColor(0, 100, 200); //set color to blue
        
        //initialize water height at 0
        water.setHeight(0); 
        var waterH = 0;
        
        //repeatedly...
        var increase = Scene.scheduleRepeating(function() {
            water.setHeight(waterH); //set water height to the variable "waterH"
            waterH+=0.01; //incrememnt (increase) water height
            
            //if water height reaches/exceeds 1...
            if (waterH >= 1) {
                increase.dispose(); //stop increasing water height
            }
        }, 0);
    
        //if called on, will...
        function boil() {            
            var waterH = 1; //sets water height to 1 (it would already be 1 from above increase function)
            
            //repeatedly...
            var decrease = Scene.scheduleRepeating(function() {
                water.setHeight(waterH); //set water height to the variable "waterH"
                waterH-=0.01; //decrease value of "waterH"
                
                //if water height reaches 0...
                if (waterH === 0) {
                    decrease.dispose(); //stop decreasing height
                }
            }, 0);
        }    
        
        Scene.schedule(bubbling, 1.5); //calls bubbling function after a 1.5 second delay
        Scene.schedule(boil, 2); //calls boil function after 2 second delay
        
    });
    
    //clickable billboard to start melt reaction
    var melt = Scene.createTextBillboard(-2, 0, 0);
    melt.setText("Melt the ice");
    
    //if the billboard is clicked...
    melt.onActivate(function() {
        var ice = Scene.createItem("Cuboid", 0, 3, 5); //create an "ice" cube above the beaker
        ice.setScale(3.8); //size cube to fill beaker space
        ice.setColor(255, 255, 255); //color cube white
        ice.moveLinear(0, 3, 0, 1); //move cube down into beaker
        
        Scene.schedule(melting, 1); //calls on melting function after 1 second delay

        //if called on, will...
        function melting() {
            var scale = 3.8 //set ice size (would already be set when created)
            
            //repeatedly...
            var melter = Scene.scheduleRepeating(function() {
                ice.setScale(scale); //set ice cube size to value of variable "scale"
                scale -= 0.05; //decrease ice cube size
                
                //if size is less than or equal to 0...
                if (scale <= 0) {
                    melter.dispose(); //stop decreasing
                }
            }, 0);
            
            var water = Scene.createItem("Cuboid", 0, 3, 0); //create "water"
            water.setScale(3.8) //set size of water to fill beaker space
            water.setColor(0, 100, 200); //set color to blue
            
            //initialize water height at 0
            water.setHeight(0);
            var waterH = 0;
            
            //repeatedly...
            var increase = Scene.scheduleRepeating(function() {
                water.setHeight(waterH); //set water height to value of variable "waterH"
                waterH+=0.01; //increase value of "waterH"
                
                //if water height is more than or equal to 1...
                if (waterH >= 1) {
                    increase.dispose(); //stop increasing
                    Scene.schedule(empty, 1); //call the empty function after a 1 second delay
                }
            }, 0);
            
        //if called on, will...
        function empty() {
            //repeatedly...
            var decrease = Scene.scheduleRepeating(function() {
                water.setHeight(waterH); //set water height to value of variable "waterH"
                waterH-=0.01; //decrease waterH
                
                //if water height reaches 0...
                if (waterH === 0) {
                    decrease.dispose(); //stop decreasing
                }
            }, 0);
        }
        
        }
    });

}

Scene.schedule(delay, 2); //calling function from earlier 2 seconds after program initiates
//this gives the user time to get into VR mode and be able to click on Scene items
//otherwise, onActivate won't work
