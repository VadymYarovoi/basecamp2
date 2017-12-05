/**
 * function splits the value entered in the field into an array and filtering,
 * creates an array of elements length and sorts it
 */

function findWords(){
	var text = document.getElementById('area').value;
	var arr = text.split(' ');
	var filterArr = arr.filter(function(item){
		return item !== ' ' && item !== '.' && item !== ',' && item !== '' && item !== '-';
	});

	var lengthArr=[];

	for(var i = 0; i < filterArr.length; i++){
		lengthArr.push(filterArr[i].length);
	}
	console.log(filterArr);

	var sortArr = lengthArr.sort(function (a, b){
		return a - b;
	});
	
	showProps(sortArr);
}

/**
 * The function counts the number of words, length of the minimum word, 
 * length of the maximal word,  the average length of words, and places their values in tags.
 * @param {array} arr
 */

function showProps(arr){
	var average = arr.reduce(function(prev, curr){
		return prev + curr;
	})/arr.length;

	var props = [arr.length, arr[arr.length-1], arr[0], average];
	console.log(props);
	for(var i = 0, p = 1; i < props.length; i++, p++){
		var id = 'b'+p+'';
		document.getElementById(id).innerHTML = '<' + props[i] + '>';
	}	
}