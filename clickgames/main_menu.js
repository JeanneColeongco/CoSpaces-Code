//see space: https://cospac.es/SBnH
//navigate to scene 1 with the toggle at the bottom of the scene

//buttons (billboards) need to be clicked and dragged directly onto the scene from Library > Building Blocks
//otherwise onActivate breaks
//for using getItem, make sure to either use the item id or the custom name you created for your button
//full explanation here: https://groups.google.com/forum/?utm_medium=email&utm_source=footer#!msg/cospaces-group/fxJbBmVq3sc/qDsaLTXQAwAJ

/*
every created item and scene in CoSpaces has it's own unique item id 
you would need to access the ids of your item(s) and scene(s)
items: double click item > click first icon > click copy id
scene: click environment > copy id in top right corner of pop-up
*/

//play button
var gameName = Scene.getItem('Play');
gameName.onActivate(function() {
    Space.goTo("3tEosaTcOV4ztf4X3l0LTy"); //Just Play (Level 3) scene id
});

//instructions pop-up button
var howToPlay = Scene.getItem("How to Play");
howToPlay.onActivate(function() {
    howToPlay.showInfoPanel("How to Play", null, "Click everything in sight!", true, null); 
    //can add image in second parameter
    //can add functionality to (call a function in) the third parameter which will occur on panel close
});

//select level button
var selectLevel = Scene.getItem("Levels");
selectLevel.onActivate(function() {
    Space.goTo("lgGPxPplQpkexWvd3GGDdW"); // select level scene id
});


/*
*
* HUD - Heads-Up Display
*
*/
var cameraH = Scene.getCamera(); //gets camera item

//Enter ItemID or custom name here
//make sure to create in-scene attach all items you want to be following the camera view to the pivot object
//which can be any object placed just below the camera
//full explanation here: https://groups.google.com/forum/?utm_medium=email&utm_source=footer#!searchin/cospaces-scripting/HUD%7Csort:relevance/cospaces-scripting/-fxLVUhHsZs/1_IhIR6zBgAJ
var pivot = Scene.getItem("HUD-Pivot");

function updateHud(offsetX, offsetY, offsetZ){
    //Quaternion Magic
    //values that set the HUD a certain distance away from the camera and in a particular orientation
    var d = {x: 1, y: 0, z: 0};
    var angle = Math.PI * 0.5;
    var sinA = Math.sin(angle * 0.5);
    var cosA = Math.cos(angle * 0.5);
    pivot.setRelativeToCamera(offsetX,offsetY,offsetZ,d.x * sinA,d.y * sinA,d.z * sinA,cosA);
}
  
//repeatedly updates HUD position many times a second for smooth display
Scene.scheduleRepeating(function(){
    updateHud(0,0,3);
},0);

//Turn pivot object invisible so it does not block clicks
pivot.setOpacity(0);
