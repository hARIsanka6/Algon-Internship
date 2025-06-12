/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  let str1 = str.toLowerCase();
  let noSpaceString = str1.replaceAll(/[\W_]/g, "")
  let revStr = noSpaceString.split("").reverse().join("");
  console.log(revStr);
  console.log(noSpaceString)
  if (revStr===noSpaceString){
    return true;
  }else{
    return false;
  }
}

module.exports = isPalindrome;
