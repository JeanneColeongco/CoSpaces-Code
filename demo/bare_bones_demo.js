//see space: https://cospac.es/zXnZ

function delay() { //wrapping everything in a function for later use
    
    //creates car item five units on the y axis (forward from default camera view)
    var item = Scene.createItem("LP_Car", 0, 5, 0); 

    item.setScale(0.5); //resize the item to half the default size
    item.setColor(255, 0, 0); //set the color to red - parameters are (r, g, b)

    //if item is clicked...
    item.onActivate(function() {
        //...move the item 2 pixels along the y axis (forward from default camera view)
        item.move(0, 2);
        //bonus... rev your engine every time the car moves forward
        Scene.loadSound("8tPh5sReqZUKkTdALbhlkdAwPykrFb6tHnNS0QC9ivN").play();
    });
    
}

Scene.schedule(delay, 2); //calls function from ealier 2 seconds after program initializes
//this gives the user time to get into VR mode and be able to click on Scene items
//otherwise, onActivate won't work
