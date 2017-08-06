This is a demo series for an introductory lesson on JavaScript in CoSpaces. Below you will find the full lesson plan:

Grade Levels: 7-12 
Ages: 12+ 
Cost: price of Cardboard (one unit or one per person in class) and compatible phone(s)
Time Estimate: 45-60 mins (without nonessentials) or 60-90 mins

Objective/Purpose:
Students will create an animated virtual reality game using the CoSpaces JavaScript environment.

Background/Information Needed:
Account: First Name, Username, fake email can be used, password needed
Familiar with CoSpaces UI, particularly in relation to working with the JavaScript environment
Knowledge of basic JavaScript or programming in general
Game demo code

Materials:
A computer with internet
(technically optional) 4.1 Android smartphone with gyro (and potentially compass if Cardboard button is magnet) to test with Cardboard Viewer
(technically optional) Cardboard Viewer (Google Cardboard V2 or I AM CARDBOARD V2 recommended)

Safety Considerations:
Low to none
Pink eye from sharing headset (unless providing individual cardboards)

Addressing Stakeholder Concerns: 
What if you make a violent game? (i.e. shooting, zombies, etc.) - remind the students that netiquette still applies and they should be respectful and considerate with their creations, might want to ask them not to share their programs without permission, or without a description of what the program includes (i.e. video game parental guidance ratings)

Presentation/Hook:
Today we’re going to use a free online platform called CoSpaces to create our own animated virtual reality game. Afterwards, we’ll use our Cardboard Viewers to play it.
Possibly intro to programming video

Procedure of Activity: 
Set  Up (10-15 mins)
Direct the class to https://cospaces.io/ 
Tell students to create an account using their first name, a username, a made-up email address (or a real one), and a password
Click the “Create Space” button at the top left corner
Click the “Code” button at the top right corner of the new space
Have students select the “Scripting” option
Code & Explanations (50-60 mins; 30-40 if cutting out nonessentials)
Have students type: “var cube = Scene.createItem(“Cuboid”, 0, 5, 0);”
Explain that variables are containers that you can label however you want and have them contain whatever you want
Orient the students with the grid layout
Briefly have the students experiment with the numbers then try to find where their cube now ends up
Direct the class to https://cospaces.io/api/ 
Explain that they can input any of those ids into the createItem() method in place of “Cuboid”
Show and explain to the class that using their variable name, which contains their item, they can resize and recolor their item (may want to point out the BaseItem and GameItem directories in the API)
Briefly have students experiment with changing colors and sizes
NONESSENTIAL - We want to make many items to populate our game space, so have the students type this code (they could use other item ids), the resulting loop should look something like this
NONESSENTIAL - Explain that a function receives input in the form of parameters (but doesn’t have to) and gives an output or result, but only when called; this particular function, generates a random number between the minimum and maximum number we give it
NONESSENTIAL - Now we want to animate our game, so have students type “var items = [ ];” at the very top of all their other code
NONESSENTIAL - Explain that arrays can store many values at once, making us able to go through those values one by one later on and do something with them
NONESSENTIAL - Have students type “items.push(item);” inside their for loop after they declare “var item”; explain that this adds each created item into the array
NONESSENTIAL (alternatively have students type: “item.move(0, 10);”) - Have the students type out a forEach() function at the bottom of all their other code, so their program should now look something like this; explain that this is the part where we’re going through all our items and doing something with them
NONESSENTIAL (alternatively have students type: “item.onActivate(function() { item.move(0, 2); };”) - Now for the “game” part: have students call an onActivate() function on the item variable inside their forEach loop, and place item.move() inside that, so their code should now look something like this, and react to clicks like this
Extensions/Adaptations (~)

Extensions/Adaptations:
How can students add to or modify the game using code? See extended demo here.
A scoreboard (see lines 1-7) to keep track of points and/or time elapsed
If/else statements (see lines 32-35 and 56-72) for deciding when there’s a win and when there’s a lose
Obstacles so you can still move all the cars, but only if you clear the way first (see demo)
Using whatever API function strikes their fancy (see lines 55-72 for onHover; see lines 3-7 and 31-36 for scheduleRepeating; see lines 27-30 for onCollisionEnter - undocumented in the API)
Only being able to click one car while the others race against you
Play the game in virtual reality through smart phones and cardboard viewers

Reflection Questions/Closure:
What are some real-world applications of virtual reality?
Can you think of different ways to do one of the steps? (hint: look in the API)
What limitations do you think there are to making virtual reality? 

References/Resources: 
https://github.com/ChloeColeongco/CoSpaces-Code/tree/master/demo 
https://cospaces.io/ 
https://cospaces.io/api/ 
https://cospaces.io/tutorials/javascript/how-to-create-items-and-position-them.html
https://groups.google.com/forum/#!forum/cospaces-scripting
khanacademy.org
