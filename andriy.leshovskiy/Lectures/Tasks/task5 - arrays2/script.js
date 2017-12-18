      /*
       * task1 Array.prototype.filter own implementation
       */
      Array.prototype.filter = function (funcCallBack) {

          var filteredArr = [],
              i;

          if (typeof funcCallBack !== "function")
              throw new Error("Parameter - not a function");

          for (i = 0; i < this.length; i++) {
              if (funcCallBack(this[i])) {
                  filteredArr.push(this[i]);
              }
          }
          return filteredArr;
      }


      // test task1
      var mas = [1, 3, 20, 12, 31, 13].filter(function (a) { // output [1, 3]
          return a < 10;
      });


      /*
       * task2 moving all zeroes to the end of array
       */
      function zerosToTheEnd(array) {
          var i,
              zeros = [],
              returnArr = [];
          if (!Array.isArray(array))
              throw new Error("Parameter is not an array");

          for (i = 0; i < array.length; i++) {
              if (array[i] === 0) {
                  zeros.push(array[i]);
              }
          }
          array = array.filter(function (a) {
              return a !== 0;
          })
          return returnArr.concat(array, zeros);
      }

      //test task2
      zerosToTheEnd([0, 1, 2, 0, 0, 0, 5, 0, 2, 0, 1, 25, 2, 21]); // output [1, 2, 5, 2, 1, 25, 2, 21, 0, 0, 0, 0, 0, 0]


      /*
       * task3 nested structure of 2 arrays comparison function
       */
      var arr1 = [1, [1, 1]],
          arr2 = [[2], 2];

      Array.prototype.nestStructCompare = function (array) {
          var i,
              lichThis = 0,
              lichArray = 0,
              lichIndex = 0,
              equality = 0;

          if (!Array.isArray(array))
              throw new Error("Parameter is not an array");

          if (this.length != array.length)
              return false;

          for (i = 0; i < this.length; i++) {
              if (Array.isArray(this[i] && Array.isArray(array[i]))) {
                  if (!this[i].nestStructCompare(array[i])) {
                      return false;
                  }
              } else if (Array.isArray(this[i]) && !Array.isArray(array[i]) || !Array.isArray(this[i]) && Array.isArray(array[i])) {
                  return false;
              }
          }

          return true;
      }

      //test task3
      arr1.nestStructCompare(arr2); //output false;


      /*
       * task4 searching of max zero sequence 
       */
      function maxZeroSequenceLength(array) {
          var i,
              j,
              sum = 0,
              zeroSumSequenceArray = [],
              maxZeroSumArray = [];

          for (i = 0; i < array.length; i++) {
              for (j = i; j < array.length; j++) {
                  sum += array[j];
                  if (sum == 0) {
                      zeroSumSequenceArray.push(array.slice(i, j + 1));
                  }

              }
              sum = 0;
          }

          zeroSumSequenceArray.sort(function (a, b) {
              return a.length - b.length;
          });

          return zeroSumSequenceArray[zeroSumSequenceArray.length - 1];
      }

      // test task4
      maxZeroSequenceLength([25, -35, 12, 6, 92, -115, 17, 2, 2, 2, -7, 2, -9, 16, 2, -11]); // output [92, -115, 17, 2, 2, 2]



      /*
       * task5 brackets balance checking
       */
      function isBalanced(string1, string2) {

          var stringArray = string1.split(""),
              brackets = string2.split(""),
              i,
              roundLeftBracketCount = 0,
              roundRightBracketCount = 0,
              squareLeftBracketCount = 0,
              squareRightBracketCount = 0,
              onlyBrackets = stringArray.filter(function (a) {
                  return a === "(" || a === ")" || a === "[" || a === "]"
              }).join("");

          console.log(onlyBrackets);

          for (i = 0; i < stringArray.length; i++) {
              switch (stringArray[i]) {
                  case brackets[0]:
                      roundLeftBracketCount++;
                      break;
                  case brackets[1]:
                      roundRightBracketCount++;
                      break;
                  case brackets[2]:
                      squareLeftBracketCount++;
                      break;
                  case brackets[3]:
                      squareRightBracketCount++;
                      break;
                  default:
                      break;
              }
          }

          if (roundLeftBracketCount != roundRightBracketCount || squareLeftBracketCount != squareRightBracketCount) {
              return false;
          }

          if (onlyBrackets.includes("([)]") || onlyBrackets.includes("[(])")) {
              return false;
          }

          return true;
      }

      //test task5

      isBalanced("(Sensei say(s) (0) yes!)", "()"); //  true
      isBalanced("(Sensei say(s) (0) yes!)", "()"); //  true
      isBalanced("(Sensei says yes)", "()"); //  true
      isBalanced("(Sensei says yes) some text(sfdsf) gg (sdss)", "()"); //  true

      isBalanced("(Sensei says( no)", "()"); //  false
      isBalanced("(Sensei saysno) (sd) (sdfsf", "()"); //  false
      isBalanced("(Sensei saysno) (sdsd)fsf)", "()"); //  false



      isBalanced("sd [3233] dsd(Sensei says yes) other text[sdsf] sdfsf [] xx (sdf)", "()[]"); //  true
      isBalanced("(Sensei [say (sdf)  [ssf] ] yes!)", "()[]"); //  true
      isBalanced("(Sensei [says] yes!)", "()[]"); //  true

      isBalanced("(Sensei [says) no!]", "()[]"); //  false
      isBalanced("[Sensei [(says) no!]", "()[]"); //  false
