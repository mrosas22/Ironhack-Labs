// Names and Input
const hacker1 = "Brian";
const hacker2 = prompt("Enter the navigator's name: ");

//Conditionals
const hacker1Length = hacker1.length;
const hacker2Length = hacker2.length;
let shortestName    = '';

if(hacker1Length === hacker2Length){
    console.log('wow, you both got equally long names,',hacker1Length ,'characters!!');
    shortestName = hacker1;
}else if (hacker1Length > hacker2Length){
    console.log('The Driver has the longest name, it has',hacker1Length, 'characters');
}else {
    console.log('Yo, navigator got the longest name, it has ',hacker2Length, 'characters');
    shortestName = hacker2;
}

//Loops
//Print all the characters of the driver's name, separated by a space and in capitals 
const hacker1Capitals = hacker1.toUpperCase().split('').join();
console.log(hacker1Capitals)
//Print all the characters of the navigator's name
const hacker2Chars = hacker2.split('').reverse('').join('');
console.log(hacker2Chars);
//Depending on the lexicographic order of the strings
let lexicoOrder = '';

for (i=0; i<shortestName.length; i++){
  if(hacker1[i] < hacker2[i]){
    lexicoOrder = "The driver's name goes first";
    break;
  } else if(hacker1[i] > hacker2[i]){
    lexicoOrder = "Yo, the navigator's name goes first definitely";
    break;
  }else
      lexicoOrder = "What?! You both got the same name?";
}
console.log(lexicoOrder);

//Ask the user for a new string and check if it's a Palindrome
let userString = prompt("Please enter a string ");
let convertLowerCase = userString.replace(/[\W]/g, "").toLowerCase();
let reverseCheck = convertLowerCase.split('').reverse().join('');
if (convertLowerCase === reverseCheck) {
  console.log("This is a palindrome");
} else {
  console.log("This is not a palindrome");
}

// Lorem ipsum generator
// Generate 3 parragraphs. Store the text in a String
// Make your program count the number of words in the string
// Make your program count the number of times the latin word et appears
const lorenString = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet nisl purus in mollis nunc sed id. Vitae suscipit tellus mauris a diam maecenas. Congue quisque egestas diam in arcu. Mi eget mauris pharetra et ultrices neque. Pulvinar proin gravida hendrerit lectus. Faucibus purus in massa tempor nec feugiat nisl pretium. Cras tincidunt lobortis feugiat vivamus at. Euismod quis viverra nibh cras. Viverra nam libero justo laoreet sit amet cursus sit amet. Velit ut tortor pretium viverra. Dapibus ultrices in iaculis nunc sed augue lacus viverra.
Pretium fusce id velit ut. In nibh mauris cursus mattis molestie a iaculis at. Feugiat nibh sed pulvinar proin gravida hendrerit lectus. Scelerisque fermentum dui faucibus in ornare quam viverra orci sagittis. Cursus euismod quis viverra nibh cras. Elit ut aliquam purus sit. Netus et malesuada fames ac turpis egestas. Turpis egestas pretium aenean pharetra magna ac placerat. Etiam sit amet nisl purus in mollis. Eu volutpat odio facilisis mauris sit amet. Urna et pharetra pharetra massa massa ultricies. Et ultrices neque ornare aenean euismod elementum nisi. Cras ornare arcu dui vivamus arcu felis bibendum ut. Velit laoreet id donec ultrices. Amet mauris commodo quis imperdiet. Consequat interdum varius sit amet. Ullamcorper sit amet risus nullam eget felis eget. Justo donec enim diam vulputate ut pharetra sit amet. Vestibulum morbi blandit cursus risus at.
Tempor orci dapibus ultrices in iaculis nunc sed augue. Risus nec feugiat in fermentum posuere urna. Faucibus turpis in eu mi bibendum neque egestas congue. Nisi lacus sed viverra tellus in. Mollis aliquam ut porttitor leo a diam sollicitudin. Gravida dictum fusce ut placerat. Et odio pellentesque diam volutpat commodo sed egestas. Ac odio tempor orci dapibus ultrices. Sem nulla pharetra diam sit amet nisl suscipit adipiscing bibendum. Tortor id aliquet lectus proin nibh nisl condimentum id. Massa eget egestas purus viverra accumsan in nisl nisi scelerisque. Habitasse platea dictumst quisque sagittis. Pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat. Potenti nullam ac tortor vitae purus faucibus ornare suspendisse. Leo in vitae turpis massa sed elementum. Tortor at risus viverra adipiscing at in tellus integer feugiat. Mus mauris vitae ultricies leo integer malesuada. Faucibus interdum posuere lorem ipsum dolor sit. Condimentum vitae sapien pellentesque habitant morbi.`

let wordCounter = 0, etCounter = 0;
for(let i=0; i < lorenString.length; i++){
  if(lorenString[i] === ' ')wordCounter++;
  if(lorenString[i] === 'e' && lorenString[i+1]==='t' && i < lorenString.length - 1)etCounter++;
}

console.log('NUMBER OF WORDS = ', wordCounter, 'NUMBER OF ET = ', etCounter);