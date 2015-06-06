mie.utils = mie.utils || {};

/**
 * TODO: use Object.assign or polyfill for such
 * @name mie.extend
 * 
 * @memberof mie
 *
 * @description extend helper.
 */
mie.utils.extend = function extend(base, obj) {
  for(var key in obj) {
    if(obj.hasOwnProperty(key)) {
      base[key] = obj[key];
    }
  }
};

