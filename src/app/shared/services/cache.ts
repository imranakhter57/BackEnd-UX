import { Injectable } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';

import { User } from '../models/user';
import { AESService } from './aes';

@Injectable()
export class Cache {

  loggedIn: boolean;
  user: any;

  constructor(
    private storage: SessionStorageService,
    public aesService: AESService
  ) {

    const cachedUser = this.get('user');

    if (!cachedUser) {
      this.user = new User(null);
    } else {
      this.user = new User(cachedUser);
    }
  }

  set(key, val) {
    let valString: string;
    if (typeof val == 'object') {
      valString = JSON.stringify(val);
    } else {
      valString = val;
    }
    valString = this.aesService.encrypt(valString).request;
    this.storage.store(key, valString);
  }

  get(key) {
    let val = this.storage.retrieve(key);
    val = val ? this.aesService.decrypt(val) : null;

    if (typeof val == 'string') {
      const valObj = JSON.parse(val);
      if (typeof valObj == 'object') {
        return valObj;
      }
    }
    return val;
  }

  clear(key) {
    return this.storage.clear(key);
  }
}
