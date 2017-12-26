/*
* 1. Removes duplicate values from an array.
* @param {Array} arr
* @return {Array} acc
*/
function removeDuplicates(arr){
	if (!(Array.isArray(arr))) throw "removeDuplicates(arr): Parameter should be an array";
	return arr.reduce((acc,item)=>{ return acc.includes(item)==false ? acc.concat(item) : acc}, []);
}

/*
* 2. Returns the common values of two arrays.
* @param {Array} arrA
* @param {Array} arrB
* @return {Array} acc
*/
function commonValues(arrA, arrB){
	if (!(Array.isArray(arrA)) || !(Array.isArray(arrB))) throw "commonValues(arrA, arrB): Both parameters should be arrays";
	return removeDuplicates(arrA).reduce((acc,item)=>{ 
	return arrB.includes(item)==true ? acc.concat(item) : acc}, []);
}

/*
* 3. Returns the distinct values of two arrays.
* @param {Array} arrA
* @param {Array} arrB
* @return {Array} res
*/
function distinctValues(arrA, arrB){
	if (!(Array.isArray(arrA)) || !(Array.isArray(arrB))) throw "distinctValues(arrA, arrB): Both parameters should be arrays";
	var res = [];
	removeDuplicates(arrA).forEach(item=>{	arrB.includes(item)==true ? arrB.splice(arrB.indexOf(item), 1) : res.push(item) });
	res = res.concat(removeDuplicates(arrB));
	return res;
}

/*
* 4. Creates an array with defined size and fills it with random values
* @param {integer} arrSize
* @return {Array} arr
*/
function generateArr(arrSize) {
	try {
		var size = Math.abs(arrSize), arr = new Array(size);
		for (var i=0; i< size; i++) 
			arr[i] = Math.ceil(Math.random() * 1000)
	}
	catch(e) { throw "generateArr(arrSize): Wrong range" }
	return arr;
}

/*
* 5. Own implementation of Array.prototype.includes() method.
* @param {object} el
* @return {bool} true/false
*/
Array.prototype.includes = function(el){
	var obj = new String(el);
	for(var i=0; i<this.length; i++) 
		if (new String(this[i]) == obj.toString()) return true; 
	return false;
}

// 1. console.log( removeDuplicates([1, 3, 7, 1, 3, 9, 8, 7]) ) //=> [1, 3, 7, 9, 8]

// 2. console.log( commonValues([3, 4, 6, 3, 1], [5, 10, 7, 1, 3, 9, 8, 7]) ) //=> [3, 1]

// 3. console.log( distinctValues([3, 4, 6, 3, 1], [5, 10, 7, 1, 3, 9, 8, 7]) ) //=> [4, 6, 5, 10, 7, 9, 8]

// 4. console.log( generateArr(5) ) // [a, b ,c, d, e]

// 5. console.log( [5, 10, 7, 1, 3, 7, NaN, {}, [1, 2], [1, 2, 3]].includes([1, 2, 3]) ) // => true