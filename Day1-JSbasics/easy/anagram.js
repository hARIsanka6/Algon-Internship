<<<<<<< HEAD
/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {
  str1=str1.toLowerCase();
  str2=str2.toLowerCase();
  if(str1.length !== str2.length){
    return false;
  }else{
    let arr1 = str1.split("");
    let arr2 = str2.split("");
    arr1.sort();
    arr2.sort();
    for(let i = 0;i<str1.length;i++){
      if(arr1[i]===arr2[i]){
        continue;
      }else{
        return false;
      }
    }
    return true;
  }


}

module.exports = isAnagram;
=======
/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {
  str1=str1.toLowerCase();
  str2=str2.toLowerCase();
  if(str1.length !== str2.length){
    return false;
  }else{
    let arr1 = str1.split("");
    let arr2 = str2.split("");
    arr1.sort();
    arr2.sort();
    for(let i = 0;i<str1.length;i++){
      if(arr1[i]===arr2[i]){
        continue;
      }else{
        return false;
      }
    }
    return true;
  }


}

module.exports = isAnagram;
>>>>>>> 0f5c64d (Modified Day1)
