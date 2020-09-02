import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { AlertService } from './shared/services/alert-service';
import { Cache } from './shared/services/cache';
import { ApiService } from './shared/services/api-service';
import { AuthService } from './shared/services/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {

    noHeader: any = true;

    constructor(public translate: TranslateService,
        public cache: Cache,
        public apiService: ApiService,
        private authService: AuthService,
        public alert: AlertService,
        private router: Router) {

        // hide header on login page
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                if (event.url.indexOf('/home') !== -1 || (event.urlAfterRedirects && event.urlAfterRedirects.indexOf('/home') !== -1)) {
                    this.noHeader = true;
                } else {
                    this.noHeader = false;
                }
            }
        });

        translate.setDefaultLang('en');
        translate.use('en');
    }

}
