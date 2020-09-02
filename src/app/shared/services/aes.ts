import { Injectable, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class AESService implements OnInit {
    four: string;
    salt: string;
    keySize: any;
    iterationCount: any;
    passphrase: any;

    constructor() {
        this.aesInit(256, 10000);
    }

    ngOnInit() {
    }
    aesInit(keySize, iterationCount) {
        this.keySize = keySize / 32;
        this.iterationCount = iterationCount;
        this.passphrase = "Tk93sO0GqQTWU1Vp5xyPtDvk5YT/cpej/sxi3ZlFWRa/XUmk2DrIeA+rO2/Wp3xZYSHEFQAiFxuPXa4md8PWEQ==";
    }
    encrypt(plainText) {
        const iv = CryptoJS.lib.WordArray.random(16).toString(CryptoJS.enc.Hex);
        const salt = CryptoJS.lib.WordArray.random(16).toString(CryptoJS.enc.Hex);


        const key = this.generateKey(salt, this.passphrase);
        const encrypted = CryptoJS.AES.encrypt(
            plainText,
            key,
            {
                iv: CryptoJS.enc.Hex.parse(iv)
            });

        const ciphertext = encrypted.ciphertext.toString(CryptoJS.enc.Hex);
        const enc = salt + iv + ciphertext;

        return { request: CryptoJS.enc.Hex.parse(enc).toString(CryptoJS.enc.Base64) }
    }
    textEncrypt(plainText) {
        const iv = CryptoJS.lib.WordArray.random(16).toString(CryptoJS.enc.Hex);
        const salt = CryptoJS.lib.WordArray.random(16).toString(CryptoJS.enc.Hex);
        const key = this.generateKey(salt, this.passphrase);
        const encrypted = CryptoJS.AES.encrypt(
            plainText,
            key,
            {
                iv: CryptoJS.enc.Hex.parse(iv)
            });

        const ciphertext = encrypted.ciphertext.toString(CryptoJS.enc.Hex);
        const enc = salt + iv + ciphertext;

        return CryptoJS.enc.Hex.parse(enc).toString(CryptoJS.enc.Base64);
    }
    decrypt(cipherTextBase64) {

        const cipherTextHex = CryptoJS.enc.Base64.parse(cipherTextBase64).toString(CryptoJS.enc.Hex);

        const salt = CryptoJS.enc.Hex.parse(cipherTextHex.substring(0, 32)).toString(CryptoJS.enc.Hex);
        const iv = CryptoJS.enc.Hex.parse(cipherTextHex.substring(32, 64)).toString(CryptoJS.enc.Hex);
        const cipher = CryptoJS.enc.Hex.parse(cipherTextHex.substring(64)).toString(CryptoJS.enc.Hex);

        const cipherBase64 = CryptoJS.enc.Hex.parse(cipher).toString(CryptoJS.enc.Base64);

        const key = this.generateKey(salt, this.passphrase);
        const cipherParams = CryptoJS.lib.CipherParams.create({
            ciphertext: CryptoJS.enc.Base64.parse(cipherBase64)
        });
        const decrypted = CryptoJS.AES.decrypt(
            cipherParams,
            key,
            {
                iv: CryptoJS.enc.Hex.parse(iv)
            });
        let dec = decrypted.toString(CryptoJS.enc.Utf8);
        dec = dec.replace(/\\/g, '\\\\');
        if (dec) {
            dec = JSON.parse(dec);
        }
        return dec;
    }

    generateKey(salt, passPhrase) {
        return CryptoJS.PBKDF2(
            passPhrase,
            CryptoJS.enc.Hex.parse(salt),
            { keySize: this.keySize, iterations: this.iterationCount });
    }
}
