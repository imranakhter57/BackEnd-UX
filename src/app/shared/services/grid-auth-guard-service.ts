import { Injectable } from '@angular/core';
import { Router, CanActivate, CanLoad } from '@angular/router';

import { AuthService } from './auth.service';


@Injectable()
export class GridAuthGuardService implements CanActivate, CanLoad {
    constructor(public authService: AuthService,
        public router: Router) {

    }
    canActivate(): boolean {
        if (!this.authService.isAuthenticated()) {
            this.router.navigateByUrl('/home', { skipLocationChange: true });
            return false;
        }
        return true;
    }
    canLoad(): boolean {
        if (!this.authService.isAuthenticated()) {
            this.router.navigateByUrl('/home', { skipLocationChange: true });
            return false;
        }
        return true;
    }
}
