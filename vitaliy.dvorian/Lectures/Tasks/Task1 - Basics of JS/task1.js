//initialize variables
let textArea = document.querySelector('textarea');
let calc = document.querySelector('button');
let text; //an array of words
let reg = /\s+/g;
let i;
let paragraph = document.querySelector('p'); 
let info; //result
let numOfWords, maxWord, minWord, averageWord // show

/*  
    the function calculates the number of letters, 
    the length of the largest and the smallest words, 
    and the average length of the word
*/
calc.onclick = function(){
    //parsing string
    text = textArea.value.replace(/,|\.(?=\s+)/g,'');  //convert "123, 456. 1....2" => "123 456 1....2"
    text = text.split(reg);   //convert a string to an array
    for(i in text){             //make two words with "multi - line" (delete '-')
        if(text[i]=='-'){       
            text.splice(i,1);
        }
    }
    // program logic
    numOfWords = text.join('').length; 
    maxWord = Math.max(...(text.map(el => el.length))); // search for the longest word
    minWord = Math.min(...(text.map(el => el.length))); // search for the shortest word
    averageWord = Math.round( numOfWords / text.length ); //average value
    
    // show
    str = `Number of words: <${numOfWords}> <br>
           Length of the maximal word: <${maxWord}> <br>
           Length of the minimum word: <${minWord}> <br>
           Average length of words: <${averageWord}>`;
    paragraph.innerHTML = str;
}





