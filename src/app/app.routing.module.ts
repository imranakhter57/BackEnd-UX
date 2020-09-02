import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Error404Component } from './shared/components/error404/error-404.component';

import { TaskboardComponent } from './taskboard/taskboard.component';
import { LoginComponent } from './login/login.component';

import { GridAuthGuardService } from './shared/services/grid-auth-guard-service';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: LoginComponent },
    { path: 'taskboard', component: TaskboardComponent},
    { path: '**', component: Error404Component }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { useHash: false })
    ],
    exports: [
        RouterModule
    ],
    declarations: []
})
export class AppRoutingModule { }
