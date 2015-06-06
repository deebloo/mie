/**
 * @namespace MIE
 * 
 * @license MIT
 * 
 * @author Danny Blue
 *
 * @description compose objects by definings stateful factories.
 */
var MIE = MIE || {};

/**
 * @name MIE.list
 * 
 * @memberof MIE
 *
 * @description creates an object list with a length and forEach method
 * 
 * @returns {{add: Function, remove: Function, forEach: Function, length: Number}}
 */
MIE.list = function list() {
  /**
   * @name list
   *
   * @memberof MIE.list
   */
  var list = {
    /**
     * @name add
     *
     * @memberof list
     */
    add: function add(id, data) {
      this.length = this.length >= 0 ? this.length : 0;
      
      this[id] = data;
      this[id]._id = id;

      this.length++;
    },
    /**
     * @name remove
     *
     * @memberof list
     */
    remove: function remove(id) {
      this.length = this.length >= 0 ? this.length : 0;

      delete this[id];

      this.length--;
    },
    /**
     * @name forEach
     *
     * @memberof list
     */
    forEach: function forEach(func) {
      for(var i in this) {
        if(this.hasOwnProperty(i)) {
          func(this[i]);
        }
      }
    }
  };

  return Object.create(list);
};

/**
 * TODO: use Object.assign or polyfill for such
 * @name MIE.extend
 * 
 * @memberof MIE
 *
 * @description extend helper.
 */
MIE.extend = function extend(base, obj) {
  for(var key in obj) {
    if(obj.hasOwnProperty(key)) {
      base[key] = obj[key];
    }
  }
};

/**
 * @name MIE.factory
 * 
 * @memberof MIE
 *
 * @description returns a factory for stamping out objects
 *
 * @returns {Function}
 */
MIE.factory = (function() {
  var factories = MIE.list();

 /**
   * @name $factory
   * 
   * @memberof MIE.factory
   *
   * @description 
   * returns and instance of a factory for stamping out objects.
   * A solider factory will stamp out soldiers ext.
   * A factory instance keeps track of all of it's creations.
   *
   * @returns {{create: Function, is: Function, extend: Function, list: Function, get: Function}}
   */
  function $factory() {
    var proto = {
      destroy: function() {
        for(var i = 0, len = this._instanceOf.length; i < len; i++) {
          factories[this._instanceOf[i]].data.remove(this._id);
        }

        return null;
      }
    };

    return {
      _extends: [],
      _proto: function _proto() {
        return proto;
      },
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
        var newObj  = Object.create(proto),
            factory = factories[this._id];

        MIE.extend(newObj, obj);

        newObj._instanceOf = [];
        newObj._instanceOf.push(this._id);

        factory.data = factory.data || MIE.list();
        factory.data.add(id, newObj);

        var x;

        for(var i = 0, len = this._extends.length; i < len; i++) {
          x = factories[this._extends[i]];
          
          x.data = x.data || MIE.list();
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
        MIE.extend(this._proto(), factories[factory]._proto());

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
        MIE.extend(proto, obj);

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
    if(factories[id]) {
      return factories[id];
    }

    var newFactory = $factory();

    factories.add(id, newFactory);

    return newFactory;
  }

}());