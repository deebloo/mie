/**
 * @namespace mie.data
 */
mie.data = mie.data || {};

/**
 * @name mie.data.list
 * 
 * @memberof mie.data
 *
 * @description creates an object list with a length and forEach method
 * 
 * @returns {{add: Function, remove: Function, forEach: Function, length: Number}}
 */
mie.data.list = function list() {
  /**
   * @name list
   *
   * @memberof mie.data.list
   */
  var list = {
    /**
     * @name add
     *
     * @memberof list
     */
    add: function add(id, data) {
      var current;

      this.length = this.length >= 0 ? this.length : 0;
      
      current = this[id] = data;
      current._id = id;

      this.length++;
    },
    /**
     * @name remove
     *
     * @memberof list
     */
    remove: function remove(id) {
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