var textArea = document.getElementById('inputArea'),
//	symbols = [".",",","!","?","/",'"',"-","<",">","*",,"'"],	// some separators of words
	mask = /[\!\?\_\+\-\=\’\'.\,\:\;\(\)\{\}\\\/]/ 				//

/*
* Button's event handler
*/
function runCalculate(){
	Array.from(document.getElementsByClassName('result')).forEach( item => item.remove() )	// delete all previous result messages 
	try{ 
		var text = textArea.value.split('').filter((el)=>{ return (mask.test(el)==false) }).join(''); // filter input data
		parseWords(text)
	}
	catch(e) { showMessage(e, false) }
}

/*
* Method collects words by RegExp
* & calculates all the necessary values
*/
function parseWords(text){

	var words, max=0, min=0, average=0 

	startTimer = +new Date()
	words = text.match(/[\А-я\w\d]+/g)
	console.log(words)
	if (words == null) throw "No words found"								// throw exeption if no words are found

		max = min = words[0].split('').length 								// min = max = length of first word
		words.forEach((item, i, arr)=>{
		let l = item.split('').length 										// current len
		max = l > max ? l : max
		min = l < min ? l : min
		average = i<arr.length-1 ?  average+l : (average+l)/arr.length 		// average length of words (letters only)
		})

	endTimer = +new Date() - startTimer

	showMessage("Calculation result:")
	showMessage(`Amount of words: ${words.length}`, true)
	showMessage(`Length of the maximal word: ${max}`, true)
	showMessage(`Length of the minimum word: ${min}`, true)
	showMessage(`Avarage length of words: ${average.toFixed(2)}`, true)

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
		d.className = success==true ? "result success" : "result error"; // why does not works '!error ? ...'
		//else d.className = "result"
		d.innerHTML = message;
	document.getElementById('messages').appendChild(d);
}
