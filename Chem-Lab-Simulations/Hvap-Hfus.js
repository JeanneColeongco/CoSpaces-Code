//see space: https://cospac.es/5wxD
//navigate to scene 2 using the toggle at the bottom of the scene

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

//helper function to generate random values
function randNumBetween (min, max) {
    return Math.random() * (max - min) + min;
}

var bubbles = [];

//if called on, bubbles are made and added to "bubbles" array
function bubble() {
    var makeBubble = Scene.scheduleRepeating(function() {
        var bubble = Scene.createItem("LP_Sphere", randNumBetween(-1.8, 1.7), randNumBetween(1.3, 4.7), 3.5);
        bubble.setColor(255, 255, 255);
        bubbles.push(bubble);  

        //if a certain number of bubbles are made...
        //the function stops making bubbles and...
        //all the bubbles start to decrease with the water level...
        //before getting deleted from the scene. 
        if (bubbles.length > 25) {
            bubbles.forEach(function(bubble) {
                bubble.move(0, 0, -3.5, function() {bubble.deleteFromScene()});
            });
            makeBubble.dispose();
        }
    }, 0);
}

function bubbleUp() {
    var bubbler = Scene.loadSound("jbROmHBPoaM5RYH0eNfIMOLyNXB7egazkUWiBiFWHld");
    bubbler.play(false);
    Scene.schedule(bubbler.stop, 2);
}

var evap = Scene.createTextBillboard(2, 0, 0);
evap.setText("Boil the water");
//if the billboard is clicked...
//water (beaker contents) will appear (could make increase in height slowly so it looks like it's filling the beaker)
//the water boiling sounds will play...
//water level decreases and bubbles fall with it...
//when process is done, the beaker is again emptied (could have water level decrease in height slowly...)

evap.onActivate(function() {
    var water = Scene.createItem("Cuboid", 0, 3, 0);
    water.setScale(3.8);
    water.setHeight(0);
    water.setColor(0, 100, 200);
    var waterH = 0;
    var increase = Scene.scheduleRepeating(function() {
        water.setHeight(waterH);
        waterH+=0.01;
        if (waterH >= 1) {
            increase.dispose();
        }
    }, 0);
    
    Scene.schedule(bubbleUp, 1.5);
    Scene.schedule(bubble, 1.5);
    Scene.schedule(boil, 2);

    function boil() {
        var waterH = 1;
        var decrease = Scene.scheduleRepeating(function() {
            water.setHeight(waterH);
            waterH-=0.01;
            if (waterH === 0) {
                decrease.dispose();
            }
        }, 0);
    }    
});

var melt = Scene.createTextBillboard(-2, 0, 0);
melt.setText("Melt the ice");
//if the billboard is clicked...
//ice (beaker contents) will appear
//ice scale decreases (shrinks) while water level rises...
//when process is done, the beaker is again emptied (could have water level decrease in height slowly...)

melt.onActivate(function() {
    var ice = Scene.createItem("Cuboid", 0, 3, 5);
    ice.setScale(3.8);
    ice.setColor(255, 255, 255);
    ice.moveLinear(0, 3, 0, 1);

    Scene.schedule(melting, 1);

    function melting() {
        var scale = 3.8
        var melter = Scene.scheduleRepeating(function() {
            ice.setScale(scale);
            scale -= 0.05;
            if (scale <= 0) {
                melter.dispose();
            }
        }, 0);
        var water = Scene.createItem("Cuboid", 0, 3, 0);
        water.setScale(3.8)
        water.setHeight(0);
        water.setColor(0, 100, 200);

        var waterH = 0;
        var increase = Scene.scheduleRepeating(function() {
            water.setHeight(waterH);
            waterH+=0.01;
            if (waterH >= 1) {
                increase.dispose();
                Scene.schedule(empty, 1);
            }
        }, 0);
    function empty() {
        var decrease = Scene.scheduleRepeating(function() {
            water.setHeight(waterH);
            waterH-=0.01;
            if (waterH === 0) {
                decrease.dispose();
            }
        }, 0);
    }
    
    }
});
