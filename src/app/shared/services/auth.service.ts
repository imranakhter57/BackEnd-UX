import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserIdleService } from 'angular-user-idle';

import { APP_CONFIG } from '../config/app.config';
import { IAppConfig } from '../config/iapp.config';

import { ApiService } from './api-service';
import { Cache } from './cache';
import { AppNav } from './nav';

@Injectable()
export class AuthService {

    appConfig: IAppConfig;
    navLinks: any;
    menuItems: any;
    masteNavLinks: any = AppNav;
    userData: any;

    allowThirdPartyRedirection: any;
    userIdleWatchStarted: boolean;

    constructor(@Inject(APP_CONFIG) appConfig: IAppConfig,
        private cache: Cache,
        public apiService: ApiService,
        public userIdle: UserIdleService,
        public route: Router) {

        this.appConfig = appConfig;
        this.cache.loggedIn = false;
        this.allowThirdPartyRedirection = false;
        this.userIdleWatchStarted = false;
        this.navLinks = {};
        this.menuItems = {};
        this.userData = {};

        this.userIdle.onTimerStart().subscribe(count => {
        });
        this.userIdle.onTimeout().subscribe(() => {
            this.logout();
            this.cache.clear('user');
            this.cache.user = {};
            this.cache.loggedIn = false;
            this.userIdle.stopWatching();
            this.userIdleWatchStarted = false;
            this.route.navigate(['/timeout']);
        });
    }

    isTabAllowed(currenttab) {
        const keys = Object.keys(this.navLinks);
        return keys.find(x => x === currenttab);
    }

    isAuthenticated() {
        const user = this.cache.user;
        if (user && user.userId && user.roleId) {
            this.cache.loggedIn = true;
            this.startUserSession();
            return true;
        } else {
            return false;
        }
    }

    logoutActions() {
        this.cache.clear('user');
        this.cache.user = {};
        this.cache.loggedIn = false;
        this.stopUserSession();
    }

    logout() {
        const data = { 'userId': this.cache.user.userId };
        return new Promise((resolve, reject) => {
            this.apiService.postApi(this.appConfig.endpoints.logout, data, null)
                .then((resp: any) => {
                    this.logoutActions();
                    resolve(true);
                }, error => {
                    this.logoutActions();
                    console.log('Oooops!' + JSON.stringify(error));
                    reject(this.apiService.commonStrings.http_error);
                });
        });
    }

    screenManagement(userId) {
        return new Promise((resolve, reject) => {
            this.apiService.postApi(this.appConfig.endpoints.screenManagement, { userId: userId }, null)
                .then((resp: any) => {
                    if (resp && resp.rolePermission) {
                        this.navLinks = {};
                        resp.rolePermission.forEach((item) => {
                            if (this.masteNavLinks[item.path]) {
                                if (item.children && item.children.length && this.navLinks[item.path].children) {
                                    this.navLinks[item.path] = this.masteNavLinks[item.path];
                                    item.children.forEach((child) => {
                                        this.navLinks[item.path].children[child.path] = this.masteNavLinks[item.path].children[child.path];
                                    });
                                } else {
                                    this.navLinks[item.path] = this.masteNavLinks[item.path];
                                }
                            } else {
                                this.menuItems[item.path] = item;
                            }
                        });
                        resolve(resp);
                    } else {
                        console.log('Oooops! Screen Management Failed');
                    }
                }, error => {
                    console.log('Oooops!' + JSON.stringify(error));
                    reject(this.apiService.commonStrings.http_error);
                });
        });
    }

    generateToken() {
        return new Promise((resolve, reject) => {
            this.apiService.postApi(this.appConfig.endpoints.generateToken, this.userData, null)
                .then((resp: any) => {
                    if (resp) {
                        if (resp.response) {
                            this.cache.user.authorization = resp.response;
                            this.cache.set('user', this.cache.user);
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

    getCaptcha(data) {
        return new Promise((resolve, reject) => {
            this.apiService.postApi(this.appConfig.endpoints.getCaptcha, { 'username': data }, null)
                .then((resp: any) => {
                    if (resp.saveStatus == 'Success') {
                        resolve(resp);
                    } else {
                        reject(resp.errorDesc);
                    }
                });
        });
    }

    login(data) {
        return new Promise((resolve, reject) => {
            this.apiService.postApi(this.appConfig.endpoints.login, data, null)
                .then((resp: any) => {
                    if (resp) {
                        if (resp.status === 'Success') {
                            this.cache.loggedIn = true;
                            this.cache.user.roleId = resp.roleId;
                            this.cache.user.userId = resp.userId;
                            this.cache.user.userFullName = resp.userFullName;
                            this.cache.set('user', this.cache.user);
                            this.startUserSession();
                            resolve(resp);
                        } else {
                            reject(resp.errorDesc);
                        }
                    } else {
                        reject(this.apiService.commonStrings.http_error);
                    }
                }, error => {
                    console.log('Oooops!' + JSON.stringify(error));
                    reject(error);
                });
        });
    }

    getOtpGrid(data) {
        return new Promise((resolve, reject) => {

            this.apiService.postApi(this.appConfig.endpoints.getOtp, data, null)
                .then((resp: any) => {
                    if (resp) {
                        if (resp.authStatus == 'Success') {
                            resolve(resp);
                        } else {
                            reject(resp.errorDesc);
                        }
                    } else {
                        reject(this.apiService.commonStrings.http_error);
                    }

                }, error => {
                    console.log('Oooops!' + JSON.stringify(error));
                    reject(this.apiService.commonStrings.http_error);
                });
        });
    }

    startUserSession() {
        if (!this.userIdleWatchStarted) {
            this.userIdle.startWatching();
            this.userIdleWatchStarted = true;
        }
    }

    stopUserIdleTimer() {
        if (this.userIdleWatchStarted) {
            this.userIdle.stopTimer();
        }
    }

    stopUserSession() {
        if (this.userIdleWatchStarted) {
            this.userIdle.stopWatching();
        }
    }

    isRedirectionAllowed() {
        return this.allowThirdPartyRedirection;
    }

    setRedirectionAllowed(what) {
        this.allowThirdPartyRedirection = what;
    }
}
