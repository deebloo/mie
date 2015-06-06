describe('mie.factory', function() {
  beforeEach(function() {
    var person = MIE.factory('person').extend({
      walk: true,
      talk: true
    });

    var solider = MIE.factory('solider').is('person').extend({
      fire: true,
      march: true
    });

    var sniper = MIE.factory('sniper').is('solider').extend({
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
    var danny = MIE.factory('person').get('danny');
    var aaron = MIE.factory('solider').get('aaron');
    var cody = MIE.factory('sniper').get('cody');

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
