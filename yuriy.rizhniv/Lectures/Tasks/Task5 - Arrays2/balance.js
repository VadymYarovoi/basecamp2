function isBalanced(str, brackets){
	let arr = str.split(''),
		checkArr = brackets.split(''),
		structure = [],
		steck = [];

	for (let i = 0; i < arr.length; i++) {
		for (let j = 0; j < checkArr.length; j++) {
			if(arr[i] == checkArr[j]){
				structure.push(arr[i]);
			}
		}
	}

	for (var i = 0; i < structure.length; i++) {
		for (var j = 0; j < brackets.length; j+=2) {
			if(structure[i] == brackets[j]){
				steck.push(structure[i]);	
			}			
		}
		for (var k = 1; k < brackets.length; k+=2) {
			if(structure[i] == brackets[k]){
				if(brackets[brackets.indexOf(steck[steck.length-1]) + 1] == brackets[k]){
					steck.pop();
					break;
				}
				else return false;
			}
		}
	}
	return steck.length == 0;
}

console.log(isBalanced("(Sensei {says[]} (0) yes!)", "()[]{}"));