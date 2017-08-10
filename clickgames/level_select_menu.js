//see space: https://cospac.es/SBnH
//navigate to scene 2 with the toggle at the bottom of the scene

//buttons (billboards, animal items) need to be clicked and dragged directly onto the scene from Library > Building Blocks or Library > 3D Low Poly
//otherwise onActivate breaks
//for using getItem, make sure to either use the item id or the custom name you created for your button
//full explanation here: https://groups.google.com/forum/?utm_medium=email&utm_source=footer#!msg/cospaces-group/fxJbBmVq3sc/qDsaLTXQAwAJ

/*
player object
to be able to call faceTo() on animals
not necessary but if more levels are added
it will be nice to be able to pan around in VR
to see all w/o hassle of fine detail click/drag/rotate placement
*/
function Player() {
  this.item = Scene.createItem('LP_Wom', 0, 0, 0); //can change id; position is set to where camera is by default
  this.item.setOpacity(0); //makes player item invisible; visible would be set to 1
}

var player = new Player(); //calling Player function to create player item

/*
every created item and scene in CoSpaces has it's own unique item id 
you would need to access the ids of your item(s) and scene(s)
items: double click item > click first icon > click copy id
scene: click environment > copy id in top right corner of pop-up
*/

//level 1 (Cubes)
var butterfly = Scene.getItem("a9aw1huKWR"); //id for item placed directly in scene, can use any item from CoSpaces library
butterfly.faceTo(player.item); //undocumented function, may change in the future
butterfly.onActivate(function() {
    Space.goTo("hHhYfXXkol4HiDKwYj0TlT"); //unique scene id
});

//level 2 - TBA
var rabbit = Scene.getItem("N5ePiApg8e"); //id for item placed directly in scene, can use any item from CoSpaces library
rabbit.faceTo(player.item); //undocumented function, may change in the future
rabbit.onActivate(function() {
    rabbit.say("Level 2");
});

//level 3 - Just Play (Lions and Birds)
var dog = Scene.getItem("JdxlTHDl2C"); //id for item placed directly in scene, can use any item from CoSpaces library
dog.faceTo(player.item); //undocumented function, may change in the future
dog.onActivate(function() {
    Space.goTo("M023xFYBGeZXyStk3SgX3F"); //unique scene id
});

//level 4 - TBA
var horse = Scene.getItem("MJxslljugV"); //id for item placed directly in scene, can use any item from CoSpaces library
horse.faceTo(player.item); //undocumented function, may change in the future
horse.onActivate(function() {
    horse.say("Level 4");
});

//level 5 - Avoid (Elephant Herd)
//encountering issues with being able to shoot multiple fireballs while spawning cubes in a scheduleRepeating function
var elephant = Scene.getItem("jTak57HjNC"); //id for item placed directly in scene, can use any item from CoSpaces library
elephant.faceTo(player.item); //undocumented function, may change in the future
elephant.onActivate(function() {
    Space.goTo("IjClgirjrsZ2cdylLtF2iF"); //unique scene id
});

//back to menu button
var back = Scene.getItem("Back to Menu");
  back.onActivate(function() {
      Space.goTo("D1jcKhBNIfhV9S4wVLNHtw"); //unique scene id
  });

//play button
var gameName = Scene.getItem('Play');
gameName.onActivate(function() {
    Space.goTo("3tEosaTcOV4ztf4X3l0LTy"); //unique scene id
});
