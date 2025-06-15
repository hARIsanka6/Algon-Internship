<<<<<<< HEAD
/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/

function countVowels(str) {
  let str1 = str.toLowerCase();
  let arr1 = str1.split("");
  let vowCount = 0;
  for(let letter of arr1){
    if(["a","e","i","o","u"].includes(letter)){
      vowCount++;
    }
  }
  return vowCount;
    // Your code here
}

=======
/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/

function countVowels(str) {
  let str1 = str.toLowerCase();
  let arr1 = str1.split("");
  let vowCount = 0;
  for(let letter of arr1){
    if(["a","e","i","o","u"].includes(letter)){
      vowCount++;
    }
  }
  return vowCount;
    // Your code here
}

>>>>>>> 0f5c64d (Modified Day1)
module.exports = countVowels;