var btn = document.querySelector('button');
var textArea = document.querySelector('textarea');
var numbersField = document.querySelector("output[name='numberWords']");
var maxField = document.querySelector("output[name='maxLength']");
var minField = document.querySelector("output[name='minLength']");
var averageField = document.querySelector("output[name='averageLength']");
var str;
var array;

btn.addEventListener('click', function(event){
  event.preventDefault();
  str = textArea.value;
  array = str.match(/\w+[.,\-';]?\w+/g);
  numbersField.value = array.length;
  countWordsLength(array);
})

function countWordsLength(arr){
  var i, max=0, min=Number.MAX_SAFE_INTEGER, sum=0;
  for(i=0;i<arr.length;i++){
    sum+=arr[i].length;
    if(arr[i].length>max)
      max=arr[i].length;
    if(arr[i].length<min)
      min=arr[i].length;
  }
  maxField.value=max;
  minField.value=min;
  averageField.value=Math.round(sum/arr.length);
}
