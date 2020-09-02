import { Injectable, Inject } from '@angular/core';

import { APP_CONFIG } from '../config/app.config';
import { IAppConfig } from '../config/iapp.config';

import { Cache } from '../services/cache';
import { ApiService } from '../services/api-service';

@Injectable()
export class DocumentsService {

    appConfig: IAppConfig;
    documents: any;
    valid = 0;
    allowedFiles: any[];

    constructor(@Inject(APP_CONFIG) appConfig: IAppConfig,
        private cache: Cache,
        private apiService: ApiService) {

        this.appConfig = appConfig;
        this.valid = 0;
        this.allowedFiles = ['pdf', 'png', 'jpeg', 'jpg'];

    }

    validateFileToUploadWithName(event) {

        const files = event.target.files;

        if (!files[0]) {
            return false;
        }
        const fileSize = files[0].size / 1000000;
        const fileName = files[0].name.split('.')[0];
        const extention = files[0].name.split('.').pop().toLowerCase();

        if (fileName.length >= 50) {
            event.target.value = '';
            return false;
        }
        return this.validateFileToUpload(event);
    }
    // validateFileToUpload(event) {

    //     const files = event.target.files;

    //     if (!files[0]) {
    //         return false;
    //     }
    //     const fileSize = files[0].size / 1000000;
    //     const fileName = files[0].name.split('.')[0];
    //     const extention = files[0].name.split('.').pop().toLowerCase();

    //     if (fileSize > 10) {
    //         this.alert.error(files[0].name + '(' + fileSize + ')' + this.apiService.commonStrings.file_size);
    //         event.target.value = '';
    //         return false;
    //     } else if (this.allowedFiles.indexOf(extention) == -1) {
    //         this.alert.error(this.apiService.commonStrings.file_extention_xls);
    //         event.target.value = '';
    //         return false;
    //     }
    //     return true;
    // }

    validateFileToUpload(files) {
        if (!files[0]) {
            return this.apiService.commonStrings.file_extention;
        }
        const fileSize = files[0].size / 1000000;
        const fileName = files[0].name.split('.')[0];
        const extention = files[0].name.split('.').pop().toLowerCase();

        if (fileSize > 10) {
            return files[0].name + '(' + fileSize + ')' + this.apiService.commonStrings.file_size;
        } else if (this.allowedFiles.indexOf(extention) == -1) {
            return this.apiService.commonStrings.file_extention;
        }
        return false;
    }

    /*This common upload funtion fpr CJ and Grid DO NOT change upload URL */
    uploadFile(fileToUpload: File, data) {
        const formData: FormData = new FormData();
        formData.append('appPackageId', this.cache.user && this.cache.user.appPackageId ? this.cache.user.appPackageId : 0);
        formData.append('file', fileToUpload, fileToUpload.name);

        const dataKeys = Object.keys(data);
        for (const prop of dataKeys) {
            formData.append(prop, data[prop]);
        }

        if (data.accountNumber === undefined) {
            formData.append('accountNumber', '12345');
        }
        return this.apiService.upload(this.appConfig.endpoints.uploadDocument, formData);
    }

    uploadFinancialFile(fileToUpload: File, data) {
        const formData: FormData = new FormData();
        formData.append('appPackageId', this.cache.user && this.cache.user.appPackageId ? this.cache.user.appPackageId : 0);
        formData.append('file', fileToUpload, fileToUpload.name);
        formData.append('cpId', data.cpId);
        formData.append('documentName', data.documentName);
        formData.append('auditedYr', data.auditedYear);
        formData.append('numberOfYear', data.numberOfYear);
        // const dataKeys = Object.keys(data);

        // for (const prop of dataKeys) {
        //     formData.append(prop, data[prop]);
        // }
        return this.apiService.upload(this.appConfig.endpoints.uploadFinanceDocument, formData);
    }

    deleteFile(data) {
        return new Promise((resolve, reject) => {

            this.apiService.postApi(this.appConfig.endpoints.deleteDocument, data, '')
                .then((res: any) => {
                    if (res) {
                        if (res.deleteStatus == 'Success') {
                            resolve(res.data);
                        } else {
                            reject(res.errorDesc);
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
    deletePosFile(data) {
        return new Promise((resolve, reject) => {

            this.apiService.postApi(this.appConfig.endpoints.deletePosDocument, data, '')
                .then((res: any) => {
                    if (res) {
                        if (res.deleteStatus == 'Success') {
                            resolve(res.data);
                        } else {
                            reject(res.errorDesc);
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
    downloadPerfiosFile(data) {
        return new Promise((resolve, reject) => {

            this.download(this.appConfig.endpoints.perfiosDownload, data)
                .then(res => {
                    resolve(res);
                }, error => {
                    console.log('Oooops!' + error);
                    reject(error);
                });
        });
    }

    /* GRID journey*/
    uploadeNachFile(fileToUpload: File, data) {
        const formData: FormData = new FormData();
        formData.append('loggedInUser', this.cache.user && this.cache.user.userId ? this.cache.user.userId : 0);
        formData.append('appPackageId', this.cache.user && this.cache.user.appPackageId ? this.cache.user.appPackageId : 0);
        formData.append('file', fileToUpload, fileToUpload.name);

        const dataKeys = Object.keys(data);
        for (const prop of dataKeys) {
            formData.append(prop, data[prop]);
        }
        return this.apiService.upload(this.appConfig.endpoints.uploadNACHDocument, formData);
    }

    uploadRcuFile(fileToUpload: File, data) {
        const formData: FormData = new FormData();
        formData.append('appPackageId', this.cache.user && this.cache.user.appPackageId ? this.cache.user.appPackageId : 0);
        formData.append('file', fileToUpload, fileToUpload.name);

        const dataKeys = Object.keys(data);
        for (const prop of dataKeys) {
            formData.append(prop, data[prop]);
        }
        return this.apiService.upload(this.appConfig.endpoints.uploadRcuDocument, formData);
    }

    uploadFiFile(fileToUpload: File, data) {
        const formData: FormData = new FormData();
        formData.append('appPackageId', this.cache.user && this.cache.user.appPackageId ? this.cache.user.appPackageId : 0);
        formData.append('file', fileToUpload, fileToUpload.name);
        const dataKeys = Object.keys(data);
        for (const prop of dataKeys) {
            formData.append(prop, data[prop]);
        }
        return this.apiService.upload(this.appConfig.endpoints.uploadFiDocument, formData);
    }
    uploadPosDocument(fileToUpload: File, data) {
        const formData: FormData = new FormData();
        formData.append('appPackageId', this.cache.user && this.cache.user.appPackageId ? this.cache.user.appPackageId : 0);
        formData.append('loggedInUser', this.cache.user && this.cache.user.userId ? this.cache.user.userId : 0);
        formData.append('file', fileToUpload, fileToUpload.name);
        const dataKeys = Object.keys(data);
        for (const prop of dataKeys) {
            formData.append(prop, data[prop]);
        }
        return this.apiService.upload(this.appConfig.endpoints.uploadPosDocument, formData);
    }
    // audit log
    exportSystemLog() {
        return new Promise((resolve, reject) => {
            this.download(this.appConfig.endpoints.exportSystemLog, '').then(resp => {
                resolve(resp);
            }, error => {
                reject(error);
            });
        });
    }

    exportApplicationLog() {
        return new Promise((resolve, reject) => {
            this.download(this.appConfig.endpoints.exportApplicationLog, '').then(resp => {
                resolve(resp);
            }, error => {
                reject(error);
            });
        });
    }

    // end audit log
    downloadFile(docId) {
        const data = { 'documentId': docId, 'appPackageId': 0 };
        return new Promise((resolve, reject) => {
            this.download(this.appConfig.endpoints.downloadDocument, data)
                .then(res => {
                    resolve(res);
                }, error => {
                    console.log('Oooops!' + error);
                    reject(error);
                });
        });
    }

    exportCam() {
        return new Promise((resolve, reject) => {
            this.download(this.appConfig.endpoints.exportCam, null).then(resp => {
                resolve(resp);
            }, error => {
                reject(error);
            });
        });
    }

    exportSanctionLetter(data) {
        return new Promise((resolve, reject) => {
            this.download(this.appConfig.endpoints.saveSanctionLetter, data).then(resp => {
                resolve(resp);
            }, error => {
                reject(error);
            });
        });
    }

    downloadCamData() {
        return new Promise((resolve, reject) => {
            this.download(this.appConfig.endpoints.downloadCamData, null).then(resp => {
                resolve(resp);
            }, error => {
                reject(error);
            });
        });
    }

    exportDisbursementDoc() {

        return new Promise((resolve, reject) => {
            this.download(this.appConfig.endpoints.downloadDisbursalMemoPdf, '').then(resp => {
                resolve(resp);
            }, error => {
                reject(error);
            });
        });
    }

    downloadApplication() {
        return new Promise((resolve, reject) => {
            this.download(this.appConfig.endpoints.downloadApplicationFormPdf, '')
                .then(res => {
                    resolve(res);
                }, error => {
                    reject(error);
                });
        });
    }

    exportCibil() {
        return new Promise((resolve, reject) => {
            this.download(this.appConfig.endpoints.exportCibil, null).then(resp => {
                resolve(resp);
            }, error => {
                reject(error);
            });
        });
    }

    downloadConsumerCibil(data) {
        return new Promise((resolve, reject) => {
            this.download(this.appConfig.endpoints.downloadConsumerCibil, data).then(resp => {
                resolve(resp);
            }, error => {
                reject(error);
            });
        });
    }

    exportRepaymentSchedule(date, emiType, emiFrequency) {
        const data = { 'loanStartDate': date, 'emiType': emiType, 'emiFrequency': emiFrequency };
        return new Promise((resolve, reject) => {
            this.download(this.appConfig.endpoints.exportRepaymentSchedule, data).then(resp => {
                resolve(resp);
            }, error => {
                reject(error);
            });
        });
    }

    downloadFiDocument(documentId) {
        const data = { 'documentId': documentId };
        return new Promise((resolve, reject) => {

            this.download(this.appConfig.endpoints.downloadFiDocument, data)
                .then(res => {
                    resolve(res);
                }, error => {
                    console.log('Oooops!' + error);
                    reject(error);
                });
        });
    }
    downloadPosDocument(documentId) {
        const data = { 'documentId': documentId };
        return new Promise((resolve, reject) => {

            this.download(this.appConfig.endpoints.downloadPosDocument, data)
                .then(res => {
                    resolve(res);
                }, error => {
                    console.log('Oooops!' + error);
                    reject(error);
                });
        });
    }

    pdfOrXlsView(data) {
        return new Promise((resolve, reject) => {
            this.download(this.appConfig.endpoints.pdfOrXlsView, data)
                .then(res => {
                    resolve(res);
                }, error => {
                    console.log('Oooops!' + error);
                    reject(error);
                });
        });
    }

    generateReport(data) {
        return new Promise((resolve, reject) => {
            this.download(this.appConfig.endpoints.generateReport, data)
                .then(res => {
                    resolve(res);
                }, error => {
                    console.log('Oooops!' + error);
                    reject(error);
                });
        });
    }

    generateEdcOfferLetter(data){
        return new Promise((resolve, reject) => {
            this.download(this.appConfig.endpoints.generateEdcOfferLetter, data)
                .then(res => {
                    resolve(res);
                }, error => {
                    console.log('Oooops!' + error);
                    reject(error);
                });
        });
    }

    downloadRcuFile(customerPrincipalDocId) {
        const data = { 'customerPrincipalDocId': customerPrincipalDocId };
        return new Promise((resolve, reject) => {
            this.download(this.appConfig.endpoints.downloadRcuDocument, data)
                .then(res => {
                    resolve(res);
                }, error => {
                    console.log('Oooops!' + error);
                    reject(error);
                });
        });
    }

    downloadRcuAvailableFile(documentId) {
        const data = { 'documentId': Number(documentId) };
        return new Promise((resolve, reject) => {
            this.download(this.appConfig.endpoints.downloadRcuavailableDocument, data)
                .then(res => {
                    resolve(res);
                }, error => {
                    console.log('Oooops!' + error);
                    reject(error);
                });
        });
    }

    /** Common function to call download API */
    download(url, data) {
        return new Promise((resolve, reject) => {
            if (this.apiService.downloadDisabled) {
                reject(this.apiService.commonStrings.download_disabled);
                return;
            }
            this.apiService.postApi(url, data, '')
                .then((resp: any) => {
                    if (resp) {
                        if ((resp.saveStatus === 'Success' || resp.Status == 'Success') || (resp.file || resp.resultMap)) {
                            resolve(resp);
                        } else if (resp.Exception) {
                            reject(resp);
                        } else if (resp.errorDesc) {
                            reject(resp.errorDesc);
                        } else {
                            reject(this.apiService.commonStrings.download_error);
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
