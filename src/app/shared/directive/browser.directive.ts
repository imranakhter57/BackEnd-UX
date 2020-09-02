import { Directive, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Directive({
    selector: '[disableKeys]'
})

export class BrowserDirective {

    constructor(public authService: AuthService,
        private router: Router) {

        const navigationSubscription = this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.userInteactionHandler();
            }
        });
    }
    /*Stop session timeout wif users clicks in window*/
    @HostListener('click', ['$event']) onClickChange(event) {
        this.authService.stopUserIdleTimer();
    }

    /*Stop session timeout wif users preses any key */
    @HostListener('window:keydown', ['$event']) onKeyPress(event) {
        const e = <KeyboardEvent>event;
        const keyCode = (e.which || e.keyCode);
        if (keyCode == 116 || (keyCode == 82 && e.ctrlKey)) {
            e.preventDefault();
        }
        this.authService.stopUserIdleTimer();
    }

    /*With hash toggled between ! and empty we disable back key */
    @HostListener('window:onhashchange', ['$event']) onHashChange(event) {
        const _hash = '!';
        if (window.location.hash && window.location.hash !== _hash) {
            window.location.hash = _hash;
        }
    }

    /*Before unload -refresh show browser default popup */
    @HostListener('window:beforeunload', ['$event']) onBeforeUnload(event) {
        if (!this.authService.isRedirectionAllowed()) {
            event.returnValue = 'No';
            // event.preventDefault();
            // return '';
        }
    }

    /*Disable Right click eveywhere*/
    @HostListener('contextmenu', ['$event']) onContextmenu(event) {
        event.returnValue = false;
    }

    /*On angular state chnage again push hash for toggle*/
    userInteactionHandler() {
        if (!window.location.hash) {
            window.setTimeout(() => {
                window.location.hash = '!';
            }, 50);
        }
    }
}
