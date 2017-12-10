Array.prototype.removeDuplicates = function(){
	return this.reduce((acc,item)=>{ return acc.includes(item)==false ? acc.concat(item) : acc}, [])
}

console.log([1, 3, 7, 1, 3, 9, 8, 7].removeDuplicates())

Array.prototype.commonValues = function(arr){
	return this.removeDuplicates().reduce((acc,item)=>{ 
	return arr.includes(item)==true ? acc.concat(item) : acc}, [])
}

console.log([3, 4, 6, 3, 1].commonValues([5, 10, 7, 1, 3, 9, 8, 7]))

Array.prototype.distinctValues = function(arr){
	var res = []
	this.removeDuplicates().forEach(item=>{	arr.includes(item)==true ? arr.splice(arr.indexOf(item), 1) : res.push(item) })
	res = res.concat(arr.removeDuplicates());
	return res;
}

console.log([3, 4, 6, 3, 1].distinctValues([5, 10, 7, 1, 3, 9, 8, 7]))

function generateArr(arrSize) {
	var size = Math.abs(arrSize), arr = new Array(size)
	for (var i=0; i< size; i++) arr[i] = Math.ceil(Math.random() * 1000)
	return arr
}

console.log(generateArr(5))

Array.prototype.includes = function(el){
	for(var i=0; i<this.length; i++) 
		if (this[i].toString() == el.toString()) return true; 
	return false;
}

console.log([1,2,3,4,9,5,6,7,8,9,5,15].includes(15))