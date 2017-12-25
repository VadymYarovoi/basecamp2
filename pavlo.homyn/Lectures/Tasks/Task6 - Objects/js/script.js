//
//
//    1. Traverse Tree
//
//@param {Object} obj
//@param {Array} arr
//@param {Array} arr2
//@returns 

function gg(obj) {	
    let arr = [''],
        arr2 = [''];
    function gg2(obj) {
        for (let key in obj) {    	
            if (obj[key] instanceof Object) {
                arr2.push('--');
                console.log(`${arr2.join('')} ${key} >>>`);
                arr.push("**");
                gg2(obj[key]);
            } else {
                console.log(`${arr.join('')} ${key}: ${obj[key]}`);
            }
        }
    }
    gg2(obj);
    return '';
}

//     2. Implementing Object.create
//
//@param {Object} obj - input object
//@param {Object} newObj - empty object for further prototyping
//@returns {Object} newObj - created object with necessary prototype

Object.create = function(obj, ...args) {
    let newObj = {};
    Object.setPrototypeOf(newObj, obj);
    if (args.length > 0) {
        for (let item of args) {
            if (item instanceof Object) {
                for (let key in item) {
                    if (!newObj.hasOwnProperty(key)) {
                        newObj[key] = item[key];
                    }
                }
            }
        }
    }
    return newObj;
}


//    3. Extract Nested Object Reference
//
//@param {string} str - input string of properties
//@param {Array} arrOfKeys - array with properties from str
//@param {Object} newObj - our context object
//@returns newObj - object or property value

Object.prototype.hash = function(str) {
    let arrOfKeys = str.split('.'),
        newObj = Object.assign({}, this);
        for (let i = 0; i < arrOfKeys.length; i++) {
            if (newObj.hasOwnProperty(arrOfKeys[i])) {
                newObj = newObj[arrOfKeys[i]];
            } else {
                return undefined;
            }
        }  
    return newObj;
}

//    4. Default configuration
//
//@param {Object} config - input object with configuration
//@param {Object} defConf - oject with default config
//@param {Function} mandatory - exception with error
//@param {Object} obj - transitional object
//@returns {Object} config - new config object with corrections

function send(config) {
    let defConf = {
        url: mandatory("No URL provided!"),
        method: "POST",
        data: {}
    };
    function mandatory(error) {
        return new Error(error);
    }
    function defaults(conf, def) {
        let obj = {};
        for (let key in def) {
            if ((def[key] instanceof Error) && !conf.hasOwnProperty(key)) {
                throw def[key];
            } else
            if (!conf.hasOwnProperty(key)) {
                obj[key] = def[key];
            } else {
                obj[key] = conf[key];
            }    
        }
        return obj;
    }
    config = defaults(config, defConf);
    return config;
}

//    5. Mix Objects
//
//@param {Array} args - array of arguments
//@returns {Object} - object of combined arguments


function mixObjects(...args) {
    args = args.filter(item => item instanceof Object && !(Array.isArray(item)) && typeof item !== "function");
    for (let i = 0; i < args.length - 1; i++) {
        for (let key in args[i]) {
            if (key in args[i + 1]) {
                delete args[i + 1][key];
            }
        }
    } 
    return Object.assign({}, ...args);
}

//    6. Power .bind()
//
//@param {Object} obj - input object
//@param self - current context
//@param {Function} func - function
//@returns {Function} func - function with new context

Function.prototype.bind = function (obj) {
    let self = this.instance || this,
        func = function () {
            return self.apply(obj, [].slice.call(arguments));
        };
    func.instance = self;
    return func;
};