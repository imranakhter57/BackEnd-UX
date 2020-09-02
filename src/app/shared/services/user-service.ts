import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Cache } from './cache';
import { APP_CONFIG, AppConfig } from '../config/app.config';
import { IAppConfig } from '../config/iapp.config';

import { AuthService } from './auth.service';
import { ApiService } from './api-service';

@Injectable()
export class UserService {

    appConfig: IAppConfig;
    showCongratsMsg: boolean = false;


    constructor(@Inject(APP_CONFIG) appConfig: IAppConfig,
        private cache: Cache,
        public apiService: ApiService,
        public authService: AuthService) {

        this.appConfig = appConfig;
        this.cache.loggedIn = false;
    }
    isTabAllowed(tab) {
        return this.authService.isTabAllowed(tab);
    }
    setAppId(appPackageId) {
        this.cache.user.appPackageId = appPackageId ? appPackageId.toString() : '';
    }
    getAppId() {
        return this.cache.user.appPackageId;
    }

    isRM() {
        return this.cache.user && this.cache.user.roleId && this.cache.user.roleId == this.appConfig.roles.RM ? true : false;
    }
    isDSA() {
        return this.cache.user && this.cache.user.roleId && this.cache.user.roleId == this.appConfig.roles.DSA ? true : false;
    }
    isCPA() {
        return this.cache.user && this.cache.user.roleId && this.cache.user.roleId == this.appConfig.roles.CPA ? true : false;
    }
    isSA() {
        return this.cache.user && this.cache.user.roleId && this.cache.user.roleId == this.appConfig.roles.SA ? true : false;
    }
    isCA() {
        return this.cache.user && this.cache.user.roleId && this.cache.user.roleId == this.appConfig.roles.CA ? true : false;
    }
    isCM() {
        return this.cache.user && this.cache.user.roleId && this.cache.user.roleId == this.appConfig.roles.CM ? true : false;
    }
    isFIAdmin() {
        return this.cache.user && this.cache.user.roleId && this.cache.user.roleId == this.appConfig.roles.FIADMIN ? true : false;
    }
    isRCUAdmin() {
        return this.cache.user && this.cache.user.roleId && this.cache.user.roleId == this.appConfig.roles.RCUADMIN ? true : false;
    }
    isFIAgency() {
        return this.cache.user && this.cache.user.roleId && this.cache.user.roleId == this.appConfig.roles.FIAGENCY ? true : false;
    }
    isCH() {
        return this.cache.user && this.cache.user.roleId && this.cache.user.roleId == this.appConfig.roles.CH ? true : false;
    }
    isRcuAgency() {
        return this.cache.user && this.cache.user.roleId && this.cache.user.roleId == this.appConfig.roles.RCUAGENCY ? true : false;
    }
    isLOPS() {
        return this.cache.user && this.cache.user.roleId && this.cache.user.roleId == this.appConfig.roles.LOPS ? true : false;
    }
    isCOPS() {
        return this.cache.user && this.cache.user.roleId && this.cache.user.roleId == this.appConfig.roles.COPS ? true : false;
    }
    isPIU() {
        return this.cache.user && this.cache.user.roleId && this.cache.user.roleId == this.appConfig.roles.PIU ? true : false;
    }
    isUserMaster() {
        return this.cache.user && this.cache.user.roleId && this.cache.user.roleId == this.appConfig.roles.USERMASTER ? true : false;
    }
    isCustomerJourney() {
        return false;
    }

    sendAdharOtp(data) {

        return new Promise((resolve, reject) => {

            this.apiService.postApi(this.appConfig.endpoints.sendAdharOtp, data, null)
                .then((resp: any) => {
                    if (resp) {
                        if (resp.ekycOtpStatus == 'Success') {
                            resolve(resp);
                        } else {
                            reject(resp.errorDesc ? resp.errorDesc : this.apiService.commonStrings.http_error);
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
    verifyAdhar(data) {

        return new Promise((resolve, reject) => {

            this.apiService.postApi(this.appConfig.endpoints.verifyAdhar, data, null)
                .then((resp: any) => {
                    if (resp) {
                        if (resp.ekycOtpValidateStatus == 'Success') {
                            resolve(resp);
                        } else {
                            reject(resp.errorDesc ? resp.errorDesc : this.apiService.commonStrings.http_error);
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

    gstinVerify(gstin, gstflag, gstSave) {
        let data = { "gstin": gstin, "gstFlag": gstflag, "gstSave": gstSave };
        return this.apiService.postApiCancellable(this.appConfig.endpoints.gstInfo, data, null);
    }


    getDetailsByZipCode(postalCode) {

        let data = { "ZipCode": postalCode, "appPackageId": 0 };

        return this.apiService.postApiCancellable(this.appConfig.lookups.getDetailsByZipCode, data, null);

    }

    getDetailsByZipCodeInMiniview(postalCode) {

        let data = { "ZipCode": postalCode, "appPackageId": 0 };

        return new Promise((resolve, reject) => {
            this.apiService.postApi(this.appConfig.lookups.getDetailsByZipCode, data, null)
                .then((resp: any) => {
                    if (resp && resp.cityId) {
                        resolve(resp);
                    } else {
                        reject(this.apiService.commonStrings.http_error);
                    }
                }, error => {
                    reject(this.apiService.commonStrings.http_error);
                });
        });
    }



    getDetailsByPan(pan) {

        let data = { "panNo": pan };
        return this.apiService.postApiCancellable(this.appConfig.endpoints.getDetailsByPan, data, null);
    }


    getMcaCaptcha(companyName) {

        let data = { "companyName": companyName };
        return new Promise((resolve, reject) => {
            this.apiService.postApi(this.appConfig.endpoints.getMcaCaptcha, data, null)
                .then((resp: any) => {
                    if (resp && resp.evokeResponse && resp.evokeResponse.statusCode) {
                        if (resp.evokeResponse.statusCode == 200) {
                            resolve(resp.evokeResponse);
                        } else {
                            reject(resp.evokeResponse.statusMessage);
                        }
                    } else {
                        reject(this.apiService.commonStrings.http_error);
                    }
                }, error => {
                    reject(this.apiService.commonStrings.http_error);
                });
        });
    }

    verifyCaptcha(data) {

        return this.apiService.postApiCancellable(this.appConfig.endpoints.getMcaInfo, data, null);
    }
    getRegistrationType(regType) {

        let data = { "CustomerType": regType, "appPackageId": 0 };
        return new Promise((resolve, reject) => {
            this.apiService.postApi(this.appConfig.lookups.registrationType, data, null)
                .then(res => {
                    if (res) {
                        resolve(res);
                    } else {
                        reject(this.apiService.commonStrings.http_error);
                    }
                }, error => {
                    reject(this.apiService.commonStrings.http_error);
                });
        });
    }

    getUserFromCache() {
        if (this.cache.user) {
            return this.cache.user;
        }
    }
}
