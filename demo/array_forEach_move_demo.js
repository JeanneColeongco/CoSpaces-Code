//see space: https://cospac.es/zBRM

var items = []; //declare empty array for later use

//generates a random number between a minimum and maximum
function randNumBetween(min, max) {
    return Math.random() * (max - min) + min;
}

var count = 5; //assigns value of 5 to variable name "count"

//initializing variable "i" to value of -5...
//as long as variable "i" is assigned to a value less than value assigned to "count"...
//increment i by 1...
for (var i = -5; i < count; i++) { 
    
    //create a new car at x position "i" and y position 5
    var item = Scene.createItem("LP_Car", i, 5, 0); 
    
    //give the car a random color
    item.setColor(randNumBetween(0, 255), randNumBetween(0, 255), randNumBetween(0, 255));
    item.setScale(0.5); //set the size of the car to half the default
    items.push(item); //add the car to the items array
}

//for each car in the items array...
items.forEach(function(item) {
    //move the item 2 units along the y axis
    item.move(0, 2);
});
