/*===============================Task 1=================================*/
// let obj = {
//     person: {
//         name: 'joe',
//         history: {
//             hometown: 'bratislava',
//             bio: {
//                 funFact: 'I like fishing.'
//             }
//         }
//     }
// };

function createTree(obj){
  let len = 0;

  function branch(obj){
    let level = arguments[1] ? arguments[1] : 0;

    for(let key in obj){
      console.log(`${" ".repeat(level)} ${key}: ${typeof obj[key] == 'object' ? "" : obj[key]}`);
     
      let keyName = Object.keys(obj).filter(item => {return item == "" + key + ""});
      
      if(typeof obj[key] == 'object'){ 
        len += keyName[0].length;    
        branch(obj[key], len);
        len-=keyName[0].length;
      }
    }
  }

  branch(obj);
}


//createTree(obj);

////////////////////////////////////////////////////////////////////////////////

/*===============================Task 2=================================*/

Object.myCreate = function(proto, props){
    let newObj = {};

    if(typeof proto !== 'object'){
      throw TypeError(`${proto} isn't an object`);
    }
    Object.setPrototypeOf(newObj, proto);
    Object.defineProperties(newObj, props);

    return newObj;
 }

 //let obj = Object.myCreate(Object.prototype, {number: {value: 42, enumerable: true}});

 ////////////////////////////////////////////////////////////////////////////////

/*===============================Task 3=================================*/

Object.prototype.hash = function(path){
  let keys = path.split('.'),
      obj = this,
      result;

  for (let i = 0; i < keys.length; i++) {

    if(typeof obj == 'object' && obj[keys[i]] !== undefined){
      result = obj[keys[i]];
      obj = result;
    }
    else return undefined;

  }

return result;
}

//console.log(obj.hash('person.history.bio')); 

//////////////////////////////////////////////////////////////////////////////////

/*===============================Task 4=================================*/

function send(config) {
    config = defaults(config, {
        url: mandatory("No URL!"),
        method: "POST",
        data: {}
    });
    Network.send(config.url, config.data, config.method);
}

function mandatory(messg){
  return new Error(messg);
}

function defaults(obj, def){
  let newObj = {};

  for(let key in def){

    if(!obj.hasOwnProperty(key)){

      if(def[key] instanceof Error){
        throw def[key];
      }
      else{
        newObj[key] = def[key];
      }

    }
    else{
      newObj[key] = obj[key];
    }

  }

  return newObj;
}

//////////////////////////////////////////////////////////////////////////////////

/*===============================Task 5=================================*/

function mix(){
  let arr,
      obj = {};

  arr = [].slice.call(arguments);

  for (let i = 0; i < arr.length; i++) {

    for(let key in arr[i]){

      if(!obj.hasOwnProperty(key)){
        obj[key] = arr[i][key];
      }
      else continue;

    }     

  }

  return obj;
}

//console.log(mix( {a: false, b: null}, {a: true, b: 2, c: 3} ));

/////////////////////////////////////////////////////////////////////////////////

/*===============================Task 6=================================*/

Function.prototype.bind = function(context){
  let args = [].slice.call(arguments, 1),
      func = this.newFunc || this;

  function bindIt(){
    return func.apply(context, args);
  }

  bindIt.newFunc = func;

  return bindIt;
}

// let func = function () { return this.prop; };
// let obj1 = { prop: 1 };
// let obj2 = { prop: 2 };

// func = func.bind(obj1);
// console.log(func()); 

// func = func.bind(obj2);
// console.log(func());  

/////////////////////////////////////////////////////////////////////////////////