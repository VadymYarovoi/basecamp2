function removeDublicates(arr){
	arr.forEach(function(item, i){
		while(arr.lastIndexOf(item) != i){
			arr.splice(arr.lastIndexOf(item), 1);
		}
	});
	return arr;
}

//console.log(removeDublicates([1,3,7,1,3,9,8,7]));

/////////////////////////////////////////////////////

function commonValues(arr1, arr2){
	var common = [];
	for (var i = 0; i < arr1.length; i++) {
		for (var j = 0; j < arr2.length; j++) {
			if(arr1[i] == arr2[j]){
				common.push(arr1[i]);
			}
		}
	}
	return removeDublicates(common);
}

//console.log(commonValues([3,4,6,3,1], [5,10,7,1,3,9,8,7]));

/////////////////////////////////////////////////////

function distinctValues(arr1, arr2){
	var filtered = commonValues(removeDublicates(arr1), removeDublicates(arr2));
	var newArr = arr1.concat(arr2);
	var result = newArr.filter(function(item){
			return  !filtered.includes(item);
	});
	return result;
}

//console.log(distinctValues([3,4,6,3,1], [5,10,7,1,3,9,8,7]));

/////////////////////////////////////////////////////////////

function generateArr(arrSize) {
	var arr = [];
	arr.length = arrSize;
	for (var i = 0; i < arr.length; i++) {
		 arr[i] = Math.floor(Math.random() * 10);
	}
	return arr;
}

//console.log(generateArr(7));

/////////////////////////////////////////////////////////////////

Array.prototype.myIncludes = function (item){
	var fromIndex = arguments[1],
		arr = this,
		obj = {},
		i;
	
	if(fromIndex || fromIndex == 0){
		if(fromIndex >= arr.length){
			return false;
		}
		else if(fromIndex < 0){
			i = arr.length + fromIndex;
		}
		else {
			i = fromIndex;
		}
	}	
	else {
		i = 0;
	}
	for ( i; i < arr.length; i++ ) {
		obj[arr[i]] = true;
	}
	return obj.hasOwnProperty(item);
}

//console.log([12,5,4, 'a', 3,7,1,9,16, NaN].myIncludes(7, -4));
