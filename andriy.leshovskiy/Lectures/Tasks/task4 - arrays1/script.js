  /*
   *   Removes duplicates from input array
   */
  function duplicateRemover(arr) {
      var exitArray = [],
          i;
      for (i = 0; i < arr.length; i++) {
          if (!exitArray.includes(arr[i])) {
              exitArray.push(arr[i]);
          }
      }
      return exitArray;
  }

  duplicateRemover([1, 3, 7, 1, 3, 9, 8, 7]); // returns [1, 3, 7, 9, 8]

  /*
   *   function that returns the common values of two arrays
   */
  function getCommonValues(arr1, arr2) {
      var exitArray = [],
          i;
      for (i = 0; i < arr1.length; i++) {
          if (arr2.includes(arr1[i]) && !exitArray.includes(arr1[i])) {
              exitArray.push(arr1[i]);
          }
      }
      return exitArray;
  }

  getCommonValues([3, 4, 6, 3, 1], [5, 10, 7, 1, 3, 9, 8, 7]); // returns [3, 1]

  /*
   *   function that returns the district values of two arrays
   */
  function getDistrictValues(arr1, arr2) {
      var exitArray = [],
          i,
          j;
      for (i = 0; i < arr1.length; i++) {
          if (!arr2.includes(arr1[i]) && !exitArray.includes(arr1[i])) {
              exitArray.push(arr1[i]);
          }
      }

      for (i = 0; i < arr2.length; i++) {
          if (!arr1.includes(arr2[i]) && !exitArray.includes(arr2[i])) {
              exitArray.push(arr2[i]);
          }
      }
      return exitArray;
  }

  getDistrictValues([3, 4, 6, 3, 1], [5, 10, 7, 1, 3, 9, 8, 7]); // returns [4, 6, 5, 10, 7, 9, 8]

  /*
   *   filling array with random values
   */
  function randomArrayFill(arrSize) {
      var exitArray = [],
          i;
      for (i = 0; i < arrSize; i++) {
          exitArray[i] = Math.floor(Math.random() * 1000000) + 1;
      }
      return exitArray;
  }

  randomArrayFill(5); // returns array with 5 random values from 1 to 1 000 000

  /*
   *   my own implementation of includes() array's function
   */
  function myIncludes(array, searchingElement, indexFrom) {
      var i;

      if (Array.isArray(array) && searchingElement && !indexFrom) {

          if (array.indexOf(searchingElement) >= 0) {
              return true;
          } else {
              return false;
          }

      } else if (arguments.length === 3 && Array.isArray(array)) {

          if (indexFrom >= 0 && indexFrom < array.length) {
              for (indexFrom; indexFrom < array.length; indexFrom++) {
                  if (array[indexFrom] === searchingElement) {
                      return true;
                  }
              }
          } else if (indexFrom < 0 && Math.abs(indexFrom) < array.length) {
              for (i = array.length + indexFrom; i >= 0; i--) {
                  if (array[i] === searchingElement) {
                      return true;
                  }
              }
          }
      }
      return false;
  }

  console.log(myIncludes([3, 4, 6, 3, 1, -1], 6, -5)); // returns false
