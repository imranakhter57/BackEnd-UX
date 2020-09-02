import { Injectable, Inject } from '@angular/core';
import { ApiService } from '../shared/services/api-service';
import { Cache } from '../shared/services/cache';

import { APP_CONFIG } from '../shared/config/app.config';
import { IAppConfig } from '../shared/config/iapp.config';

import { UserList, RoleList, UserScreens } from '../shared/models/grid';


@Injectable()
export class SystemService {

    appConfig: IAppConfig;
    commonStrings: any;
    userScreen: UserScreens;
    constructor(@Inject(APP_CONFIG) appConfig: IAppConfig,
        public apiService: ApiService,
        private cache: Cache) {


        this.appConfig = appConfig;

        this.commonStrings = {
            http_error: 'Something gone wrong...',
            record_error: 'Application not found',
            data_saved: 'Saved the data',
            reject_captcha: 'Captcha validation failed',
        };
        this.userScreen = new UserScreens(null);
    }


    getUserList(data) {

        data.Role = "Admin";
        return new Promise((resolve, reject) => {
            this.save(this.appConfig.endpoints.getUserList, data).then((resp) => {
                resolve(new UserList(resp));
            }, (error) => {
                reject(error);
            });
        });
    }
    searchUserList(data) {

        return new Promise((resolve, reject) => {
            this.save(this.appConfig.endpoints.searchUser, data).then((resp) => {
                resolve(new UserList(resp));
            }, (error) => {
                reject(error);
            });
        });
    }
    getRolesList(data) {

        return new Promise((resolve, reject) => {
            this.save(this.appConfig.endpoints.getRolesList, data).then((resp) => {
                resolve(new RoleList(resp));
            }, (error) => {
                reject(error);
            });
        });
    }
    getSecurityList(data) {

        return new Promise((resolve, reject) => {
            this.save(this.appConfig.endpoints.getSecurityList, data).then((resp) => {
                resolve(resp);
            }, (error) => {
                reject(error);
            });
        });
    }

    saveNewUser(data) {

        return new Promise((resolve, reject) => {
            this.save(this.appConfig.endpoints.saveNewUser, data).then((resp: any) => {
                resolve(resp);
            }, (error) => {
                reject(error);
            });
        });
    }
    editUser(data) {

        return new Promise((resolve, reject) => {
            this.save(this.appConfig.endpoints.editUser, data).then((resp: any) => {
                resolve(resp);
            }, (error) => {
                reject(error);
            });
        });
    }
    getUserScreen(data) {


        return new Promise((resolve, reject) => {
            this.save(this.appConfig.endpoints.UserScreen, data).then((resp: any) => {
                this.userScreen = new UserScreens(resp);
                resolve(this.userScreen);
            }, (error) => {
                reject(error);
            });
        });
    }
    saveScreen(data) {

        return new Promise((resolve, reject) => {
            this.save(this.appConfig.endpoints.saveUserScreen, data).then((resp: any) => {
                resolve(resp);
            }, (error) => {
                reject(error);
            });
        });
    }
   

    getUserName(data) {

        return new Promise((resolve, reject) => {
            this.save(this.appConfig.endpoints.getComputedUserNameForDSA, data).then((resp) => {
                resolve(resp);
            }, (error) => {
                reject(error);
            });
        });
    }

    getSolId(data) {

        return new Promise((resolve, reject) => {
            this.save(this.appConfig.endpoints.getsolId, data).then((resp) => {
                resolve(resp);
            }, (error) => {
                reject(error);
            });
        });
    }

    get(url, data) {


        return new Promise((resolve, reject) => {
            this.apiService.postApi(url, data, '')
                .then((resp: any) => {
                    if (resp) {
                        resolve(resp);
                    } else {
                        reject(this.apiService.commonStrings.http_error);
                    }
                }, error => {
                    console.log('Oooops!' + error);
                    reject(this.apiService.commonStrings.http_error);
                });
        });
    }
    save(url, data) {

        return new Promise((resolve, reject) => {
            this.apiService.postApi(url, data, '')
                .then((resp: any) => {
                    if (resp) {
                        if (resp.saveStatus === 'Success' || resp.deleteStatus == 'Success' || resp.Status == 'Success') {
                            resolve(resp);
                        } else {
                            reject(resp.errorDesc);
                        }
                    } else {
                        reject(this.apiService.commonStrings.http_error);
                    }
                }, error => {
                    console.log('Oooops!' + error);
                    reject(this.apiService.commonStrings.http_error);
                });
        });
    }
}
