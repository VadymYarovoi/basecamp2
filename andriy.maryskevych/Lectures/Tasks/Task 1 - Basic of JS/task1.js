window.onload = function(){
    document.getElementById('form').onsubmit = function(Form){
        //prevent page reloadig
        Form.preventDefault();

        var text = document.getElementById('textArea').value;

        // parse textArea value to array 
        // regex accepts all symbol sequences that sarts and ends with letters
        var res = text.match(/(\w+[\,\.\-\:])*\w+/g)     
       
        var content = document.getElementById('data');
        var minLength, maxLength, sum;

        if(res && res.length > 0)
        {
            minLength = res[0].length;
            maxLength = res[0].length;
            sum = res[0].length;

            for(var i = 1; i < res.length; i++)
            {
                var length = res[i].length;

                sum += length;
                if(minLength > length)
                {
                    minLength = length;
                }                
                if(maxLength < length)
                {
                    maxLength = length;
                }
            }
            content.innerHTML = `<p>Number of words: <${res.length}></p><br>
                              <p>Length of the maximal word: <${maxLength}></p><br>
                              <p>Length of the minimum word: <${minLength}></p><br>
                              <p>Average length of words: <${sum/res.length}></p><br> `
        }
        else{
            content.innerHTML = '<p>Empty input</p>'
        }
    }
}