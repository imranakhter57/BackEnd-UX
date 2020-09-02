import { Injectable, Inject, OnInit } from '@angular/core';
import * as AesJS from 'aes-js';
import * as CryptoJS from 'crypto-js';
import * as JSEncrypt from 'jsencrypt';

import { APP_CONFIG, AppConfig } from '../config/app.config';
import { IAppConfig } from '../config/iapp.config';
import { ApiService } from './api-service';


@Injectable()
export class EncryptService implements OnInit {

  appConfig: IAppConfig;

  four: string;
  salt: string;
  publickey: string;
  step: any;
  keySize: any;
  iterationCount: any;
  userId: any;

  constructor(@Inject(APP_CONFIG) appConfig: IAppConfig,
    public apiService: ApiService) {

    this.appConfig = appConfig;
    this.publickey = '';
    // this.getPublicKey();
  }

  ngOnInit() {
  }
  getPublicKey() {
    return new Promise((resolve, reject) => {

      if (this.publickey) {
        resolve(true);
      }
      this.apiService.postApi(this.appConfig.endpoints.getPublicKey, null, null).then((resp: any) => {
        if (resp && resp.publicKey) {
          this.publickey = resp.publicKey;
        }
        resolve(true);
      }, error => {
        console.log('Oooops!' + JSON.stringify(error));
        reject(this.apiService.commonStrings.http_error);
      });
    });

  }

  encryptedPassword(password, username) {
    this.four = CryptoJS.lib.WordArray.random(128 / 8).toString(CryptoJS.enc.Hex);
    this.salt = CryptoJS.lib.WordArray.random(256 / 8).toString(CryptoJS.enc.Hex);

    const passphrase = '';
    this.AesUtil(256, 1000);


    const passwordciphertext = this.encrypt(this.salt, this.four, passphrase, password);
    const usernameciphertext = this.encrypt(this.salt, this.four, passphrase, username);
    // const captchaciphertext = this.encrypt(this.salt, this.four, passphrase, captchaPlaintext);

    const encrypt = new JSEncrypt.JSEncrypt();

    encrypt.setPublicKey(this.publickey);

    const encryptedKey = encrypt.encrypt(this.salt + '::' + this.four);
    return { 'upwd': passwordciphertext, 'hsalt': encryptedKey, 'uname': usernameciphertext }; //, 'captcha': captchaciphertext};
  }

  AesUtil(keySize, iterationCount) {
    this.keySize = keySize / 32;
    this.iterationCount = iterationCount;
  }

  generateKey(salt, passPhrase) {
    const key = CryptoJS.PBKDF2(
      passPhrase,
      CryptoJS.enc.Hex.parse(salt),
      { keySize: this.keySize, iterations: this.iterationCount });
    return key;
  }

  encrypt(salt, iv, passPhrase, plainText) {
    const key = this.generateKey(salt, passPhrase);
    const encrypted = CryptoJS.AES.encrypt(
      plainText,
      key,
      { iv: CryptoJS.enc.Hex.parse(iv) });
    return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
  }

}
