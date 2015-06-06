describe('mie.factory', function() {
  beforeEach(function() {
    var person = mie.factory('person').extend({
      walk: true,
      talk: true
    });

    var solider = mie.factory('solider').is('person').extend({
      fire: true,
      march: true
    });

    var sniper = mie.factory('sniper').is('solider').extend({
      sneak: true,
      headShot: true
    });

    person.create('danny', {
      fname: 'Danny',
      lname: 'Blue'
    });

    solider.create('aaron', {
      fname: 'Aaron',
      lname: 'Druck'
    });

    sniper.create('cody', {
      fname: 'Cody',
      lname: 'Henthorne'
    });
  });


  it('should create a big array', function() {
    var danny = mie.factory('person').get('danny');
    var aaron = mie.factory('solider').get('aaron');
    var cody = mie.factory('sniper').get('cody');

    expect(danny._instanceOf.indexOf('person')).toBeGreaterThan(-1);
    expect(danny._instanceOf.indexOf('solider')).toBeLessThan(0);
    expect(danny._instanceOf.indexOf('sniper')).toBeLessThan(0);

    expect(aaron._instanceOf.indexOf('person')).toBeGreaterThan(-1);
    expect(aaron._instanceOf.indexOf('solider')).toBeGreaterThan(-1);
    expect(aaron._instanceOf.indexOf('sniper')).toBeLessThan(0);

    expect(cody._instanceOf.indexOf('person')).toBeGreaterThan(-1);
    expect(cody._instanceOf.indexOf('solider')).toBeGreaterThan(-1);
    expect(cody._instanceOf.indexOf('sniper')).toBeGreaterThan(-1);
  });
});
