import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { AppMaterialModule } from './material.module';
import { RouterTabModule } from '@zerohouse/router-tab';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { TranslateModule } from '@ngx-translate/core';
import { LoaderComponent } from './components/loader.component';

import { CdkTableModule } from '@angular/cdk/table';
// import { ScrollToModule } from 'ng2-scroll-to-el';

import { MdePopoverModule } from '@material-extended/mde';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ClickOutsideModule } from 'ng4-click-outside';


import { Error404Component } from './components/error404/error-404.component';
import { AppTextAreaAutocompleteComponent } from './components/textareautocomplete.component';

import { AlertComponent } from './directive/alert.directive';
import { ModalComponent } from './directive/modal.directive';
import { AppTextInputAutocompleteDirective } from './directive/textareautocomplete.directive';

import { IndianCurrencyPipe, floatPipe } from './pipe/currency-pipe';
import { PhonePipe } from './pipe/phone-pipe';
import { IndianCurrencyFormatterDirective, FloatFormatterDirective } from './directive/currency-formatter.directive';
import { PhoneFormatterDirective } from './directive/phone-formatter.directive';
import { BrowserDirective } from './directive/browser.directive';
import {
    NumberOnlyDirective, FormFieldDisableDirective, AlphaOnlyDirective, AlphaNumericOnlyDirective,
    AlphaNumericWithSpaceOnlyDirective, AlphaWithSpacesDirective, LimitLengthDirective,
    AlphaNumericWithSpecialsOnlyDirective,
    AlphaNumericWithSpecialsAndSpaceOnlyDirective, DateFormatterDirective,
    ExpressionDirective, AlphaNumericWithSpaceAndSomeSpecialOnlyDirective,
    AlphaNumericWithSpaceAndLimitedSpecialOnlyDirective, NumberWithDotOnlyDirective, NumberWithSlashOnlyDirective, DisplayNameDirective, NumberWithOperatorsOnlyDirective
} from './directive/common.directive';


@NgModule({
    imports: [CommonModule,
        AppMaterialModule,
        FormsModule,
        ReactiveFormsModule,
        NgxWebstorageModule.forRoot(),
        NgxMyDatePickerModule.forRoot(),
        CdkTableModule,
        RouterTabModule,
        // ScrollToModule,
        MdePopoverModule,
        InfiniteScrollModule,
        ClickOutsideModule,
        TranslateModule.forChild(),
    ],
    declarations: [
        Error404Component,
        AlertComponent,
        ModalComponent,
		LoaderComponent,

        AppTextAreaAutocompleteComponent,
        IndianCurrencyPipe,
        floatPipe,
        PhonePipe,
        IndianCurrencyFormatterDirective,
        FloatFormatterDirective,
        PhoneFormatterDirective,
        BrowserDirective,
        NumberOnlyDirective,
        NumberWithDotOnlyDirective,
        NumberWithSlashOnlyDirective,
        DisplayNameDirective,
        NumberWithOperatorsOnlyDirective,
        FormFieldDisableDirective,
        AlphaOnlyDirective,
        AlphaNumericOnlyDirective,
        AlphaNumericWithSpaceOnlyDirective,
        AlphaWithSpacesDirective,
        AppTextInputAutocompleteDirective,
        AlphaNumericWithSpecialsOnlyDirective,
        DateFormatterDirective,
        AlphaNumericWithSpecialsAndSpaceOnlyDirective,
        AlphaNumericWithSpaceAndLimitedSpecialOnlyDirective,
        AlphaNumericWithSpaceAndSomeSpecialOnlyDirective,
        LimitLengthDirective,
        ExpressionDirective
    ],
    exports: [CommonModule,
		LoaderComponent,
        AppMaterialModule,
        FormsModule,
        ReactiveFormsModule,
        NgxWebstorageModule,
        CdkTableModule,
        RouterTabModule,
        NgxMyDatePickerModule,
        MdePopoverModule,
        InfiniteScrollModule,
        ClickOutsideModule,
        Error404Component,
        AlertComponent,
        ModalComponent,
        AppTextAreaAutocompleteComponent,
        IndianCurrencyFormatterDirective,
        FloatFormatterDirective,
        PhoneFormatterDirective,
        NumberOnlyDirective,
        NumberWithDotOnlyDirective,
        NumberWithSlashOnlyDirective,
        DisplayNameDirective,
        NumberWithOperatorsOnlyDirective,
        FormFieldDisableDirective,
        BrowserDirective,
        AlphaOnlyDirective,
        AlphaNumericOnlyDirective,
        AlphaNumericWithSpaceOnlyDirective,
        AlphaWithSpacesDirective,
        AppTextInputAutocompleteDirective,
        AlphaNumericWithSpecialsOnlyDirective,
        DateFormatterDirective,
        AlphaNumericWithSpecialsAndSpaceOnlyDirective,
        AlphaNumericWithSpaceAndLimitedSpecialOnlyDirective,
        AlphaNumericWithSpaceAndSomeSpecialOnlyDirective,
        LimitLengthDirective,
        IndianCurrencyPipe,
        FloatFormatterDirective,
        floatPipe,
        PhonePipe,
        
    ],
    providers: [
        IndianCurrencyPipe,
        FloatFormatterDirective,
        floatPipe,
        PhonePipe,
        BrowserDirective
    ],
    entryComponents: [ModalComponent, AppTextAreaAutocompleteComponent],

})
export class SharedModule {

}
