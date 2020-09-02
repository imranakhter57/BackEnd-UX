import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Cache } from '../shared/services/cache';
import { AuthService } from '../shared/services/auth.service';
import { UserService } from '../shared/services/user-service';

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html'
})

export class HeaderComponent {

    hideNav: boolean = true;
    year: any;

    constructor(private router: Router,
        public cache: Cache,
        public userService: UserService,
        public authService: AuthService) {

        this.year = new Date().getFullYear();
    }
    logout() {
        this.authService.logout().then(() => {
            this.router.navigateByUrl('/home', { skipLocationChange: true });
        })
    }
}
