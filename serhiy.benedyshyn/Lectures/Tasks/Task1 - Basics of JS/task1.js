
var textArea = textArea = document.getElementById('inputArea')

/*
* Button's event handler
*/

function runCalculate(){
	Array.from(document.getElementsByClassName('result')).forEach( item => item.remove() )	// delete all previous result messages 

	try{
		//forEachMethod(textArea.value)	// I made 3 different functions
		//reduceMethod(textArea.value)	// to check thier speed
		forMethod(textArea.value)		// & to find the most acceptable 
	}
	catch(e) { showMessage(e, false) }
}



/*
* Method collects words by RegExp
* & calculates all the necessary values.
*/

function forEachMethod(text){

	var words, max=0, min=0, avarage=0 

	startTimer = +new Date()
	words = textArea.value.match(/[\А-я\w\d\-_’']+/g)
	if (words == null) throw "No words found"

		max = min = words[0].split('').length 								// min = max = length of first word
		words.forEach((item, i, arr)=>{
		let l = item.split('').length 										// current len
		max = l > max ? l : max
		min = l < min ? l : min
		avarage = i<arr.length-1 ?  avarage+l : (avarage+l)/arr.length
		})

	endTimer = +new Date() - startTimer

	showMessage("forEachMethod:")
	showMessage(`Amount of words: ${words.length}`, true)
	showMessage(`Length of the maximal word: ${max}`, true)
	showMessage(`Length of the minimum word: ${min}`, true)
	showMessage(`Avarage length of words: ${avarage.toFixed(2)}`, true)

	showMessage(`Task completed in ${endTimer} ms`, endTimer<100)
}


/*
* Method do not need no additional variables
*/

function reduceMethod(text){
	startTimer = +new Date()

	var words = text.match(/[\А-я\w\d\-_’']+/g) 							 // get array of matched symbols
		if (words == null) throw "No words found"							 // check if words!=null

	showMessage("reduceMethod:")
	showMessage(`Amount of words: ${words.length}`, true)

	showMessage(`Length of the maximal word: ${words.reduce((max, item) => { // seeking the longest word
				let val = item.split('').length 						   	 // current len
				return val > max ? val : max 								 // result
				}, 0)}`, true)

	showMessage(`Length of the minimum word: ${words.reduce((min, item) => { 
				let val = item.split('').length
				return val < min ? val : min
				}, words[0].split('').length)}`, true)

	showMessage(`Avarage length of words: ${(words.reduce((avr, item) => { 
				return avr + item.split('').length
				}, 0) / words.length).toFixed(2)}`, true)					// adds all items lengths and divides on words amount

	endTimer = +new Date() - startTimer
	showMessage(`Task completed in ${endTimer} ms`, endTimer<100)	
}




/*
* The fastest method
* passes through the string only once
* & calculates all the values
*/

function forMethod(text){
	startTimer = +new Date()

	var str, symbols, words, max, min, letters, alletters				// all values
	
	symbols = [" ",".",",","!","?","/",'"',"-","<",">"]								// some separators of words
	str = text.split('')
	words = max = min = avarage = letters = alletters = 0				// default initialization
	str.push(' ')														// push one space because next algorithm needs separator 
																		// after last word
	for (var i=0; i<str.length;i++){									
		if (symbols.includes(str[i])==false) letters++					// if str[i] is not separator add 1 to word's letter counter
		else{															// if str[i] is separator
			if (symbols.includes(str[i-1])==false && letters > 0){		// and it counts some letters inline
				words++													// add 1 to words counter
				if (max == 0 && min == 0) max = min = letters 			// the condition is fulfilled only at the first pass of the cycle
				else{
				max = letters > max ? letters : max
				min = letters < min ? letters : min
				}
			}
			alletters += letters
			letters = 0
		}
	}
	endTimer = +new Date() - startTimer

	showMessage("forMethod:")
	showMessage(`Amount of words: ${words}`, true)
	showMessage(`Length of the maximal word: ${max}`, true)
	showMessage(`Length of the minimum word: ${min}`, true)
	showMessage(`Avarage length of words: ${(alletters/words).toFixed(2)}`, true)
	
	showMessage(`Task completed in ${endTimer} ms`, endTimer<100)
}



/*
* Create div element for output line
* Block has 3 different modes: simple, success & error
*/

function showMessage(message, success){
	var d = document.createElement('div');								 
		d.className = "result"
		if (arguments.length>1)										     // like a overload of func
		d.className = success==true ? "result success" : "result error"; // why does not work '!error ? ...'
		//else d.className = "result"
		d.innerHTML = message;
	document.getElementById('messages').appendChild(d);
}
