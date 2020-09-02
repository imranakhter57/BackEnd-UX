
import { throwError as observableThrowError, Observable, Subject, from } from 'rxjs';
import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { Cache } from './cache';
import { AuthService } from './auth.service';
import { AlertService } from './alert-service';

import { AESService } from './aes';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class Interceptor implements HttpInterceptor {

    authService: AuthService;
    cache: Cache;
    refreshTokenInProgress = false;

    tokenRefreshedSource = new Subject();
    tokenRefreshed$ = this.tokenRefreshedSource.asObservable();

    constructor(private injector: Injector,
        private router: Router,
        public alert: AlertService,
        public aesService: AESService) {
    }

    addAuthHeader(request) {
        if (this.cache.user.authorization) {
            if (request.body && request.body.length && request.url.indexOf('/token/generate-token') == -1 && request.url.indexOf('Services/bre/') == -1) {
                request.body = this.aesService.encrypt(request.body);
            }
            return request.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.cache.user.authorization}`
                }
            });
        }
        return request;
    }

    refreshToken() {
        if (this.refreshTokenInProgress) {
            return new Observable(observer => {
                this.tokenRefreshed$.subscribe(() => {
                    observer.next();
                    observer.complete();
                });
            });
        } else {
            this.refreshTokenInProgress = true;

            return from(this.authService.generateToken()).subscribe(() => {
                this.refreshTokenInProgress = false;
                this.tokenRefreshedSource.next();
            });
        }
    }

    logout() {
        if (this.cache.user && this.cache.user.userId && this.cache.user.authorization) {
            this.authService.logoutActions();
            this.router.navigate(['/home']);
        }
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
        this.authService = this.injector.get(AuthService);
        this.cache = this.injector.get(Cache);
        // Handle request
        request = this.addAuthHeader(request);
        // Handle response
        return next.handle(request).pipe(map((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                if (event.body && event.body.serviceResponse) {
                    return event.clone({ body: this.decryptResponse(event.body.serviceResponse) });
                }
            }
            return event;
        }), catchError(error => {
            if (error.status === 401) {
                if (this.cache.user && this.cache.user.userId && this.cache.user.authorization) {
                    // error.message = "Another session is active for this User, Logging the current session";
                    this.authService.logoutActions();
                    this.router.navigate(['/session-expired']);
                }
            }
            return observableThrowError(error);
        }));
    }
    decryptResponse(body) {
        const json = this.aesService.decrypt(body);
        return json;
    }
}
