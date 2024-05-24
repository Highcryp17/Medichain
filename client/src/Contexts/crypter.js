import CryptoJS from 'crypto-js';

// Encryption function
export const handleEncrypt = (inputText, secretKey) => {
  // Use a provided secretKey or replace 'default-secret-key' with your own key
  secretKey = secretKey || 'default-secret-key';

  const encrypted = CryptoJS.AES.encrypt(inputText, secretKey).toString();
  return encrypted;
};

// Decryption function
export const handleDecrypt = (enctext, secretKey) => {
  // Use a provided secretKey or replace 'default-secret-key' with your own key
  secretKey = secretKey || 'default-secret-key';

  // const decryptedWordArray = CryptoJS.AES.decrypt(enctext, secretKey);
  const decryptedWordArray = CryptoJS.AES.decrypt(enctext, secretKey, {
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  if (decryptedWordArray.sigBytes < 0) {
    console.error('Decryption error:', decryptedWordArray);
    return ''; // Return an empty string or handle the error appropriately
  }

  const decryptedText = decryptedWordArray.toString(CryptoJS.enc.Utf8);
  return decryptedText;
};


const mapping = ["02", "69", "96", "04", "12", "13", "11", "06", "25", "79"];
const mappingDict = Object.fromEntries(Array.from({ length: 10 }, (_, i) => [i.toString(), mapping[i]]));
const reverseMapping = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
// const reverseMapping = ["02", "69", "96", "04", "12", "13", "11", "06", "25", "79"];

    // Encrypt the input string
export function handleEncryptNumbers(inputStr) {
    const encrypted = inputStr.split('').map(char => mappingDict[char] || char).join('');
    return encrypted;
}

// Decrypt the input string
//



export function handleDecryptNumbers(inputStr) {
const decrypted = inputStr
        .match(/.{1,2}/g) // Split the input string into pairs of two characters
        .map(pair => Object.entries(mappingDict).find(([key, value]) => value === pair) ? Object.entries(mappingDict).find(([key, value]) => value === pair)[0] : pair)
        .join('');

    return decrypted;
}

console.log("inside crypter")
const enc = handleEncryptNumbers("20")
const dec = handleDecryptNumbers(enc)


console.log("enc = "+enc)
console.log("dec = "+dec)
console.log("inside crypter")


/*
 
0 = 02
1 = 69
2 = 96
3 = 04
4 = 12
5 = 13
6 = 11
7 = 06
8 = 25
9 = 79
*/
