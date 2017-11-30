/**
 * Finds words quantity of array, minimal word length,
 * maximal word length, average length of word.  
 * Separators: ";" ":" "." "," "-". For example: multi-word (1 word)
 * multi - word (2 words). Any other punctuation marks are not visible
 * For example: multi?word(2 words). You can add any separator at
 * the beginning of [...] block in line (1). For example: multi?word(1 word)
 */
function submitted()
{
	"use strict";
	var text = document.forms[0].textarea.value;
	text = text.replace(/[;:,.-]/gi, ""); //  (1)
	var words = text.match(/[a-z]+/gi);
	var i, j;
	var arrOfLength = [];
	var maxLength, minLength, averageLength;
	var sum = 0;

	for(i = 0; i < words.length; i++)
	{
		arrOfLength[i] = words[i].length;
	}
	
	minLength = getMinOfArray(arrOfLength);
	maxLength = getMaxOfArray(arrOfLength);
	
	for(j = 0; j < arrOfLength.length; j++)
	{
		sum = sum + arrOfLength[j];
	}
	
	averageLength = sum / arrOfLength.length;
		
	document.getElementById('numOfWords').textContent = words.length;
	document.getElementById('maxWord').textContent = maxLength;
	document.getElementById('minWord').textContent = minLength;
	document.getElementById('avLength').textContent = averageLength;	
}

/**
 * Finds minimal number of array
 * @param {Array} numArray 
 * @return {Number}
 */
function getMinOfArray(numArray) {
  return Math.min.apply(null, numArray);
}

/**
 * Finds maximal number of array
 * @param {Array} numArray 
 * @return {Number}
 */
function getMaxOfArray(numArray) {
  return Math.max.apply(null, numArray);
}