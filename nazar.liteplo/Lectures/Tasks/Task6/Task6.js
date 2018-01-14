/* 1. Traverse Tree
  Create a function that traverses all nodes of an object tree. Output should be formatted
*/

function traversesObjectTree(obj){
	var preSymbol = " ",
			amountPreSymbol = 0;
	
	(function traverses(obj){

		for (var prop in obj){
			if(obj.hasOwnProperty(prop)){
				print(prop, obj[prop]);
				if(typeof obj[prop] === "object" ){
					amountPreSymbol += prop.length;
					traverses(obj[prop]);
					amountPreSymbol -= prop.length;			
				}
			}
		}
	})(obj);

	function print(prop, value){
		if(typeof value === "object"){
			value = "";
		}
		console.log(preSymbol.repeat(amountPreSymbol) + prop + ": " + value);
	}

}

/*
 2. Implementing Object.create  
*/

Object.create = function(proto, props){

	if(typeof proto != "object"){
		throw TypeError('ERROR Object prototype may only be an Object or null');
	}

	function F(){};
	F.prototype = proto;
	var obj = new F();

	if(typeof props === "object"){
		for(prop in props){
			if(props.hasOwnProperty(prop)){
				obj[prop] = props[prop];
			}
		}
	}
	return obj;
}


/*
3. Extract Nested Object Reference
        You are given a complex object that has many deeply nested variables.
        You don't want to go the usual if obj.property == null route.
        Create a prototype method that given a nested path, either return the value or undefined.
*/


Object.prototype.hash = function(str){
	var currentProp = this,
		i,
		props = str.split('.');

	for(i=0; i < props.length; i++){
		if(currentProp[props[i]] == undefined){
			return undefined;
		} else {
			currentProp = currentProp[props[i]];
		}
	}
	return currentProp;
}

/*
Default configuration
        A common pattern is for a function to take a configuration object as a parameter,
        implementing defaults or throwing errors for any properties missing from the configuration.
*/

function defaults(config, def){
	var config = JSON.parse(JSON.stringify(config));

	for(var prop in def){
		if(def.hasOwnProperty(prop) && (!config.hasOwnProperty(prop) || config[prop] == null )) {
				if(def[prop] instanceof Error){
					throw def[prop];				
				}else {
					config[prop] = def[prop];
				}
			}		
	}
	return config;
}

function mandatory(msg){
	return new Error(msg);
}

/*
5. Mix Objects
        Make a function that returns a new object, containing all of the properties of any objects passed in as parameters.
        The returned object should include the first instance of each property seen on any parameter object,
        and any other instance of that property should be ignored. Also, if any parameter is not an object, it should be ignored.

        mix( {a: 1, b: 2}, {c: 3} );                         // should === {a: 1, b: 2, c: 3}
        mix( {a: 1, b: 2}, {c: 3}, {d: 4} );                 // should === {a: 1, b: 2, c: 3, d: 4}
        mix( {a: 1, b: 2}, {a: 3, c: 3} );                   // should  === {a: 1, b: 2, c: 3}
        mix( {a: false, b: null}, {a: true, b: 2, c: 3} );   // should  === {a: false, b: null, c: 3}
*/

function mix(...objs){
	var newObj = {},
			i;
	for(i = 0; i < objs.length; i++){
		if(typeof objs[i] !== 'object'){
			continue;
		}
		for(prop in objs[i]){
			if(!newObj.hasOwnProperty(prop) && objs[i].hasOwnProperty(prop)) {
				newObj[prop] = objs[i][prop];
			}
		}
	}
	return newObj;
}



/*
 6. Power .bind()
        bind() returns a copy of the original function but this function will always be called in the specified context.
        The problem is that you can't rebind another context any more. Your task is override the native
        Function.prototype.bind method by a new one that will allow you to rebind context multiple times.
*/


Function.prototype.bind = function () {

    var fn = this.originFunc || this;
    var args = Array.prototype.slice.call(arguments);
    var object = args.shift();
    var newFn =  function() {
        return fn.apply(object, args.concat(Array.prototype.slice.call(arguments)));
    };
    newFn.originFunc = fn;
    return newFn;
};

