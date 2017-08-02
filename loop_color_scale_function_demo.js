function randNumBetween(min, max) {
    return Math.random() * (max - min) + min;
}

var count = 5; 
for (var i = -5; i < count; i++) { 
    var item = Scene.createItem("LP_Car", i, 5, 0); //can input different id in place of "LP_Car"
    item.setColor(randNumBetween(0, 255), randNumBetween(0, 255), randNumBetween(0, 255))
    item.setScale(0.5);
}
