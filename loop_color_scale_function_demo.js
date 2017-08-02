function randNumBetween(min, max) {
    return Math.random() * (max - min) + min;
}

var count = 10; 
for (var i = -5; i < count; i++) { 
    var car = Scene.createItem("LP_Car", i, 5, 0); 
    car.setColor(randNumBetween)
    car.setScale(0.5);
}
