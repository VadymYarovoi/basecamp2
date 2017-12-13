/**
    1. Filter.
        Write your own implementation of Array.prototype.filter() method
*
*   @param callback - User's defined function
*   @param {Array} newArr - New array for filtered values
*   @returns {Array} newArr
*/
Array.prototype.filter = function(callback) {
	let newArr = [];
    if (typeof callback !== "function") {
        throw new TypeError(`${this}.filter is not a function`);
    }
	for (let i = 0; i < this.length; i++) {
        if (i in this) {
    	   if (callback(this[i])) {
    	       newArr.push(this[i]);
            }
        }  	
    }
	return newArr;
}

/**
    2. Remove Zeros.
        Write a function that takes an array of values and moves all elements that are zero to the end of the array,
        otherwise preserving the order of the array. The zero elements must also maintain the order in which they occurred.
        Example:

        [7, 2, 3, 0, 4, 6, 0, 0, 13, 0, 78, 0, 0, 19, 14]
        is transformed into
        [7, 2, 3, 4, 6, 13, 78, 19, 14, 0, 0, 0, 0, 0, 0]
*
*   *** SOLUTION 1 ***
*   @param {Array} arr - Input array
*   @param {number} counter - Counter for zeros in array
*   @returns {Array}
*/
function removeZeros(arr) {
	let counter = 0;
	while (arr.indexOf(0) >= 0) {
        arr.splice(arr.indexOf(0), 1);
        counter++;
    }
    return arr.concat(Array.from({length: counter}, item => 0));
}
/*
*   *** SOLUTION 2 ***
*   @param {Array} arr - Input array
*   @param {Array} newArr - Array for numbers not equal to zero
*   @param {Array} zero - Array for zeros
*   @returns {Array} newArr
*/
function removeZeros(arr) {
    let newArr = [], zero = [];
    for (let i = 0; i < arr.length; i++) {
        arr[i] === 0 ? zero.push(0) : newArr.push(arr[i]);
    }
    return newArr.concat(zero);
}

/**
    3. Nesting Structure Comparison.
        Write a function which returns true when its argument is an array that has the same nesting structure as the first array.
        Example:

        //  should return true
        [ 1, 1, 1 ].sameStructureAs( [ 2, 2, 2 ] );
        [ 1, [ 1, 1 ] ].sameStructureAs( [ 2, [ 2, 2 ] ] );

        //  should return false
        [ 1, [ 1, 1 ] ].sameStructureAs( [ [ 2, 2 ], 2 ] );
        [ 1, [ 1, 1 ] ].sameStructureAs( [ [ 2 ], 2 ] );
*
*   @param {Array} arr1 - Input array
*   @param {Array} arr2 - Input array 2
*   @param {Array} result - Array with true/false results from our comparison
*   @returns {boolean}
*/
function sameStructureAs(arr1, arr2) {
	let result = arr1.map((item, i) => {
        if (Array.isArray(item) || Array.isArray(arr2[i])) {
    	   return Array.isArray(item) === Array.isArray(arr2[i]);
        }
        return typeof item === typeof arr2[i];
    });  
    return result.every(item => item === true);
}

/**
    4. Longest sequence with zero sum.
        Write a method which takes an array of integers (positive and negative) and returns
        the longest contiguous sequence in this array, which total sum of elements equal 0.
        Example:

        maxZeroSequenceLength([25, -35, 12, 6, 92, -115, 17, 2, 2, 2, -7, 2, -9, 16, 2, -11])

        Should return [92, -115, 17, 2, 2, 2]
        because this is the longest zero-sum sequence in the array.
*
*   @param {Array} arr - Input array
*   @param {number} sum - Sum of elements sequence
*   @param {Array} tempArr - Temporary array for current sequence
*   @param {Array} finalArr - Final array with our proper sequences
*   @param {Array} lengthArr - Array with lengths of out final array's elements
*   @returns {Array}
*/
function maxZeroSequenceLength(arr) {
	let sum,
        tempArr,
        finalArr = [],
        lengthArr;
    for (let i = 0; i < arr.length; i++) {
        sum = arr[i];
        tempArr = [arr[i]];
        for (let j = i + 1; j < arr.length; j++) {
            sum += arr[j];
            tempArr.push(arr[j]);  
            if (sum === 0) {
                finalArr.push(tempArr);
                break;
            }
        }
    }  
    lengthArr = finalArr.map(item => item.length);
    return finalArr[lengthArr.indexOf(Math.max(...lengthArr))];
}

/**
    5. Balancing parentheses.
        Write a piece of code to validate that a supplied string is balanced.
        You will be given a string to validate, and a second string, where each pair of characters
        defines an opening and closing sequence that needs balancing.
        Example:

        isBalanced("(Sensei says yes!)", "()")  //  true
        isBalanced("(Sensei says no!", "()")    //  false

        isBalanced("(Sensei [says] yes!)", "()[]")  //  true
        isBalanced("(Sensei [says) no!]", "()[]")   //  false
*
*   @param {string} str - Input string
*   @param {string} parens - Input string with different parentheses
*   @param {string} p - Transitional variable for pattern
*   @param {string|Array} p2 - Transitional variable for pattern2
*   @param {number} t - Temporary counter
*   @param {number} x - Temporary variable for our pattern2 proper working
*   @param pattern - Regular expression
*   @param pattern2 - Regular expression
*   @param {Array} - Array that contains only parentheses
*   @returns {boolean}
*/
function isBalanced(str, parens) {
	let p = Array.prototype.map.call(parens, item => '\\' + item + '+').join('|'),
        p2 = [],
        t = 0,
        x;
    if (parens.length > 2) {
        x = parens.length / 2 - 1;
        p2 = Array.prototype.map.call(parens, item => '\\' + item);
        for (x; x > 0; x--) {
            p2.splice((parens.length - x * 2) + t, 0, "|");
            t++;
        }        
        p2 = p2.join('');
    } else {
        p2 = Array.prototype.map.call(parens, item => '\\' + item).join('');
    }
    let pattern = new RegExp(p, "g"),
        pattern2 = new RegExp(p2, "g"),
        newArr = str.match(pattern);
    if (newArr === null) {
        return true;
    }
    newArr = newArr.join('');
    while (newArr.search(pattern2) >= 0) {
        newArr = newArr.replace(pattern2, "");
    } 
    return newArr.length === 0;
}