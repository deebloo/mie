var person = mie.factory('person').extend({
	walk: function() {
		console.log('walk');
	},
	talk: function() {
		console.log('talk');
	}
});

var solider = mie.factory('soldier').is('person').extend({
	march: function() {
		console.log('march');
	},
	shoot: function() {
		console.log('shoot');
	}
});

var sneaky = mie.factory('sneaky').is('soldier').extend({
  isSneaky: true
});

var sniper = mie.factory('sniper').is('sneaky').extend({
  headShot: true
});

var danny = person.create('danny', {
	fname: 'Danny',
	lname: 'Blue'
});

var aaron = solider.create('aaron', {
	fname: 'Aaron',
	lname: 'Druck'
});

var cody = sniper.create('cody', {
	fname: 'Cody',
	lname: 'Henthorne'
});

person.extend({
  foo: true
});

console.log(person.list());



