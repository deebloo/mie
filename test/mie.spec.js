describe('mie.factory', function() {
  beforeEach(function() {
    var hero = mie.factory('hero').extend({
      brave: true,
      heroic: true
    });

    var person = mie.factory('person').extend({
      walk: true,
      talk: true
    });

    var solider = mie.factory('solider').is('person').is('hero').extend({
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


  it('should maintain correct state', function() {
    var danny = mie.factory('person').get('danny');
    var aaron = mie.factory('solider').get('aaron');
    var cody = mie.factory('sniper').get('cody');

    // Check inheritence
    expect(danny.brave).toBe(undefined);
    expect(aaron.brave).toBe(true);
    expect(cody.brave).toBe(true);

    // Check instance references
    expect(danny._instanceOf.indexOf('person')).toBeGreaterThan(-1);
    expect(danny._instanceOf.indexOf('solider')).toBeLessThan(0);
    expect(danny._instanceOf.indexOf('sniper')).toBeLessThan(0);

    expect(aaron._instanceOf.indexOf('person')).toBeGreaterThan(-1);
    expect(aaron._instanceOf.indexOf('solider')).toBeGreaterThan(-1);
    expect(aaron._instanceOf.indexOf('sniper')).toBeLessThan(0);

    expect(cody._instanceOf.indexOf('person')).toBeGreaterThan(-1);
    expect(cody._instanceOf.indexOf('solider')).toBeGreaterThan(-1);
    expect(cody._instanceOf.indexOf('sniper')).toBeGreaterThan(-1);

    // Check lists
    expect(mie.factory('person').get('danny')).toBeTruthy();
    expect(mie.factory('person').get('cody')).toBeTruthy();
    expect(mie.factory('person').get('aaron')).toBeTruthy();

    expect(mie.factory('solider').get('danny')).toBeFalsy();
    expect(mie.factory('solider').get('cody')).toBeTruthy();
    expect(mie.factory('solider').get('aaron')).toBeTruthy();

    expect(mie.factory('sniper').get('danny')).toBeFalsy();
    expect(mie.factory('sniper').get('cody')).toBeTruthy();
    expect(mie.factory('sniper').get('aaron')).toBeFalsy();

    //destroy object
    danny.destroy();

    expect(mie.factory('person').get('danny')).toBe(undefined);
    expect(mie.factory('person').list().danny).toBe(undefined);
  });
});
