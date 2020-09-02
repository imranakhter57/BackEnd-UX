import { Component } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-error-404',
    templateUrl: './error-404.component.html'
})

export class Error404Component {
    error: any;
    navigationSubscription: any;
     currentURL='';

    constructor(private router: Router, public route: ActivatedRoute) {
      
      this.currentURL = window.location.href;
        this.navigationSubscription = this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {

                if (event.urlAfterRedirects.indexOf('/timeout') !== -1) {
                    this.error = 'Timeout!';
                } else if (event.urlAfterRedirects.indexOf('/400') !== -1) {
                    this.error = 400;
                } else if (event.urlAfterRedirects.indexOf('/401') !== -1) {
                    this.error = 401;
                } else if (event.urlAfterRedirects.indexOf('/403') !== -1) {
                    this.error = 403;
                } else if (event.urlAfterRedirects.indexOf('/500') !== -1) {
                    this.error = 500;
                } else if (event.urlAfterRedirects.indexOf('/session-expired') !== -1) {
                    this.error = 0;
                } else {
                    this.error = 404;
                }
            }
        });
    }
    goToHome() {
        this.router.navigateByUrl('home', { skipLocationChange: true });
    }
    ngOnDestroy() {
        this.navigationSubscription.unsubscribe();
    }
}