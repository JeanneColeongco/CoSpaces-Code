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
var butterfly = Scene.getItem("a9aw1huKWR");
butterfly.faceTo(player.item);
butterfly.onActivate(function() {
    Space.goTo("hHhYfXXkol4HiDKwYj0TlT");
});

//level 2 - TBA
var rabbit = Scene.getItem("N5ePiApg8e");
rabbit.faceTo(player.item);
rabbit.onActivate(function() {
    rabbit.say("Level 2");
});

//level 3 - Just Play (Lions and Birds)
var dog = Scene.getItem("JdxlTHDl2C");
dog.faceTo(player.item);
dog.onActivate(function() {
    Space.goTo("3tEosaTcOV4ztf4X3l0LTy");
});

//level 4 - Click Avoid (Elephant Herd)
var horse = Scene.getItem("MJxslljugV");
horse.faceTo(player.item);
horse.onActivate(function() {
    Space.goTo("IjClgirjrsZ2cdylLtF2iF");
});

//level 5 - Shoot - TBA
//encountering issues with being able to shoot multiple fireballs while spawning cubes in a scheduleRepeating function
var elephant = Scene.getItem("jTak57HjNC");
elephant.faceTo(player.item);
elephant.onActivate(function() {
    elephant.say("Level 5");
});

//back to menu button
var back = Scene.getItem("Back to Menu");
  back.onActivate(function() {
      Space.goTo("D1jcKhBNIfhV9S4wVLNHtw");
  });

//play button
var gameName = Scene.getItem('Play');
gameName.onActivate(function() {
    Space.goTo("3tEosaTcOV4ztf4X3l0LTy");
});
