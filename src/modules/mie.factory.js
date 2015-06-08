/**
 * @name namespace.factory
 *
 * @memberof mie
 *
 * @description returns a factory for stamping out objects
 *
 * @returns {Function}
 */
mie.factory = (function() {
  var factories = mie.data.list();
  var prototypes = {};

  var baseProto = {
    destroy: function() {
      for(var i = 0, len = this._instanceOf.length; i < len; i++) {
        factories[this._instanceOf[i]].data.remove(this._id);
      }
    }
  };

  /**
   * @name $factory
   *
   * @memberof mie.factory
   *
   * @description
   * returns and instance of a factory for stamping out objects.
   * A solider factory will stamp out soldiers ext.
   * A factory instance keeps track of all of it's creations.
   *
   * @returns {{create: Function, is: Function, extend: Function, list: Function, get: Function}}
   */
  function $factory() {
    return {
      _extends: [],
      /**
       * @name factory.create
       *
       * @memberof factory
       *
       * @description create and object from the factory
       *
       * @returns {Object}
       */
      create: function create(id, obj) {
        var factoryId = this._id;

        var newObj  = Object.create(prototypes[factoryId]),
            factory = factories[factoryId];

        mie.utils.extend(newObj, (obj || {}));

        newObj._instanceOf = [];
        newObj._instanceOf.push(factoryId);

        factory.data = factory.data || mie.data.list();
        factory.data.add(id, newObj);

        var x;
        for(var i = 0, len = this._extends.length; i < len; i++) {
          x = factories[this._extends[i]];

          x.data = x.data || mie.data.list();
          x.data.add(id, newObj);

          newObj._instanceOf.push(this._extends[i]);
        }

        return newObj;
      },
      /**
       * @name factory.is
       *
       * @memberof factory
       *
       * @description fines a factory to mixin
       *
       * @returns {Object}
       */
      is: function is(factory) {
        prototypes[this._id] = Object.create(prototypes[factory]);

        this._extends = this._extends.concat(factories[factory]._extends);
        this._extends.push(factory);

        return this;
      },
      /**
       * @name factory.extend
       *
       * @memberof factory
       *
       * @description extends the factory
       *
       * @returns {Object}
       */
      extend: function extend(obj) {
        mie.utils.extend(prototypes[this._id], obj);

        return this;
      },
      /**
       * @name factory.get
       *
       * @memberof factory
       *
       * @description get a factory by its id
       *
       * @returns {Object}
       */
      get: function get(id) {
        return factories[this._id].data[id];
      },
      /**
       * @name factory.list
       *
       * @memberof factory
       *
       * @description retuns all objects the given factory has created
       *
       * @returns {Object}
       */
      list: function list() {
        return factories[this._id].data || { length: 0 };
      }
    }
  }

  return function(id) {
    // if factory exists return that instance
    if(factories[id]) {
      return factories[id];
    }

    var newFactory = $factory();

    factories.add(id, newFactory);

    prototypes[id] = Object.create(baseProto);

    return newFactory;
  }

}());