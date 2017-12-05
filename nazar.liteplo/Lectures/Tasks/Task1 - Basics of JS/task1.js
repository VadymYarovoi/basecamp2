var btn = document.getElementById('calculate'),
	outputWord = document.getElementById('word-number'),
	outputMaxWord =	document.getElementById('max-word'),
	outputMinWord	= document.getElementById('min-word'),
	outputAverage = document.getElementById('average');

btn.addEventListener('click', countNumberOfWords);

function countNumberOfWords(){

	var userText = document.getElementById('textarea').value,
			words = formatTextToArray(userText),
			numberOfWords = countWords(words),
			minWordLength = findMinWordLenth(words),
			maxWordLength = findMaxWordLenth(words),
			averageWorldLength = countAverage(words);

	displayValue(numberOfWords, minWordLength, maxWordLength, averageWorldLength);
}

/**  from string to array without no-letters symbol, new-line symbol, white spaces 
	* @param {string} text
	* @return {array}
	*/
function formatTextToArray(text){
	text = text.trim();
	text = text.replace(/\n/g, " ");
	text = text.replace(/[^a-zA-Z ]/g, "");			
	text = text.replace(/[ ]{2,}/g, " ");
	return text.split(" ");
}

/**  Count number of words in the array
	* @param {array} words
	* @return {Number}
	*/
function countWords(words){
	if(words.length == 1 && words[0] === ""){
		return 0;
	}else 
		return  words.length;
}

/**  Find the number of letters in the shortest word
	* @param {array} words
	* @return {Number}
	*/
function findMinWordLenth(words){
	var wordsLengths = words.map(function(word) {
 		return word.length;
	});
	return Math.min.apply(null, wordsLengths);
}

/**  Find the number of letters in the longest word
	* @param {array} words
	* @return {Number}
	*/
function findMaxWordLenth(words){
	var wordsLengths = words.map(function(word) {
 		return word.length;
	});
	return Math.max.apply(null, wordsLengths);
}

/**  Count average length of words in the text
	* @param {array} words
	* @return {Number}
	*/
function countAverage(words){
	var average = 0,
			i;
	for(i = 0; i < words.length; i++){
		average += words[i].length; 
	}
	return Math.round(average / words.length);
}

/**  Display value in html
	* @param {Number} numberOfWords
	* @param {Number} min
	* @param {Number} max
	* @param {Number} average
	*/	
function displayValue(numberOfWords, min, max, average){
	outputWord.innerHTML = numberOfWords;
	outputMaxWord.innerHTML = max;
	outputMinWord.innerHTML = min;
	outputAverage.innerHTML = average;
}