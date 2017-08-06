//if beaker contents is clicked, a catalyst/enzyme/what-have-you is dropped in...
//and the appropriate functions are called to simulate the reaction
acid.onActivate(function() {
    var i = 0;
    var base = Scene.scheduleRepeating(function() {
        var cube = Scene.createItem("Cuboid", 0, 3, 5);
        cube.setColor(100, 100, 100);
        cube.moveLinear(0, 3, 0, 1);
        var pos = cube.getPosition();
        cube.onCollisionEnter(function() {
            bubbleUp();
            changeColor();
            base.dispose();
            cube.deleteFromScene();
            var makeBubble = Scene.scheduleRepeating(function() {
                var bubble = Scene.createItem("LP_Sphere", randNumBetween(-1.8, 1.7), randNumBetween(1.3, 4.7), 3.5);
                bubble.setColor(255, 255, 255);
                bubbles.push(bubble);
                if (bubbles.length > 80) {
                    makeBubble.dispose();
                    bubbles.forEach(function(bubble) {
                        bubble.deleteFromScene();
                        var index = bubbles.indexOf(bubble);
                        bubbles.splice(index, 1);
                    })
                }
            }, 0);
            
        });
    }, 1);
})
