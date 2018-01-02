/*
 @param {Object} obj
 @return {String} str
*/

function traverseTree(obj) {
  let str;
  str = '';
  for (let key in obj) {
    if (obj.hasOwnProperty(key) && key in obj) {
      str += key + '\n';
    }
    if (typeof obj[key] === 'object') {
      str += traverseTree(obj[key]);
    }
  }
  return str;
}

/*
 @param {Object} obj
 @return {Object} createdObj
*/
Object.create = function(obj) {
  if (typeof obj !== 'object' || obj === null) {
    throw new TypeError(obj + ' is not an object');
  }
  let createdObj;
  createdObj = {};
  createdObj.__proto__ = obj;

  return createdObj;
}

/*
 @param {String} arg
 @return obj - object value by key
*/
Object.prototype.hash = function(arg) {
  let obj, property, i;
  obj = this;
  property = arg.split('.');

  for (i = 0; i < property.length; i++) {
    if (obj.hasOwnProperty(property[i])) {
      obj = obj[property[i]];
      console.log(obj);
    } else {
      return;
    }
  }
  return obj;
}


/*
 @param {Object} obj - object with configuration
 @param {Object} def - object with default configuration
 @return {Object} newObj
*/
function defaults(obj, defs) {
  let newObj;
  newObj = Object.assign({}, obj);

  for (let key in defs) {
    if (!newObj.hasOwnProperty(key)) {
      newObj[key] = defs[key];
      if (defs[key].error) throw defs[key].error;
    }
  }
  return newObj;
}

function mandatory(msg) {
  return {
    error: msg
  };
}

/*
 @param {Object} obj - any number of objects
 @return {Object} newObj
*/
function mix(obj) {
  let newObj;
  newObj = {};
  for (let i = 0; i < arguments.length; i++) {
    Object.assign(newObj, arguments[i]);
    for (let key in arguments[i + 1]) {
      if (newObj.hasOwnProperty(key)) {
        delete arguments[i + 1][key];
      }
    }
  }
  return newObj;
}

/*
 @param {Object} obj
 @return {Object} result
*/
Function.prototype.bind = function(obj) {
  let result;
  if (typeof this !== 'function') {
    throw new TypeError(obj + ' is not a function!');
  }

  result = function() {
    return result.originalFn.apply(obj, arguments);
  };
  result.originalFn = this.originalFn || this;
  return result;
}
