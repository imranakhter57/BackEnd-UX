import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError as observableThrowError, Observable, Subject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Subscriber } from 'rxjs';
import * as moment from 'moment';
import { FormGroup } from '@angular/forms';

import { APP_CONFIG, AppConfig } from '../config/app.config';
import { IAppConfig } from '../config/iapp.config';

import { Cache } from './cache';

@Injectable()
export class ApiService {

    appConfig: IAppConfig;

    private actionSource = new Subject<any>();
    currentAction = this.actionSource.asObservable();
    commonStrings: any;
    downloadDisabled: boolean;
    readOnly: any;
    constructor(@Inject(APP_CONFIG) appConfig: IAppConfig,
        private http: HttpClient,
        private cache: Cache) {

        this.appConfig = appConfig;
        this.commonStrings = {
            no_access: 'Please login to complete the application',
            http_error: 'Internal server error',
            download_error: 'Unable to download PDF...',
            data_saved: 'Data saved',
            data_updated: 'Data Updated',
            reject_captcha: 'Captcha validation failed',
            file_size: 'Please upload file size below 10MB',
            file_extention: 'Allowed file types are PDF, PNG, JPEG, JPG',
            download_disabled: 'You are not allowed to Download.',
            upload_success: 'File Uploaded Successfully..',
            lookupValue_create_success: ' Look Up is created successfully.',
            file_select: 'Select a file to upload..',
            required_fields: 'Please fill the required fields..',
            file_download: 'File is downloaded..',
            file_extention_xls: 'Allowed file types are xlsx, xls.',
            error_file_log: 'Error log file is downloaded...',
            error_file_source: 'Source file is downloaded...',
            error_transfer_root: 'Transfer not supported for root level or multiple parents...',
            save_chart: 'Please Save the Chart',
            no_records: 'No records found',
            file_uploading_msg: 'Your file is being uploaded',
        };
        this.readOnly = 0;
        this.downloadDisabled = false;
    }

    sendAction(message: any) {
        this.actionSource.next(message);
    }
    markFormGroupTouched(formGroup: FormGroup) {
        if (formGroup && formGroup.controls) {
            (<any>Object).values(formGroup.controls).forEach(control => {
                control.markAsTouched();

                if (control.controls) {
                    this.markFormGroupTouched(control);
                }
            });
        }
    }
    unSubscribe(subs) {
        if (subs instanceof Subscriber) {
            subs.unsubscribe();
        } else {

            if (subs && subs.length) {
                subs.forEach((localSub) => {
                    this.unSubscribe(localSub);
                });
            } else if (subs && typeof subs == 'object') {
                Object.keys(subs).forEach(key => {
                    this.unSubscribe(subs[key]);
                });
            } else {
                console.log('Not sure what it is...', subs);
            }
        }
    }
    onPageLoad(eventDetails) {
        // const data = {
        //     appPackageId: (this.cache.user && this.cache.user.appPackageId ? this.cache.user.appPackageId : 0),
        //     logInUserId: (this.cache.user && this.cache.user.userId ? this.cache.user.userId : 0),
        //     eventDetails: eventDetails,
        //     loggedInUser: 0
        // };
        // return new Promise((resolve, reject) => {
        //     this.postApi(this.appConfig.endpoints.onPageLoad, data, '').then((resp) => {
        //         resolve(resp);
        //     }, (error) => {
        //         reject(error);
        //     });
        // });
    }

    /*Commomn function to POST FILE form data */
    upload(url, data) {
        return new Promise((resolve, reject) => {
            this.http.post(this.appConfig.host + url, data)
                .pipe(map(res => res as {}))
                .subscribe((res: any) => {
                    if (res && res.uploadStatus == 'Success') {
                        resolve(res);
                    } else {
                        reject((res && res.errorDesc) ? res.errorDesc : this.commonStrings.http_error);
                    }
                }, error => {
                    reject(this.commonStrings.http_error);
                });
        });
    }
    appendCommonParameters(params) {
        if (!params) {
            params = {
                'appPackageId': (this.cache.user && this.cache.user.appPackageId ? this.cache.user.appPackageId : 0),
                'loggedInUser': (this.cache.user && this.cache.user.userId ? this.cache.user.userId : 0)
            };
        } else {
            if (params.appPackageId == undefined) { params.appPackageId = this.cache.user && this.cache.user.appPackageId ? this.cache.user.appPackageId : 0; }
            if (params.loggedInUser == undefined) { params.loggedInUser = this.cache.user && this.cache.user.userId ? this.cache.user.userId : 0; }
        }

        if (params.appPackageId == 0) { delete params.appPackageId; }
        if (params.loggedInUser == 0) { delete params.loggedInUser; }

        return params;
    }
    getApi(url, params, headers) {

        if (!headers || !headers['Content-Type']) {
            headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        }

        params = this.appendCommonParameters(params);

        return new Promise((resolve, reject) => {
            this.http.get(this.appConfig.host + url, { params: params, headers: headers })
                .pipe(map(res => res as {}))
                .subscribe(res => {
                    resolve(res);
                }, error => {
                    reject(this.commonStrings.http_error);
                });
        });
    }

    postApi(url, data, headers) {

        if (!headers || !headers.get('Content-Type')) {
            headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        }


        return new Promise((resolve, reject) => {
            this.http.post(this.appConfig.host + url, JSON.stringify(data), { headers: headers })
                .pipe(map(res => res as {}))
                .subscribe(res => {
                    resolve(res);
                }, error => {
                        reject(error.error.errorMessage);
                });
        });

    }


    postApiCancellable(url, data, headers) {
        if (!headers || !headers.get('Content-Type')) {
            headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        }

        data = this.appendCommonParameters(data);

        return this.http.post(this.appConfig.host + url, JSON.stringify(data), { headers: headers })
            .pipe(map(res => res as {}), catchError(this.handleError));

    }

    handleError(error: any): Observable<Response> {

        if (error.status === 401 || error.status === 0) {
            return observableThrowError(error.message);
        } else {
            return observableThrowError(this.commonStrings.http_error);

        }
    }


    b64toBlob(b64Data, contentType) {

        contentType = contentType;
        const sliceSize = 512;

        const byteCharacters = atob(b64Data);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);

            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

        const blob = new Blob(byteArrays, { type: contentType });

        return blob;
    }
    /* view first file from ARRAY */
    // viewDocument(fileResp) {
    //     if (fileResp && fileResp.file && fileResp.file[0]) {
    //         const blob = this.b64toBlob(fileResp.file[0], fileResp.mimeType[0]);
    //         const url = window.URL.createObjectURL(blob);
    //         const element = document.createElement('a');
    //         element.setAttribute('href', url);
    //         document.body.appendChild(element);//added for mozilla firefox
    //         element.click();
    //         document.body.removeChild(element);//added for mozilla firefox
    //         window.URL.revokeObjectURL(url);
    //     }
    // }
    viewDocument(fileResp) {
        if (fileResp && fileResp.file && fileResp.file[0]) {
            const file = new Blob([this.b64toBlob(fileResp.file[0], fileResp.mimeType[0])], { type: fileResp.mimeType[0] });

            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                return;
            } else {
                const objectUrl = URL.createObjectURL(file);
                window.open(objectUrl);
            }
        }
    }

    /* Download first file from ARRAY */

    downloadToBrowser(fileResp) {

        if (fileResp && fileResp.file && fileResp.file[0]) {
            if (navigator.msSaveBlob) { // IE 10+
                navigator.msSaveBlob(this.b64toBlob(fileResp.file[0], fileResp.mimeType[0]), fileResp.fileName[0]);
            } else {
                const blob = this.b64toBlob(fileResp.file[0], fileResp.mimeType[0]);
                const url = window.URL.createObjectURL(blob);

                const element = document.createElement('a');
                element.setAttribute('href', url);
                element.setAttribute('download', fileResp.fileName[0]);
                document.body.appendChild(element); // added for mozilla firefox
                element.click();
                document.body.removeChild(element); // added for mozilla firefox

                window.URL.revokeObjectURL(url);
            }
        }
    }

    viewFileDocument(fileResp) {
        const fileObj = fileResp.resultMap ? fileResp.resultMap : fileResp;
        if (fileObj && fileObj.file) {
            const file = new Blob([this.b64toBlob(fileObj.file, fileObj.mimeType), fileObj.fileName], { type: fileObj.mimeType });

            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                return;
            } else {
                const objectUrl = URL.createObjectURL(file);
                window.open(objectUrl);
            }
        }
    }

    /* Download Single file from OBJECT */

    downloadFileToBrowser(fileResp) {
        const fileObj = fileResp.resultMap ? fileResp.resultMap : fileResp;

        if (fileObj && fileObj.file) {
            if (navigator.msSaveBlob) { // IE 10+
                navigator.msSaveBlob(this.b64toBlob(fileObj.file, fileObj.mimeType), fileObj.fileName);
            } else {
                const blob = this.b64toBlob(fileObj.file, fileObj.mimeType);
                const url = window.URL.createObjectURL(blob);

                const element = document.createElement('a');
                element.setAttribute('href', url);
                element.setAttribute('download', fileObj.fileName);
                document.body.appendChild(element); // added for mozilla firefox
                element.click();
                document.body.removeChild(element); // added for mozilla firefox

                window.URL.revokeObjectURL(url);
            }
        }
    }
}
