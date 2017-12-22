/**
*
* 1. Traverse Tree
*    Create a function that traverses all nodes of an object tree. Output should be formatted
*
* @param {Object} obj
* @param {Number} level   current level of an object tree
* @param {String} curBranch
*
**/

function consoleTree(obj, level, curBranch){
    let key, kst=0, cur=0;
    if(level==undefined){
        level=0;
    }
    if(curBranch==undefined){
        curBranch = '[Object]';
    }

    if(typeof(obj)!=='object'){           //if not an object - print value
        console.log('\t\t'.repeat(level) + curBranch +':\t' + obj);
        return;
    }

    for (key in obj){         //find ammount of properties
        kst++;
    }
    kst = Math.round(kst/2)

    for (key in obj){
        cur++;
        consoleTree(obj[key], level+1, key);      //next level of object tree
        if(cur==kst){                        //print parent property name between child elements
          console.log('\t\t'.repeat(level) + curBranch + ':');
        }
    }
}


/**
*
* 2. My own implementing of Object.create
*
* @param {Object} proto  Prototype of a new object
* @param {Object} props  Includes properties that must be added to new object
* @return {Object} result
*
**/

Object.create = function(proto, props){
    var result = {};

    if(typeof(proto)!=='object')
        throw TypeError('Wrong type!');
    result = Object.setPrototypeOf(result, proto);

    if(typeof props === 'object'){
        for(var prop in props){
            if(props.hasOwnProperty(prop)){
                result[prop] = props[prop];
            }
        }
    }
    return result;
}


/**
*
* 3. Extract Nested Object Reference
*   You are given a complex object that has many deeply nested variables.
*   You don't want to go the usual if obj.property == null route.
*   Create a prototype method that given a nested path, either return the value or undefined.
*
* @param {String} way
* @return {...} Object properties by the way or undefined
*
**/

Object.prototype.hash = function findProp(way){
    var arrWay = way.split('.'), i=0,
    result = this;

    for(i=0; i<arrWay.length; i++){
        if(result[arrWay[i]]!=undefined){
            result=result[arrWay[i]];
        }
        else{
            return undefined;
        }
    }

    return result;
}


/**
*
* 4. Default configuration
*   A common pattern is for a function to take a configuration object as a parameter,
*   implementing defaults or throwing errors for any properties missing from the
*   configuration.
*   One way to do this is like:
*
*   function send(config) {
*     if ( !config.url ) throw "No URL!";
*
*       config.method = config.method || "POST";
*       config.data = config.data || {}
*
*       AJAX.send(config.url, config.data, config.method);
*     }
*
*   But the "||" operator doesn't work correctly for parameters that are allowed
*   to be falsey.
*
*   Your task is to create a defaults(obj, def) function which creates a new object
*   with obj's properties, falling back on the properties of def when they aren't in obj.
*   You must also implement the mandatory(err) function. This will return an object
*   that tells defaults to throw err if the property doesn't exist.
*   In other words, if mandatory("foo") is given as the default value for the key bar,
*   and the user tries pass a config option that does not define bar, then defaults
*   should throw "foo" when called. This function would be used like so:
*
*     function send(config) {
*        config = defaults(config, {
*            url: mandatory("No URL!"),
*            method: "POST",
*            data: {}
*        });
*
*        Network.send(config.url, config.data, config.method);
*    }
*
**/

/**
*
* Function that compares config with default value and returns new config
*
* @param {Object} config
* @param {Object} def
* @return {Object} newConfig
*
**/

function defaults(config, def){
    var newConfig = deepCopy(config);

    for (var key in def){
        if(!(newConfig.hasOwnProperty(key))){
            if(def[key] instanceof Error){
                throw def[key];
            }
            else{
                if(def.hasOwnProperty(key))
                    newConfig[key] = def[key];
            }
        }
    }

    return newConfig;
}

/**
* Sets error status
* @param {String} msg   Error message
* @return {Object} Error
*
**/

function mandatory(err){
    return new Error(err);
}

/**
* Send message
* @param {Object} config
*
**/

function send(config){
    var conf = defaults(config, {
        url: mandatory("No URL!"),
        method: "POST",
        data: {}
    });
    console.log('Was sent');
    console.log(conf)
}


/**
*
*  Function that creates copy of an object
*
*  @param {Object} obj
*  @return {Object} result
*
**/
function deepCopy(obj){
    var result = {};

    for (key in obj){
        if(typeof(obj[key])==='object' && !Array.isArray(obj[key])){
            result[key] = deepCopy(obj[key]);
        }
        else{
            if(obj.hasOwnProperty(key))
                result[key] = obj[key];
        }
    }

    return result;
}


/**
* 5. Mix Objects
*   Make a function that returns a new object, containing all of the properties
*    of any objects passed in as parameters. The returned object should include
*    the first instance of each property seen on any parameter object, and any
*    other instance of that property should be ignored. Also, if any parameter
*    is not an object, it should be ignored.
*
* @param {Array} objects
* @return {Object} result
*
**/

function mix (...objects){
    let result =  {}, i, props;

    for(i=0; i<objects.length; i++){
        for (props in objects[i]) {
            if(objects[i].hasOwnProperty(props) && !result.hasOwnProperty(props)){
                result[props] = objects[i][props];
            }
        }
    }
  return result;
}


/**
*
* 6. Power .bind()
*    bind() returns a copy of the original function but this function will always
*    be called in the specified context. The problem is that you can't rebind
*    another context any more. Your task is override the native
*    Function.prototype.bind method by a new one that will allow you to
*    rebind context multiple times.
*
*
* @param {Object} thisArg
* @return {Object} fn
*
**/

Function.prototype.bind = function (thisArg) {
    var fn = this.realFunc || this,
    wrapFunc;

    wrapFunc = function () {
        return fn.apply(thisArg, [].slice.call(arguments));
    };

    wrapFunc.realFunc = fn;
    return wrapFunc;
}
/*
let func = function () { return this.prop; };
    let obj1 = { prop: 1 };
    let obj2 = { prop: 2 };
    let obj3 = { prop: 3 };

    func = func.bind(obj1);
    console.log(func());

    func = func.bind(obj2);
    console.log(func());

    func = func.bind(obj3);
    console.log(func());
*/
