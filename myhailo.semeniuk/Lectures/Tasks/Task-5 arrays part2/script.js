/**
*
* My implementation of Array.prototype.filter
*
* @param func - users function
* @returns {Array} result
*
**/

Array.prototype.myFilter = function(func){
  var i, arr = this, result = [];

  if(typeof(func)!=='function'){
    throw new TypeError();
  }

  for(i=0; i<arr.length; i++){
    if(func(arr[i], i, arr))
      result.push(arr[i]);
  }

  return result;
}



/**
*
* Function that takes an array of values and moves all zero elements to the end of an array.
*
* @param {Array} arr
* @returns {Array} result
*
*
**/

function removeZeroes(arr){
  var i, result = [], zeroes = [];
  result = arr.filter(el => el!==0);
  zeroes = arr.filter(el => el===0);
  return result.concat(zeroes);
}

//console.log(removeZeroes([7, 2, 3, 0, 4, 6, 0, 0, 13, 0, 78, 0, 0, 19, 14]));

/**
*
* Function which returns true when its argument is an array that has the same nesting structure
*  as the first array
*
* @param {Array} arr2
* @returns {Boolean}
*
**/

Array.prototype.sameStructureAs = function (arr2){
  var arr1 = this, i;

  for(i=0; i<arr1.length; i++){
    if(Array.isArray(arr1[i]) && Array.isArray(arr2[i])){
      if(!arr1[i].sameStructureAs(arr2[i])){    //if both are arrays - recursion
        return false;
      }
    } else{
      if(!Array.isArray(arr1[i]) && !Array.isArray(arr2[i])){
        continue;                               //if both aren't arrays - next iteration
      } else
        return false;
      }
  }
  return true;
}


//console.log([ 1, 1, 1 ].sameStructureAs( [ 2, 2, 2 ] ));
//console.log([ 1, [ 1, 1, [2, 4, 5, [2]]] ].sameStructureAs( [ 2, [ 2, 2, [2, 6, 5, [9] ]]]));
//console.log([ 1, [ 1, 1 ] ].sameStructureAs( [ [ 2, 2 ], 2 ] ));
//console.log([ 1, [ 1, 1 ] ].sameStructureAs( [ [ 2 ], 2 ] ));

/**
*
* A method which takes an array of integers (positive and negative) and returns
* the longest contiguous sequence in this array, which total sum of elements equal 0.
*
* @param {Arr} arr
* @returns {Arr} result
*
**/

function maxZeroSequenceLength(arr){
  var i, j, maxLength=0, length=0, index, sum=0, result = [];

  for(i=0; i<arr.length; i++, sum=0, length=0){
    for(j=i; j<arr.length; j++, length++){
      sum+=arr[j];
      if(sum==0 && length>maxLength){
        maxLength=length;
        index=i;
      }
    }
  }
  result = arr.slice(index, index+maxLength+1);
  return result;
}

//console.log(maxZeroSequenceLength([27, -35, 10, 6, 92, -115, 17, 2, 2, 2, -7, 2, -9, 16, 2, -11]));

/**
*  Balancing parentheses.
*    Write a piece of code to validate that a supplied string is balanced.
*    You will be given a string to validate, and a second string, where each pair of characters
*    defines an opening and closing sequence that needs balancing.
*
* @param {String} str
* @param {String} symbols
* @returns {Boolean}
*
**/

function isBalanced(str, symbols){
  var array, filteredStr, i=0, index;
  array = str.split('');
  filteredArr = array.filter((el) => {     //filteredArr consists of elements
    if(symbols.indexOf(el)!=-1)            //which must be balanced
      return true;
    else
      return false;
  });
  if(filteredArr.length%2!=0){             //if we don't have pairs of brackets
    return false;
  }
  while(i<filteredArr.length-1){
    index=symbols.indexOf(filteredArr[i]);
    if(index%2==0 && symbols.indexOf(filteredArr[i+1])==index+1){
      filteredArr.splice(i, 2);             //if we meet a pair - remove it
      i=0;
      continue;
    }
    i++;
  }
  if(filteredArr.length==0){                //if all the pairs were removed => true
    return true;
  } else{
    return false;
  }
}


//console.log(isBalanced("sd [3233] dsd(Sensei says yes) other text[sdsf] sdfsf [] xx (sdf)", "()[]"));
//true

//console.log(isBalanced("[Sensei [(says) no!]", "()[]"));
//false
