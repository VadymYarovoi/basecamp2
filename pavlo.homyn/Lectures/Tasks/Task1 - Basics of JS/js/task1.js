/*
*   List of assigned and unassigned variables:
*
*   calcButton      - button, which will calculate our words
*   textAtea        - area, where user enters his text
*   wordsSum        - span element where we will write total words number
*   maxWord         - span element for maximal word length
*   minWord         - span element for minimal word length
*   averageLength   - span element for average length of our words
*   wordPattern     - regional expression which will help us split our text into separated words
*   userText        - here we will save entered text in textarea
*   wordsArr        - array of separated words
*   wordsLengthArr  - array with words lenghts
*/

let calcButton = document.getElementById("button"),
    textArea = document.getElementById("user-text"),
    wordsSum = document.getElementById("words-sum"),
    maxWord = document.getElementById("max-length-word"),
    minWord = document.getElementById("min-length-word"),
    averageLength = document.getElementById("average-length"),
    wordPattern = /\W*\s+\W*/,
    userText,
    wordsArr,
    wordsLengthArr;   

/*
*   findMinWord:
*
*   - function for finding minimal word length;
*   - it takes one parameter, array;
*   - sorts this array from min to max;
*   - returns first element of the array;
*/

function findMinWord(arr) {    
    
    arr.sort((a, b) => a - b);
    return arr[0];
    
}

/*
*   findMaxWord:

*   - function for finding maximal word length;
*   - it takes one parameter, array;
*   - sorts this array from max to min;
*   - returns first element of the array;
*/

function findMaxWord(arr) {
    
    arr.sort((a, b) => b - a);
    return arr[0];
    
}

/*
*   findAverageLength:
*
*   - function for finding average word length;
*   - it takes one parameter, array;
*   - creates new variable 'total' and assigns it with sum of all words lengths;
*   - returns this variable 'total' divided by array length;
*/

function findAverageLength(arr) {
    
    let total = arr.reduce((sum, item) => sum + item);
    return total / arr.length;
    
}

/*
*   Function which would run when our button clicked:
*
*   1) it takes our text and replaces every non-alphanumeric symbol at the beggining and at the end
*   2) then checks our text for content, if empty then returns appropriate message
*   3) otherwise, it splits text into words, calculates its lenghts, calls our previous functions and
*      writes to us final results
*/

calcButton.addEventListener("click", function() {
   
    userText = textArea.value.replace(/^\W*/, '');
    userText = userText.replace(/\W*$/, ''); 
   
    if (userText.length === 0) {
        
        document.getElementById("calc-results").style.display = "none";
        document.getElementById("empty-textarea").style.display = "block";
        
    } else {    
        
        document.getElementById("empty-textarea").style.display = "none";
        document.getElementById("calc-results").style.display = "block";
        wordsArr = userText.split(wordPattern);
        wordsLengthArr = wordsArr.map(item => item.length);
        wordsSum.innerHTML = wordsArr.length;
        maxWord.innerHTML = findMaxWord(wordsLengthArr);
        minWord.innerHTML = findMinWord(wordsLengthArr);
        averageLength.innerHTML = Math.round(findAverageLength(wordsLengthArr));
        
    }        
});