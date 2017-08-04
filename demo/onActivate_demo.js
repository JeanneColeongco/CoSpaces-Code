var items = []; //declaring empty array for later use

//generates random number between a minimum and maximum
function randNumBetween(min, max) {
    return Math.random() * (max - min) + min;
}

var count = 5; //assigns value of 5 to variable "count"

//assigns value of -5 to variable "i"...
//as long as value assigned to "i" is less than value assigned to "count"...
//increment "i" by 1...
for (var i = -5; i < count; i++) { 
    
    //create a car at x position i and y position 5
    var item = Scene.createItem("LP_Car", i, 5, 0); 
    
    //give the car a random color
    item.setColor(randNumBetween(0, 255), randNumBetween(0, 255), randNumBetween(0, 255));
    item.setScale(0.5); //set the car size to half the default
    items.push(item); //add the car to the items array
}

//for each car in the items array...
items.forEach(function(item) {
    //if the car is clicked...
    item.onActivate(function() {
        //move the car 2 units along the y axis (forward from default camera view)
        item.move(0, 2);
    });
});
