var item = Scene.createItem("LP_Car", 0, 5, 0);
item.setScale(0.5);
item.setColor(255, 0, 0);
item.onActivate(function() {
    item.move(0, 2);
});
