import { Injectable, Inject } from '@angular/core';
import { ApiService } from '../shared/services/api-service';
import { DocumentsService } from '../shared/services/documents-service';

import { APP_CONFIG } from '../shared/config/app.config';
import { IAppConfig } from '../shared/config/iapp.config';

import { BooksList} from '../shared/models/grid';

@Injectable()
export class BookService {
    appConfig: IAppConfig;
    booksAdded: any;
    constructor(@Inject(APP_CONFIG) appConfig: IAppConfig,
        public apiService: ApiService,
        public docService: DocumentsService) {
        this.appConfig = appConfig;
        this.booksAdded = [];
    }

    setBorrowedBooks(books: any){
        this.booksAdded.push(books);
    }
    removeBorrowedBooks(books:any){
        this.booksAdded.splice(this.booksAdded.findIndex(x => x.bookId == books.bookId), 1);
    }
    getBorrowedBooks(){
        return this.booksAdded;
    }
    
    removeBook(data: any) {
        return new Promise((resolve, reject) => {
            this.apiService.postApi(this.appConfig.lookups.returnBook, data, '')
                .then((resp: any) => {
                    resolve(resp);
                }, error => {
                    console.log('Oooops!' + error);
                    reject(this.apiService.commonStrings.http_error);
                });
        });
    }

    checkoutBorrowedBooks(data){
        this.booksAdded = [];
        return new Promise((resolve, reject) => {
            this.apiService.postApi(this.appConfig.lookups.checkoutBooks, data, '')
                .then((resp: any) => {
                    resolve(resp);
                }, error => {
                    console.log('Oooops!' + error);
                    reject(this.apiService.commonStrings.http_error);
                });
        });
    }
   
    createNewBook(data) {

        return new Promise((resolve, reject) => {
            this.apiService.postApi(this.appConfig.endpoints.addNewBook, data, '')
                .then((resp: any) => {
                    resolve(resp);
                }, error => {
                    console.log('Oooops!' + error);
                    reject(this.apiService.commonStrings.http_error);
                });
        });
    }

    getBooksList(data) {

        return new Promise((resolve, reject) => {
            this.apiService.postApi(this.appConfig.lookups.getBooksList, data, '')
                .then(data => {
                    resolve(data);
                }, error => {
                    reject(error);
                });
        });
    }
    getBrwBooksList(data) {

        return new Promise((resolve, reject) => {
            this.apiService.postApi(this.appConfig.lookups.getBrwBooksList, data, '')
                .then(data => {
                    resolve(data);
                }, error => {
                    reject(error);
                });
        });
    }
    getAvlBooksList(data) {
        
        return new Promise((resolve, reject) => {
            this.apiService.postApi(this.appConfig.lookups.getAvlBooksList, data, '')
                .then(data => {
                    resolve(data);
                }, error => {
                    reject(error);
                });
        });
    }

    // get taskboard data
    getTaskboard(data, selectedTab) {

        let endPoint: any;
        if (selectedTab == 0) {
            endPoint = this.appConfig.lookups.getBooksList;
        } else if (selectedTab == 1){
            endPoint = this.appConfig.lookups.getBooksList;
        } else {
            endPoint = this.appConfig.lookups.getBooksList;
        }

        return new Promise((resolve, reject) => {
            this.save(endPoint, data).then((resp) => {
                const taskboardData = new BooksList(resp);
                resolve(taskboardData);
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
                    reject(this.apiService.commonStrings.http_error);
                });
        });
    }

    save(url, data) {

        return new Promise((resolve, reject) => {
            this.apiService.postApi(url, data, '')
                .then((resp: any) => {
                    if (resp) {
                        if (resp.saveStatus === 'Success' ||
                            resp.deleteStatus == 'Success' ||
                            resp.Status == 'Success' ||
                            resp.status == 'sucess' ||
                            resp.actionStatus == 'Success') {

                            resolve(resp);
                        } else if (resp.Exception) {
                            reject(resp);
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
}
