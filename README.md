# mie

An experiment with creating composable factories to stamp out objects.

```JS
// A person
var person = mie.factory('person').extend({
	walk: true,
	talk: true
});

// A soldier who is a person
var solider = mie.factory('soldier').is('person').extend({
	march: true,
	shoot: true
});

// A a sneaky soldier who is a solider who is a person
var sneakySoldier = mie.factory('sneaky').is('soldier').extend({
  isSneaky: true
});

// A a sniper who is a sneaky solider who is a solider who is a person :)
var sniper = mie.factory('sniper').is('sneakySoldier').extend({
  headShot: true
});

// Create a person
var danny = person.create('danny', {
	fname: 'Danny',
	lname: 'Blue'
});

// Create a soldier
var aaron = solider.create('aaron', {
	fname: 'Aaron',
	lname: 'Druck'
});

// Create a person
var cody = sniper.create('cody', {
	fname: 'Cody',
	lname: 'Henthorne'
});

// add something to person
person.extend({
  foo: true
});

// THEY ARE ALL PEOPLE!
console.log(person.list());


```
