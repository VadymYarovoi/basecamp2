/**
 * Array.prototype.filter implementation
 * @param {Function} callback 
 * @param {Object} thisArg
 * @returns {Array} 
 */
Array.prototype.MyFilter = function(callback, thisArg = this)
{
    var res = [], i;
    for( i = 0; i < this.length; i++)
    {
        if(callback.call(thisArg, this[i], i, this))
        {
            res.push(this[i]);
        }
    }
    return res;
}


/**
 * takes an array of values and moves all elements that are zero to the end of the array
 * @param {Array} arr 
 * @returns {Array}
 */
function RemoveZeros(arr)
{
    var res = arr.filter(val => val != 0);
    res = res.concat(new Array(arr.length - res.length).fill(0));
    return res;
}

/**
 * takes an array of integers (positive and negative) and returns
 * the longest contiguous sequence in this array, which total sum of elements equal 0
 * @param {Array} arr 
 * @returns {Array}
 */
function LongestSequenceZeroSum(arr)
{
    var zero = [], i, j, sum;
    for(i = 0; i < arr.length; i++)
    {
        sum = 0;
        for(j = i; j < arr.length; j++)
        {
            sum += arr[j];
            if(sum == 0)
            {
                zero.push({
                    start : i,
                    end : j,
                    len : j - i
                })
            }
        }
    }
    if(zero.length > 0)
    {
        var result = zero.reduce(function(accumulator, current){            
            if(accumulator.len < current.len)
            {
                return current;
            }
            else{ 
                return accumulator;
            }
        })
        return arr.slice(result.start, result.end + 1);
    }
    else{
        return [];
    }
    
}

/**
 * returns true when its argument is an array that has the same nesting structure as the first array
 * @param {Array} arr 
 * @returns {Boolean}
 */
Array.prototype.sameStructureAs = function(arr)
{
    var i;
    for(i = 0; i < this.length; i++)
    {
        if(Array.isArray(this[i]))
        {
            if(Array.isArray(arr[i]))
            {
                this[i].sameStructureAs(arr[i]);
            }
            else{
                return false;
            }
        }
    }    
    //if second array is bigger and has array after end of first array
    if(arr.length > this.length && arr.slice(arr.length-1).some(val => Array.isArray(val)))
    {
        return false;
    }
    return true;
}


/**
 * validate that a supplied string is balanced
 * @param {String} str 
 * @param {String} rule 
 * @returns {Boolean}
 */
function isBalanced(str, rule)
{
    var bracket = str.split('').filter(val => rule.includes(val)), i, open = [];   
    for(i = 0; i < bracket.length; i++)
    {
        if(bracket[i] == '(' || bracket[i] == '[')
        {
            open.push(bracket[i]);
        }
        else{
            if(bracket[i] == ')' && open.pop() != '(')
            {                
                return false;                
            }
            if(bracket[i] == ']' && open.pop() != '[')
            {               
                return false;                
            }
        }
    }
    return open.length == 0;
}