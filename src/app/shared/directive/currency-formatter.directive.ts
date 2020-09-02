import { Directive, Inject, HostListener, ElementRef, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';

import { APP_CONFIG } from '../config/app.config';
import { IAppConfig } from '../config/iapp.config';

import { IndianCurrencyPipe, floatPipe } from '../pipe/currency-pipe';

@Directive({
    selector: '[indianCurrencyFormatter]',
    inputs: ['fraction', 'length', 'negative']
})
export class IndianCurrencyFormatterDirective implements OnInit {
    appConfig: IAppConfig;

    private el: HTMLInputElement;
    private fraction: number;
    private length: number;
    private negative: boolean;
    private totalLength: number;
    private valueSubscription: any;

    constructor(@Inject(APP_CONFIG) appConfig: IAppConfig,
        private elementRef: ElementRef,
        private control: NgControl,
        private currencyPipe: IndianCurrencyPipe) {

        this.el = this.elementRef.nativeElement;
        this.appConfig = appConfig;

    }

    ngOnInit() {

        this.fraction = this.fraction ? this.fraction : 2;
        this.length = this.length ? this.length : 14;
        this.negative = this.negative ? this.negative : false;

        this.totalLength = Number(this.length) + Number(this.fraction) + Number(1);
        if (this.negative) { this.totalLength += Number(1); }

        this.valueSubscription = this.control.control.valueChanges.subscribe((value: string) => {

            if (value) {

                const formatted = this.currencyPipe.transform(value, this.fraction, this.negative);
                this.el.value = formatted;
            }
            this.valueSubscription.unsubscribe();
        });
        if(this.el.value){
            const formatted = this.currencyPipe.transform(this.el.value, this.fraction, this.negative);
            this.el.value = formatted;
        }
    }

    @HostListener('focus', ['$event.target.value']) onFocus(value) {

        if (!this.valueSubscription.closed) {
            this.valueSubscription.unsubscribe();
        }
        const val = this.currencyPipe.parse(value, this.fraction); // opossite of transform
        this.control.control.setValue(val);
    }

    @HostListener('blur', ['$event.target.value']) onBlur(value) {

        let re = new RegExp(this.appConfig.restrictedCharsRegEx, 'g');
        value = value.replace(re, '');

        const formatted = this.currencyPipe.transform(value, this.fraction, this.negative);
        const parsed = this.currencyPipe.parse(formatted, this.fraction);

        this.el.value = formatted;
        this.control.control.setValue(parsed, {
            emitEvent: false,
            emitModelToViewChange: false,
            emitViewToModelChange: false
        });
    }

    @HostListener('keydown', ['$event']) onKeyPress(event) {

        const e = <KeyboardEvent>event;
        const allowKeys = [8, 9, 13, 27, 37, 39, 46];

        if (e.shiftKey && this.appConfig.restrictedChars.indexOf(e.keyCode) !== -1) {
            e.preventDefault();
        }

        const fractionPosition = this.el.value.indexOf('.');
        if (fractionPosition === -1) {
            allowKeys.push(190);
            allowKeys.push(110);
        }
        const minusPosition = this.el.value.indexOf('-');

        let currentEnteredValueLength = this.el.value.length;
        let currentEnteredFractionLength = currentEnteredValueLength - fractionPosition - 1;

        if (this.negative && minusPosition === -1) {
            allowKeys.push(189);
            allowKeys.push(109);
        }
        if (minusPosition !== -1) {
            currentEnteredFractionLength = currentEnteredFractionLength - 1;
        }
        if (e.shiftKey) {
            e.preventDefault();
        } else if (allowKeys.indexOf(e.keyCode) !== -1 ||
            // Allow: Ctrl+A
            (e.keyCode === 65 && (e.ctrlKey || e.metaKey)) ||
            // Allow: Ctrl+C
            (e.keyCode === 67 && (e.ctrlKey || e.metaKey)) ||
            // Allow: Ctrl+V
            (e.keyCode === 86 && (e.ctrlKey || e.metaKey)) ||
            // Allow: Ctrl+X
            (e.keyCode === 88 && (e.ctrlKey || e.metaKey)) ||
            // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        } else if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            // non numbers
            e.preventDefault();
        } else {
            if (fractionPosition !== -1) {
                if (currentEnteredValueLength >= this.totalLength) {
                    e.preventDefault();
                }
                if (currentEnteredFractionLength >= this.fraction) {
                    e.preventDefault();
                }
            } else {
                if (minusPosition !== -1) {
                    currentEnteredValueLength--;
                }
                if (this.length && currentEnteredValueLength >= this.length) {
                    e.preventDefault();
                }
            }
        }
    }
}


@Directive({ selector: '[floatFormatter]', inputs: ['fraction', 'length', 'percent'] })
export class FloatFormatterDirective implements OnInit {

    private el: HTMLInputElement;
    private fraction: number;
    private length: number;
    private totalLength: number;
    private valueSubscription: any;
    private percent: boolean;

    constructor(private elementRef: ElementRef,
        private control: NgControl,
        private floatPipe: floatPipe) {

        this.el = this.elementRef.nativeElement;
    }

    ngOnInit() {
        this.fraction = this.fraction ? this.fraction : 2;
        this.length = this.length ? this.length : 14;
        this.percent = this.percent ? this.percent : false;

        this.totalLength = Number(this.length) + Number(this.fraction) + Number(1);

        this.valueSubscription = this.control.control.valueChanges.subscribe((value: string) => {
            if (value) {
                const formatted = this.floatPipe.transform(value, this.fraction, this.percent);
                this.el.value = formatted;
            }
            this.valueSubscription.unsubscribe();
        });
        if(this.el.value){
            const formatted = this.floatPipe.transform(this.el.value, this.fraction, this.percent);
            this.el.value = formatted;
        }
    }

    @HostListener('focus', ['$event.target.value']) onFocus(value) {

        if (!this.valueSubscription.closed) {
            this.valueSubscription.unsubscribe();
        }

        const val = this.floatPipe.parse(value, this.fraction, this.percent); // opossite of transform
        this.control.control.setValue(val);
    }

    @HostListener('blur', ['$event.target.value']) onBlur(value) {

        const formatted = this.floatPipe.transform(value, this.fraction, this.percent);
        const parsed = this.floatPipe.parse(formatted, this.fraction, this.percent);

        this.el.value = formatted;
        this.control.control.setValue(parsed, {
            emitEvent: false,
            emitModelToViewChange: false,
            emitViewToModelChange: false
        });
    }
    @HostListener('keydown', ['$event']) onKeyPress(event) {
        const e = <KeyboardEvent>event;

        const allowKeys = [46, 8, 9, 27, 13, 37, 39];

        const fractionPosition = this.el.value.indexOf('.');
        if (fractionPosition === -1) {
            allowKeys.push(190);
            allowKeys.push(110);
        }
        const currentEnteredValueLength = this.el.value.length;
        const currentEnteredFractionLength = currentEnteredValueLength - fractionPosition - 1;

        if (e.shiftKey) {
            e.preventDefault();
        } else if (allowKeys.indexOf(e.keyCode) !== -1 ||
            // Allow: Ctrl+A
            (e.keyCode === 65 && (e.ctrlKey || e.metaKey)) ||
            // Allow: Ctrl+C
            (e.keyCode === 67 && (e.ctrlKey || e.metaKey)) ||
            // Allow: Ctrl+V
            (e.keyCode === 86 && (e.ctrlKey || e.metaKey)) ||
            // Allow: Ctrl+X
            (e.keyCode === 88 && (e.ctrlKey || e.metaKey)) ||
            // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        } else if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            // non numbers
            e.preventDefault();
        } else {
            if (fractionPosition !== -1) {
                if (currentEnteredValueLength >= this.totalLength) {
                    e.preventDefault();
                }
                if (currentEnteredFractionLength >= this.fraction) {
                    e.preventDefault();
                }
            } else if (this.length && currentEnteredValueLength >= this.length) {
                e.preventDefault();
            }
        }
    }
}
