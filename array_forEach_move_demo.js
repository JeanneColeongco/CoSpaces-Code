//see space: https://cospac.es/zBRM

var items = [];

function randNumBetween(min, max) {
    return Math.random() * (max - min) + min;
}

var count = 5; 
for (var i = -5; i < count; i++) { 
    var item = Scene.createItem("LP_Car", i, 5, 0); 
    item.setColor(randNumBetween(0, 255), randNumBetween(0, 255), randNumBetween(0, 255));
    item.setScale(0.5);
    items.push(item);
}

items.forEach(function(item) {
    item.move(0, 2);
});
