document.getElementById("btn").addEventListener("click", calculate)

/**
 * Function calculate. Create for count number of words, find length of the 
 * max word, find length of min word, find average length of words
 */
function calculate() {
    var msg = document.getElementById("msg").value,
        average,
        i,
        maxLnWord,
        minLnWord,
        arrOfWords = msg.replace(/[\-,]/g, "").trim().split(/[\n\s]+/),
        wordsNum = arrOfWords.length,
        total = 0;
    for (i = 0; i < wordsNum; i++) {
        total += arrOfWords[i].length;
    }
    average = total / wordsNum;
    //Find max length of the words
    maxLnWord = Math.max.apply(null, arrOfWords.map(function(el) {
        return el.length;
    }));
    //Find min length of the words
    minLnWord = Math.min.apply(null, arrOfWords.map(function(el) {
        return el.length;
    }));
    //Dispay result into DOM
    dispayResults(wordsNum, maxLnWord, minLnWord, average)
}

/**
 * Function displayResults. Create for displaying data from function calculate 
 * into DOM.
 * @param {*number of words in array} wordsNum 
 * @param {*length of the max word} maxLnWord 
 * @param {*length of the min word} minLnWord 
 * @param {*average length of words} averageLn 
 */
function dispayResults(wordsNum, maxLnWord, minLnWord, averageLn) {
    document.getElementById("num").textContent = wordsNum;
    document.getElementById("max").textContent = maxLnWord;
    document.getElementById("min").textContent = minLnWord;
    document.getElementById("average").textContent = averageLn;
}