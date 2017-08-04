//see space: https://cospac.es/ag9o

//generates a random number between a minimum and maximum
function randNumBetween(min, max) {
    return Math.random() * (max - min) + min;
}

var count = 5; //assigning value of 5 to variable name "count"

//as long as variable "i", which is assigned the value of -5...
//is less than "count" (5)...
//increment "i" by 1...
for (var i = -5; i < count; i++) { 
    
    //create a new car at x position "i" and y position 5
    var item = Scene.createItem("LP_Car", i, 5, 0); //can input different id in place of "LP_Car"
    
    //randomly set the color of the car
    item.setColor(randNumBetween(0, 255), randNumBetween(0, 255), randNumBetween(0, 255));
    item.setScale(0.5); //set the scale of the car to half of the default
}
