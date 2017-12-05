var usersText = document.getElementById("usersText"),
    button = document.getElementById("submit"),
    reset = document.getElementById("reset");

/*
 *delete all non-letters symbols from text
 *using reg-exes
 */
function textTrim(str) {
    var cleanedText = str.replace(/[,.:;\-\!?<>"@#$%^&*|/'=]/gi, '').replace(/\n/ig, ' ');
    return cleanedText;
}

/*
 *Calculating by click on button:
 * number of all words,
 *longest word's length,
 *shortest word's length,
 *average word's length.
 */
button.onclick = function () {
    var textArray = textTrim(usersText.value).split(" "),
        wordsCount = 0,
        longestLength = textArray[0].length,
        shortestLength = textArray[0].length,
        avLength = 0,
        i;

    for (i = 0; i < textArray.length; i++) {
        if (textArray[i] != "") {
            wordsCount++;
        }
        if (textArray[i].length > longestLength) {
            longestLength = textArray[i].length;
        }
        if (textArray[i].length < shortestLength && textArray[i].length != 0) {
            shortestLength = textArray[i].length;
        }
        avLength += textArray[i].length;
    }
    document.getElementById("allLength").innerHTML = wordsCount;
    document.getElementById("longestLength").innerHTML = longestLength;
    document.getElementById("shortestLength").innerHTML = shortestLength;

    /*
     *NaN error handler
     */
    if (usersText.value == "") {
        document.getElementById("avLength").innerHTML = "Enter some text.";
    } else {
        document.getElementById("avLength").innerHTML = Math.round(avLength / wordsCount);
    }
}
/*
*button for cleaning text area
*/
reset.onclick = function () {
    usersText.value = "";
    document.getElementById("allLength").innerHTML = "";
    document.getElementById("longestLength").innerHTML = "";
    document.getElementById("shortestLength").innerHTML = "";
    document.getElementById("avLength").innerHTML = "";
}
