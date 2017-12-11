/**
    1. Remove duplicates.
        Write a function that removes duplicate values from an array.
        Example:
        removeDuplicates([1, 3, 7, 1, 3, 9, 8, 7]);     //  [1, 3, 7, 9, 8]
        
*   @param {Array} arr
*   @returns {Array} newArr
*/
function removeDuplicates(arr) {
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
        if (newArr.indexOf(arr[i]) < 0) {
            newArr.push(arr[i]);
        }
    }
    return newArr;
}

/**
    2. Common values.
        Write a function that returns the common values of two arrays.
        Example:
        commonValues([3, 4, 6, 3, 1], [5, 10, 7, 1, 3, 9, 8, 7]);     //  [3, 1]
        
*   @param {Array} arr1
*   @param {Array} arr2
*   @returns {Array} newArr
*/
function commonValues(arr1, arr2) {
    let newArr = [];
    for (let i = 0; i < arr1.length; i++) {
    if ((newArr.indexOf(arr1[i]) < 0) && arr2.includes(arr1[i])) {
        newArr.push(arr1[i]);
    }
  }  
  return newArr;
}

/**
    3. Distinct values.
        Write a function that returns the distinct values of two arrays.
        Example:
        distinctValues([3, 4, 6, 3, 1], [5, 10, 7, 1, 3, 9, 8, 7]);     //  [4, 6, 5, 10, 7, 9, 8]
        
*   @param {Array} arr1
*   @param {Array} arr2
*   @returns {Array} newArr
*/
function distinctValues(arr1, arr2) {
    let b = arr1.concat(arr2),
        newArr = [];
    for (let i = 0; i < b.length; i++) {
        if ((newArr.indexOf(b[i]) < 0) && !(arr1.includes(b[i]) && arr2.includes(b[i]))) {
            newArr.push(b[i]);
        }
    }  
    return newArr;
}

/**
    4. Random.
        Write a function which creates an array with defined size and fills it with random values
        
        function generateArr(arrSize) {...};
        
*   @param {number} arrSize
*   @returns {Array} arr
*/
function generateArr(arrSize) {
    let arr = [];
        for (let i = 0; i < arrSize; i++) {
            arr.push(Math.round(Math.random() * 10));
        }
    return arr;
}

/**
    5. Includes.
        Write your own implementation of Array.prototype.includes() method.
        
*   @param {*} elem
*   @param {number} [index=0]
*   @returns {boolean}
*/
Array.prototype.includes = function(elem, index = 0) {
    if (this.length === 0) {
            return false;
    }
    if (index < 0) {
        index = this.length + index;
    }
    for (index; index < this.length; index++) {
        if (this[index] === elem || isNaN(this[index]) === isNaN(elem)) {
            return true;
        }
    }
    return false;
}