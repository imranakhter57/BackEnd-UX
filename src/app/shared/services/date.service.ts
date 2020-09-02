import * as moment from 'moment';

export class DateService {

    static transformDate(date: any) {
        if (date && typeof date == 'object') {
            if (date.formatted) {
                return date.formatted;
            } else if (date.date) {
                return date.date.day + '/' + date.date.month + '/' + date.date.year;
            } else {
                return '';
            }
        } else if (date && typeof date == 'string') {
            return date;
        }
    }
    static transformDateUtc(date) {
        if (date && date.date) {
            date.date.month = date.date.month - 1;
            return moment.utc([date.date.year, date.date.month, date.date.day]).valueOf();
        } else if (date && date.year && date.month && date.day) {
            date.month = date.month;
            return (moment.utc([date.year, date.month, date.day]).valueOf());
        } else {
            return (moment.utc(date).valueOf());
        }
    }
    
    static getSinceUntilDate(years, months, days) {
        let d;
        if (years > 0) {
            d = moment().add(years, 'years');
        } else {
            d = moment().subtract((0 - years), 'years');
        }

        if (months > 0) {
            d = d.add(months, 'months');
        } else {
            d = d.subtract((0 - months), 'months');
        }

        if (days > 0) {
            d = d.add(days, 'days');
        } else {
            d = d.subtract((0 - days), 'days');
        }
        return {
            year: Number(d.format('YYYY')),
            month: Number(d.format('M')),
            day: Number(d.format('D'))
        };
    }
    static getDefaultMonth(pastYear) {
        let currentDay = new Date();
        let month: any = currentDay.getMonth() + 1;

        if (month <= 9) month = '0' + month;

        return month + '/' + (pastYear ? (currentDay.getFullYear() - pastYear) : currentDay.getFullYear());
    }
}
