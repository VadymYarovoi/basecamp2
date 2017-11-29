/* function calculate number of words, length of the maximum word,
 * length of the minimum word and average length of words in the entered line
 */
function calcString() {
    var string = document.getElementById("textarea").value,
        words = string.match(/\w+[,'-]?\w+/gi),
        countOfWords = words.length,
        maximalWord = words[0],
        minimumWord = words[0],
        averageLength = words[0].length,
        i;

    for(i = 1; i < countOfWords; i++) {
        averageLength += words[i].length;

        if(words[i].length > maximalWord.length) {
            maximalWord = words[i];
        } else if (words[i].length < minimumWord.length) {
            minimumWord = words[i];
        }
    }

    maximalWord = maximalWord.length;
    minimumWord = minimumWord.length;
    averageLength = Math.round(averageLength / countOfWords);

    putValues(countOfWords, maximalWord, minimumWord, averageLength);
}

/**
 * function put values from calcString in the relevant spans
 * @param {number} count
 * @param {number} max 
 * @param {number} min 
 * @param {number} average 
 */
function putValues(count, max, min, average) {
    document.getElementById("number-of-words").innerHTML = count;
    document.getElementById("maximal").innerHTML = max;
    document.getElementById("minimum").innerHTML = min;
    document.getElementById("average").innerHTML = average;
}