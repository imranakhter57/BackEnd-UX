import { Directive, ElementRef, HostListener, Inject } from '@angular/core';
import { NgControl } from '@angular/forms';
import { IAppConfig } from '../config/iapp.config';
import { APP_CONFIG } from '../config/app.config';

@Directive({
    selector: '[phone]',
    inputs: ['length']
})
export class PhoneFormatterDirective {
    appConfig: IAppConfig;

    private length: number;
    private cropZero: boolean;

    constructor(@Inject(APP_CONFIG) appConfig: IAppConfig,
        private el: ElementRef,
        private control: NgControl) {
        this.cropZero = true;
        this.appConfig = appConfig;
    }
    // @HostListener('keydown', ['$event']) onKeyPress(event) {
    //   let newValue = this.el.nativeElement.value;
    //   if (!newValue || newValue.length === 0) {
    //     newValue = '0';
    //   }
    //   this.el.nativeElement.value = newValue;
    // }
    @HostListener('input', ['$event']) onInputChange(event) {
        const initalValue = this.el.nativeElement.value;
        let newValue = initalValue;
        const re = new RegExp(this.appConfig.restrictedCharsRegEx, 'g');

        newValue = newValue.replace(re, '');
        newValue = initalValue.replace(/^-(-+)?/g, '-');
        newValue = newValue.replace(/\s\s/g, ' ');

        newValue = newValue.replace(/[^0-9 -]*/g, '');

        if (this.length && newValue.length > this.length) {
            newValue = newValue.substring(0, this.length);
        }

        this.el.nativeElement.value = newValue;
        this.control.control.setValue(newValue);

        if (initalValue !== this.el.nativeElement.value) {
            event.stopPropagation();
        }
    }
}
