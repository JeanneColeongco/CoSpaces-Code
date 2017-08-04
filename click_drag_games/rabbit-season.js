var camera = Scene.getCamera();

var dog = Scene.createItem("LP_Dog", 0, 0, 0);
dog.addMoveCollisionInteraction();

function randNumBetween(min, max) {
    return Math.random() * (max - min) + min;
}

function makeRabbit() {
    var rabbit = Scene.createItem("LP_Rabbit", randNumBetween(-5, 5), randNumBetween(-5, 5), 0);
    Scene.scheduleRepeating(function() {
        rabbit.move(randNumBetween(-3, 3), randNumBetween(-3, 3));
        var rPos = rabbit.getPosition();
        if (rPos.x < -10 || rPos.x > 10 || rPos.y < -10 || rPos.y > 10) {
            rabbit.moveTo(0, 0, 0);
            if (rPos.x === 0 && rPos.y === 0) {
                rabbit.move(randNumBetween(-3, 3), randNumBetween(-3, 3));
            }
        }
    }, 1);
}

//var rabbits = [];
var score = 0;

/*var rabbitMaker = Scene.scheduleRepeating(function() {
    var newRabbit = makeRabbit();
    rabbits.push(newRabbit);
    if (rabbits.length > 5) {
        rabbitMaker.dispose();
    }
}, 0);*/

makeRabbit();


Scene.onButtonDown(function() {
    dog.move(0, 2);
}, "n");
Scene.onButtonDown(function() {
    dog.move(0, -2);
}, "s");
Scene.onButtonDown(function() {
    dog.move(2, 0);
}, "e");
Scene.onButtonDown(function() {
    dog.move(-2, 0);
}, "w");


dog.onCollisionEnter(function(rabbit) {
    //var index = rabbits.indexOf(this);
    //rabbits.splice(index, 1);
    rabbit.deleteFromScene();
    dog.say("Woof!");
    score++;
});

dog.onCollisionExit(function(rabbit) {
    dog.say(" ");
})

var scoreboard = Scene.getItem("scoreboard");
scoreboard.setText("Catch the rabbit! Click and drag the dog!");
scoreboard.showInfoPanel("Catch the rabbit!", null, "Click and drag the dog!", true);
Scene.scheduleRepeating(function() {
    var dPos = dog.getPosition();
    camera.setPosition(dPos.x, dPos.y-5, 1.75);
    //scoreboard.setText("Rabbits:" + score + "/6");
    if (score === 1) {
        scoreboard.setText(/*"You caught them all!"*/ "You caught 'em!");
        scoreboard.showInfoPanel("You caught 'em!", null, null, true, function() {
            Space.finishPlayMode('67d45f92ab27de23acb9e4ae0e8b2536a96296b24b91a5a7990a05b7a173783d');
        });
        dog.say("*pants heavily*");
    }
}, 0);
