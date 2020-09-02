import { Directive, Inject, HostListener, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';

import { APP_CONFIG } from '../config/app.config';
import { IAppConfig } from '../config/iapp.config';


@Directive({
    selector: '[formFieldDisable]',
    inputs: ['readOnlyFlag'],
})
export class FormFieldDisableDirective {
    private readOnlyFlag: boolean;
    constructor() {
    }
    @HostListener('keydown', ['$event']) handleKeyboardEvent(e: KeyboardEvent) {
        if (this.readOnlyFlag) {
            e.returnValue = false;
            e.preventDefault();
        }
    }
}

@Directive({
    selector: '[numberOnly]',
    inputs: ['length', 'cropZero'],
})
export class NumberOnlyDirective {
    appConfig: IAppConfig;

    private length: number;
    private cropZero: boolean;

    constructor(@Inject(APP_CONFIG) appConfig: IAppConfig,
        private el: ElementRef,
        private control: NgControl) {
        this.cropZero = true;
        this.appConfig = appConfig;
    }
    @HostListener('input', ['$event']) onInputChange(event) {
        const initalValue = this.el.nativeElement.value;
        let newValue = initalValue;
        const re = new RegExp(this.appConfig.restrictedCharsRegEx, 'g');
        newValue = newValue.replace(re, '');
        if (this.cropZero) {
            newValue = initalValue.replace(/^0(0+)?/g, '0');
        }

        newValue = newValue.replace('.00', '');

        newValue = newValue.replace(/[^0-9]*/g, '');

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



@Directive({
    selector: '[alphaOnly]',
    inputs: ['length'],
})
export class AlphaOnlyDirective {
    appConfig: IAppConfig;

    private length: number;
    private upperOnly: boolean;

    constructor(@Inject(APP_CONFIG) appConfig: IAppConfig,
        private el: ElementRef,
        private control: NgControl) {
        this.appConfig = appConfig;
    }
    @HostListener('input', ['$event']) onInputChange(event) {
        const initalValue = this.el.nativeElement.value;
        let newValue = initalValue;
        const re = new RegExp(this.appConfig.restrictedAllSpecialCharsRegEx, 'g');
        newValue = newValue.replace(re, '');
        newValue = newValue.replace(/[^a-zA-Z]*/g, '');

        if (this.length && newValue.length > this.length) {
            newValue = newValue.substring(0, this.length);
        }
        if (this.upperOnly) { newValue = newValue.toUpperCase(); }

        this.el.nativeElement.value = newValue;
        this.control.control.setValue(newValue);

        if (initalValue !== this.el.nativeElement.value) {
            event.stopPropagation();
        }
    }
}

@Directive({
    selector: '[alphaWithSpaces]',
    inputs: ['length'],
})
export class AlphaWithSpacesDirective {
    appConfig: IAppConfig;
    private length: number;

    constructor(@Inject(APP_CONFIG) appConfig: IAppConfig,
        private el: ElementRef,
        private control: NgControl) {
        this.appConfig = appConfig;
    }
    @HostListener('input', ['$event']) onInputChange(event) {
        const initalValue = this.el.nativeElement.value;
        let newValue = initalValue;
        const re = new RegExp(this.appConfig.restrictedAllSpecialCharsRegEx, 'g');
        newValue = newValue.replace(re, '');

        newValue = newValue.replace(/^\s/g, '');
        newValue = newValue.replace(/[^a-zA-Z\s]*/g, '');
        newValue = newValue.replace(/\s\s/g, ' ');

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


@Directive({
    selector: '[limitLength]',
    inputs: ['length'],
})
export class LimitLengthDirective {
    appConfig: IAppConfig;
    private length: number;

    constructor(@Inject(APP_CONFIG) appConfig: IAppConfig,
        private el: ElementRef,
        private control: NgControl) {
        this.appConfig = appConfig;
    }

    @HostListener('keypress', ['$event']) onKeyPress(event) {

        const e = <KeyboardEvent>event;
        if (this.length && this.el.nativeElement.value.length >= this.length) {
            e.preventDefault();
        }
    }
    @HostListener('input', ['$event']) onInputChange(event) {
        const initalValue = this.el.nativeElement.value;
        let newValue = initalValue;

        if (this.length && newValue.length > this.length) {
            newValue = newValue.substring(0, this.length);
        }
        this.el.nativeElement.value = newValue;
        this.control.control.setValue(newValue);
    }
}

@Directive({
    selector: '[alphaNumericOnly]',
    inputs: ['length', 'upperOnly']
})
export class AlphaNumericOnlyDirective {
    appConfig: IAppConfig;

    private length: number;
    private upperOnly: boolean;

    constructor(@Inject(APP_CONFIG) appConfig: IAppConfig,
        private el: ElementRef,
        private control: NgControl) {
        this.appConfig = appConfig;
    }
    @HostListener('input', ['$event']) onInputChange(event) {
        const initalValue = this.el.nativeElement.value;

        let newValue = initalValue;
        const re = new RegExp(this.appConfig.restrictedAllSpecialCharsRegEx, 'g');

        newValue = newValue.replace(re, '');
        newValue = newValue.replace(/[^0-9a-zA-Z]*/g, '');

        if (this.length && newValue.length > this.length) {
            newValue = newValue.substring(0, this.length);
        }
        if (this.upperOnly) { newValue = newValue.toUpperCase(); }
        this.el.nativeElement.value = newValue;
        this.control.control.setValue(newValue);

        if (initalValue !== this.el.nativeElement.value) {
            event.stopPropagation();
        }
    }
}

@Directive({
    selector: '[alphaNumericWithSpaceOnly]',
    inputs: ['length', 'upperOnly']
})
export class AlphaNumericWithSpaceOnlyDirective {
    appConfig: IAppConfig;

    private length: number;
    private upperOnly: boolean;

    constructor(@Inject(APP_CONFIG) appConfig: IAppConfig,
        private el: ElementRef,
        private control: NgControl) {
        this.appConfig = appConfig;
    }
    @HostListener('input', ['$event']) onInputChange(event) {
        const initalValue = this.el.nativeElement.value;
        let newValue = initalValue;
        const re = new RegExp(this.appConfig.restrictedCharsRegEx, 'g');
        newValue = newValue.replace(re, '');

        newValue = newValue.replace(/^\s/g, '');
        newValue = newValue.replace(/[^0-9a-zA-Z\s]*/g, '');
        newValue = newValue.replace(/\s\s/g, ' ');


        if (this.length && newValue.length > this.length) {
            newValue = newValue.substring(0, this.length);
        }
        if (this.upperOnly) { newValue = newValue.toUpperCase(); }
        this.el.nativeElement.value = newValue;
        this.control.control.setValue(newValue);

        if (initalValue !== this.el.nativeElement.value) {
            event.stopPropagation();
        }
    }
}

@Directive({
    selector: '[alphaNumericWithSpecialsOnly]',
    inputs: ['length', 'upperOnly']
})
export class AlphaNumericWithSpecialsOnlyDirective {
    appConfig: IAppConfig;

    private length: number;
    private upperOnly: boolean;

    constructor(@Inject(APP_CONFIG) appConfig: IAppConfig,
        private el: ElementRef,
        private control: NgControl) {
        this.appConfig = appConfig;
    }
    @HostListener('input', ['$event']) onInputChange(event) {
        const initalValue = this.el.nativeElement.value;
        let newValue = initalValue;
        const re = new RegExp(this.appConfig.restrictedCharsRegEx, 'g');
        newValue = newValue.replace(re, '');
        newValue = newValue.replace(/[^0-9a-zA-Z-._@]*/g, '');

        if (this.length && newValue.length > this.length) {
            newValue = newValue.substring(0, this.length);
        }
        if (this.upperOnly) { newValue = newValue.toUpperCase(); }
        this.el.nativeElement.value = newValue;
        this.control.control.setValue(newValue);

        if (initalValue !== this.el.nativeElement.value) {
            event.stopPropagation();
        }
    }
}

@Directive({
    selector: '[alphaNumericWithSpecialsAndSpaceOnly]',
    inputs: ['length', 'upperOnly']
})
export class AlphaNumericWithSpecialsAndSpaceOnlyDirective {

    appConfig: IAppConfig;
    private length: number;
    private upperOnly: boolean;

    constructor(@Inject(APP_CONFIG) appConfig: IAppConfig,
        private el: ElementRef,
        private control: NgControl) {
        this.appConfig = appConfig;
    }
    @HostListener('input', ['$event']) onInputChange(event) {
        const initalValue = this.el.nativeElement.value;
        let newValue = initalValue;
        const re = new RegExp(this.appConfig.restrictedCharsRegEx, 'g');
        newValue = newValue.replace(re, '');

        newValue = newValue.replace(/^\s/g, '');
        newValue = newValue.replace(/[^0-9a-zA-Z.,;:[](){}\/\\'\-\s]*/g, '');
        newValue = newValue.replace(/\s\s/g, ' ');


        if (this.length && newValue.length > this.length) {
            newValue = newValue.substring(0, this.length);
        }
        if (this.upperOnly) { newValue = newValue.toUpperCase(); }
        this.el.nativeElement.value = newValue;
        this.control.control.setValue(newValue);

        if (initalValue !== this.el.nativeElement.value) {
            event.stopPropagation();
        }
    }
}

// Created for comment textarea
@Directive({
    selector: '[alphaNumericWithSpaceAndSomeSpecialOnly]',
    inputs: ['length', 'upperOnly']
})
export class AlphaNumericWithSpaceAndSomeSpecialOnlyDirective {
    appConfig: IAppConfig;

    private length: number;
    private upperOnly: boolean;

    constructor(@Inject(APP_CONFIG) appConfig: IAppConfig,
        private el: ElementRef,
        private control: NgControl) {
        this.appConfig = appConfig;
    }
    @HostListener('input', ['$event']) onInputChange(event) {
        const initalValue = this.el.nativeElement.value;
        let newValue = initalValue;
        var re = new RegExp(this.appConfig.restrictedCharsRegEx, "g");
        newValue = newValue.replace(re, '');

        newValue = newValue.replace(/^\s/g, '');
        newValue = newValue.replace(/[^0-9a-zA-Z,;.'&{}()\s]*/g, '');
        newValue = newValue.replace(/\s\s/g, ' ');


        if (this.length && newValue.length > this.length) {
            newValue = newValue.substring(0, this.length)
        }
        if (this.upperOnly) newValue = newValue.toUpperCase();
        this.el.nativeElement.value = newValue;
        this.control.control.setValue(newValue);

        if (initalValue !== this.el.nativeElement.value) {
            event.stopPropagation();
        }
    }
}

@Directive({
    selector: '[date]',
    inputs: ['length'],
})
export class DateFormatterDirective {

    private length: number;

    constructor(private el: ElementRef, private control: NgControl) {
    }

    @HostListener('keydown', ['$event']) onKeyPress(event) {
        const key = event.keyCode;
        let newValue = this.el.nativeElement.value;
        if (newValue.length === 2 || newValue.length === 5) {
            newValue += '/';
        }
        if (key === 8) { /* If backspace is pressed*/
            if (newValue.length == 3 || newValue.length == 6) {
                /*if next char to be removed is /' remove last two characters from input value*/
                newValue = newValue.substr(0, newValue.length - 1);
            }
            newValue = newValue.substr(0, newValue.length);  /*remove last character*/
        } else if (!((key > 47 && key < 58) || (key > 95 && key < 106)) || newValue.length === 10) {
            if (!(key == 9 || key == 37 || key == 39)) {
                /*if key pressed is not number or input got date*/
                event.preventDefault(); // no nothing
            }
        }
        this.el.nativeElement.value = newValue;
        return;
    }
}

@Directive({
    selector: '[alphaNumericWithSpaceAndLimitedSpecialOnly]',
    inputs: ['length', 'upperOnly']
  })
  export class AlphaNumericWithSpaceAndLimitedSpecialOnlyDirective {
    appConfig: IAppConfig;
   
    private length: number;
    private upperOnly: boolean;
   
    constructor(@Inject(APP_CONFIG) appConfig: IAppConfig,
      private el: ElementRef,
      private control: NgControl) {
      this.appConfig = appConfig;
    }
    @HostListener('input', ['$event']) onInputChange(event) {
      const initalValue = this.el.nativeElement.value;
      let newValue = initalValue;
      var re = new RegExp(this.appConfig.restrictedCharsRegExForAddress, "g");
      newValue = newValue.replace(re, '');
   
      newValue = newValue.replace(/^\s/g, '');
      newValue = newValue.replace(/[^0-9a-zA-Z,;:.\-_#$\/&@\s]*/g, '');
      newValue = newValue.replace(/\s\s/g, ' ');
   
      if (this.length && newValue.length > this.length) {
        newValue = newValue.substring(0, this.length)
      }
      if (this.upperOnly) newValue = newValue.toUpperCase();
      this.el.nativeElement.value = newValue;
      this.control.control.setValue(newValue);
   
      if (initalValue !== this.el.nativeElement.value) {
        event.stopPropagation();
      }
    }
  }

/* BRE Related Directives Starts */

@Directive({
    selector: '[numberWithDotOnly]',
    inputs: ['length']
})
export class NumberWithDotOnlyDirective {
    appConfig: IAppConfig;

    private length: number;

    constructor(@Inject(APP_CONFIG) appConfig: IAppConfig,
        private el: ElementRef,
        private control: NgControl) {
        this.appConfig = appConfig;
    }
    @HostListener('input', ['$event']) onInputChange(event) {
        const initalValue = this.el.nativeElement.value;

        let newValue = initalValue;
        var re = new RegExp(this.appConfig.restrictedCharsRegEx, "g");
        newValue = newValue.replace(re, '');

        newValue = newValue.replace(/^\./g, '');
        newValue = newValue.replace(/[^0-9\.]*/g, '');
        newValue = newValue.replace(/\.\./g, '.');

        if (this.length && newValue.length > this.length) {
            newValue = newValue.substring(0, this.length)
        }
        this.el.nativeElement.value = newValue;
        this.control.control.setValue(newValue);

        if (initalValue !== this.el.nativeElement.value) {
            event.stopPropagation();
        }
    }
}

@Directive({
    selector: '[expression]',
    inputs: ['length', 'upperOnly']
})
export class ExpressionDirective {
    appConfig: IAppConfig;

    private length: number;
    private upperOnly: boolean;

    constructor(@Inject(APP_CONFIG) appConfig: IAppConfig,
        private el: ElementRef,
        private control: NgControl) {
        this.appConfig = appConfig;
    }
    @HostListener('input', ['$event']) onInputChange(event) {
        const initalValue = this.el.nativeElement.value;
        let newValue = initalValue;
        var re = new RegExp(this.appConfig.restrictedCharsRegEx, "g");
        newValue = newValue.trimLeft();
        // newValue = newValue.replace(re, '');
        newValue = newValue.replace(/^\s[^0-9a-zA-Z-._,|;/*&/[/](){}%\/\\']*/g, '');
        newValue = newValue.replace(/\s\s/g, ' ');

        if (this.length && newValue.length > this.length) {
            newValue = newValue.substring(0, this.length)
        }
        if (this.upperOnly) newValue = newValue.toUpperCase();
        this.el.nativeElement.value = newValue;
        this.control.control.setValue(newValue);

        if (initalValue !== this.el.nativeElement.value) {
            event.stopPropagation();
        }
    }
}


@Directive({
    selector: '[numberWithSlashOnly]',
    inputs: ['length'],
})
export class NumberWithSlashOnlyDirective {
    appConfig: IAppConfig;

    private length: number;

    constructor(@Inject(APP_CONFIG) appConfig: IAppConfig,
        private el: ElementRef,
        private control: NgControl) {
        this.appConfig = appConfig;
    }
    @HostListener('input', ['$event']) onInputChange(event) {
        const initalValue = this.el.nativeElement.value;
        let newValue = initalValue;
        var re = new RegExp(this.appConfig.restrictedCharsRegEx, "g");
        newValue = newValue.replace(re, '');
        newValue = newValue.replace(/[^0-9.\/]*/g, '');

        if (this.length && newValue.length > this.length) {
            newValue = newValue.substring(0, this.length)
        }
        this.el.nativeElement.value = newValue;
        this.control.control.setValue(newValue);

        if (initalValue !== this.el.nativeElement.value) {
            event.stopPropagation();
        }
    }
}



@Directive({
    selector: '[numberWithOperatorsOnly]',
    inputs: ['length'],
})
export class NumberWithOperatorsOnlyDirective {
    appConfig: IAppConfig;

    private length: number;

    constructor(@Inject(APP_CONFIG) appConfig: IAppConfig,
        private el: ElementRef,
        private control: NgControl) {
        this.appConfig = appConfig;
    }
    @HostListener('input', ['$event']) onInputChange(event) {
        const initalValue = this.el.nativeElement.value;
        let newValue = initalValue;
        var re = new RegExp(this.appConfig.restrictedCharsRegEx, "g");
        newValue = newValue.replace(re, '');
        newValue = newValue.replace(/[^0-9.\$\-\\\/\*\@\+\=\%]*/g, '');

        if (this.length && newValue.length > this.length) {
            newValue = newValue.substring(0, this.length)
        }
        this.el.nativeElement.value = newValue;
        this.control.control.setValue(newValue);

        if (initalValue !== this.el.nativeElement.value) {
            event.stopPropagation();
        }
    }
}


@Directive({
    selector: '[displayName]',
    inputs: ['length', 'upperOnly'],
})
export class DisplayNameDirective {
    appConfig: IAppConfig;

    private length: number;
    private upperOnly: boolean;

    constructor(@Inject(APP_CONFIG) appConfig: IAppConfig,
        private el: ElementRef,
        private control: NgControl) {
        this.appConfig = appConfig;
    }
    @HostListener('input', ['$event']) onInputChange(event) {
        const initalValue = this.el.nativeElement.value;
        let newValue = initalValue;
        var re = new RegExp(this.appConfig.restrictedCharsRegEx, "g");
        newValue = newValue.replace(re, '');
        newValue = newValue.replace(/^[0-9\s]*/g, '');
        newValue = newValue.replace(/[^a-zA-Z0-9\s]*/g, '');
        newValue = newValue.replace(/\s\s/g, ' ');

        if (this.length && newValue.length > this.length) {
            newValue = newValue.substring(0, this.length)
        }
        if (this.upperOnly) newValue = newValue.toUpperCase();
        this.el.nativeElement.value = newValue;
        this.control.control.setValue(newValue);

        if (initalValue !== this.el.nativeElement.value) {
            event.stopPropagation();
        }
    }
}
/* BRE Related Directives Ends */
