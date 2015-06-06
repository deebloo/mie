# MIE

An experiment with creating and inheriting objects from stateful factories.

```JS
var person = MIE.factory('person').extend({
  walk: function() {
    console.log('walk');
  },
  talk: function() {
    console.log('talk');
  }
});

var stealthy = MIE.factory('stealthy').extend({
  sneak: function() {
    console.log('sneak');
  }
});

var solider = MIE.factory('solider').is('person').extend({
  march: function() {
    console.log('march');
  },
  shoot: function() {
    console.log('shoot');
  }
});

var sniper = MIE.factory('sniper').is('solider').is('stealthy').extend({
  march: function() {
    console.log('march');
  },
  shoot: function() {
    console.log('shoot');
  }
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

// will contain {danny: {...}, aaron: {...}, cody: {...}}
var createdPeople = person.list();
```
