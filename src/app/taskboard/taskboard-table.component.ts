import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../shared/services/user-service';
import { Cache } from '../shared/services/cache';
import { BookService } from '../services/book.service';
import { AlertService } from '../shared/services/alert-service';
import {TaskboardComponent} from '../taskboard/taskboard.component';

import { BooksList } from '../shared/models/grid';


@Component({
    selector: 'app-taskboard',
    templateUrl: './taskboard-table.component.html'
})

export class TaskboardTableComponent implements OnInit {
    @Input() data: BooksList;
    @Input() boardType: any;
    @Output() onScroll: EventEmitter<any> = new EventEmitter();
    @Output() borrowedBooks: EventEmitter<[]> = new EventEmitter<any>();


    options = { sortBy: '', sortDirection: 'asc', page: 1, count: 18 };
    searchValue: boolean = false;
    _isSorting: boolean = false;

    searchRules: any;
    newBookLoader: boolean;


    col1Defs = [
        { id: 'bookId', label: "Book Id", class: 'book-id'},
        { id: 'bookName', label: "Book Name", class: 'cust-name'},
        { id: 'authorName', label: "Author Name", class: 'cust-name'},
        { id: 'quantityAvialable', label: "Available", class: 'book-id'},
        { id: 'quantityBorrowed', label: "Borrowed", class: 'book-id'},
        { id: 'quantityTotal', label: "Total", class: 'book-id'}
    ];

    constructor(private fb: FormBuilder,
                private BookService: BookService,
                private alert: AlertService,
                private router: Router,
                private TaskboardComponent: TaskboardComponent,
                public userService: UserService,
                public cache: Cache) {
        this.newBookLoader = false;
       
    }


    ngOnInit() {
    }

    addBookToBorrow(dashboard) {
        if (this.TaskboardComponent.borrowedBookCount + this.BookService.getBorrowedBooks().length < 2){
            this.BookService.setBorrowedBooks(dashboard);
        } else{
            this.alert.error("You can borrower only 2 books.");
        }
    }
    removeBookFromBorrow(dashboard) {
        this.BookService.removeBorrowedBooks(dashboard);
    }

    returnBook(bookId) {
        let data ={
            bookId : bookId,
            userId : this.cache.user.userId
        }
        this.BookService.removeBook(data).then((response: any) => {
            this.newBookLoader = false;
            this.alert.success("Successfully returned book");
            this.TaskboardComponent.borrowedBookCount = this.TaskboardComponent.borrowedBookCount - 1;
            this.TaskboardComponent.ngOnInit();
            

        }, (error) => {
            this.newBookLoader = false;
            this.alert.error(error);
        });
    }

    checkIfNotAdded(dashboard){
        if(!this.BookService.getBorrowedBooks().some((item)=>item.bookId == dashboard.bookId)){
        return true;
        } else{
            return false;
        }
    }

    onScrollEnd(){
        this.onScroll.emit({});

    }
    sortHeaderClick(headerName: string) {

        if (headerName) {
            if (this.options.sortBy === headerName) {
                this.options.sortDirection = this.options.sortDirection === 'asc' ? 'desc' : 'asc';
            }
            this.options.sortBy = headerName;
            const column = this.col1Defs.filter((column) => column.id === this.options.sortBy)[0];
            this.sort(this.data.books, this.options.sortBy, this.options.sortDirection, false);
        }
    }

    private sort(array: Array<any>, fieldName: string, direction: string, isNumeric: boolean) {

        var sortFunc = (field, rev, primer) => {
            return (a, b) => {
                // Reset a, b to the field
                a = primer(pathValue(a, field)), b = primer(pathValue(b, field));
                // Do actual sorting, reverse as needed
                return ((a < b) ? -1 : ((a > b) ? 1 : 0)) * (rev ? -1 : 1);
            }
        };

        // Have to handle deep paths
        var pathValue = (obj, path) => {
            for (var i = 0, path = path.split('.'), len = path.length; i < len; i++) {
                obj = obj[path[i]];
            };
            return obj;
        };

        var primer = isNumeric ?
            (a) => {
                var retValue = parseFloat(String(a).replace(/[^0-9.-]+/g, ''));
                return isNaN(retValue) ? 0.0 : retValue;
            } : (a) => { return String(a).toUpperCase(); };

        this._isSorting = true;
        array.sort(sortFunc(fieldName, direction === 'desc', primer));
        this._isSorting = false;
    }
    isSorting(name: string) {
        return this.options.sortBy !== name && name !== '';
    }

    isSortAsc(name: string) {
        var isSortAsc: boolean = this.options.sortBy === name && this.options.sortDirection === 'asc';
        return isSortAsc;
    }

    isSortDesc(name: string) {
        var isSortDesc: boolean = this.options.sortBy === name && this.options.sortDirection === 'desc';
        return isSortDesc;
    }
}
