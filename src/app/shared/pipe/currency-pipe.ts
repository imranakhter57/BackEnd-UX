import { Pipe, PipeTransform } from '@angular/core';

const PADDING = '000000';

@Pipe({ name: 'indianCurrency' })
export class IndianCurrencyPipe implements PipeTransform {

    private DECIMAL_SEPARATOR: string;
    private THOUSANDS_SEPARATOR: string;

    constructor() {
        // TODO comes from configuration settings
        this.DECIMAL_SEPARATOR = '.';
        this.THOUSANDS_SEPARATOR = ',';
    }

    transform(value: number | string, fractionSize: number = 2, negativeAllowed: boolean = false): string {
        let [integer, fraction = ''] = (value || '').toString().split(this.DECIMAL_SEPARATOR);


        let negativeExists = false;
        if (negativeAllowed) {
            if (integer.indexOf('-') == 0) { negativeExists = true; }
        }

        integer = integer.replace(/^0(0+)?/g, '0');
        integer = integer.replace(/\D/g, '');

        integer = integer.replace(/(\d)(?=(\d\d)+\d$)/g, '$1' + this.THOUSANDS_SEPARATOR);

        fraction = fraction.replace(/\D/g, '');

        fraction = fractionSize > 0 ? this.DECIMAL_SEPARATOR + (fraction + PADDING).substring(0, fractionSize) : '';

        const final = integer ? integer + fraction : 0 + fraction;
        const output: any = negativeExists ? '-' + final : final;
        return output;
    }

    parse(value: string, fractionSize: number = 2): string {
        let [integer, fraction = ''] = (value || '').toString().split(this.DECIMAL_SEPARATOR);

        integer = integer.replace(new RegExp(this.THOUSANDS_SEPARATOR, 'g'), '');


        fraction = fractionSize > 0 ? this.DECIMAL_SEPARATOR + (fraction + PADDING).substring(0, fractionSize) : '';

        return integer ? integer + fraction : integer;
    }
}

@Pipe({ name: 'float' })
export class floatPipe implements PipeTransform {

    private DECIMAL_SEPARATOR: string;
    private PERCENT: string;

    constructor() {
        // TODO comes from configuration settings
        this.DECIMAL_SEPARATOR = '.';
        this.PERCENT = '%';
    }

    transform(value: number | string, fractionSize: number = 2, percent: boolean = false, negativeAllowed: boolean = false): string {
        let [integer, fraction = ''] = (value || '').toString().split(this.DECIMAL_SEPARATOR);

        let negativeExists = false;
        if (negativeAllowed) {
            if (integer.indexOf('-') == 0) { negativeExists = true; }
        }

        /*remove continuos stream of zeros*/
        integer = integer.replace(/^0(0+)?/g, '0');

        /*remove all non digits*/
        integer = integer.replace(/\D/g, '');
        fraction = fraction.replace(/\D/g, '');

        if (percent) {
            fraction = fractionSize > 0 ? this.DECIMAL_SEPARATOR + (fraction + PADDING).substring(0, fractionSize) + this.PERCENT : '';
        }else{
            fraction = fractionSize > 0 ? this.DECIMAL_SEPARATOR + (fraction + PADDING).substring(0, fractionSize) : '';
        }


        const final = integer ? integer + fraction : integer;
        const output: any = negativeExists ? '-' + final : final;
        return output;
    }

    parse(value: string, fractionSize: number = 2, percent: boolean = false): string {
        let [integer, fraction = ''] = (value || '').toString().split(this.DECIMAL_SEPARATOR);

        if (percent) {
            integer = integer.replace(new RegExp(this.PERCENT, 'g'), '');
        }
        fraction = parseInt(fraction, 10) > 0 && fractionSize > 0
            ? this.DECIMAL_SEPARATOR + (fraction + PADDING).substring(0, fractionSize)
            : '';

        return integer ? integer + fraction : integer;
    }
}
