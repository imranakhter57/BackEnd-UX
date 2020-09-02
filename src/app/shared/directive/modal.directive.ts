import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Alert, AlertType } from '../models/alert';
import { ApiService } from '../services/api-service';
import { BookService } from '../../services/book.service';
import { Cache } from '../../shared/services/cache';

@Component({
    moduleId: module.id,
    template: `<div class="mat-dialog-header">
                    <a href="javascript:void(0);" class="close" (click)="closePopup()">
                        <i class="material-icons md-24 md-dark">cancel</i>
                    </a>
                </div>
                <mat-dialog-content>
                    <p>{{alert.message}}</p>
                    <div class="right-btn float-right">
                        <button type="submit" (click)="closePopup()" class="blue-btn mat-stroked-button" mat-stroked-button [innerHTML]="'dialog.btn_ok' | translate"></button>
                    </div>
                </mat-dialog-content>`,
    styles: ['']
})

export class ModalComponent implements OnInit {
    alert: Alert;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<ModalComponent>,
        public apiService: ApiService,
        public BookService: BookService,
        public cache: Cache) {

        this.alert = data;
    }

    ngOnInit() { }

    closePopup() {
        const data = {
            'userId': this.cache.user.userId,
            'roleId': this.cache.user.roleId
        };
        
        this.apiService.sendAction({ action: 'modalClose' });

        this.dialogRef.close();
    }

    cssClass(alert: Alert) {
        if (!alert) {
            return;
        }

        // return css class based on alert type
        switch (alert.type) {
            case AlertType.Success:
                return 'alert alert-success';
            case AlertType.Error:
                return 'alert alert-danger';
            case AlertType.Info:
                return 'alert alert-info';
            case AlertType.Warning:
                return 'alert alert-warning';
        }
    }
}
