var calculater = document.getElementById('calculater');
    
calculater.addEventListener('click',calculate);

    /**
    * Function calculate.
     * The function is created to find the number of words,
     *  length of the maximum word, length of the minimum word and average length of words.
     */
 
function calculate(){
var textvalue = document.getElementById('text').value,
    words = textvalue.replace(/[\.!?()',-]/g,"").replace(/\s+/g, " ").split(" "),
    numberOfWords = words.length,
    minWord = words[0],
    maxWord = minWord,
    lengthOfWords = 0,
    averangeLength,
    i;
 
  for(i = 0; i < words.length;i++){
        
        if (words[i].length < minWord.length){
        minWord = words[i];
        }
        else if (words[i].length > maxWord.length){
            maxWord = words[i];
        }
        lengthOfWords += words[i].length;
    }
    averangeLength = Math.round(lengthOfWords/numberOfWords);
    
    document.getElementById("number").innerHTML = numberOfWords ;
    document.getElementById("max-word").innerHTML = maxWord.length;
    document.getElementById("min-word").innerHTML = minWord.length;
    document.getElementById("average-length").innerHTML  = averangeLength;

}

 
