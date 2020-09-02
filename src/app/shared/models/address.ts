import * as moment from 'moment';

export class Address {
    address1: string;
    address2: string;
    postalCode: string;
    state: string;
    city: string;
    stdCode: string;
    landlineNo: string;
    mobileNo: string;
    ownership: string;
    ownedBy: string;
    stability: string;
    isAddrProofAvailable: string;
    ownersAnnualIncome: string;

    constructor(jsonObj) {
        if (jsonObj) {
            this.address1 = jsonObj.address1 ? jsonObj.address1 : null;
            this.address2 = jsonObj.address2 ? jsonObj.address2 : null;
            this.postalCode = jsonObj.postalCode ? jsonObj.postalCode : null;
            this.state = jsonObj.state ? jsonObj.state : null;
            this.city = jsonObj.city ? jsonObj.city : null;
            this.stdCode = jsonObj.stdCode ? jsonObj.stdCode : null;
            this.landlineNo = jsonObj.landlineNo ? jsonObj.landlineNo : null;
            this.mobileNo = jsonObj.mobileNo ? jsonObj.mobileNo : null;
            this.ownership = jsonObj.ownership ? jsonObj.ownership : null;
            this.ownedBy = jsonObj.ownedBy ? jsonObj.ownedBy : null;
            this.stability = jsonObj.stability ? jsonObj.stability : null;
            this.isAddrProofAvailable = jsonObj.isAddrProofAvailable ? jsonObj.isAddrProofAvailable : null;
            this.ownersAnnualIncome = jsonObj.ownersAnnualIncome ? jsonObj.ownersAnnualIncome : null;
        } else {
            this.address1 = '';
            this.address2 = '';
            this.postalCode = '';
            this.state = '';
            this.city = '';
            this.stdCode = '';
            this.landlineNo = '';
            this.mobileNo = '';
            this.ownership = '';
            this.ownedBy = '';
            this.stability = '';
            this.isAddrProofAvailable = '';
            this.ownersAnnualIncome = '';
        }
    }
}


export class DateFormater {

    date: any = {
        'year': '',
        'month': '',
        'day': ''
    };
    constructor(dateString) {
        this.format(dateString);
    }
    format(date) {
        if (date && typeof date == 'string') {
            // staring of type  DD-MM-YYYY or DD/MM/YYYY
            let dateObj: any;
            let momentDateObj = moment(date, "DD-MM-YYYY");
            
            if(momentDateObj.isValid()){
                dateObj = momentDateObj.toDate()
            }else {
                let momentDateObj = moment(date, "DD/MM/YYYY");
            
            if(momentDateObj.isValid()){
                    dateObj = momentDateObj.toDate()
                }
            }
          
            if (dateObj == 'Invalid Date') {
                //So date was with time like DD/MM/YYYY HH:MM:SS
                const sanitized: any = date.split(' ');
                if (sanitized[0] && sanitized[1]) {
                    date = sanitized[0];
                } 
                const dateArray: any = date.split('/');
                if (dateArray[2] && dateArray[1] && dateArray[0]) {
                    dateObj = new Date(dateArray[2], dateArray[1] - 1, dateArray[0]);
                } else {
                    const dateArray: any = date.split('-');
                    if (dateArray[2] && dateArray[1] && dateArray[0]) {
                        dateObj = new Date(dateArray[2], dateArray[1] - 1, dateArray[0]);
                    }
                }
            } 
            if (dateObj && dateObj instanceof Date) {
                this.date.year = dateObj.getFullYear();
                this.date.month = dateObj.getMonth() + 1;
                this.date.day = dateObj.getDate();
            
            return true;
            } else {
         
            return false;
            }
        } else if (date && typeof date == 'object' && date.year && date.month && date.day) {
            //NGX Date Object
            this.date.year = date.year;
            this.date.month = date.month;
            this.date.day = date.day;
            return true;

        }else if (date && date instanceof Date) { 
            //JS date
            this.date.year = date.getFullYear();
            this.date.month = date.getMonth() + 1;
            this.date.day = date.getDate();
            return true;
        }
        return false;
    }
    display() {
        if (this.date.day && this.date.month && this.date.year) {
            return this.date.day + '/' + this.date.month + '/' + this.date.year;
        }

        return '';
    }
    getJsDate() {
        if (this.date.day && this.date.month && this.date.year) {
            return new Date(this.date.year, this.date.month - 1, this.date.day);
        }
        return '';
    }

}

export class DMYDateFormater {
    date: any = {
        'year': '',
        'month': '',
        'day': ''
    };
    constructor(dateString) {
        if (dateString && typeof dateString == 'string') {
            this.format(dateString);
        } else if (dateString && typeof dateString == 'object') {
            if (dateString.date) {
                this.date.year = dateString.date.year ? dateString.date.year : '';
                this.date.month = dateString.date.month ? dateString.date.month : '';
                this.date.day = dateString.date.day ? dateString.date.day : '';
            }
        }
    }
    format(date) {
        if (date && typeof date == 'string') {
            const dateArray: any = date.split('/');
            let dateObj: any;
            if (dateArray[2] && dateArray[1] && dateArray[0]) {
                dateObj = new Date(dateArray[2], dateArray[1] - 1, dateArray[0]);
            } else {
                const dateArray: any = date.split('-');
                if (dateArray[2] && dateArray[1] && dateArray[0]) {
                    dateObj = new Date(dateArray[2], dateArray[1] - 1, dateArray[0]);
                }
            }

            if (dateObj) {
                this.date.year = dateObj.getFullYear();
                this.date.month = dateObj.getMonth() + 1;
                this.date.day = dateObj.getDate();
                return true;
            } else {
                return false;
            }
        }
        return false;
    }
    display() {
        if (this.date.day && this.date.month && this.date.year) {
            return this.date.day + '/' + this.date.month + '/' + this.date.year;
        }

        return '';
    }
    getJsDate() {
        if (this.date.day && this.date.month && this.date.year) {
            return new Date(this.date.year, this.date.month - 1, this.date.day);
        }
        return new Date();
    }
}

export class Period {
    beginDate: DMYDateFormater;
    endDate: DMYDateFormater;

    constructor(dateString) {
        if (dateString && typeof dateString == 'string') {
            const dateArray: any = dateString.split('-');
            if (dateArray[1] && dateArray[0]) {
                this.beginDate = new DMYDateFormater(dateArray[0]);
                this.endDate = new DMYDateFormater(dateArray[1]);
            }
        }
    }
    display() {
        let beginDateStr = '';
        let endDateStr = '';
        if (this.beginDate) {
            beginDateStr = this.beginDate.date.day + '/' + this.beginDate.date.month + '/' + this.beginDate.date.year;
        }
        if (this.endDate) {
            endDateStr += this.endDate.date.day + '/' + this.endDate.date.month + '/' + this.endDate.date.year;
        }

        return beginDateStr + ' - ' + endDateStr;
    }
    getMonthDiff() {
        if (this.endDate && this.beginDate) {
            const jsbeginDate = this.beginDate.getJsDate();
            const jsendDate = this.endDate.getJsDate();
            let months = (jsendDate.getFullYear() - jsbeginDate.getFullYear()) * 12;
            months -= jsbeginDate.getMonth() + 1;
            months += jsendDate.getMonth();
            months = months <= 0 ? 0 : months;
            return months ? (months <= 6 ? 249 : 250) : 0;
        }
        return 0;
    }
}
