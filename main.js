/**
 * Create a simple constructor function called `Foo` and create a new instance
 * from it called `foo`.
 */

var Foo = function Foo () {};

var foo = new Foo();

console.assert(foo instanceof Foo);

// *
//  * Create a constructor function called `Animal` with a single method on its
//  * prototoype called `pet`. This function shouldn't log anything.
//  * 
//  * Create a constructor function called `Dog` that sets a property on itself
//  * within the constructor. The property should be called `says` and the value
//  * should be `"woof"`.
 
var Animal = function Animal () {};

Animal.prototype.pet = function pet () {};

var Dog = function Dog () {
    this.says = 'woof';
};

Dog.prototype = new Animal();

var dog = new Dog();

console.assert(new Dog().says === 'woof');


// /**
//  * Create a constructor function called `Cat` that sets a property on itself
//  * within the constructor. The property should be called `says` and the value
//  * should be `"meow"`.
//  */

var Cat = function Cat () {
    this.says = 'meow';
};

Cat.prototype = new Animal();

var cat = new Cat();

console.assert(cat instanceof Cat);
console.assert(cat.says === 'meow');

// // // /**
// //  * Add a method to the `Animal` prototype called `speak` that will log out the
// //  * value of an instance's `.says` property with an exclamation mark appended.
// //  */
   
Animal.prototype.speak = function () {
    return (this.says + '!');
};

console.assert(cat.speak() === 'meow!');
console.assert(dog.speak() === 'woof!');

// // /**
//  * Create a constructor called `KeepSecret`. The constructor function itself
//  * should accept a parameter called `secret` it should store this in a private
//  * variable (use a closure). Add a method to the prototype that is called
//  * `squeal` that returns the secret string.
//  */

function KeepSecret (secret) {
    this.getSecret = function () {
        return secret;
    };
}

KeepSecret.prototype.squeal = function (){
    return this.getSecret();
};

var mySecret = "My class rocks!";
var dontTellNobody = new KeepSecret(mySecret);
console.assert(dontTellNobody.squeal() === mySecret);

// *
//  * Create a constructor called `Key`. Create another constructor called `Safe`.
//  * Make the Safe constructor take 2 arguments. The first argument can be any
//  * piece if data to keep safe. This must be stored using a private variable like
//  * you did with KeepSecret. The 2nd param to the `Safe` constructor needs to be
//  * an instance of `Key` you need to store it privately as well. Add a function
//  * to the Safe prototype called `unlock` that accepts a key. If the key matches
//  * the key that was used to create the Safe; then return the secret data.
 
function Key () {};

function Safe (secret, key) {
    this.keepSafe = function () {
        return secret;
    };
    this.storesInstance = function () {
        return key;
    };
}

Safe.prototype.unlock = function (key) {
  if(this.storesInstance() === key) {
    return this.keepSafe();
  }

};


var sensitive = "shhhhh!";
var rightKey = new Key();
var wrongKey = new Key();
var safe = new Safe(sensitive, rightKey);

console.assert(safe.unlock(wrongKey) !== sensitive);
console.assert(safe.unlock(rightKey) === sensitive);

// /**
//  * Create a constructor called `Validator`. Give it a method on it's prototype
//  * called `email` that takes a string and returns true if the string is a valid
//  * email address and false if it is not. Email validation is no simple feat, so
//  * look up how to do it online.
//  */

function Validator () {};

Validator.prototype.email = function (string) {
    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(string))
    return true;
}

if (typeof Validator === "function") {
  var valid = new Validator();
  console.assert(valid.email("name@theironyard.com"));
  console.assert(!valid.email("name-at-theironyard.com"));
}