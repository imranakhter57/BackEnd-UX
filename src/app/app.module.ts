import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { MultiTranslateHttpLoader } from './shared/http.loader';
import { MatBadgeModule, MatButtonModule, MatIconModule } from '@angular/material';

import { SharedModule } from './shared/shared.module';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

import { AppComponent } from './app.component';
import { TaskboardComponent } from './taskboard/taskboard.component';
import { TaskboardTableComponent } from './taskboard/taskboard-table.component';

import { AppRoutingModule } from './app.routing.module';
import { HeaderComponent } from './core/header.component';

import { UserService } from './shared/services/user-service';
import { BookService } from './services/book.service';
import { SystemService } from './services/system.service';
import { APP_CONFIG, AppConfig } from './shared/config/app.config';
import { ApiService } from './shared/services/api-service';
import { AlertService } from './shared/services/alert-service';
import { CustomValidators, ConfirmValidParentMatcher, FormSubmittedMatcher } from './shared/services/custom-validators';
import { Cache } from './shared/services/cache';

import { LoginComponent } from './login/login.component';

import { Interceptor } from './shared/services/token.interceptor';
import { GridAuthGuardService } from './shared/services/grid-auth-guard-service';
import { AuthService } from './shared/services/auth.service';
import { DocumentsService } from './shared/services/documents-service';
import { EncryptService } from './shared/services/encrypt';
import { UserIdleModule } from 'angular-user-idle';
import { AESService } from './shared/services/aes';


export function createTranslateLoader(http: HttpClient) {
    return new MultiTranslateHttpLoader(http, [
        { prefix: './assets/i18n/lms/', suffix: '.json' }
    ]);
}

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        LoginComponent,
        TaskboardComponent,
        TaskboardTableComponent,

    ],
    imports: [
        BrowserAnimationsModule,
        HttpClientModule,
        SharedModule,
        MatBadgeModule, 
        MatButtonModule, 
        MatIconModule,
        AppRoutingModule,
        ScrollToModule.forRoot(),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }),
        UserIdleModule.forRoot({ idle: 900, timeout: 10, ping: 10 })
    ],
    exports: [
        TaskboardComponent
    ],
    entryComponents: [],
    providers: [UserService,
        BookService,
        SystemService,
        AuthService,
        GridAuthGuardService,
        Cache,
        ApiService,
        CustomValidators,
        ConfirmValidParentMatcher,
        FormSubmittedMatcher,
        AlertService,
        DocumentsService,
        EncryptService,
        AESService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: Interceptor,
            multi: true
        },
        { provide: APP_CONFIG, useValue: AppConfig }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
