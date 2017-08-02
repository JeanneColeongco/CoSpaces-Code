//game instructions: Help clear the way! Click the rock to get rid of them! You can only click on the rocks saying even numbers! Click the cars to move them forward!
//created instructions billboard and set text directly in the scene
//see space: https://cospac.es/GYws

var time = 0;
var cleared = 0;
Scene.scheduleRepeating(function() {
    var board = Scene.getItem("board");
    //the above assumes you created a billboard and named it "timer"
    //create a billbaord: Library > Building Blocks > third item from the left > drag to scene
    //name an item: double click on it in the scene, hover over the second icon, type desired name
    board.setText("Cleared: " + cleared + "\nTime: " + time);
    time++;
}, 1);

var items = [];

function randNumBetween(min, max) {
    return Math.random() * (max - min) + min;
}

var count = 2; 
for (var i = -2; i < count; i++) { 
    var item = Scene.createItem("LP_Car", i, 5, 0); 
    item.setColor(randNumBetween(0, 255), randNumBetween(0, 255), randNumBetween(0, 255));
    item.setScale(0.5);
    items.push(item);
}

items.forEach(function(item) {
    item.onActivate(function() {
        item.move(0, 1);
    });
    item.onCollisionEnter(function(opponent) {
        item.deleteFromScene(); 
        opponent.showInfoPanel("You crashed!", null, null, null, null);
    });
    Scene.scheduleRepeating(function() {
        if (item.getPosition().y >= 9) {
            item.say("Thanks!");
            item.move(0, 100);
        }
    }, 0);
})

var opponents = [];

var countI = 2; 
var countJ = 10;
for (var i = -2; i < countI; i++) { 
    for (var j = 6; j < countJ; j++) {
        var opponent = Scene.createItem("LP_Stone", i, j, 0); 
        opponent.setColor(150, 150, 150);
        opponents.push(opponent);
    }
}

var nums = [];
var done = [];

opponents.forEach(function(opponent) {
    opponent.onHover(function(isHovered) {
        if (isHovered) {
            var num = Math.round(randNumBetween(0, 100));
            nums.push(num);
            opponent.say(num);
            opponent.onActivate(function() {
                if (num%2 === 0) {
                    opponent.deleteFromScene();
                    var index = opponents.indexOf(opponent);
                    opponents.splice(index, 1);
                    done.push(opponent);
                    cleared++;
                }
            })
        }
        else {
            opponent.say("");
        }
    });
})
