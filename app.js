//tested

// alert('Hello World');
// console.table({a:1,b:2});
// //var,let ,const
// //==========================================================================
// var name = 'John';
// console.log(name);
// name = 'Steve';
// console.log(name);
// //init(initialize) variable
// var greetings;
// console.log(greetings);
// //letters,numbers,_.$ allowed to declare a variable
// //cannot start with a number
// var firstName = 'Green'//Camel Case
// var LastName = 'William' //Pascal
//============================================================================
 // let variable,it works the same way as var

// let name;
// name = 'John';
// console.log(name);
// name = 'Steve';
// console.log(name);

// const is constant we cannot reassign 
// const  name = 'John';
// console.log(name);
//name = 'Steve';
//const lastName ; // not allowed it will throw error
// const person = {
//     name: 'John',
//     age: 40
// }
// person.name = 'Sara';
// person.age = 23;
// console.log(person);

// const arrayNum = [1,2,3,4,5];
// arrayNum.push(7);
// console.log(arrayNum);
//===========================================================================

// typeOf return the type of the variable

// const name = 'Anisha';
// console.log(typeof name);

// const age = 12;
// console.log(typeof age);

// const car = null;
// console.log(typeof car);
// //it will return obje type
// //reference type is-objects

// const today = new Date();
// console.log(today);
// console.log(typeof today);

// const hobbies = ['play', 'sleep'];
// console.log(typeof hobbies);

//=============================================================================

let val;
// No. to string
val =String(5);
val = String(8+8);
console.log(val);
console.log(typeof val);
console.log(val.length);

//Date to string
val = String(new Date());
console.log(val);
console.log(typeof val);
console.log(val.length);

//Array to String
val = String([1,2,3]);
console.log(val);
console.log(typeof val);
console.log(val.length);

//to string method
 val = (5).toString();
 console.log(val);
 console.log(typeof val);
 console.log(val.length);

 //String to number

 val = Number('5');//this is how we convert string to number
 var num = Number('forever');
 console.log(val);
 console.log(typeof val);
 console.log(num.toFixed(2)); //NaN is not a number
 console.log(typeof num);

 val = parseInt('5');
 console.log(val);

 val =  Math.PI; //(pie value)
 val = Math.floor(2.8);
 console.log(val);

 val = Math.floor( Math.random() * 200000);
 console.log(val);

 //===================================STRING FUNCTIONS========================================
 var firstName = 'John';
 var lastName = 'William';
 
 //slice function
 val = firstName.slice(0,4);
 console.log(val);

//split function
const str = 'Hello my name is brad';
 val = str.split(' '); //it will split in the form of array we can access them by index
console.log(val);

//Replace in string
val = str.replace('brad','Steve');
console.log(val);
const form = 'Web,android,php';
val = form.split(','); //it will split in the form of array we can access them by index
console.log(val);

// includes() returns boolean value it checks that a particular word is there or not,if it is
//there it returns true or else false

val = str.includes('Hello');
console.log(val);


















