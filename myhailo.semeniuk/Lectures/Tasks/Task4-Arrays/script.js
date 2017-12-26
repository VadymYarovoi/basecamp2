function removeDuplicates(arr){
  var result = [], i;
  for(i=0; i<arr.length; i++){
    if(i==arr.indexOf(arr[i]))
      result.push(arr[i]);
  }
  return result;
}

function commonValues(arr1, arr2){
  var result = [], i;
  for(i=0; i<arr1.length; i++){
    if(arr2.indexOf(arr1[i])!=-1 && result.indexOf(arr1[i])==-1)
      result.push(arr1[i]);
  }
  return result;
}

function distinctValues(arr1, arr2){
  var result = [], i;
  for(i=0; i<arr1.length; i++){
    if(arr2.indexOf(arr1[i])==-1 && result.indexOf(arr1[i]==-1))
      result.push(arr1[i]);
  }
  for(i=0; i<arr2.length; i++){
    if(arr1.indexOf(arr2[i])==-1 && result.indexOf(arr2[i]==-1))
      result.push(arr2[i]);
  }
  return result;
}

function generateArr(arrSize){
  var result=[], i;
  for(i=0; i<arrSize; i++){
    result.push(Math.floor(Math.random() * 100));
  }
  return result;
}

Array.prototype.myIncludes = function(elem, fromIndex){
  var arr=this;
  if(fromIndex===undefined)
    fromIndex=0;
  else{
    if(fromIndex<0){
      fromIndex=arr.length+fromIndex;
      if(fromIndex<0)
        fromIndex=0;
    }
  }
  while(fromIndex<arr.length){
    if(arr[fromIndex]===elem){
      return true;
    }
    fromIndex++;
  }
  return false;
}
