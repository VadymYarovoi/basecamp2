//initialize variables
let textArea = document.getElementById('textBox'),
 calcBtn = document.getElementById('calc'),
 showNumberWords = document.getElementById('numOfWords'),
 showlengthMax = document.getElementById('lengthMax'),
 showlengthMin = document.getElementById('lengthMin'),
 showAverage = document.getElementById('average'),
 text, //an array of words
 reg = /\s+/g,
 i,
 info, //result
 numOfWords, maxWord, minWord, averageWord; // show


calcBtn.addEventListener("click", calculate);

/*  
    the function calculates the number of letters, 
    the length of the largest and the smallest words, 
    and the average length of the word
*/
function calculate(){
    //parsing string
    text = textArea.value.replace(/,|\.(?=\s+)/g,'');  //convert "123, 456. 1....2" => "123 456 1....2"
    text = text.split(reg);   //convert a string to an array
    for(i in text){             //make two words with "multi - line" (delete '-')
        if(text[i]=='-'){       
            text.splice(i,1);
        }
    }
    // program logic
    numOfWords = text.length; 
    maxWord = Math.max(...(text.map(el => el.length))); // search for the longest word
    minWord = Math.min(...(text.map(el => el.length))); // search for the shortest word
    averageWord = Math.round( text.join('').length / numOfWords ); //average value
    
    // show
    showNumberWords.innerHTML = numOfWords;
    showlengthMax.innerHTML = maxWord;
    showlengthMin.innerHTML = minWord;
    showAverage.innerHTML = averageWord;
}





