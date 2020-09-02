import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { MatTabChangeEvent } from '@angular/material';

import { UserService } from '../shared/services/user-service';
import { AlertService } from '../shared/services/alert-service';
import { AuthService } from '../shared/services/auth.service';

import { CustomValidators, FormSubmittedMatcher, ConfirmValidParentMatcher } from '../shared/services/custom-validators';
import { Cache } from '../shared/services/cache';
import { BooksList,BookRow } from '../shared/models/grid';

import { BookService } from '../services/book.service';
import { ApiService } from '../shared/services/api-service';

@Component({
    templateUrl: './taskboard.component.html'
})

export class TaskboardComponent implements OnInit {
    @ViewChild('scrollMe') private myScrollContainer: ElementRef;
    taskboardData: BooksList;

    finished = false  // boolean when end of database is reached
    options = { page: 1, count: 16 };
    searchValue: boolean = false;

    showThankyouMsg = false;
    newBook = false;
    newBookFormGroup: FormGroup;
    newBookLoader: boolean;
    searchBooks:string;
    preSearchBooks: string;
    totalPages: number;
    dataLoader: boolean;
    message:string;

    selectedTabIndex: number;
    borrowedBookCount : number;
    isDSADashboard: boolean;

    bookCount :any;
    filteredCities: Observable<any[]>;
    filteredBooks: BookRow[];

    col1Defs = [
        { id: 'customerName', label: 'Customer Name', class: 'cust-name' },
        { id: 'status', label: 'Status', class: 'status' }
    ];

    col2Defs = [
        { id: 'appId', label: 'App Id', class: 'app-id' },
        { id: 'product', label: 'Product', class: 'product' },
        { id: 'type', label: 'Type', class: 'type' },
        { id: 'amount', label: 'Amount', class: 'amount' },
        { id: 'assignedTo', label: 'assigned To', class: 'assigned-to' },
        { id: 'location', label: 'Location', class: 'location' },
        { id: 'sourcing', label: 'Sourcing', class: 'sourcing' },
        { id: 'businessType', label: 'Business Type', class: 'business-type' }
    ];

    col3Defs:any = [
        { id: 'appId', label: "App Id", class: 'app-id' },
        { id: 'product', label: "Product" },
        { id: 'amount', label: "Amount" },
        { id: 'location', label: "Location" }
    ];

    constructor(private fb: FormBuilder,
        private router: Router,
        private BookService: BookService,
        private alert: AlertService,
        public parentErrorStateMatcher: ConfirmValidParentMatcher,
        public userService: UserService,
        public authService: AuthService,
        public formSubmittedMatcher: FormSubmittedMatcher,
        public cache: Cache,
        public apiService: ApiService
    ) {

        if (!this.authService.isAuthenticated()) {
            this.router.navigate(['/']);
        }
        this.taskboardData = null;
        this.newBookLoader = false;
        this.dataLoader = false;
        this.searchBooks = "";
        this.selectedTabIndex = 0;
        this.isDSADashboard = false;
        this.newBook = false;
        

        // new application form validations
        // this.navigateTo = cache.user.navLinks[0].path;
        this.newBookFormGroup = this.fb.group({
            bookId:[''],
            bookName: ['', Validators.required],
            authorName: [''],
            quantityAvailable: ['', Validators.required]
        });

        this.bookCount = [];
        this.borrowedBookCount = 0;
    }

    ngOnInit() {
        this.getDashboard();
        this.newBookFormGroup.get('bookName').valueChanges.pipe(debounceTime(200)).subscribe(value => {
            if (value) {
                this.filteredBooks = this.taskboardData.books.filter(book =>
                    book.bookName.toLowerCase().indexOf(value.toString().toLowerCase()) === 0);
            }
        });
    }


    onChanges(book,event:any){
        if(event.isUserInput && this.newBook){
            this.newBookFormGroup.get("bookId").patchValue(book.bookId);
            this.newBookFormGroup.get('authorName').patchValue(book.authorName);
            this.newBookFormGroup.get('quantityAvailable').patchValue(book.quantityAvailable);    
        }
    }



    goToApp(appId, path) {
        this.cache.user.appPackageId = appId.toString();
        this.cache.set('user', this.cache.user);

        this.router.navigate(['/taskboard/view', appId, path], { skipLocationChange: true });
    }


    onScrollEnd(ev) {
        if (this.options.page < this.totalPages) {
            this.options.page++;
            // this.getTaskBoard(false);
        } else {
            this.finished = true;
        }
    }
    checkoutBorrowedBooks(){
        let data = {
            books : this.BookService.getBorrowedBooks(),
            userId : this.cache.user.userId
        }
        this.BookService.checkoutBorrowedBooks(data).then((response: any) => {
            this.newBookLoader = false;
            this.alert.success("Successfully Checkedout book");
            this.selectedTabIndex =0;

        }, (error) => {
            this.newBookLoader = false;
            this.alert.error(error);
        });
    }
    getBorrowedBookCount(){
        this.bookCount = this.BookService.getBorrowedBooks();
        return this.bookCount.length > 0 ? this.bookCount.length :null;
    }
    disableCheckout() {
        if(this.borrowedBookCount >= 2 || !this.getBorrowedBookCount()){
            return true;
        }
        return false;
    }

    getDashboard() {
        let data = {
            userId: this.cache.user.userId,
            searchString: this.searchBooks
        }
        this.dataLoader = true;
        if (this.selectedTabIndex == 0 && this.cache.user.roleId == 1){
            this.BookService.getBooksList(data).then((data: any) => {
                this.dataLoader = false;  
                this.taskboardData = data;
                this.cache.user.totalRecords = data.totalNumberRecords;
                this.cache.set('user', this.cache.user);
                if (data.totalNumberPages <= 1) this.finished = true;
                this.totalPages = data.totalNumberPages;
                if (data.books.length == 0) {
                    this.alert.error('No Books are there in the Library');
                    this.message = 'No Books are there in the Library';
                }
            

            }, (error) => {
                this.dataLoader = false;
                this.alert.error('No Books are there in the Library');
                this.message = 'No Books are there in the Library';
            });
        } else if (this.selectedTabIndex == 0 && this.cache.user.roleId != 1){
            this.BookService.getBrwBooksList(data).then((data: any) => {      
                    this.dataLoader = false;
                    this.taskboardData = data;
                    this.cache.user.totalRecords = data.totalNumberRecords;
                    this.borrowedBookCount = data.books.length;
                    this.cache.set('user', this.cache.user);
                    if (data.totalNumberPages <= 1) this.finished = true;
                    this.totalPages = data.totalNumberPages;
                if (data.books.length == 0) {
                    this.alert.error('No books have been borrowed');
                    this.message = 'No books have been borrowed';
                }
            }, (error) => {
                this.dataLoader = false;
                this.alert.error('No books have been borrowed');
                this.message = 'No books have been borrowed';
            });
        } 
        else{
            this.BookService.getAvlBooksList(data).then((data: any) => {
                    this.dataLoader = false;
                    this.taskboardData = data;
                    this.cache.user.totalRecords = data.totalNumberRecords;
                    this.cache.set('user', this.cache.user);
                    if (data.totalNumberPages <= 1) this.finished = true;
                    this.totalPages = data.totalNumberPages;
                if (data.books.length == 0) {
                    this.alert.error('No books available in the library');
                    this.message = 'No books available in the library';
                }

            }, (error) => {
                this.dataLoader = false;
                this.alert.error('No books available in the library');
                this.message = 'No books available in the library';
            });
        }
    }

    // create new application
    addNewBook() {

        if (this.newBookFormGroup.valid) {
            this.newBookLoader = true;
            this.BookService.createNewBook(this.newBookFormGroup.value).then((response: any) => {
                this.newBook = false;
                this.newBookFormGroup.reset();
                this.newBookLoader = false;
                this.alert.success(response.errorMessage);
                this.ngOnInit();

            }, (error) => {
                this.newBookLoader = false;
                this.alert.error(error);
            });
        }
    }

    // clear search input value
    clearSearch() {
        this.searchBooks = '';
        this.getDashboard();
    }

    resetTaskBoard() {
        if (this.searchBooks.length == 0) {
            this.searchBooks = '';
            this.taskboardData = null;
            this.options.page = 1;
            this.getDashboard();
        }

    }

    // load content of selected tab
    tabChanged = (event: MatTabChangeEvent): void => {
        this.selectedTabIndex = event.index;
        this.searchBooks = '';
        this.taskboardData = null;
        this.options.page = 1;
        this.getDashboard();
    }
}
