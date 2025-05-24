import CryptoJS from 'crypto-js';

export function encrypt(text, key) {
    const encrypted = CryptoJS.AES.encrypt(text, key).toString();
    return encrypted;
}

export function decrypt(text, key) {
    const decrypted = CryptoJS.AES.decrypt(text, key).toString(CryptoJS.enc.Utf8);
    return decrypted;
}