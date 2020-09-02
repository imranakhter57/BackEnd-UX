import { Injectable } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';


@Injectable()
export class CustomValidators {

    /* This is special case for select boxes */
    static selectValidator(control: FormControl) {
        const selector = control.value;
        if (!selector || selector < 0) {
            return {
                required: true
            };
        }
        return null;
    }

    /*about company /company name/ validation*/
    static amountValidator(max, min) {
        return (control: FormControl) => {
            let value = control.value;
            if (!value) {
                return {
                    required: true
                };
            } else {
                value = parseInt(value.toString().replace(new RegExp(',', 'g'), ''));
            }

            if (value > max) {
                return {
                    max: true
                };
            }

            if (value < min) {
                return {
                    min: true
                };
            }
            return null;
        };
    }

    static pfValidator(max) {
        return (control: FormControl) => {
            let value = control.value;
            if (!value) {
                return {
                    amount: {
                        required: true
                    }
                };
            } else {
                value = parseFloat(value.toString().replace(new RegExp(',', 'g'), ''));
            }

            if (value > max) {
                return {
                    amount: {
                        max: true
                    }
                };
            }
            return null;
        };
    }

    static requireValidator(control: FormControl) {
        const name = control.value;
        if (!name) {
            return {
                name: {
                    required: true
                }
            };
        }
        return null;
    }

    static compNameValidator(control: FormControl) {
        const compName = control.value;
        if (!compName) {
            return {
                compName: {
                    required: true
                }
            };
        } else if (compName.length > 120) {
            return {
                compName: {
                    maxlength: true
                }
            };
        } else {
            const re = new RegExp(/^[A-Za-z0-9\.\,\&\(\)\-\s]+$/);
            if (!re.test(compName)) {
                return {
                    compName: {
                        pattern: true
                    }
                };
            }
        }
        return null;
    }

    static fullNameValidator(control: FormControl) {
        const fullName = control.value;
        if (!fullName) {
            return {
                fullName: {
                    required: true
                }
            };
        } else if (fullName.length > 30) {
            return {
                fullName: {
                    maxlength: true
                }
            };
        } else {
            let re = new RegExp(/^[A-Za-z\s]+$/);
            if (!re.test(fullName)) {
                return {
                    fullName: {
                        pattern: true
                    }
                };
            }
        }
        return null;
    }

    static panValidator(control: FormControl) {
        const pan = control.value;
        if (!pan) {
            return {
                pan: {
                    required: true
                }
            };
        } else {
            let re = new RegExp(/^[A-Z]{3}[CHFATBLJGP][A-Z][0-9]{4}[A-Z]$/);
            if (!re.test(pan)) {
                return {
                    pan: {
                        pattern: true
                    }
                };
            }
        }
        return null;
    }

    static companyPanValidator(control: FormControl) {
        const pan = control.value;
        if (!pan) {
            return {
                pan: {
                    required: true
                }
            };
        } else {
            let re = new RegExp(/^[A-Z]{3}[CHFATBLJG][A-Z][0-9]{4}[A-Z]$/);
            if (!re.test(pan)) {
                return {
                    pan: {
                        pattern: true
                    }
                };
            }
        }
        return null;
    }

    static personPanValidator(control: FormControl) {
        const pan = control.value;
        if (!pan) {
            return {
                pan: {
                    required: true
                }
            };
        } else {
            let re = new RegExp(/^[A-Z]{3}[P][A-Z][0-9]{4}[A-Z]$/);
            if (!re.test(pan)) {
                return {
                    pan: {
                        pattern: true
                    }
                };
            }
        }
        return null;
    }

    static otpValidator(control: FormControl) {
        const otp = control.value;
        if (!otp) {
            return {
                otp: {
                    required: true
                }
            };
        } else {
            let re = new RegExp(/^[0-9]{4,6}$/);
            if (!re.test(otp)) {
                return {
                    otp: {
                        pattern: true
                    }
                };
            }
        }
        return null;
    }

    static aadharValidator(control: FormControl) {
        const aadhar = control.value;
        let re = new RegExp(/^[A-Z0-9]{12}$/);
        if (aadhar && !re.test(aadhar)) {
            return {
                aadhar: {
                    pattern: true
                }
            };
        }
        return null;
    }

    static aadharEnrollNoValidator(control: FormControl) {
        const aadharEnrollNo = control.value;
        if (!aadharEnrollNo) {
            return {
                aadharEnrollNo: {
                    required: true
                }
            };
        } else {
            let re = new RegExp(/^[0-9]{15}$/);
            if (!re.test(aadharEnrollNo)) {
                return {
                    aadharEnrollNo: {
                        pattern: true
                    }
                };
            }
        }
        return null;
    }

    static addressValidator(control: FormControl) {
        const address = control.value;
        if (!address) {
            return {
                address: {
                    required: true
                }
            };
        } else if (address.length > 45) {
            return {
                address: {
                    maxlength: true
                }
            };
        } else {
            var re = new RegExp(/^[ A-Za-z0-9\.\,\;\:\-\_\@\$\&\#\/]/);
            if (!re.test(address)) {
                return {
                    address: {
                        pattern: true
                    }
                };
            }
        }
        return null;
    }

    static cityValidator(control: FormControl) {
        const city = control.value;
        if (!city) {
            return {
                city: {
                    required: true
                }
            };
        } else {
            let re = new RegExp(/^[ A-Za-z\.\,\-\s]{0,50}$/);
            if (!re.test(city)) {
                return {
                    city: {
                        pattern: true
                    }
                };
            }
        }
        return null;
    }

    static postalCodeValidator(control: FormControl) {
        const postal = control.value;
        if (!postal) {
            return {
                postalCode: {
                    required: true
                }
            };
        } else {
            let re = new RegExp(/^[0-9]{6}$/);
            if (!re.test(postal)) {
                return {
                    postalCode: {
                        pattern: true
                    }
                };
            }
        }
        return null;
    }

    static landlineValidator(control: FormControl) {

        const landline = control.value ? control.value : 0;
        let re = new RegExp(/^[0-9]{5,8}$/);
        if (landline && !re.test(landline)) {
            return {
                landline: {
                    pattern: true
                }
            };
        }
        return null;
    }

    static stdCodeValidator(control: FormControl, isRequired = false) {

        const stdCode = control.value ? control.value : 0;
        let re = new RegExp(/^[0-9]{3,5}$/);
        if (stdCode && !re.test(stdCode)) {
            return {
                stdCode: {
                    pattern: true
                }
            };
        }
        return null;
    }

    static phoneRegExpValidator(control: FormControl) {
        if (control.value) {
            const phone = control.value;
            let re = new RegExp(/^((91))?[0-9]{10}$/);
            if (!re.test(phone)) {
                return {
                    phone: {
                        pattern: true
                    }
                };
            }
        }
        return null;
    }

    static mobileValidator(control: FormControl) {
        const mobile = control.value ? control.value : 0;
        if (!mobile) {
            return {
                mobile: {
                    required: true
                }
            };
        } else {
            let re = new RegExp(/^((91))?[0-9]{10}$/);
            if (!re.test(mobile)) {
                return {
                    mobile: {
                        pattern: true
                    }
                };
            }
        }
        return null;
    }

    static extentionValidator(control: FormControl) {
        const extention = control.value;
        if (!extention) {
            return null;
        }
        if (extention.length > 4) {
            return {
                extention: {
                    maxlength: true
                }
            };
        } else {
            let re = new RegExp(/^[0-9]*$/);
            if (!re.test(extention)) {
                return {
                    extention: {
                        pattern: true
                    }
                };
            }
        }
        return null;
    }

    static emailValidator(control: FormControl) {
        const email = control.value;
        if (!email) {
            return {
                email: {
                    required: true
                }
            };
        } else if (email.length > 50) {
            return {
                email: {
                    maxlength: true
                }
            };
        } else {
            const re = new RegExp(/^[a-zA-Z0-9]([a-zA-Z0-9_-]|(\.(?!\.)))+[a-zA-Z0-9]\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,})+$/);
            if (!re.test(email)) {
                return {
                    email: {
                        pattern: true
                    }
                };
            }
        }
        return null;
    }

    static yearsValidator(control: FormControl) {
        const years = control.value;
        if (!years && years !== '0') {
            return {
                years: {
                    required: true
                }
            };
        } else {
            let re = new RegExp(/^(?:[0-9]|[1-4][0-9]|50)$/);
            if (!re.test(years)) {
                return {
                    years: {
                        pattern: true
                    }
                };
            }
        }
        return null;
    }

    static monthsValidator(control: FormControl) {
        const months = control.value;
        if (!months && months !== '0') {
            return {
                months: {
                    required: true
                }
            };
        } else {
            let re = new RegExp(/^([0-9]|10|11)$/);
            if (!re.test(months)) {
                return {
                    months: {
                        pattern: true
                    }
                };
            }
        }
        return null;
    }

    static workUserIdValidator(control: FormControl) {
        const workUserId = control.value;
        if (!workUserId) {
            return {
                workUserId: {
                    required: true
                }
            };
        } else if (workUserId.length > 20) {
            return {
                workUserId: {
                    maxlength: true
                }
            };
        } else {
            let re = new RegExp(/^[ A-Za-z0-9\.\,\-\/]*$/);
            if (!re.test(workUserId)) {
                return {
                    workUserId: {
                        pattern: true
                    }
                };
            }
        }
        return null;
    }

    static loanAmt(control: FormControl) {
        const amt = control.value;
        if (!amt) {
            return {
                loanAmt: {
                    required: true
                }
            };
        } else {
            if (amt > 30000000) {
                return {
                    loanAmt: {
                        pattern: true
                    }
                };
            } else if(amt < 200000){
                return {
                    minLoanAmt: {
                        minPattern: true
                    }
                };
            }
        }
        return null;
    }

    /*validation for card member app fullName, lastName*/
    static cmNameValidator(control: FormControl) {
        const name = control.value;
        if (!name) {
            return {
                name: {
                    required: true
                }
            };
        } else if (name.length > 60) {
            return {
                name: {
                    maxlength: true
                }
            };
        } else {
            let re = new RegExp(/^[ A-Za-z/'-./`]+$/);
            if (!re.test(name)) {
                return {
                    name: {
                        pattern: true
                    }
                };
            }
        }
        return null;
    }

    static verificationWordValidator(control: FormControl) {
        const verificationWord = control.value;
        if (!verificationWord) {
            return {
                verificationWord: {
                    required: true
                }
            };
        } else {
            let re = new RegExp(/^[a-z0-9]{4,20} *$/);
            if (!re.test(verificationWord)) {
                return {
                    verificationWord: {
                        pattern: true
                    }
                };
            }
        }
        return null;
    }

    static employeeIdValidator(control: FormControl) {
        const employeeId = control.value;
        if (!employeeId) {
            return {
                employeeId: {
                    required: true
                }
            };
        } else if (employeeId.length > 12) {
            return {
                employeeId: {
                    maxlength: true
                }
            };
        } else {
            let re = new RegExp(/^[ A-Za-z0-9]*$/);
            if (!re.test(employeeId)) {
                return {
                    employeeId: {
                        pattern: true
                    }
                };
            }
        }
        return null;
    }

    static cardNumberValidator(control: FormControl) {
        const cardNumber = control.value;
        if (!cardNumber) {
            return {
                cardNumber: {
                    required: true
                }
            };
        } else if (cardNumber.length > 15) {
            return {
                cardNumber: {
                    maxlength: true
                }
            };
        } else {
            let re = new RegExp(/^(37)[0-9]*$/);
            if (!re.test(cardNumber)) {
                return {
                    cardNumber: {
                        pattern: true
                    }
                };
            }
        }
        return null;
    }

    static verificationPinValidator(control: FormControl) {
        const verificationPin = control.value;
        if (!verificationPin) {
            return {
                verificationPin: {
                    required: true
                }
            };
        } else if (verificationPin.length > 4) {
            return {
                verificationPin: {
                    maxlength: true
                }
            };
        } else {

            let re = new RegExp(/^[0-9]*$/);
            if (!re.test(verificationPin)) {
                return {
                    verificationPin: {
                        pattern: true
                    }
                };
            }
        }
        return null;
    }

    static cancelMessageValidator(control: FormControl) {
        const cancelMessage = control.value;
        if (!cancelMessage) {
            return {
                cancelMessage: {
                    required: true
                }
            };
        } else if (cancelMessage.length < 10) {
            return {
                cancelMessage: {
                    minlength: true
                }
            };
        } else {
            let re = new RegExp(/^[ A-Za-z0-9.,-/]*$/);
            if (!re.test(cancelMessage)) {
                return {
                    cancelMessage: {
                        pattern: true
                    }
                };
            }
        }
        return null;
    }

    static educationValidator(control: FormControl) {
        const education = control.value;
        if (!education) {
            return {
                education: {
                    required: true
                }
            };
        } else if (education.length > 30) {
            return {
                education: {
                    maxlength: true
                }
            };
        } else {
            let re = new RegExp(/^[ A-Za-z0-9]*$/);
            if (!re.test(education)) {
                return {
                    education: {
                        pattern: true
                    }
                };
            }
        }
        return null;
    }

    static designationValidator(control: FormControl) {
        const designation = control.value;
        if (!designation) {
            return {
                designation: {
                    required: true
                }
            };
        } else if (designation.length > 20) {
            return {
                designation: {
                    maxlength: true
                }
            };
        } else {
            let re = new RegExp(/^[ A-Za-z0-9]*$/);
            if (!re.test(designation)) {
                return {
                    education: {
                        pattern: true
                    }
                };
            }
        }
        return null;
    }

    static loanAmountValidator(control: FormControl) {
        const loanamount = control.value;
        if (!loanamount) {
            return {
                loanamount: {
                    required: true
                }
            };
        } else {
            let re = new RegExp(/^[0-9]*$/);
            if (!re.test(loanamount)) {
                return {
                    loanamount: {
                        pattern: true
                    }
                };
            }
        }
        return null;
    }

    static gstValidator(control: FormControl) {
        const gst = control.value;
        if (!gst) {
            return {
                gst: {
                    required: true
                }
            };
        } else {
            let re = new RegExp(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/);
            if (!re.test(gst)) {
                return {
                    gst: {
                        pattern: true
                    }
                };
            }
        }
        return null;
    }

    static optionalGstValidator(control: FormControl) {
        const gst = control.value;
        let re = new RegExp(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/);
        if (gst && !re.test(gst)) {
            return {
                gst: {
                    pattern: true
                }
            };
        }
        return null;
    }

    static accountNoValidator(control: FormControl) {

        const accountNo = control.value ? control.value : 0;
        if (!accountNo) {
            return {
                accountNo: {
                    required: true
                }
            };
        } else {
            let re = new RegExp(/^[0-9]{11}$/);
            if (!re.test(accountNo)) {
                return {
                    accountNo: {
                        pattern: true
                    }
                };
            }
        }

        return null;
    }

    static cinValidator(control: FormControl) {
        const selector = control.value;
        let re = new RegExp(/^[A-Z]{1}[0-9]{5}[A-Z]{2}[0-9]{4}[A-Z]{3}[0-9]{6}$/);
        if (!selector) {
            return {
                cin: {
                    required: true
                }
            };
        } else if (!re.test(selector)) {
            return {
                cin: {
                    pattern: true
                }
            };
        }
        return null;
    }

    static cinOptionalValidator(control: FormControl) {
        const selector = control.value;
        let re = new RegExp(/^[A-Z]{1}[0-9]{5}[A-Z]{2}[0-9]{4}[A-Z]{3}[0-9]{6}$/);
        if (selector) {
            if (!re.test(selector)) {
                return {
                    cin: {
                        pattern: true
                    }
                };
            }
        }
        return null;
    }

    /* BRE Validators Starts */
    static textRequired(control: FormControl) {
        const text = control.value;
        if (!text && text != ' ') {
            return {
                required: true
            };
        }
        return null;
    }

    static fieldRequired(control: FormControl) {
        const field = control.value;

        if (field && !field.length) {
            return {
                required: true
            };
        }
        return null;
    }

    static displayNameValidator(maxlength) {
        return (control: FormControl) => {
            const displayName = control.value;
            const re = new RegExp(/[0-9a-zA-Z]*/g);

            if (!displayName) {
                return {
                    required: true
                };
            } else {
                if (displayName.length > maxlength) {
                    return {
                        maxlength: true
                    };
                } else {
                    if (!re.test(displayName)) {
                        return {
                            pattern: true
                        };
                    }
                }
            }
        }
    }

    static descriptionValidator(control: FormControl) {
        const description = control.value;
        if (description) {
            if (description.length > 120) {
                return {
                    maxlength: true
                };
            }
        }
        return null;
    }
    /* BRE Validators Ends */
}

/**
 * Custom ErrorStateMatcher which returns true (error exists) when the parent form group is invalid and the control has been touched
 */
export class ConfirmValidParentMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return (control.parent.invalid && (control.touched || isSubmitted));
    }
}
export class FormSubmittedMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return (control.invalid && (control.touched || isSubmitted));
    }
}
