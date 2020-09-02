import { Address, DateFormater, DMYDateFormater } from './address';
import * as moment from 'moment';
import { Timestamp } from 'rxjs/internal/operators/timestamp';

function convertFloatString(value) {

    const input = value ? value : 0;
    const parsed = parseFloat(input).toFixed(2);
    return parsed;
}
function convertIntString(value) {

    const input = value ? value : 0;
    const parsed = parseFloat(input).toFixed(0);
    return parsed;
}

export class AppOverview {
    customer: string;
    appId: string;
    dlpId: string;
    programType: string;
    product: string;
    appCode: string;
    custId: string;
    appSubmitedDate: string;
    applLoanAmt: string;
    apprLoanAmt: string;
    roi: string;
    tenor: string;
    processingFeesAmount: string;
    leadSource: string;
    emi: string;
    appworkflowlst: AppOverviewFlowList[];
    status: string;
    subStatus: string;
    assignToStatus: string;
    sendToFlag: string;
    reInitiateStatus: string;
    assignToMe: string;
    natureOfBusiness: string;
    pan: string;
    location: string;
    drawingPower: string;
    isInternetBanking: any;
    applicationFormDownload: boolean;
    isLoanCancel: any;

    constructor(jsonObj) {
        if (jsonObj) {
            this.customer = jsonObj.customer;
            this.appId = jsonObj.appId;
            this.natureOfBusiness = jsonObj.natureOfBusiness;
            this.pan = jsonObj.pan;
            this.location = jsonObj.location;
            this.dlpId = jsonObj.dlpId;
            this.programType = (jsonObj.programType != null || jsonObj.programType != '') ? jsonObj.programType : 0;
            this.product = jsonObj.product;
            this.appCode = jsonObj.appCode;
            this.custId = jsonObj.custId;
            this.appSubmitedDate = jsonObj.appSubmitedDate;
            this.applLoanAmt = jsonObj.applLoanAmt;
            this.apprLoanAmt = jsonObj.apprLoanAmt ? jsonObj.apprLoanAmt : '0';
            this.roi = jsonObj.roi;
            this.tenor = jsonObj.tenor ? jsonObj.tenor : '0';
            this.assignToMe = jsonObj.assignToMe ? jsonObj.assignToMe : 0;
            this.processingFeesAmount = jsonObj.processingFeesAmount ? jsonObj.processingFeesAmount : '0';
            this.leadSource = jsonObj.leadSource;
            this.emi = jsonObj.emi ? jsonObj.emi : '0';
            this.status = jsonObj.status;
            this.subStatus = jsonObj.subStatus;
            this.assignToStatus = jsonObj.assignToStatus;
            this.sendToFlag = jsonObj.sendToFlag;
            this.reInitiateStatus = jsonObj.reInitiateStatus;
            this.drawingPower = jsonObj.drawingPower ? jsonObj.drawingPower : '0';
            this.isInternetBanking = jsonObj.isInternetBanking == 1 ? 'YES' : (jsonObj.isInternetBanking == 0 ? 'NO' : '');
            this.applicationFormDownload = jsonObj.applicationFormDownload;
            this.isLoanCancel = jsonObj.isLoanCancel ? jsonObj.isLoanCancel : 0;

            this.appworkflowlst = new Array();
            if (jsonObj.appworkflowlst && jsonObj.appworkflowlst.length) {
                jsonObj.appworkflowlst.forEach(item => {
                    this.appworkflowlst.push(new AppOverviewFlowList(item));
                }, this);
            }
        } else {
            this.appworkflowlst = new Array();
        }
    }
}
export class BooksList {
    totalBooks: number;
    totalAvailableBooks: number;
    totalNumberRecords: number;
    totalNumberPages: number;
    books: BookRow[];
    constructor(jsonObj) {
        if (jsonObj) {
            this.totalNumberRecords = jsonObj.totalNumberRecords;
            this.totalNumberPages = jsonObj.totalNumberPages;
            this.totalBooks = jsonObj.totalBooks == 0 ? 0 : jsonObj.totalBooks;
            this.totalAvailableBooks = jsonObj.totalAvailableBooks == 0 ? 0 : jsonObj.totalBooks;
            this.books = new Array();
            if (jsonObj.record && jsonObj.record.length) {
                jsonObj.record.forEach(item => {
                    this.books.push(new BookRow(item));
                }, this);
            }
        } else {
            this.books = new Array();
        }

    }
}
export class FundTransfer {
    accountNumber: number;
    amount: number;
    assessmentType: string;
    flagForOTC: any;
    fundTransDt: string;
    fundTransId: string;
    fundTransferFlag: any;
    isDisbursed: string;
    isFundTransfer: string;
    paymentMode: string;

    closeLoanFlag: any;
    loanProposalType: any;

    constructor(jsonObj) {
        if (jsonObj) {
            this.accountNumber = jsonObj.accountNumber != null ? jsonObj.accountNumber : 0;
            this.amount = jsonObj.amount != null ? jsonObj.amount : 0;
            this.assessmentType = jsonObj.assessmentType;
            this.flagForOTC = jsonObj.flagForOTC;
            this.fundTransDt = jsonObj.fundTransDt;
            this.fundTransId = jsonObj.fundTransId;
            this.fundTransferFlag = jsonObj.fundTransferFlag;
            this.isDisbursed = jsonObj.isDisbursed;
            this.isFundTransfer = jsonObj.isFundTransfer;
            this.paymentMode = jsonObj.paymentMode != null ? jsonObj.paymentMode : '';
            this.closeLoanFlag = jsonObj.closeLoanFlag;
            this.loanProposalType = jsonObj.loanProposalType;
        }
    }
}
export class BorrowerDetails {
    physicalApplNumber: string;
    gstNo: string;
    customerType: string;
    panOfPromoter: string;
    promoterName: string;
    requiredLoanAmt: string;
    noOfProperty: string;
    turnOurOfLatestFy: string;
    cashProfitOfLatestFy: string;
    dsaDeclarationFlag: string;
    dateOfIncorporation: any;
    promoterNameVerified: number;
    relationshipManagerUserId: string;
    constructor(jsonObj) {
        if (jsonObj) {
            this.physicalApplNumber = jsonObj.physicalApplNumber;
            this.gstNo = jsonObj.gstNo;
            this.customerType = jsonObj.customerType;
            this.panOfPromoter = jsonObj.panOfPromoter;
            this.promoterName = jsonObj.promoterName;
            this.requiredLoanAmt = jsonObj.requiredLoanAmt;
            this.noOfProperty = jsonObj.noOfProperty;
            this.turnOurOfLatestFy = jsonObj.turnOurOfLatestFy;
            this.cashProfitOfLatestFy = jsonObj.cashProfitOfLatestFy;
            this.dsaDeclarationFlag = jsonObj.dsaDeclarationFlag;
            this.dateOfIncorporation = jsonObj.dateOfIncorporation ? new DMYDateFormater(jsonObj.dateOfIncorporation) : null;
            this.promoterNameVerified = jsonObj.promoterNameVerified ? jsonObj.promoterNameVerified : 0;
            this.relationshipManagerUserId = jsonObj.relationshipManagerUserId;
        }
    }
}
export class BookRow {
    bookId:string;
    bookName:string;
    authorName:string;
    quantityAvailable:number;
    quantityBorrowed : number;
    borrowedOn: string;
    dueDate: string;

    constructor(jsonObj) {
        if (jsonObj) {
            this.bookId = jsonObj.bookId;
            this.bookName = jsonObj.bookName;
            this.authorName = jsonObj.authorName;
            this.quantityAvailable = jsonObj.quantityAvailable;
            this.quantityBorrowed = jsonObj.quantityBorrowed;
            this.borrowedOn = jsonObj.borrowedOn ? jsonObj.borrowedOn :'';
            this.dueDate = jsonObj.dueDate ? jsonObj.dueDate : '';
        }
    }
}

export class AppOverviewFlowList {
    arrivalDate: string;
    previousStage: string;
    currStage: string;
    pendingWith: string;
    currUser: string;
    comments: string;
    wfChangeDate: string;

    constructor(jsonObj) {
        if (jsonObj) {
            this.arrivalDate = jsonObj.arrivalDate;
            this.previousStage = jsonObj.previousStage;
            this.currStage = jsonObj.currStage;
            this.pendingWith = jsonObj.pendingWith;
            this.currUser = jsonObj.currUser;
            this.comments = jsonObj.comments;
            this.wfChangeDate = jsonObj.wfChangeDate;
        }
    }
}
export class MatchedDetailsList {
    action: string;
    houseHoldId: string;
    matchedCif: string;
    matchedScore: string;
    matchedSystem: string;
    name: string;
    address: string;
    remarks: string;
    cifToConsider: boolean;
    constructor(jsonObj) {
        if (jsonObj) {
            this.action = jsonObj.action;
            this.houseHoldId = jsonObj.houseHoldId;
            this.matchedCif = jsonObj.matchedCif;
            this.matchedScore = jsonObj.matchedScore;
            this.matchedSystem = jsonObj.matchedSystem;
            this.remarks = jsonObj.remarks;
            this.cifToConsider = Number(jsonObj.cifToConsider) ? true : false;
            this.name = jsonObj.name;
            this.address = jsonObj.address;
        }
    }
}

export class DedupeList {
    cpId: string;
    borrowerName: string;
    triggeredDate: string;
    massage: string;
    matchedDetailsList: MatchedDetailsList[];

    constructor(jsonObj) {
        if (jsonObj) {
            this.cpId = jsonObj.cpId;
            this.borrowerName = jsonObj.borrowerName;
            this.triggeredDate = jsonObj.triggeredDate;
            this.massage = jsonObj.massage;

            this.matchedDetailsList = new Array();
            if (jsonObj && jsonObj.matchedDetailsList && jsonObj.matchedDetailsList.length) {
                jsonObj.matchedDetailsList.forEach(item => {
                    this.matchedDetailsList.push(new MatchedDetailsList(item));
                }, this);
            }
        } else {
            this.matchedDetailsList = new Array();
        }
    }
}

export class HouseHolding {
    dedupeList: DedupeList[];
    constructor(jsonObj) {
        if (jsonObj) {
            this.dedupeList = new Array();
            if (jsonObj && jsonObj.dedupeList && jsonObj.dedupeList.length) {
                jsonObj.dedupeList.forEach(item => {
                    this.dedupeList.push(new DedupeList(item));
                }, this);
            }
        } else {
            this.dedupeList = new Array();
        }
    }
}

export class ListScreening {

    list: ListScreeningRow[];

    constructor(screeningTypes, jsonObj) {
        if (jsonObj) {
            this.list = new Array();
            if (jsonObj && jsonObj.length) {
                jsonObj.forEach(item => {
                    this.list.push(new ListScreeningRow(screeningTypes, item));
                }, this);
            }
        } else {
            this.list = new Array();
        }

    }
}
export class ListScreeningRow {
    cpId: string;
    entityName: string;
    saveStatus: string;
    type: string;
    matchList: MatchRow[];

    constructor(screeningTypes, jsonObj) {
        if (jsonObj) {
            this.entityName = jsonObj.entityName;
            this.type = jsonObj.type;
            this.saveStatus = jsonObj.saveStatus;
            this.cpId = jsonObj.cpId;

            this.matchList = new Array();
            screeningTypes.forEach(type => {

                if (jsonObj.matchList && jsonObj.matchList.length) {
                    const index = jsonObj.matchList.findIndex(x => x.listName === type.value);
                    if (index > -1) {
                        const data = jsonObj.matchList[index];
                        this.matchList.push(new MatchRow(data));
                    } else {
                        this.matchList.push(new MatchRow({ listName: type.value }));
                    }
                } else {
                    this.matchList.push(new MatchRow({ listName: type.value }));
                }
            }, this);
        }
    }
}

export class MatchRow {
    lastTriggeredOn: string;
    status: string;
    isChecked: boolean;
    listName: string;
    matchedData: any;
    matchedDataLength: any;
    matchedDataShowError: any;
    results: string;
    remark: string;
    type: string;

    constructor(jsonObj) {
        if (jsonObj) {
            this.isChecked = false;
            this.listName = jsonObj.listName;

            this.lastTriggeredOn = jsonObj.lastTriggeredOn;
            this.status = jsonObj.status;
            if (this.listName === 'Adverse News CHECK' || this.listName === 'CRILC/SMA CHECK' || this.listName === 'CFR CHECK') {
                this.type = 'EXTERNAL';
            } else {
                this.type = 'INTERNAL';
            }

            this.matchedDataShowError = true;
            this.matchedDataLength = 0;
            if (jsonObj && jsonObj.matchedData) {
                if (jsonObj.matchedData != 'No Results Found') {
                    this.matchedData = jsonObj.matchedData;

                    if (this.matchedData && this.matchedData.length) {
                        this.matchedDataShowError = false;
                        this.matchedDataLength = this.matchedData.length;
                    }
                } else {
                    this.matchedData = jsonObj.matchedData;

                }
            } else {
                this.matchedData = null;
            }
            this.results = jsonObj.results;
            this.remark = jsonObj.remark;
        } else {
            this.isChecked = false;
            this.listName = '';
            this.lastTriggeredOn = '';
            this.status = '';
            this.matchedData = null;
            this.matchedDataShowError = true;
            this.matchedDataLength = 0;
            this.results = '';
            this.remark = '';
        }
    }
}

export class RateOfInterest {
    interestType: string;
    baseType: string;
    spread: string;
    taxesApplicable: string;
    roi: string;
    baseRate: string;
    constructor(jsonObj) {
        if (jsonObj) {
            this.interestType = jsonObj.interestType ? jsonObj.interestType : '';
            this.baseType = jsonObj.baseType;
            this.spread = jsonObj.spread;
            this.taxesApplicable = jsonObj.taxesApplicable;
            this.roi = jsonObj.roi == null ? '' : convertFloatString(jsonObj.roi);
            this.baseRate = jsonObj.baseRate;
        } else {
            this.interestType = '';
            this.baseType = '';
            this.spread = '';
            this.taxesApplicable = '';
            this.roi = '';
            this.baseRate = '';
        }
    }

}

export class ProcessingFee {
    pf: string;
    pfAmount: string;
    sgst: string;
    cgst: string;
    constructor(jsonObj) {
        if (jsonObj) {
            this.pf = jsonObj.pf;
            this.pfAmount = jsonObj.pfAmount == null ? '' : convertFloatString(jsonObj.pfAmount);
            this.sgst = jsonObj.sgst == null ? '' : convertFloatString(jsonObj.sgst);
            this.cgst = jsonObj.cgst == null ? '' : convertFloatString(jsonObj.cgst);
        } else {
            this.pf = '';
            this.pfAmount = '';
            this.sgst = '';
            this.cgst = '';
        }
    }
}

export class PosMachineCharge {
    swipeVendor: string;
    rentalCost: string;
    rentalPlan: any;
    onetimeCharges: string;
    mdrForDomesticCC: string;
    mdrForIncards: string;
    msfOrmdrForDebitcard: string;
    plusTaxes: string;
    damageOrLoss: string;
    annualFee: string;
    swipeTerminalCode: string;

    constructor(jsonObj) {
        if (jsonObj) {
            this.swipeVendor = jsonObj.swipeVendor;
            this.swipeTerminalCode = jsonObj.swipeTerminalCode;
            this.rentalCost = jsonObj.rentalCost == null ? '' : jsonObj.rentalCost;
            this.rentalPlan = (jsonObj.rentalPlan == null || jsonObj.rentalPlan == 'null') ? '' : Number(jsonObj.rentalPlan);
            this.onetimeCharges = jsonObj.onetimeCharges == null ? '' : jsonObj.onetimeCharges;
            this.mdrForDomesticCC = jsonObj.mdrForDomesticCC;
            this.msfOrmdrForDebitcard = jsonObj.msfOrmdrForDebitcard;
            this.mdrForIncards = jsonObj.mdrForIncards;
            this.plusTaxes = jsonObj.plusTaxes == null ? '' : jsonObj.plusTaxes;
            this.damageOrLoss = jsonObj.damageOrLoss == null ? '' : jsonObj.damageOrLoss;
            this.annualFee = jsonObj.annualFee == null ? '' : jsonObj.annualFee;
        } else {
            this.swipeVendor = '';
            this.swipeTerminalCode = '';
            this.rentalCost = '';
            this.rentalPlan = '';
            this.onetimeCharges = '';
            this.mdrForDomesticCC = '';
            this.mdrForIncards = '';
            this.msfOrmdrForDebitcard = '';
            this.plusTaxes = '';
            this.damageOrLoss = '';
            this.annualFee = '';
        }
    }
}

export class OtherCharges {
    verificationCharges: string;
    verificationChargesGst: string;
    frankingCharges: string;
    insurancePremium: string;
    constructor(jsonObj) {
        if (jsonObj) {
            this.verificationCharges = jsonObj.verificationCharges == null ? '' : convertFloatString(jsonObj.verificationCharges);
            this.verificationChargesGst = jsonObj.verificationChargesGst == null ? '' : convertFloatString(jsonObj.verificationChargesGst);
            this.frankingCharges = jsonObj.frankingCharges == null ? '' : convertFloatString(jsonObj.frankingCharges);
            this.insurancePremium = jsonObj.insurancePremium == null ? '' : convertFloatString(jsonObj.insurancePremium);
        } else {
            this.verificationCharges = '';
            this.verificationChargesGst = '';
            this.frankingCharges = '';
            this.insurancePremium = '';
        }
    }

}
export class ApprovingAuthority {
    approversECN: string;
    approversName: string;
    approversDesignation: string;
    constructor(jsonObj) {
        if (jsonObj) {
            this.approversECN = jsonObj.approversECN;
            this.approversName = jsonObj.approversName;
            this.approversDesignation = jsonObj.approversDesignation;
        } else {
            this.approversECN = '';
            this.approversName = '';
            this.approversDesignation = '';
        }
    }

}

export class PricingDetails {
    rateOfInterest: RateOfInterest;
    processingFee: ProcessingFee;
    machineCharges: PosMachineCharge;
    otherCharges: OtherCharges;
    approvingAuthority: ApprovingAuthority;
    loanAmount: string;
    approvalButton: any;
    constructor(jsonObj) {
        if (jsonObj) {
            this.rateOfInterest = new RateOfInterest(jsonObj.interest);
            this.loanAmount = jsonObj.loanAmount;
            this.approvalButton = jsonObj.approvalButton ? jsonObj.approvalButton : '';
            this.processingFee = new ProcessingFee(jsonObj.fees);
            this.machineCharges = new PosMachineCharge(jsonObj.machineCharges);
            this.otherCharges = new OtherCharges(jsonObj.charges);
            this.approvingAuthority = new ApprovingAuthority(jsonObj.authority);
        } else {
            this.rateOfInterest = new RateOfInterest({});
            this.processingFee = new ProcessingFee({});
            this.machineCharges = new PosMachineCharge({});
            this.otherCharges = new OtherCharges({});
            this.approvingAuthority = new ApprovingAuthority({});
        }
    }
}
export class ProfitAndLoss {
    finacialId: string;
    totalOperatingIncome: string;
    interestOnPartnerCapital: string;
    financialYear: string;
    grossProfit: string;
    otherIndirectExpenses: string;
    totalSales: string;
    salToPartnersDirectorsNonOblig: string;
    profitAfterTax: string;
    officeAdministrativeExpen: string;
    miscellaneousExpense: string;
    financeCost: string;
    pbdt: string;
    interestOnLoan: string;
    costOfSoldGoods: string;
    financialType: string;
    anyOtherNonOperatingIncome: string;
    otherFinancialIncome: string;
    nonOperatingIncome: string;
    otherOperatingIncome: string;
    taxes: string;
    itrIncome: string;
    depreciation: string;
    nonOperatingExpenses: string;
    salToPartnersDirectorsOblig: string;
    ebitda: string;
    constructor(jsonObj) {
        if (jsonObj) {
            this.finacialId = jsonObj.finacialId;
            this.totalOperatingIncome = convertFloatString(jsonObj.totalOperatingIncome);
            this.interestOnPartnerCapital = convertFloatString(jsonObj.interestOnPartnerCapital);
            this.financialYear = jsonObj.financialYear;
            this.grossProfit = convertFloatString(jsonObj.grossProfit);
            this.otherIndirectExpenses = convertFloatString(jsonObj.otherIndirectExpenses);
            this.totalSales = convertFloatString(jsonObj.totalSales);
            this.salToPartnersDirectorsNonOblig = convertFloatString(jsonObj.salToPartnersDirectorsNonOblig);
            this.profitAfterTax = convertFloatString(jsonObj.profitAfterTax);
            this.officeAdministrativeExpen = convertFloatString(jsonObj.officeAdministrativeExpen);
            this.miscellaneousExpense = convertFloatString(jsonObj.miscellaneousExpense);
            this.financeCost = convertFloatString(jsonObj.financeCost);
            this.pbdt = convertFloatString(jsonObj.pbdt);
            this.itrIncome = convertFloatString(jsonObj.itrIncome);
            this.interestOnLoan = convertFloatString(jsonObj.interestOnLoan);
            this.costOfSoldGoods = convertFloatString(jsonObj.costOfSoldGoods);
            this.financialType = jsonObj.financialType ? jsonObj.financialType.toString() : '';
            this.anyOtherNonOperatingIncome = convertFloatString(jsonObj.anyOtherNonOperatingIncome);
            this.otherFinancialIncome = convertFloatString(jsonObj.otherFinancialIncome);
            this.nonOperatingIncome = convertFloatString(jsonObj.nonOperatingIncome);
            this.otherOperatingIncome = convertFloatString(jsonObj.otherOperatingIncome);
            this.taxes = convertFloatString(jsonObj.taxes);
            this.depreciation = convertFloatString(jsonObj.depreciation);
            this.nonOperatingExpenses = convertFloatString(jsonObj.nonOperatingExpenses);
            this.salToPartnersDirectorsOblig = convertFloatString(jsonObj.salToPartnersDirectorsOblig);
            this.ebitda = convertFloatString(jsonObj.ebitda);
        }
    }

}
export class BalanceSheet {
    finacialId: string;
    totalLiability: string;
    bankBorrowing: string;
    bankBorrowingsLongTermLoans: string;
    lessSixDebtors: string;
    netFixedAssets: string;
    financialType: string;
    profitAndLoss: string;
    stock: string;
    freeReservesInclSharePremium: string;
    loansAdvancesDireShareholdersGroup: string;
    otherNonCurrentAssets: string;
    otherLoansAndOtherInvestments: string;
    bankBorrowingsCurrentportionOfTermLoans: string;
    shareAndPartnerCapital: string;
    otherUnsecuredLoansandTermLiabilities: string;
    otherCurrentLiabilities: string;
    profitAndLossAccount: string;
    sundryCreditors: string;
    financialYear: string;
    advancesFromCustomers: string;
    advancesToSuppliers: string;
    totalAsset: string;
    investmentInGroup: string;
    difference: string;
    revaluationAndNtionalReserves: string;
    loansFromPromotersFamilyAndFriends: string;
    liabilities: string;
    assets: string;
    defferedExpenseFicticiou: string;
    greaterSixDebtors: string;
    defferedTax: string;
    unsecuredLoans: string;
    cashAndBankBalances: string;
    shareApplicationMoney: string;
    otherCurrentAssets: string;
    homeLoanPromoters: string;
    presonalLoanPromoters: string;
    anyOtherLoanPromoters: string;
    totalPersonalObligationPromoters: string;
    constructor(jsonObj) {
        if (jsonObj) {
            this.finacialId = jsonObj.finacialId;
            this.totalLiability = convertFloatString(jsonObj.totalLiability);


            this.bankBorrowing = convertFloatString(jsonObj.bankBorrowing);
            this.bankBorrowingsLongTermLoans = convertFloatString(jsonObj.bankBorrowingsLongTermLoans);
            this.lessSixDebtors = convertFloatString(jsonObj.lessSixDebtors);
            this.netFixedAssets = convertFloatString(jsonObj.netFixedAssets);
            this.financialType = jsonObj.financialType ? jsonObj.financialType.toString() : '';
            this.financialYear = jsonObj.financialYear;
            this.profitAndLoss = convertFloatString(jsonObj.profitAndLoss);
            this.stock = convertFloatString(jsonObj.stock);
            this.freeReservesInclSharePremium = convertFloatString(jsonObj.freeReservesInclSharePremium);
            this.loansAdvancesDireShareholdersGroup = convertFloatString(jsonObj.loansAdvancesDireShareholdersGroup);
            this.otherNonCurrentAssets = convertFloatString(jsonObj.otherNonCurrentAssets);
            this.otherLoansAndOtherInvestments = convertFloatString(jsonObj.otherLoansAndOtherInvestments);
            this.bankBorrowingsCurrentportionOfTermLoans = convertFloatString(jsonObj.bankBorrowingsCurrentportionOfTermLoans);
            this.shareAndPartnerCapital = convertFloatString(jsonObj.shareAndPartnerCapital);
            this.otherUnsecuredLoansandTermLiabilities = convertFloatString(jsonObj.otherUnsecuredLoansandTermLiabilities);
            this.otherCurrentLiabilities = convertFloatString(jsonObj.otherCurrentLiabilities);
            this.profitAndLossAccount = convertFloatString(jsonObj.profitAndLossAccount);
            this.sundryCreditors = convertFloatString(jsonObj.sundryCreditors);
            this.advancesFromCustomers = convertFloatString(jsonObj.advancesFromCustomers);
            this.advancesToSuppliers = convertFloatString(jsonObj.advancesToSuppliers);
            this.totalAsset = convertFloatString(jsonObj.totalAsset);
            this.investmentInGroup = convertFloatString(jsonObj.investmentInGroup);
            this.difference = convertFloatString(jsonObj.difference);
            this.revaluationAndNtionalReserves = convertFloatString(jsonObj.revaluationAndNtionalReserves);
            this.loansFromPromotersFamilyAndFriends = convertFloatString(jsonObj.loansFromPromotersFamilyAndFriends);
            this.liabilities = convertFloatString(jsonObj.liabilities);
            this.assets = convertFloatString(jsonObj.assets);
            this.defferedExpenseFicticiou = convertFloatString(jsonObj.defferedExpenseFicticiou);
            this.greaterSixDebtors = convertFloatString(jsonObj.greaterSixDebtors);
            this.defferedTax = convertFloatString(jsonObj.defferedTax);
            this.unsecuredLoans = convertFloatString(jsonObj.unsecuredLoans);
            this.cashAndBankBalances = convertFloatString(jsonObj.cashAndBankBalances);
            this.shareApplicationMoney = convertFloatString(jsonObj.shareApplicationMoney);
            this.otherCurrentAssets = convertFloatString(jsonObj.otherCurrentAssets);
            this.homeLoanPromoters = convertFloatString(jsonObj.homeLoanPromoters);
            this.presonalLoanPromoters = convertFloatString(jsonObj.presonalLoanPromoters);
            this.anyOtherLoanPromoters = convertFloatString(jsonObj.anyOtherLoanPromoters);
            this.totalPersonalObligationPromoters = convertFloatString(jsonObj.totalPersonalObligationPromoters);
        }
    }

}
export class FinancialInput {
    numberOfYear: any;
    cpId: string;
    auditedYear: string;
    assessmentType: string;
    assesmentDoneFor: string;
    balanceSheet: BalanceSheet[];
    profitAndLoss: ProfitAndLoss[];
    documentName: string;
    constructor(jsonObj) {
        if (jsonObj) {
            this.auditedYear = jsonObj.auditedYear ? jsonObj.auditedYear.toString() : '';
            this.cpId = jsonObj.cpId ? jsonObj.cpId.toString() : '';
            this.assessmentType = jsonObj.assessmentType;
            this.assesmentDoneFor = this.cpId;

            this.documentName = jsonObj.documentName ? jsonObj.documentName : '';
            this.profitAndLoss = new Array();
            this.numberOfYear = jsonObj.numberOfYears.toString();
            if (jsonObj.profitAndLoss && jsonObj.profitAndLoss.length) {
                jsonObj.profitAndLoss.forEach(item => {
                    this.profitAndLoss.push(new ProfitAndLoss(item));
                }, this);
            }
            this.balanceSheet = new Array();
            if (jsonObj.balanceSheet && jsonObj.balanceSheet.length) {
                jsonObj.balanceSheet.forEach(item => {
                    this.balanceSheet.push(new BalanceSheet(item));
                }, this);
            }
        } else {
            this.profitAndLoss = new Array();
            this.balanceSheet = new Array();
        }
    }

}
class ProjectionData {
    totalOperatingIncome: string;
    salesGrowthRate: string;
    cashProfitBeforeInterest: string;
    cashProfitMargin: string;
    averageSalesGrowth: string;
    averageCashProfitMargin: string;
    projectSalesGrowthRatio: string;
    constructor(jsonObj, flag) {
        if (jsonObj) {
            if (flag) {
                this.totalOperatingIncome = jsonObj.totalOperatingIncome;
                this.salesGrowthRate = convertFloatString(jsonObj.salesGrowthRate);
                this.cashProfitBeforeInterest = jsonObj.cashProfitBeforeInterest;
                this.cashProfitMargin = convertFloatString(jsonObj.cashProfitMargin);
                this.averageSalesGrowth = convertFloatString(jsonObj.averageSalesGrowth);
                this.averageCashProfitMargin = convertFloatString(jsonObj.averageCashProfitMargin);
                this.projectSalesGrowthRatio = convertFloatString(jsonObj.projectSalesGrowthRatio);
            } else {
                this.totalOperatingIncome = jsonObj.totalOperatingIncome;
                this.salesGrowthRate = jsonObj.salesGrowthRate;
                this.cashProfitBeforeInterest = jsonObj.cashProfitBeforeInterest;
                this.cashProfitMargin = jsonObj.cashProfitMargin;
                this.averageSalesGrowth = jsonObj.averageSalesGrowth;
                this.averageCashProfitMargin = jsonObj.averageCashProfitMargin;
                this.projectSalesGrowthRatio = jsonObj.projectSalesGrowthRatio;
            }
        } else {
            this.totalOperatingIncome = '';
            this.salesGrowthRate = '';
            this.cashProfitBeforeInterest = '';
            this.cashProfitMargin = '';
            this.averageSalesGrowth = '';
            this.averageCashProfitMargin = '';
            this.projectSalesGrowthRatio = '';
        }
    }
}
export class Projection {
    blNormal: ProjectionData;
    blScoreCard: ProjectionData;
    blCABanking: ProjectionData;
    blCCBanking: ProjectionData;
    blBBGAssessment: ProjectionData;
    blLAPAssessment: ProjectionData;

    constructor(jsonObj) {
        if (jsonObj) {
            this.blNormal = new ProjectionData(jsonObj.blNormal, true);
            this.blScoreCard = new ProjectionData(jsonObj.blScoreCard, true);
            this.blCABanking = new ProjectionData(jsonObj.blCABanking, true);
            this.blCCBanking = new ProjectionData(jsonObj.blCCBanking, true);
            this.blBBGAssessment = new ProjectionData(jsonObj.blBBGAssessment, false);
            this.blLAPAssessment = new ProjectionData(jsonObj.blLAPAssessment, false);
        } else {
            this.blNormal = new ProjectionData(null, false);
            this.blScoreCard = new ProjectionData(null, false);
            this.blCABanking = new ProjectionData(null, false);
            this.blCCBanking = new ProjectionData(null, false);
            this.blBBGAssessment = new ProjectionData(null, false);
            this.blLAPAssessment = new ProjectionData(null, false);
        }
    }
}

export class TotalCounts {
    totalLimitAmount: string;
    totalBalAsOn5th: string;
    totalBalAsOn15th: string;
    totalBalAsOn25th: string;
    totDpdInterestServicing: string;
    totDpdInterestOverdrawing: string;
    totAvgBal: string;
    totMaxDpd: string;

    totCardSalesCredit: string;
    mnthAvgUtilization: string;
    totOtherCredits: string;
    constructor(jsonObj) {
        this.totalLimitAmount = convertFloatString(jsonObj.totalLimitAmount);
        this.totalBalAsOn5th = convertFloatString(jsonObj.totalBalAsOn5th);
        this.totalBalAsOn15th = convertFloatString(jsonObj.totalBalAsOn15th);
        this.totalBalAsOn25th = convertFloatString(jsonObj.totalBalAsOn25th);
        this.totDpdInterestServicing = convertIntString(jsonObj.totDpdInterestServicing);
        this.totDpdInterestOverdrawing = convertIntString(jsonObj.totDpdInterestOverdrawing);
        this.totAvgBal = convertIntString(jsonObj.totAvgBal);
        this.totMaxDpd = convertIntString(jsonObj.totMaxDpd);

        this.totCardSalesCredit = convertIntString(jsonObj.totCardSalesCredit);
        this.mnthAvgUtilization = convertIntString(jsonObj.mnthAvgUtilization);
        this.totOtherCredits = convertIntString(jsonObj.totOtherCredits);
    }
}
export class AccountSummary {
    totalCreditCount: string;
    totalCreditAmount: string;
    totalOtherCredit: string;
    totalDebitCount: string;
    totalDebitAmount: string;
    totalInterest: string;
    totalPenalAmount: string;
    totalInwardReturn: string;
    totalOutwardReturn: string;
    constructor(jsonObj) {
        if (jsonObj) {
            this.totalCreditCount = convertIntString(jsonObj.totalCreditCount);
            this.totalCreditAmount = convertFloatString(jsonObj.totalCreditAmount);
            this.totalOtherCredit = convertFloatString(jsonObj.totalOtherCredit);
            this.totalDebitCount = convertIntString(jsonObj.totalDebitCount);
            this.totalDebitAmount = convertFloatString(jsonObj.totalDebitAmount);
            this.totalInterest = convertFloatString(jsonObj.totalInterest);
            this.totalPenalAmount = convertFloatString(jsonObj.totalPenalAmount);
            this.totalInwardReturn = convertIntString(jsonObj.totalInwardReturn);
            this.totalOutwardReturn = convertIntString(jsonObj.totalOutwardReturn);
        }
    }
}
export class MonthlyBankReport {
    month: string;
    creditTxns: string;
    cardSlaesCredit: string;
    otherCredits: string;
    debitTxns: string;
    debitAmount: string;
    interest: string;
    penalAmount: string;
    inwardReturn: string;
    outwardReturn: string;
    creditOfTotal: string;
    limitAmount: string;
    avgBankBalance: string;
    dpdInInterestServicing: string;
    dpdInLimitOverdrawing: string;
    avgUnutilisedBal: string;
    maxDpd: string;
    utilization: string;
    balAsOn5th: any;
    balAsOn15th: any;
    balAsOn25th: any;
    // closingBalances: ClosingBalances;
    constructor(jsonObj) {
        if (jsonObj) {
            this.month = jsonObj.month ? moment(jsonObj.month, "MM/YYYY").format('MMM YYYY') : '';
            this.avgUnutilisedBal = convertIntString(jsonObj.avgUnutilisedBal);
            this.maxDpd = convertIntString(jsonObj.maxDpd);
            this.creditTxns = convertIntString(jsonObj.creditTxns);
            this.cardSlaesCredit = convertFloatString(jsonObj.cardSlaesCredit);
            this.otherCredits = convertFloatString(jsonObj.otherCredits);
            this.debitTxns = convertIntString(jsonObj.debitTxns);
            this.debitAmount = convertFloatString(jsonObj.debitAmount);
            this.interest = convertFloatString(jsonObj.interest);
            this.penalAmount = convertFloatString(jsonObj.penalAmount);
            this.inwardReturn = convertIntString(jsonObj.inwardReturn);
            this.outwardReturn = convertIntString(jsonObj.outwardReturn);
            this.creditOfTotal = convertFloatString(jsonObj.creditOfTotal);
            this.limitAmount = convertFloatString(jsonObj.limitAmount);
            this.dpdInInterestServicing = convertIntString(jsonObj.dpdInInterestServicing);
            this.dpdInLimitOverdrawing = convertIntString(jsonObj.dpdInLimitOverdrawing);
            this.utilization = convertFloatString(jsonObj.utilization);
            this.balAsOn5th = convertFloatString(jsonObj.closingBalances && jsonObj.closingBalances.balAsOn5th);
            this.balAsOn15th = convertFloatString(jsonObj.closingBalances && jsonObj.closingBalances.balAsOn15th);
            this.balAsOn25th = convertFloatString(jsonObj.closingBalances && jsonObj.closingBalances.balAsOn25th);
            this.avgBankBalance = convertFloatString(jsonObj.avgBankBalance);
        }
    }
}

export class AccountDetails {
    cpBankingId: string;
    bankName: string;
    numberOfMonths: string;
    bankAccountNumbers: string;
    typeOfAccount: string;
    latestMonthAvailable: DateFormater;
    monthlyBankReport: MonthlyBankReport[];
    accountSummary: AccountSummary;
    totalCounts: TotalCounts;

    constructor(jsonObj) {
        if (jsonObj) {
            this.cpBankingId = jsonObj.cpBankingId;
            this.bankName = jsonObj.bankName;
            this.numberOfMonths = jsonObj.numberOfMonths;
            this.bankAccountNumbers = jsonObj.bankAccountNumbers;
            this.typeOfAccount = jsonObj.typeOfAccount;
            this.latestMonthAvailable = jsonObj.latestMonthAvailable ? new DateFormater(jsonObj.latestMonthAvailable) : null;
            this.monthlyBankReport = new Array();
            if (jsonObj.monthlyBankReport && jsonObj.monthlyBankReport.length) {
                jsonObj.monthlyBankReport.forEach(item => {
                    this.monthlyBankReport.push(new MonthlyBankReport(item));
                }, this);
            }
            this.accountSummary = new AccountSummary(jsonObj.accountSummary);
            this.totalCounts = new TotalCounts(jsonObj);
        } else {
            this.monthlyBankReport = new Array();
            this.accountSummary = new AccountSummary({});
            this.totalCounts = new TotalCounts({});
        }
    }
}

export class BankingInput {
    cpId: string;
    accountDetails: AccountDetails[];

    constructor(jsonObj) {
        if (jsonObj) {
            this.cpId = jsonObj.cpId;
            this.accountDetails = new Array();
            if (jsonObj.accountDetails && jsonObj.accountDetails.length) {
                jsonObj.accountDetails.forEach(item => {
                    this.accountDetails.push(new AccountDetails(item));
                }, this);
            }
        } else {
            this.accountDetails = new Array();
        }
    }
}
export class TotalAccountDetails {
    averageBankBalance: string;
    averageUtilization: string;
    bkgToRatio: string;
    irregularity: string;
    crDrRatio: string;
    interestServicingDelayDays: string;
    iwReturnPercent: string;
    totalCreditAmount: string;
    totalDebitAmount: string;
    totalDebitTransaction: string;
    totalInterestAmount: string;
    totalInwardReturnCount: string;
    totalMaxNoOfContinuousOverdrawing: string;
    totalNoOfOverdrawnDays: string;
    totalOutwardReturnCount: string;
    totalPenalAmount: string;
    totalcreditTransaction: string;
    totCardSalesCrdt: string;
    totOtherCrdt: string;
    constructor(jsonObj) {
        if (jsonObj) {
            this.averageBankBalance = jsonObj.averageBankBalance != null ? jsonObj.averageBankBalance : '0.00';
            this.averageUtilization = jsonObj.averageUtilization != null ? jsonObj.averageUtilization : '0.0';
            this.bkgToRatio = jsonObj.bkgToRatio != null ? jsonObj.bkgToRatio : 'NA';
            this.irregularity = jsonObj.irregularity != null ? jsonObj.irregularity : 'NA';
            this.crDrRatio = jsonObj.crDrRatio != null ? jsonObj.crDrRatio : 'NA';
            this.interestServicingDelayDays = jsonObj.interestServicingDelayDays != null ? jsonObj.interestServicingDelayDays : 'NA';
            this.iwReturnPercent = jsonObj.iwReturnPercent != null ? jsonObj.iwReturnPercent : '0.0';
            this.totalCreditAmount = jsonObj.totalCreditAmount != null ? jsonObj.totalCreditAmount : '0.00';
            this.totalDebitAmount = jsonObj.totalDebitAmount != null ? jsonObj.totalDebitAmount : '0.00';
            this.totalDebitTransaction = jsonObj.totalDebitTransaction != null ? jsonObj.totalDebitTransaction : 'NA';
            this.totalInterestAmount = jsonObj.totalInterestAmount != null ? jsonObj.totalInterestAmount : '0.00';

            this.totalInwardReturnCount = jsonObj.totalInwardReturnCount != null ? jsonObj.totalInwardReturnCount : 'NA';
            this.totalMaxNoOfContinuousOverdrawing = jsonObj.totalMaxNoOfContinuousOverdrawing != null ? jsonObj.totalMaxNoOfContinuousOverdrawing : 'NA';
            this.totalNoOfOverdrawnDays = jsonObj.totalNoOfOverdrawnDays != null ? jsonObj.totalNoOfOverdrawnDays : 'NA';
            this.totalOutwardReturnCount = jsonObj.totalOutwardReturnCount != null ? jsonObj.totalOutwardReturnCount : 'NA';
            this.totalPenalAmount = jsonObj.totalPenalAmount != null ? jsonObj.totalPenalAmount : '0.00';
            this.totalcreditTransaction = jsonObj.totalcreditTransaction != null ? jsonObj.totalcreditTransaction : 'NA';
            this.totCardSalesCrdt = jsonObj.totCardSalesCrdt != null ? jsonObj.totCardSalesCrdt : 'NA';
            this.totOtherCrdt = jsonObj.totOtherCrdt != null ? jsonObj.totOtherCrdt : 'NA';
        }
    }

}

export class TotalMonthlyBankOutputReport {
    month: string;
    totalMnthLimitAmount: string;
    balAsOn5th:string;
    balAsOn15th: string;
    balAsOn25th: string;
    totalMnthAvgBankBalance: string;
    totalMnthAvgUnutilisedBal: string;
    totalMnthNoOfCreditTxns: string;
    totalMnthCardSalesCredit: string;
    totalMnthOtherCredits: string;
    totalMnthNoOfDebitTxns: string;
    totalMnthDebitAmount: string;
    totalMnthInterest: string;
    totalMnthPenalAmount: string;
    totalMnthInwardReturn: string;
    totalMnthOutwardReturn:string;
    totalMnthDpdInInterestServicing: string;
    totalMnthDpdInLimitOverdrawing: string;
    totalMnthMaxDpd: string;
    totalMnthUtilization: string;
    totalMnthCreditOfTotal: string;
    constructor(jsonObj) {
        if (jsonObj) {
            this.month = jsonObj.month ? moment(jsonObj.month, "MM/YYYY").format('MMM YYYY') : '';
            this.totalMnthLimitAmount = convertIntString(jsonObj.totalMnthLimitAmount);
            this.balAsOn5th = convertFloatString(jsonObj.balAsOn5th);
            this.balAsOn15th = convertIntString(jsonObj.balAsOn15th);
            this.balAsOn25th = convertFloatString(jsonObj.balAsOn25th);
            this.totalMnthAvgBankBalance = convertFloatString(jsonObj.totalMnthAvgBankBalance);
            this.totalMnthAvgUnutilisedBal = convertFloatString(jsonObj.totalMnthAvgUnutilisedBal);
            this.totalMnthNoOfCreditTxns = convertIntString(jsonObj.totalMnthNoOfCreditTxns);
            this.totalMnthCardSalesCredit = convertIntString(jsonObj.totalMnthCardSalesCredit);
            this.totalMnthOtherCredits = convertFloatString(jsonObj.totalMnthOtherCredits);
            this.totalMnthNoOfDebitTxns = convertFloatString(jsonObj.totalMnthNoOfDebitTxns);
            this.totalMnthDebitAmount = convertIntString(jsonObj.totalMnthDebitAmount);
            this.totalMnthInterest = convertIntString(jsonObj.totalMnthInterest);
            this.totalMnthPenalAmount = convertFloatString(jsonObj.totalMnthPenalAmount);
            this.totalMnthInwardReturn = convertFloatString(jsonObj.totalMnthInwardReturn);
            this.totalMnthOutwardReturn = convertFloatString(jsonObj.totalMnthOutwardReturn);
            this.totalMnthDpdInInterestServicing = convertFloatString(jsonObj.totalMnthDpdInInterestServicing);
            this.totalMnthDpdInLimitOverdrawing = convertFloatString(jsonObj.totalMnthDpdInLimitOverdrawing);
            this.totalMnthMaxDpd = convertFloatString(jsonObj.totalMnthMaxDpd);
            this.totalMnthUtilization = convertFloatString(jsonObj.totalMnthUtilization*100);
            this.totalMnthCreditOfTotal = convertFloatString(jsonObj.totalMnthCreditOfTotal);
        }
    }
}
export class BankingOutput {
    totalAccountDetails: TotalAccountDetails;
    totalMonthlyBankReport: TotalMonthlyBankOutputReport[];
    constructor(jsonObj) {
        if (jsonObj) {
            this.totalAccountDetails = new TotalAccountDetails(jsonObj.totalAccountDetails);

            this.totalMonthlyBankReport = new Array();
            if (jsonObj.totalMonthlyBankReport && jsonObj.totalMonthlyBankReport.length) {
                jsonObj.totalMonthlyBankReport.forEach(item => {
                    this.totalMonthlyBankReport.push(new TotalMonthlyBankOutputReport(item));
                }, this);
            }
        }
    }
}


export class StoreDtlsDtoLst {
    storeDtlId: string;
    storeName: string;
    noOfEdc: string;
    address: string;
    totalMonthAverage: string;
    edcMonthlySalesVOList: EdcMonthlySalesVOList[];
    monthName: string[];
    totalSalesMonth: string[];
    totStoreSales: string;
    minStoreSales: string;
    maxStoreSales: string;

    constructor(jsonObj) {
        if (jsonObj) {
            this.storeDtlId = jsonObj.storeDtlId;
            this.storeName = jsonObj.storeName;
            this.noOfEdc = jsonObj.noOfEdc;
            this.address = jsonObj.address;
            this.totalMonthAverage = convertFloatString(jsonObj.totalMonthAverage);
            this.totStoreSales = convertFloatString(jsonObj.totStoreSales);
            this.minStoreSales = convertFloatString(jsonObj.minStoreSales);
            this.maxStoreSales = convertFloatString(jsonObj.maxStoreSales);

            this.edcMonthlySalesVOList = new Array();
            if (jsonObj.edcMonthlySalesVOList && jsonObj.edcMonthlySalesVOList.length) {
                jsonObj.edcMonthlySalesVOList.forEach(item => {
                    this.edcMonthlySalesVOList.push(new EdcMonthlySalesVOList(item));
                }, this);
            }
            this.monthName = new Array();
            if (jsonObj.monthName && jsonObj.monthName.length) {
                jsonObj.monthName.forEach(item => {
                    this.monthName.push(item);
                }, this);
            }
            this.totalSalesMonth = new Array();
            if (jsonObj.totalSalesMonth && jsonObj.totalSalesMonth.length) {
                jsonObj.totalSalesMonth.forEach(item => {
                    this.totalSalesMonth.push(convertFloatString(item));
                }, this);
            }

        } else {
            this.storeDtlId = '';
            this.storeName = '';
            this.noOfEdc = '';
            this.address = '';
            this.totalMonthAverage = '';
            this.edcMonthlySalesVOList = new Array();
            this.monthName = new Array();
        }
    }
}
export class EdcMonthlySalesVOList {
    edcSalesId: string;
    storeDtlsId: string;
    edcNo: string;
    nameOfBank: string;
    totalSales: string;
    salesPerMonth: any[];
    minimumSales: string;
    maximumSales: string;

    constructor(jsonObj) {
        if (jsonObj) {
            this.edcSalesId = jsonObj.edcSalesId;
            this.storeDtlsId = jsonObj.storeDtlsId;
            this.edcNo = jsonObj.edcNo;
            this.nameOfBank = jsonObj.nameOfBank;
            this.totalSales = convertFloatString(jsonObj.totalSales);
            this.minimumSales = convertFloatString(jsonObj.minimumSales);
            this.maximumSales = convertFloatString(jsonObj.maximumSales);

            this.salesPerMonth = new Array();
            if (jsonObj.salesPerMonth && jsonObj.salesPerMonth.length) {
                jsonObj.salesPerMonth.forEach(item => {
                    Object.keys(item).forEach(key => {
                        item[key] = convertFloatString(item[key]);
                    });
                    this.salesPerMonth.push(item);
                }, this);
            }
        } else {
            this.edcSalesId = '';
            this.edcNo = '';
            this.nameOfBank = '';
            this.totalSales = '';
            this.salesPerMonth = new Array();
            this.minimumSales = '';
            this.maximumSales = '';
        }
    }
}

export class StoreMonthlySalesVOList {
    monthlySalesId: string;
    monthName: string;
    amount: string;
    totalCountCredits: string;
    totalCountSwipes: string;

    constructor(jsonObj) {
        if (jsonObj) {
            this.monthlySalesId = jsonObj.monthlySalesId;
            this.monthName = jsonObj.monthName;
            this.amount = convertFloatString(jsonObj.amount);
            this.totalCountCredits = jsonObj.totalCountCredits;
            this.totalCountSwipes = jsonObj.totalCountSwipes;
        } else {
            this.monthlySalesId = '';
            this.monthName = '';
            this.amount = '';
            this.totalCountCredits = '';
            this.totalCountSwipes = '';
        }
    }
}


export class EDCListReport {
    month: string;
    constructor(jsonObj) {
        if (jsonObj) {
            this.month = jsonObj.month;
        }
    }
}

export class CardsalesInput {
    cpId: string;
    lastAvailableMonth: any;
    storeDtlsVOLst: StoreDtlsDtoLst[];
    storeMonthlySalesVOList: StoreMonthlySalesVOList[];
    meRlnshp: any;
    meRlnshpMultipier: any;
    assessmentType: any;
    constructor(jsonObj) {
        if (jsonObj) {
            this.cpId = jsonObj.cpId;
            this.lastAvailableMonth = jsonObj.lastAvailableMonth ? jsonObj.lastAvailableMonth : null;
            this.meRlnshp = jsonObj.meRlnshp ? jsonObj.meRlnshp : null;
            this.meRlnshpMultipier = jsonObj.meRlnshpMultipier ? jsonObj.meRlnshpMultipier : null;
            this.assessmentType = jsonObj.assessmentType ? jsonObj.assessmentType : null;

            this.storeDtlsVOLst = new Array();
            if (jsonObj.storeDtlsVOLst && jsonObj.storeDtlsVOLst.length) {
                jsonObj.storeDtlsVOLst.forEach(item => {
                    this.storeDtlsVOLst.push(new StoreDtlsDtoLst(item));
                }, this);
            }

            this.storeMonthlySalesVOList = new Array();
            if (jsonObj.storeMonthlySalesVOList && jsonObj.storeMonthlySalesVOList.length) {
                jsonObj.storeMonthlySalesVOList.forEach(item => {
                    this.storeMonthlySalesVOList.push(new StoreMonthlySalesVOList(item));
                }, this);
            }

            this.lastAvailableMonth = jsonObj.lastAvailableMonth ? moment(jsonObj.lastAvailableMonth, 'MM/YYYY').toISOString() : '';

        } else {
            this.lastAvailableMonth = null;
            this.storeDtlsVOLst = new Array();
            this.storeMonthlySalesVOList = new Array();
        }
    }
}

export class StoreOutMonthlySalesVOS {
    monthName: string;
    ccSales: string;

    constructor(jsonObj) {
        if (jsonObj) {
            this.monthName = jsonObj.monthName;
            this.ccSales = convertFloatString(jsonObj.ccSales);
        }
    }
}

export class StoreOutDtlVO {
    storeOutDtlId: string;
    totSaleThrghCcMach: string;
    totSumCountCredits: number;
    totSumCountSwipes: number;
    maxCcSalePrmth: string;
    minCcSalePrmth: string;
    variationInCcSales: string;
    avgCcSales: string;
    cardSalesLast6Mnths: string;
    avgCountSwipes: string;
    avgCountSwipesLast6Mnths: number;
    avgCountSwipesLast12Mnths: number;
    totMonthlySales: string;
    avgMonthlySales: string;
    annulisedSales: string;

    constructor(jsonObj) {
        if (jsonObj) {
            this.storeOutDtlId = jsonObj.storeOutDtlId;
            this.totSaleThrghCcMach = convertFloatString(jsonObj.totSaleThrghCcMach);
            this.totSumCountCredits = jsonObj.totSumCountCredits ? jsonObj.totSumCountCredits : '0';
            this.totSumCountSwipes = jsonObj.totSumCountSwipes ? jsonObj.totSumCountSwipes : '0';
            this.maxCcSalePrmth = convertFloatString(jsonObj.maxCcSalePrmth);
            this.minCcSalePrmth = convertFloatString(jsonObj.minCcSalePrmth);
            this.variationInCcSales = convertFloatString(jsonObj.variationInCcSales);
            this.avgCcSales = convertFloatString(jsonObj.avgCcSales);
            this.cardSalesLast6Mnths = convertFloatString(jsonObj.cardSalesLast6Mnths);
            this.avgCountSwipes = jsonObj.avgCountSwipes ? jsonObj.avgCountSwipes : '0';
            this.avgCountSwipesLast6Mnths = jsonObj.avgCountSwipesLast6Mnths ? jsonObj.avgCountSwipesLast6Mnths : '0';
            this.avgCountSwipesLast12Mnths = jsonObj.avgCountSwipesLast12Mnths ? jsonObj.avgCountSwipesLast12Mnths : '0';
            this.totMonthlySales = convertFloatString(jsonObj.totMonthlySales);
            this.avgMonthlySales = convertFloatString(jsonObj.avgMonthlySales);
            this.annulisedSales = convertFloatString(jsonObj.annulisedSales);
        }
    }
}



export class CardsalesOutput {
    storeOutMonthlySalesVOS: StoreOutMonthlySalesVOS[];
    storeOutDtlVO: StoreOutDtlVO;
    constructor(jsonObj) {
        if (jsonObj) {
            this.storeOutMonthlySalesVOS = new Array();
            if (jsonObj.storeOutMonthlySalesVOS && jsonObj.storeOutMonthlySalesVOS.length) {
                jsonObj.storeOutMonthlySalesVOS.forEach(item => {
                    this.storeOutMonthlySalesVOS.push(new StoreOutMonthlySalesVOS(item));
                }, this);
            } else {
                this.storeOutMonthlySalesVOS = new Array();
            }
            this.storeOutDtlVO = new StoreOutDtlVO(jsonObj.storeOutDtlVO);

        }
    }
}


export class RtrInputDetails {
    cpLoanId: string;
    loanType: string;
    bank: string;
    sanctionedAmount: string;
    maxUtilisationPerBank: string;
    balancePerBank: string;
    balancePerBalance: string;
    constructor(jsonObj) {
        if (jsonObj) {
            this.cpLoanId = jsonObj.cpLoanId;
            this.loanType = jsonObj.loanType;
            this.bank = jsonObj.bank;
            this.sanctionedAmount = convertFloatString(jsonObj.sanctionedAmount);
            this.maxUtilisationPerBank = convertFloatString(jsonObj.maxUtilisationPerBank);
            this.balancePerBank = convertFloatString(jsonObj.balancePerBank);
            this.balancePerBalance = convertFloatString(jsonObj.balancePerBalance);
        }
    }
}
export class RtrOtherEMIBasedLoans {
    cpLoanId: string;
    loanType: string;
    bank: string;
    loanAmount: string;
    natureOfLoan: string;
    loanAcctNumber: string;
    startDate: DMYDateFormater;
    loanTenure: string;
    noEmiPaid: string;
    remainingTenure: string;
    status: string;
    countEmiInNext12Months: string;
    currPrinOutstanding: string;
    appearsBalSheetCibil: string;
    paidFromPersonalAcc: string;
    qtrRemarks: string;
    emiAmount: string;
    emiPaidfrom: string;
    empPaidFromAccount: string;
    monthList: MonthList[];



    constructor(jsonObj) {
        if (jsonObj) {
            this.cpLoanId = jsonObj.cpLoanId;
            this.appearsBalSheetCibil = jsonObj.appearsBalSheetCibil;
            this.paidFromPersonalAcc = jsonObj.paidFromPersonalAcc;
            this.qtrRemarks = jsonObj.qtrRemarks;
            this.loanType = jsonObj.loanType;
            this.bank = jsonObj.bank;
            this.loanAmount = convertFloatString(jsonObj.loanAmount);
            this.natureOfLoan = jsonObj.natureOfLoan;
            this.loanAcctNumber = jsonObj.loanAcctNumber;
            this.emiPaidfrom = jsonObj.emiPaidfrom;
            this.empPaidFromAccount = jsonObj.empPaidFromAccount;
            this.loanTenure = convertIntString(jsonObj.loanTenure);
            this.noEmiPaid = convertIntString(jsonObj.noEmiPaid);
            this.remainingTenure = convertIntString(jsonObj.remainingTenure);

            this.status = jsonObj.status;
            if (jsonObj.startDate != null) {
                const startDate = jsonObj.startDate ? jsonObj.startDate.split(',') : '';
                this.startDate = startDate[0] ? new DMYDateFormater(startDate[0]) : null;
            }

            this.countEmiInNext12Months = convertFloatString(jsonObj.countEmiInNext12Months);

            this.currPrinOutstanding = convertFloatString(jsonObj.currPrinOutstanding);
            this.emiAmount = convertFloatString(jsonObj.emiAmount);
            this.monthList = new Array();
            if (jsonObj.monthList && jsonObj.monthList.length) {
                jsonObj.monthList.forEach(item => {
                    this.monthList.push(new MonthList(item));
                }, this);
            } else {
                this.monthList = new Array();
            }
        }
    }
}
export class MonthList {
    qtrLoanMonthEMIAmount: string;
    qtrLoanMonthEMIClearanceDate: DMYDateFormater;
    qtrLoanMonthEMIClearanceDateString: DMYDateFormater;
    emiLoanId: string;

    constructor(jsonObj) {
        if (jsonObj) {
            this.emiLoanId = jsonObj.emiLoanId;
            this.qtrLoanMonthEMIAmount = convertFloatString(jsonObj.qtrLoanMonthEMIAmount);
            if (jsonObj.qtrLoanMonthEMIClearanceDate != null) {
                this.qtrLoanMonthEMIClearanceDate = jsonObj.qtrLoanMonthEMIClearanceDate ? new DMYDateFormater(jsonObj.qtrLoanMonthEMIClearanceDate) : null;
            }
            this.qtrLoanMonthEMIClearanceDateString = jsonObj.qtrLoanMonthEMIClearanceDate ? new DMYDateFormater(jsonObj.qtrLoanMonthEMIClearanceDate) : null;
        }
    }
}

export class RtrOutput {
    totalLoanTracks: string;
    totLiveLoanPrincipalOSAmt: string;
    totLoansAvailedLast6Mnths: string;
    totLiveUnsecuredLoanTracks: string;
    totLiveUnsecuredOSAmt: string;
    totRunningLiveLoansPostFY: string;
    totRunningLiveLoanOSAmtPostFY: string;
    emidueInNxt12Mnths: string;
    bankLoansToTurnover: string;
    wcToTurnoverBs: string;
    wcToTurnoverRTR: string;
    currentDbtToEbit: string;
    constructor(jsonObj) {
        if (jsonObj) {
            this.totalLoanTracks = convertIntString(jsonObj.totalLoanTracks);
            this.totLiveLoanPrincipalOSAmt = convertFloatString(jsonObj.totLiveLoanPrincipalOSAmt);
            this.totLoansAvailedLast6Mnths = convertIntString(jsonObj.totLoansAvailedLast6Mnths);
            this.totLiveUnsecuredLoanTracks = convertIntString(jsonObj.totLiveUnsecuredLoanTracks);
            this.totLiveUnsecuredOSAmt = convertFloatString(jsonObj.totLiveUnsecuredOSAmt);
            this.totRunningLiveLoansPostFY = convertIntString(jsonObj.totRunningLiveLoansPostFY);
            this.totRunningLiveLoanOSAmtPostFY = convertFloatString(jsonObj.totRunningLiveLoanOSAmtPostFY);
            this.emidueInNxt12Mnths = convertFloatString(jsonObj.emidueInNxt12Mnths);
            this.bankLoansToTurnover = convertFloatString(jsonObj.bankLoansToTurnover);
            this.wcToTurnoverBs = convertFloatString(jsonObj.wcToTurnoverBs);
            this.wcToTurnoverRTR = convertFloatString(jsonObj.wcToTurnoverRTR);
            this.currentDbtToEbit = convertFloatString(jsonObj.currentDbtToEbit);
        }
    }
}
export class RtrInput {
    cpId: string;
    rtrInputDetails: RtrInputDetails[];
    rtrOtherEmiBasedLoans: RtrOtherEMIBasedLoans[];

    existingLacrFacilities: string;
    totalSanctionAmount: any;
    totalBalanceAsPerBalSheet: any;
    totalAllLoanAmount: any;
    totalAllEmiAmount: any;
    totalLoanTenure: any;
    totalNoEmiPaid: any;
    totalRemainingTenor: any;
    totalEmiAmoutForMnthArr: any;
    totalMaxUtilizationPerBankStmt: any;
    totalCurrPrinOutstanding: any;
    totalCountEmiInNext12Months: any;
    totalLatestBalanceBankStatement: any;
    constructor(jsonObj) {
        if (jsonObj) {
            this.cpId = jsonObj.cpId;
            this.totalCurrPrinOutstanding = convertFloatString(jsonObj.totalCurrPrinOutstanding);
            this.totalCountEmiInNext12Months = convertFloatString(jsonObj.totalCountEmiInNext12Months);
            this.totalLatestBalanceBankStatement = convertFloatString(jsonObj.totalLatestBalanceBankStatement);
            this.existingLacrFacilities = jsonObj.existingLacrFacilities;

            this.rtrInputDetails = new Array();
            if (jsonObj.rtrInputDetails && jsonObj.rtrInputDetails.length) {
                jsonObj.rtrInputDetails.forEach(item => {
                    this.rtrInputDetails.push(new RtrInputDetails(item));
                }, this);
            }
            this.rtrOtherEmiBasedLoans = new Array();
            if (jsonObj.rtrOtherEmiBasedLoans && jsonObj.rtrOtherEmiBasedLoans.length) {
                jsonObj.rtrOtherEmiBasedLoans.forEach(item => {
                    this.rtrOtherEmiBasedLoans.push(new RtrOtherEMIBasedLoans(item));
                }, this);
            }


            this.totalSanctionAmount = convertFloatString(jsonObj.totalSanctionAmount);
            this.totalBalanceAsPerBalSheet = convertFloatString(jsonObj.totalBalanceAsPerBalSheet);
            this.totalMaxUtilizationPerBankStmt = convertFloatString(jsonObj.totalMaxUtilizationPerBankStmt);
            this.totalAllLoanAmount = convertFloatString(jsonObj.totalAllLoanAmount);
            this.totalAllEmiAmount = convertFloatString(jsonObj.totalAllEmiAmount);

            this.totalLoanTenure = jsonObj.totalLoanTenure;
            this.totalNoEmiPaid = jsonObj.totalNoEmiPaid;
            this.totalRemainingTenor = jsonObj.totalRemainingTenor;
        } else {
            this.rtrInputDetails = new Array();
            this.rtrOtherEmiBasedLoans = new Array();
        }
    }
}

export class GstInputValues {
    gstInputId: number;
    gstReturnAmount: string;
    monthNumber: number;
    monthDisplay: string;

    constructor(jsonObj) {
        if (jsonObj) {
            this.gstInputId = jsonObj.gstInputId;
            this.gstReturnAmount = jsonObj.gstReturnAmount ? jsonObj.gstReturnAmount : 0;
            this.monthNumber = jsonObj.monthNumber;
            this.monthDisplay = jsonObj.monthDisplay;
        }
    }
}
export class GstInput {
    fromMonth: Date;
    toMonth: Date;
    totalOfGstReturns: any;

    fromMonthDisplay: string;
    toMonthDisplay: string;

    gstInputValues: GstInputValues[];

    constructor(jsonObj) {
        if (jsonObj) {
            this.totalOfGstReturns = jsonObj.totalOfGstReturns ? jsonObj.totalOfGstReturns : '';

            const fMonth = jsonObj.fromMonth ? new DMYDateFormater(jsonObj.fromMonth) : new DMYDateFormater(moment().format('01/MM/YYYY'));
            const tMonth = jsonObj.toMonth ? new DMYDateFormater(jsonObj.toMonth) : new DMYDateFormater(moment().format('01/MM/YYYY'));

            this.fromMonth = new Date(fMonth.date.year, fMonth.date.month - 1, fMonth.date.day);
            this.toMonth = new Date(tMonth.date.year, tMonth.date.month - 1, tMonth.date.day);

            this.fromMonthDisplay = moment(this.fromMonth).format('MMM YYYY');
            this.toMonthDisplay = moment(this.toMonth).format('MMM YYYY');

            this.gstInputValues = new Array();
            if (jsonObj.gstInputValues && jsonObj.gstInputValues.length) {
                jsonObj.gstInputValues.forEach(item => {
                    this.gstInputValues.push(new GstInputValues(item));
                });
            } else {
                this.gstInputValues = new Array();
            }
        }
    }
}
export class GstOutput {
    gstOutputDetails: GstInput;
    annualGSTReturns: any;
    bankCredLast6Mnths: any;
    annualCredInLakhs: any;
    bankCredPercGstReturn: string;
    lastTurnOvrFinancialYr: any;
    annualGstFinancialYr: any;
    gstOutputId: any;
    constructor(jsonObj) {
        if (jsonObj) {
            this.gstOutputDetails = new GstInput(jsonObj.gstOutputDetails);
            this.annualGSTReturns = jsonObj.annualGSTReturns;
            this.bankCredLast6Mnths = jsonObj.bankCredLast6Mnths;
            this.annualCredInLakhs = jsonObj.annualCredInLakhs;
            this.bankCredPercGstReturn = jsonObj.bankCredPercGstReturn;
            this.lastTurnOvrFinancialYr = jsonObj.lastTurnOvrFinancialYr;
            this.annualGstFinancialYr = jsonObj.annualGstFinancialYr;
            this.gstOutputId = jsonObj.gstOutputId;
        } else {
            this.annualGSTReturns = '';
            this.bankCredLast6Mnths = '';
            this.annualCredInLakhs = '';
            this.bankCredPercGstReturn = '';
            this.lastTurnOvrFinancialYr = '';
            this.annualGstFinancialYr = '';
            this.gstOutputId = '';
        }
    }
}
export class CollateralData {
    collateralId: any;
    appAssessMethodId: any;
    collateralType: any;
    isChargeCreated: any;
    collateralHairCut: any;
    collateralCoverPct: any;
    dsv: any;
    ltv: any;
    instrAccountNo: any;
    instrAmt: any;
    instrMaturityDate: DateFormater;
    instrStartDate: DateFormater;
    instrType: any;
    instrSurrenderValue: any;
    instrOwnerName: any;
    instrIssuedBy: any;
    instrOtherDetails: any;
    propertyType: any;
    ownershipStatus: any;
    occupationStatus: any;
    propertyAddress: any;
    builtUpArea: any;
    superBuiltArea: any;
    ownerName: any;
    coApplicants: CoApplicants[];
    applicantOwnerRelationship: any;
    nameValuer1: any;
    marketValue1: any;
    nameValuer2: any;
    marketValue2: any;
    legalReportProvider: any;
    isTitleDeedsClear: any;
    isInsuranceAvailable: any;
    insuranceAmt: any;
    insuranceProviderName: any;
    locality: any;
    nearestBankBranch: any;
    carpetArea: any;
    referenceNumber: any;
    constructor(jsonObj) {
        if (jsonObj) {
            this.appAssessMethodId = jsonObj.appAssessMethodId;
            this.collateralType = jsonObj.collateralType ? jsonObj.collateralType : 61;
            this.isChargeCreated = jsonObj.isChargeCreated;
            this.collateralHairCut = jsonObj.collateralHairCut;
            this.collateralCoverPct = jsonObj.collateralCoverPct;
            this.dsv = jsonObj.dsv;
            this.ltv = jsonObj.ltv;
            this.collateralId = jsonObj.collateralId;
            this.instrAccountNo = jsonObj.instrAccountNo;
            this.instrAmt = jsonObj.instrAmt;
            this.instrMaturityDate = jsonObj.instrMaturityDate ? new DateFormater(jsonObj.instrMaturityDate) : null;
            this.instrStartDate = jsonObj.instrStartDate ? new DateFormater(jsonObj.instrStartDate) : null;
            this.instrType = jsonObj.instrType;
            this.instrSurrenderValue = jsonObj.instrSurrenderValue;
            this.instrOwnerName = jsonObj.instrOwnerName;
            this.instrIssuedBy = jsonObj.instrIssuedBy;
            this.instrOtherDetails = jsonObj.instrOtherDetails;
            this.propertyType = jsonObj.propertyType;
            this.ownershipStatus = jsonObj.ownershipStatus;
            this.occupationStatus = jsonObj.occupationStatus;
            this.propertyAddress = jsonObj.propertyAddress;
            this.builtUpArea = jsonObj.builtUpArea;
            this.superBuiltArea = jsonObj.superBuiltArea;
            this.ownerName = jsonObj.ownerName;
            this.applicantOwnerRelationship = jsonObj.applicantOwnerRelationship;
            this.nameValuer1 = jsonObj.nameValuer1;
            this.marketValue1 = jsonObj.marketValue1;
            this.nameValuer2 = jsonObj.nameValuer2;
            this.marketValue2 = jsonObj.marketValue2;
            this.legalReportProvider = jsonObj.legalReportProvider;
            this.isTitleDeedsClear = jsonObj.isTitleDeedsClear;
            this.isInsuranceAvailable = jsonObj.isInsuranceAvailable;
            this.insuranceAmt = jsonObj.insuranceAmt;
            this.insuranceProviderName = jsonObj.insuranceProviderName;
            this.locality = jsonObj.locality;
            this.nearestBankBranch = jsonObj.nearestBankBranch;
            this.carpetArea = jsonObj.carpetArea;
            this.referenceNumber = jsonObj.referenceNumber;

            this.coApplicants = new Array();
            if (jsonObj.coApplicants && jsonObj.coApplicants.length) {
                jsonObj.coApplicants.forEach(item => {
                    this.coApplicants.push(new CoApplicants(item));
                }, this);
            } else {
                this.coApplicants = new Array();
            }
        } else {
            this.appAssessMethodId = '';
            this.collateralType = '';
            this.isChargeCreated = '';
            this.collateralHairCut = '';
            this.collateralCoverPct = '';
            this.dsv = '';
            this.collateralId = '';
            this.instrAccountNo = '';
            this.instrAmt = '';
            this.instrMaturityDate = null;
            this.instrStartDate = null;
            this.instrType = '';
            this.instrSurrenderValue = '';
            this.instrOwnerName = '';
            this.instrIssuedBy = '';
            this.instrOtherDetails = '';
            this.propertyType = '';
            this.ownershipStatus = '';
            this.occupationStatus = '';
            this.propertyAddress = '';
            this.builtUpArea = '';
            this.superBuiltArea = '';
            this.ownerName = '';
            this.applicantOwnerRelationship = '';
            this.nameValuer1 = '';
            this.marketValue1 = '';
            this.nameValuer2 = '';
            this.marketValue2 = '';
            this.legalReportProvider = '';
            this.isTitleDeedsClear = '';
            this.isInsuranceAvailable = '';
            this.insuranceAmt = '';
            this.insuranceProviderName = '';
            this.locality = '';
            this.nearestBankBranch = '';
            this.carpetArea = '';
            this.referenceNumber = '';
        }
    }
}
export class CollateralInputDetails {
    totalDsv: any;
    camCollateralDetailsDto: CollateralData[];
    constructor(jsonObj) {
        if (jsonObj) {
            this.totalDsv = jsonObj.totalDsv;
            this.camCollateralDetailsDto = new Array();
            if (jsonObj.camCollateralDetailsDto && jsonObj.camCollateralDetailsDto.length) {
                jsonObj.camCollateralDetailsDto.forEach(item => {
                    this.camCollateralDetailsDto.push(new CollateralData(item));
                }, this);
            }
        } else {
            this.camCollateralDetailsDto = new Array();

        }
    }
}

export class CoApplicants {
    key: any;
    value: any;

    constructor(jsonObj) {
        if (jsonObj) {
            this.key = jsonObj.key ? jsonObj.key : 0;
            this.value = jsonObj.value;

        }
    }

}

export class AssessmentReport {

    assessmentType: string;
    securedLoan: string;
    totalScore: string;
    resultOntotalScore: string;
    bankingTransRiskScore: string;
    resultOnBankingTransRiskScore: string;
    resultOnBankingTransScore: string;
    lacrFacilitiesWithOtherbanks: any;
    maxAmtOnAvgCcSwipeSales: any;
    expectedAcqVol: any;
    multiple: string;
    maxAmtOnAcqVol: any;
    basedOnSales: any;
    thirtyCentsSales: any;
    workingCapLimitFromOtherBanks: string;
    maxAmtOnSales: any;
    maxExposureLimit: any;
    collateralLTV: any;
    bLNormal: any;
    maxAmtOnITRIncome: any;
    tenor: any;
    mERelMultiplier: any;
    avgAmtMonthCcSwipeSales12: any;
    maxAmtAvgMonthCcSwipeSales12: any;
    multipleAvgCcSwipeSales: any;
    finalEligibilityAsPerLacr: any;
    finalEligibilityAsPerFlip: any;
    multipleItrIncome: any;
    itrIncome: any;
    drawingPower: any;
    approvedLoanAmount: any;
    multipleforexpectedacquiringvolume: any;
    isExistingCustomer: any;
    approvalFlag: any;

    constructor(jsonObj) {
        if (jsonObj) {
            this.assessmentType = jsonObj.assessmentType != null ? jsonObj.assessmentType : '';
            this.securedLoan = jsonObj.securedLoan != null ? jsonObj.securedLoan : '';

            this.multipleAvgCcSwipeSales = jsonObj.multipleAvgCcSwipeSales ? jsonObj.multipleAvgCcSwipeSales : 0;
            this.multipleItrIncome = jsonObj.multipleItrIncome ? jsonObj.multipleItrIncome : 0;
            this.itrIncome = jsonObj.itrIncome ? jsonObj.itrIncome : 0;

            this.totalScore = convertFloatString(jsonObj.totalScore);
            this.resultOntotalScore = jsonObj.resultOntotalScore;
            this.bankingTransRiskScore = convertFloatString(jsonObj.bankingTransRiskScore);
            this.resultOnBankingTransRiskScore = jsonObj.resultOnBankingTransRiskScore;
            this.resultOnBankingTransScore = jsonObj.resultOnBankingTransScore;
            this.lacrFacilitiesWithOtherbanks = convertFloatString(jsonObj.lacrFacilitiesWithOtherbanks);
            this.maxAmtOnAvgCcSwipeSales = convertFloatString(jsonObj.maxAmtOnAvgCcSwipeSales);
            this.expectedAcqVol = convertFloatString(jsonObj.expectedAcqVol);
            this.multiple = convertFloatString(jsonObj.multiple);
            this.maxAmtOnAcqVol = convertFloatString(jsonObj.maxAmtOnAcqVol);
            this.basedOnSales = convertFloatString(jsonObj.basedOnSales);
            this.thirtyCentsSales = convertFloatString(jsonObj.thirtyCentsSales);
            this.workingCapLimitFromOtherBanks = convertFloatString(jsonObj.workingCapLimitFromOtherBanks);
            this.maxAmtOnSales = convertFloatString(jsonObj.maxAmtOnSales);
            this.maxExposureLimit = convertFloatString(jsonObj.maxExposureLimit);
            this.collateralLTV = convertFloatString(jsonObj.collateralLTV);
            this.bLNormal = convertFloatString(jsonObj.bLNormal);
            this.maxAmtOnITRIncome = convertFloatString(jsonObj.maxAmtOnITRIncome);
            this.tenor = convertFloatString(jsonObj.tenor);
            this.mERelMultiplier = convertFloatString(jsonObj.mERelMultiplier);
            this.avgAmtMonthCcSwipeSales12 = convertFloatString(jsonObj.avgAmtMonthCcSwipeSales12);
            this.maxAmtAvgMonthCcSwipeSales12 = convertFloatString(jsonObj.maxAmtAvgMonthCcSwipeSales12);
            this.finalEligibilityAsPerLacr = convertFloatString(jsonObj.finalEligibilityAsPerLacr);
            this.finalEligibilityAsPerFlip = convertFloatString(jsonObj.finalEligibilityAsPerFlip);
            this.drawingPower = jsonObj.drawingPower;
            this.approvedLoanAmount = jsonObj.approvedLoanAmount;
            this.multipleforexpectedacquiringvolume = jsonObj.multipleforexpectedacquiringvolume ? jsonObj.multipleforexpectedacquiringvolume : 0;
            this.isExistingCustomer = jsonObj.isExistingCustomer;
            this.approvalFlag = jsonObj.approvalFlag;
        } else {
            this.assessmentType = '';
        }
    }
}
export class PromotersBackground {
    promoters: string;
    successionPlan: any;
    managerialExperience: any;
    businessContinuity: any;
    constructor(jsonObj) {
        if (jsonObj) {
            this.promoters = jsonObj.promoters;
            this.successionPlan = jsonObj.successionPlan;
            this.managerialExperience = jsonObj.managerialExperience;
            this.businessContinuity = jsonObj.businessContinuity;

        } else {
            this.promoters = '';
            this.successionPlan = '';
            this.managerialExperience = '';
            this.businessContinuity = '';

        }
    }
}
export class CamBorrower {
    businessCompanyProfile: string;
    businessModel: string;
    promotersBackground: PromotersBackground;
    shareHoldingPattern: string;
    groupCompanyDetails: string;
    assetBase: string;
    endUse: string;
    financialDetails: string;
    bankingDetails: string;
    rtrDetails: string;
    otherDetail: string;
    cardSales: string;
    gst: string;
    collateral: string;
    constructor(jsonObj) {
        if (jsonObj) {
            this.cardSales = jsonObj.cardSales;
            this.gst = jsonObj.gst;
            this.collateral = jsonObj.collateral;
            this.businessCompanyProfile = jsonObj.businessCompanyProfile;
            this.businessModel = jsonObj.businessModel;
            this.promotersBackground = new PromotersBackground(jsonObj.promotersBackground);
            this.shareHoldingPattern = jsonObj.shareHoldingPattern;
            this.groupCompanyDetails = jsonObj.groupCompanyDetails;
            this.assetBase = jsonObj.assetBase;
            this.endUse = jsonObj.endUse;
            this.financialDetails = jsonObj.financialDetails;
            this.bankingDetails = jsonObj.bankingDetails;
            this.rtrDetails = jsonObj.rtrDetails;
            this.otherDetail = jsonObj.otherDetail;
        } else {
            this.businessCompanyProfile = '';
            this.businessModel = '';
            this.cardSales = '';
            this.gst = '';
            this.collateral = '';
            this.promotersBackground = new PromotersBackground('');
            this.shareHoldingPattern = '';
            this.groupCompanyDetails = '';
            this.assetBase = '';
            this.endUse = '';
            this.financialDetails = '';
            this.bankingDetails = '';
            this.rtrDetails = '';
            this.otherDetail = '';
        }
    }
}
export class Deviation {
    deviationNewId: string;
    deviationMapId: string;

    deviationId: number;
    deviationType: string;
    deviationSoughtFor: string;
    deviationLevelId: string;
    deviationLevelCredit: any;
    deviationLevelBusiness: any;
    justification: string;
    businessRemarks: string;
    creditRemarks: string;
    deviationBRE: string;
    constructor(jsonObj) {
        if (jsonObj) {
            this.deviationNewId = jsonObj.deviationNewId;
            this.deviationMapId = jsonObj.deviationMapId;

            this.deviationId = jsonObj.deviation;
            this.deviationType = jsonObj.deviationType;
            this.deviationLevelId = jsonObj.deviationLevelId;
            this.deviationLevelCredit = jsonObj.deviationLevelCredit;
            this.deviationLevelBusiness = jsonObj.deviationLevelBusiness;
            this.justification = jsonObj.justification;
            this.businessRemarks = jsonObj.businessRemarks;
            this.creditRemarks = jsonObj.creditRemarks;
            this.deviationSoughtFor = jsonObj.deviationSoughtFor ? jsonObj.deviationSoughtFor : '';
            this.deviationBRE = jsonObj.deviationBRE ? jsonObj.deviationBRE : ''
        }
    }
}

export class MiscodeList {
    misCodeId: string;
    parameterName: string;
    description: string;
    categoryId: string;
    remarks: string;
    code: string;
    constructor(jsonObj) {
        if (jsonObj) {
            this.misCodeId = jsonObj.misCodeId;
            this.parameterName = jsonObj.parameterName ? jsonObj.parameterName : (jsonObj.categoryName ? jsonObj.categoryName : '');
            this.description = jsonObj.description;
            this.categoryId = jsonObj.categoryId;
            this.remarks = jsonObj.remarks;
            this.code = jsonObj.code;
        } else {
            this.misCodeId = '';
            this.parameterName = '';
            this.description = '';
            this.categoryId = '';
            this.remarks = '';
            this.code = '';
        }
    }
}

export class MisCad {
    misCategoryList: MiscodeList[];
    constructor(jsonObj) {
        if (jsonObj) {
            this.misCategoryList = new Array();
            if (jsonObj.misCategoryList && jsonObj.misCategoryList.length) {
                jsonObj.misCategoryList.forEach(item => {
                    this.misCategoryList.push(new MiscodeList(item));
                }, this);
            } else {
                this.misCategoryList = new Array();
            }
        }
    }
}

export class MisCadList {
    misCategoryList: MiscodeList[];
    constructor(jsonObj) {
        if (jsonObj) {
            this.misCategoryList = new Array();
            if (jsonObj && jsonObj.length) {
                jsonObj.forEach(item => {
                    this.misCategoryList.push(new MiscodeList(item));
                }, this);
            } else {
                this.misCategoryList = new Array();
            }
        }
    }
}

export class Approver {
    userId: string;
    nameEcnNo: string;
    constructor(jsonObj) {
        if (jsonObj) {
            this.userId = jsonObj.userId;
            this.nameEcnNo = jsonObj.nameEcnNo + ', ' + jsonObj.designation;
        }
    }
}
export class SanctionAuthorityDetails {
    level: string;
    creditApprover: string;
    businessApprover: string;
    creditApproverLookup: Approver[];
    businessApproverLookup: Approver[];
    constructor(jsonObj, isLookupLoad) {
        if (jsonObj) {
            this.level = jsonObj.level;
            if (isLookupLoad) {
                this.creditApprover = '';
                this.businessApprover = '';
                this.creditApproverLookup = new Array();
                this.businessApproverLookup = new Array();

                if (jsonObj.creditApprover && jsonObj.creditApprover.length) {
                    jsonObj.creditApprover.forEach(item => {
                        this.creditApproverLookup.push(new Approver(item));
                    }, this);
                }
                if (jsonObj.businessApprover && jsonObj.businessApprover.length) {
                    jsonObj.businessApprover.forEach(item => {
                        this.businessApproverLookup.push(new Approver(item));
                    }, this);
                }
            } else {
                this.creditApprover = jsonObj.creditApprover;
                this.businessApprover = jsonObj.businessApprover;
                this.creditApproverLookup = new Array();
                this.businessApproverLookup = new Array();
            }
        }
    }
}
export class SanctioningAuthority {
    list: SanctionAuthorityDetails[];

    constructor(jsonObj) {
        if (jsonObj) {
            this.list = new Array();
            if (jsonObj.sanctioningAuthority && jsonObj.sanctioningAuthority.length) {
                jsonObj.sanctioningAuthority.forEach(item => {
                    this.list.push(new SanctionAuthorityDetails(item, true));
                }, this);
            }
        }
    }
}
export class DeviationReport {
    assessmentDeviationDetails: Deviation[]; //Assessment Deviation
    manualDeviationDetails: Deviation[]; //Manual Deviation
    breDeviationDetails: Deviation[];
    sanctionAuthorityDetails: SanctionAuthorityDetails[];
    appPackageId: string;

    constructor(jsonObj) {
        if (jsonObj) {
            this.appPackageId = jsonObj.appPackageId;
            this.assessmentDeviationDetails = new Array();
            if (jsonObj.deviationDetails && jsonObj.deviationDetails.assessmentDeviation && jsonObj.deviationDetails.assessmentDeviation.length) {
                jsonObj.deviationDetails.assessmentDeviation.forEach(item => {
                    this.assessmentDeviationDetails.push(new Deviation(item));
                }, this);
            }
            this.manualDeviationDetails = new Array();
            if (jsonObj.deviationDetails && jsonObj.deviationDetails.manualDeviation && jsonObj.deviationDetails.manualDeviation.length) {
                jsonObj.deviationDetails.manualDeviation.forEach(item => {
                    this.manualDeviationDetails.push(new Deviation(item));
                }, this);
            }
            this.breDeviationDetails = new Array();
            if (jsonObj.deviationDetails && jsonObj.deviationDetails.breDeviation && jsonObj.deviationDetails.breDeviation.length) {
                jsonObj.deviationDetails.breDeviation.forEach(item => {
                    this.breDeviationDetails.push(new Deviation(item));
                }, this);
            }
            this.sanctionAuthorityDetails = new Array();
            if (jsonObj.sanctionAuthorityDetails && jsonObj.sanctionAuthorityDetails.length) {
                jsonObj.sanctionAuthorityDetails.forEach(item => {
                    if (item && item.level != null) {
                        this.sanctionAuthorityDetails.push(new SanctionAuthorityDetails(item, false));
                    }
                }, this);
            }

        } else {
            this.sanctionAuthorityDetails = new Array();
        }
    }
}
export class FoirReport {
    maxOfMonthlyFoir: string;
    withMultiplierOnProjection: string;
    withoutMultiplierOnProjection: string;
    basedOnBanking: string;
    actual: string;
    bankingFaclitiesToProjectedTurnoverprivate: string;
    totalLoanToLatestTurnover: string;
    foirForBanking: string;
    foirForFinancials: string;
    constructor(jsonObj) {
        if (jsonObj) {
            this.maxOfMonthlyFoir = convertFloatString(jsonObj.maxOfMonthlyFoir);
            this.withMultiplierOnProjection = convertFloatString(jsonObj.withMultiplierOnProjection);
            this.withoutMultiplierOnProjection = convertFloatString(jsonObj.withoutMultiplierOnProjection);
            this.basedOnBanking = convertFloatString(jsonObj.basedOnBanking);
            this.actual = convertFloatString(jsonObj.actual);
            this.totalLoanToLatestTurnover = convertFloatString(jsonObj.totalLoanToLatestTurnover);
            this.bankingFaclitiesToProjectedTurnoverprivate = convertFloatString(jsonObj.bankingFaclitiesToProjectedTurnoverprivate);
            this.foirForBanking = convertFloatString(jsonObj.foirForBanking);
            this.foirForFinancials = convertFloatString(jsonObj.foirForFinancials);
        }
    }

}

export class DocumentList {
    cpId: string;
    srNo: string;
    customerPrincipalDocId: string;
    status: boolean;
    documentId: string;
    documentName: string;
    documentType: string;
    photoUrl: string;
    belongsTo: string;
    availableDocument: string;
    agencyName: string;
    result: string;
    remarks: string;
    constructor(jsonObj) {
        if (jsonObj) {
            this.cpId = jsonObj.cpId ? jsonObj.cpId.toString() : '';
            this.srNo = jsonObj.srNo;
            this.customerPrincipalDocId = jsonObj.customerPrinciaplDocId;
            this.status = jsonObj.status;
            this.documentId = jsonObj.documentId;
            this.documentName = jsonObj.documentName;
            this.documentType = jsonObj.documentType ? jsonObj.documentType.toString() : '';
            this.photoUrl = jsonObj.photoUrl;
            this.belongsTo = jsonObj.belongsTo;
            this.availableDocument = jsonObj.availableDocument;
            this.agencyName = jsonObj.agencyName;
            this.result = jsonObj.result;
            this.remarks = jsonObj.remarks;
        }
    }
}

export class RcuReport {
    status: string;
    observation: string;
    appPackageId: string;
    documentListVO: DocumentList[];
    comments: string;
    verificationStatus: string;
    registeredAddress: FidAddress;
    factoryAddress: FidAddress;
    customerDetails: string;
    contactPerson: ContactPerson;
    constructor(jsonObj) {
        if (jsonObj) {
            this.status = jsonObj.status;
            this.observation = jsonObj.observation;
            this.comments = jsonObj.comments;
            this.appPackageId = jsonObj.appPackageId;
            this.registeredAddress = new FidAddress(jsonObj.registeredAddress);
            this.factoryAddress = new FidAddress(jsonObj.factoryAddress);
            this.customerDetails = jsonObj.customerDetails;
            this.verificationStatus = jsonObj.verificationStatus;
            this.contactPerson = new ContactPerson(jsonObj.contactPerson);
            this.documentListVO = new Array();
            if (jsonObj.documentListVO && jsonObj.documentListVO.length) {
                jsonObj.documentListVO.forEach(item => {
                    this.documentListVO.push(new DocumentList(item));
                }, this);
            }
        } else {
            this.documentListVO = new Array();
        }
    }
}

export class TncDetailDto {
    appId: string;
    termsAndConditionId: string;
    condition: string;
    conditionAddDate: DMYDateFormater;
    type: string;
    documentToBeFurnished: string;
    atWhatStage: string;

    constructor(jsonObj) {
        if (jsonObj) {
            this.appId = jsonObj.appId;
            this.termsAndConditionId = jsonObj.termsAndConditionId;
            this.condition = jsonObj.condition;
            this.conditionAddDate = jsonObj.conditionAddDate ? new DMYDateFormater(jsonObj.conditionAddDate) : null;
            this.type = jsonObj.type;
            this.documentToBeFurnished = jsonObj.documentToBeFurnished;
            this.atWhatStage = jsonObj.atWhatStage;
        }
    }
}


export class TermAndCondition {
    assessmentType: string;
    tncDetailDto: TncDetailDto[];

    constructor(jsonObj) {
        if (jsonObj) {
            this.assessmentType = jsonObj.assessmentType;
            this.tncDetailDto = new Array();
            if (jsonObj.tncDetailDto && jsonObj.tncDetailDto.length) {
                jsonObj.tncDetailDto.forEach(item => {
                    this.tncDetailDto.push(new TncDetailDto(item));
                }, this);
            }
        } else {
            this.tncDetailDto = new Array();
        }
    }
}
export class FidAddress {
    address: string;
    postalCode: string;
    phone: string;
    email: string;
    city: string;
    state: string;
    constructor(jsonObj) {
        if (jsonObj) {
            this.address = jsonObj.address;
            this.postalCode = jsonObj.postalCode;
            this.phone = jsonObj.phone;
            this.email = jsonObj.email;
            this.city = jsonObj.city;
            this.state = jsonObj.state;
        }

    }
}
export class FiReportArray {

    cpId: string;
    entityName: string;
    addressDetails: string;
    observation: string;
    photoUrl: string;
    longitude: string;
    fiResult: string;
    latitude: string;
    documentId: string;
    documentName: string;
    agencyDetails: string;
    constructor(jsonObj) {
        if (jsonObj) {
            this.cpId = jsonObj.cpId;
            this.fiResult = jsonObj.fiResult;
            this.entityName = jsonObj.entityName;
            this.addressDetails = jsonObj.addressDetails;
            this.observation = jsonObj.observation;
            this.photoUrl = jsonObj.photoUrl;
            this.longitude = jsonObj.longitude;
            this.latitude = jsonObj.latitude;
            this.documentId = jsonObj.documentId;
            this.documentName = jsonObj.documentName;
            this.agencyDetails = jsonObj.agencyDetails;
        } else {
            this.cpId = '';
            this.entityName = '';
            this.addressDetails = '';
            this.observation = '';
            this.photoUrl = '';
            this.longitude = '';
            this.latitude = '';
            this.documentId = '';
            this.documentName = '';
            this.agencyDetails = '';
        }
    }
}

export class FiReport {
    appPackageId: string;
    status: string;
    customerDetails: string;
    comments: string;
    verificationStatus: string;
    registeredAddress: FidAddress;
    factoryAddress: FidAddress;
    contactPerson: ContactPerson;
    fireport: FiReportArray[];

    constructor(jsonObj) {
        if (jsonObj) {
            this.fireport = new Array();
            if (jsonObj.fireport && jsonObj.fireport.length) {
                jsonObj.fireport.forEach(item => {
                    this.fireport.push(new FiReportArray(item));
                }, this);
            }

            this.registeredAddress = new FidAddress(jsonObj.registeredAddress);
            this.factoryAddress = new FidAddress(jsonObj.factoryAddress);
            this.contactPerson = new ContactPerson(jsonObj.contactPerson);
            this.status = jsonObj.status;
            this.customerDetails = jsonObj.customerDetails;
            this.comments = jsonObj.comments;
            this.verificationStatus = jsonObj.verificationStatus;
        } else {
            this.fireport = new Array();
            this.registeredAddress = new FidAddress(null);
            this.factoryAddress = new FidAddress(null);
            this.contactPerson = new ContactPerson(null);
        }
    }

}
export class ContactPerson {
    salutation: string;
    firstName: string;
    middleName: string;
    lastName: string;
    gender: string;
    emailId: string;
    contactNo: string;
    motherMaidenName: string;
    constructor(jsonObj) {
        if (jsonObj) {
            this.salutation = jsonObj.salutation;
            this.firstName = jsonObj.firstName;
            this.middleName = jsonObj.middleName;
            this.lastName = jsonObj.lastName;
            this.gender = jsonObj.gender;
            this.emailId = jsonObj.emailId;
            this.contactNo = jsonObj.contactNo;
            this.motherMaidenName = jsonObj.motherMaidenName;
        }
    }
}

export class SiteAddress {
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
    constructor(jsonObj) {
        if (jsonObj) {
            this.address1 = jsonObj.address1;
            this.address2 = jsonObj.address2;
            this.postalCode = jsonObj.postalCode;
            this.state = jsonObj.state;
            this.city = jsonObj.city;
            this.stdCode = jsonObj.stdCode;
            this.landlineNo = jsonObj.landlineNo;
            this.mobileNo = jsonObj.mobileNo;
            this.ownership = jsonObj.ownership;
            this.ownedBy = jsonObj.ownedBy;
        }
    }
}

export class CommunicationAddress {
    address: string;
    postalCode: string;
    state: string;
    city: string;
    ext: string;
    phone: string;
    email: string;
    phone2: string;
    country: string;

    constructor(jsonObj) {
        if (jsonObj) {
            this.address = jsonObj.address;
            this.postalCode = jsonObj.postalCode;
            this.state = jsonObj.state;
            this.city = jsonObj.city;
            this.ext = jsonObj.ext;
            this.phone = jsonObj.phone;
            this.email = jsonObj.email;
            this.phone2 = jsonObj.phone2;
            this.country = jsonObj.country;
        }
    }
}
export class PersonalDiscussion {
    srNo: string;
    pdDoneBy: string;
    pdDate: DMYDateFormater;
    remarks: string;
    pdId: string;
    constructor(jsonObj) {
        if (jsonObj) {
            this.srNo = jsonObj.srNo;
            this.pdId = jsonObj.pdId;
            this.pdDoneBy = jsonObj.pdDoneBy;
            this.pdDate = jsonObj.pdDate ? new DMYDateFormater(jsonObj.pdDate) : null;
            this.remarks = jsonObj.remarks;
        }
    }
}
export class SiteVisitReport {
    cpId: string;
    status: string;
    addressVisited: string;
    personMet: string;
    personMetBusiness: string;
    customerDetails: string;
    isBusinessSeasonal: string;
    familyBackgroundOfPromoter: string;
    educationBackground: string;
    endUseProposedLoan: string;
    commentsOnInterior: string;
    levelBusinessActivityObserved: string;
    typeOfBuilding: string;
    noOfMachinesEquipmentObserved: string;
    conditionsOfMachines: string;
    noOfIdleMachines: string;
    areMachinesRelatedToNatureOfBusiness: string;
    stocksOfRawMaterialObserved: string;
    verificationStatus: string;
    noOfEmployees: string;
    decision: string;
    comments: string;
    stocksRelatedToNatureOfBusiness: string;
    contactPerson: ContactPerson;
    registeredAddress: FidAddress;
    communicationAddress: CommunicationAddress;
    personalDiscussion: PersonalDiscussion[];
    constructor(jsonObj) {
        if (jsonObj) {
            this.cpId = jsonObj.cpId;
            this.communicationAddress = new CommunicationAddress(jsonObj.communicationAddress);
            this.contactPerson = new ContactPerson(jsonObj.contactPerson);
            this.registeredAddress = new FidAddress(jsonObj.registeredAddress);
            this.status = jsonObj.status;
            this.customerDetails = jsonObj.customerDetails;
            this.noOfEmployees = jsonObj.noOfEmployees;
            this.addressVisited = jsonObj.addressVisited;
            this.personMet = jsonObj.personMet;
            this.personMetBusiness = jsonObj.personMetBusiness;
            this.isBusinessSeasonal = jsonObj.isBusinessSeasonal;
            this.familyBackgroundOfPromoter = jsonObj.familyBackgroundOfPromoter;
            this.educationBackground = jsonObj.educationBackground;
            this.endUseProposedLoan = jsonObj.endUseProposedLoan;
            this.commentsOnInterior = jsonObj.commentsOnInterior;
            this.levelBusinessActivityObserved = jsonObj.levelBusinessActivityObserved;
            this.typeOfBuilding = jsonObj.typeOfBuilding;
            this.noOfMachinesEquipmentObserved = jsonObj.noOfMachinesEquipmentObserved;
            this.conditionsOfMachines = jsonObj.conditionsOfMachines;
            this.noOfIdleMachines = jsonObj.noOfIdleMachines;
            this.areMachinesRelatedToNatureOfBusiness = jsonObj.areMachinesRelatedToNatureOfBusiness;
            this.stocksOfRawMaterialObserved = jsonObj.stocksOfRawMaterialObserved;
            this.verificationStatus = jsonObj.verificationStatus;
            this.decision = jsonObj.decision;
            this.comments = jsonObj.comments;
            this.stocksRelatedToNatureOfBusiness = jsonObj.stocksRelatedToNatureOfBusiness;
            if (jsonObj) {
                this.personalDiscussion = new Array();
                if (jsonObj.personalDiscussion && jsonObj.personalDiscussion.length) {
                    jsonObj.personalDiscussion.forEach(item => {
                        this.personalDiscussion.push(new PersonalDiscussion(item));
                    }, this);
                }
            } else {
                this.personalDiscussion = new Array();
                this.communicationAddress = new CommunicationAddress(null);
                this.contactPerson = new ContactPerson(null);
                this.registeredAddress = new FidAddress(null);
            }
        }

    }
}

export class Observations {
    srNo: string;
    observation: string;
    date: DMYDateFormater;
    user: string;
    constructor(jsonObj) {
        if (jsonObj) {
            this.srNo = jsonObj.srNo;
            this.observation = jsonObj.observation;
            this.date = jsonObj.date ? new DMYDateFormater(jsonObj.date) : null;
            this.user = jsonObj.user;
        }
    }

}
export class DocumentCheckList {
    srNo: string;
    documentCheckListName: string;
    documentName: string;
    documentType: string;
    documentUpload: string;
    documentId: string;
    documentCheckId: string;
    dateOfExecution: DMYDateFormater;
    creditTeamVerification: string;
    remarksByCreditTeam: string;
    localopsVerification: string;
    remarksByLocalOps: string;
    centralOpsVerification: string;
    remarksByCentralOps: string;
    deferance: string;
    dueDate: DMYDateFormater;



    constructor(jsonObj) {
        if (jsonObj) {
            this.srNo = jsonObj.srNo;
            this.documentName = jsonObj.documentName ? jsonObj.documentName : '';
            this.documentCheckListName = jsonObj.documentCheckListName ? jsonObj.documentCheckListName : '';
            this.documentType = jsonObj.documentType;
            this.documentCheckId = jsonObj.documentCheckId;
            this.documentUpload = jsonObj.documentUpload;
            this.documentId = jsonObj.documentId;
            this.dateOfExecution = jsonObj.dateOfExecution ? new DMYDateFormater(jsonObj.dateOfExecution) : null;
            this.dueDate = jsonObj.dueDate ? new DMYDateFormater(jsonObj.dueDate) : null;
            this.creditTeamVerification = jsonObj.creditTeamVerification;
            this.remarksByCreditTeam = jsonObj.remarksByCreditTeam;
            this.localopsVerification = jsonObj.localopsVerification;
            this.remarksByLocalOps = jsonObj.remarksByLocalOps;
            this.centralOpsVerification = jsonObj.centralOpsVerification;
            this.remarksByCentralOps = jsonObj.remarksByCentralOps;
            this.deferance = jsonObj.deferance;
        }
    }
}
export class DisbursementDocuments {
    cpId: string;
    borrowerName: string;
    product: string;
    program: string;
    observations: Observations[];
    constitution: string;
    sanctionedLoanAmount: string;
    otcApprovalButton: any;
    otcAndFiRcuStatus: any;
    otcAndFiRcuStatusTnc: any;
    indicatiorMessageTnc: any;
    indicatorMessage: any;
    documentCheckListDto: DocumentCheckList[];
    termsAndConditionDto: DocumentCheckList[];
    pddOtcDocumentListDto: DocumentCheckList[];

    constructor(jsonObj) {
        if (jsonObj) {
            this.cpId = jsonObj.cpId;
            this.borrowerName = jsonObj.borrowerName;
            this.product = jsonObj.product;
            this.program = jsonObj.program;
            this.constitution = jsonObj.constitution;
            this.sanctionedLoanAmount = jsonObj.sanctionedLoanAmount;
            this.otcApprovalButton = jsonObj.otcApprovalButton;
            this.indicatiorMessageTnc = jsonObj.indicatiorMessageTnc;
            this.otcAndFiRcuStatus = jsonObj.otcAndFiRcuStatus;
            this.otcAndFiRcuStatusTnc = jsonObj.otcAndFiRcuStatusTnc;
            this.indicatorMessage = jsonObj.indicatorMessage;

            this.documentCheckListDto = new Array();
            if (jsonObj.documentCheckListDto && jsonObj.documentCheckListDto.length) {
                jsonObj.documentCheckListDto.forEach(item => {
                    this.documentCheckListDto.push(new DocumentCheckList(item));
                }, this);
            }
            this.termsAndConditionDto = new Array();
            if (jsonObj.termsAndConditionDto && jsonObj.termsAndConditionDto.length) {
                jsonObj.termsAndConditionDto.forEach(item => {
                    this.termsAndConditionDto.push(new DocumentCheckList(item));
                }, this);
            }

            this.pddOtcDocumentListDto = new Array();
            if (jsonObj.pddOtcDocumentListDto && jsonObj.pddOtcDocumentListDto.length) {
                jsonObj.pddOtcDocumentListDto.forEach(item => {
                    this.pddOtcDocumentListDto.push(new DocumentCheckList(item));
                }, this);
            }


            this.observations = new Array();
            if (jsonObj.observations && jsonObj.observations.length) {
                jsonObj.observations.forEach(item => {
                    this.observations.push(new Observations(item));
                }, this);
            }
        } else {
            this.documentCheckListDto = new Array();
            this.pddOtcDocumentListDto = new Array();
            this.observations = new Array(null);


        }
    }
}
export class EntityCifs {
    cpId: string;
    entity: string;
    entityType: string;
    cif: string;
    constructor(jsonObj) {
        if (jsonObj) {
            this.cpId = jsonObj.cpId;
            this.entity = jsonObj.entity;
            this.entityType = jsonObj.entityType;
            this.cif = jsonObj.cif;
        }
    }
}
export class SecurityInsuranceDetails {
    securityId: string;
    collateralId: string;
    insuranceProvider: string;
    premiumAmount: string;
    policyType: string;
    policyNumber: string;
    expiryDate: DateFormater;

    constructor(jsonObj) {
        if (jsonObj) {
            this.securityId = jsonObj.securityId;
            this.collateralId = jsonObj.collateralId;
            this.insuranceProvider = jsonObj.insuranceProvider;
            this.premiumAmount = jsonObj.premiumAmount;
            this.policyType = jsonObj.policyType;
            this.policyNumber = jsonObj.policyNumber;
            this.expiryDate = jsonObj.expiryDate ? new DateFormater(jsonObj.expiryDate) : null;
        }
    }
}

export class DisbursementAccountDetails {
    acctId: string;
    accountNo: string;
    accountHoldersName: string;
    ifscCode: string;
    accountType: string;
    benificiaryBank: string;
    amount: string;
    isPrimaryAccount: string;
    constructor(jsonObj) {
        if (jsonObj) {
            this.acctId = jsonObj.acctId;
            this.accountNo = jsonObj.accountNo ? jsonObj.accountNo.toString() : '';
            this.accountHoldersName = jsonObj.accountHoldersName;
            this.ifscCode = jsonObj.ifscCode;
            this.accountType = jsonObj.accountType;
            this.benificiaryBank = jsonObj.benificiaryBank ? jsonObj.benificiaryBank : '10';
            this.amount = jsonObj.amount;
            this.isPrimaryAccount = jsonObj.isPrimaryAccount;
        }
    }
}
export class DisbursementDetails {
    paymentMode: string;
    loanEndDate: any;
    loanStartDate: any;
    emiType: any;
    emiFrequency: any;
    emi: any;
    rePaymentMode: string;
    entity: string;
    entityType: string;
    proofOfIndentiy1: string;
    proofOfIndentiy2: string;
    proofOfAddress: string;
    currentAccountNo: string;
    accountDetailsList: DisbursementAccountDetails[];
    amount: string;
    disbursementFlag: any;
    isFundTransfered: any;
    rate:any;

    constructor(jsonObj) {
        if (jsonObj) {
            this.paymentMode = jsonObj.paymentMode;

            this.entity = jsonObj.entity;
            this.entityType = jsonObj.entityType;
            this.proofOfIndentiy1 = jsonObj.proofOfIndentiy1;
            this.proofOfIndentiy2 = jsonObj.proofOfIndentiy2;
            this.proofOfAddress = jsonObj.proofOfAddress;
            this.currentAccountNo = jsonObj.currentAccountNo;
            this.loanStartDate = jsonObj.loanStartDate ? new DMYDateFormater(jsonObj.loanStartDate) : null;
            this.loanEndDate = jsonObj.loanEndDate ? new DMYDateFormater(jsonObj.loanEndDate) : null;
            this.emiType = jsonObj.emiType 
            this.emiFrequency = jsonObj.emiFrequency ? jsonObj.emiFrequency : '333';
            this.emi = jsonObj.emi;
            this.rePaymentMode = jsonObj.rePaymentMode;
            this.amount = jsonObj.amount;
            this.disbursementFlag = jsonObj.disbursementFlag;
            this.isFundTransfered = jsonObj.isFundTransfered;
            this.rate = jsonObj.rate ? jsonObj.rate :'18.75'

            this.accountDetailsList = new Array();
            if (jsonObj.accountDetailsList && jsonObj.accountDetailsList.length) {
                jsonObj.accountDetailsList.forEach(item => {
                    this.accountDetailsList.push(new DisbursementAccountDetails(item));
                }, this);
            }
        } else {
            this.accountDetailsList = new Array();
        }
    }
}


export class LoanDetails {
    loanAmount: string;
    existingLoanAccountNo: string;
    foreclosureLoanAmount: string;
    netLoanAmount: string;
    rateOfInterest: string;
    processingfees: string;
    verificationCharges: string;
    frankingCharges: string;
    totalCharges: string;
    cgst: string;
    sgst: string;
    emi: string;
    loanTenure: string;
    verificationChargesGST: string;
    score: string;
    creditRating: string;
    drawingPower: any;
    trancheDisbursement: string;
    sancAuthId: string;
    sancId: string;
    penalPrefOutput: string;
    dlodDetailsFurnishFlag: any
    constructor(jsonObj) {
        if (jsonObj) {
            this.loanAmount = convertFloatString(jsonObj.loanAmount);
            this.existingLoanAccountNo = jsonObj.existingLoanAccountNo;
            this.drawingPower = jsonObj.drawingPower != null ? jsonObj.drawingPower : 0;
            this.trancheDisbursement = convertFloatString(jsonObj.trancheDisbursement);
            this.foreclosureLoanAmount = convertFloatString(jsonObj.foreclosureLoanAmount);
            this.netLoanAmount = convertFloatString(jsonObj.netLoanAmount);
            this.rateOfInterest = jsonObj.rateOfInterest;
            this.processingfees = convertFloatString(jsonObj.processingfees);
            this.verificationCharges = convertFloatString(jsonObj.verificationCharges);
            this.frankingCharges = convertFloatString(jsonObj.frankingCharges);
            this.totalCharges = convertFloatString(jsonObj.totalCharges);
            this.cgst = convertFloatString(jsonObj.cgst);
            this.sgst = convertFloatString(jsonObj.sgst);
            this.emi = jsonObj.emi;
            this.verificationChargesGST = convertFloatString(jsonObj.verificationChargesGST);
            this.loanTenure = jsonObj.loanTenure;
            this.score = jsonObj.score;
            this.creditRating = jsonObj.creditRating;
            this.penalPrefOutput = jsonObj.penalPrefOutput;
            this.sancAuthId = jsonObj.sancAuthId;
            this.sancId = jsonObj.sancId;
            this.dlodDetailsFurnishFlag = jsonObj.dlodDetailsFurnishFlag;

        } else {
            this.loanAmount = '';
            this.existingLoanAccountNo = '';
            this.foreclosureLoanAmount = '';
            this.netLoanAmount = '';
            this.rateOfInterest = '';
            this.processingfees = '';
            this.verificationCharges = '';
            this.frankingCharges = '';
            this.totalCharges = '';
            this.cgst = '';
            this.sgst = '';
            this.emi = '';
            this.loanTenure = '';
            this.score = '';
            this.creditRating = '';
            this.drawingPower = 0;
            this.penalPrefOutput = '';
            this.sancAuthId = '';
            this.sancId = '';
        }
    }
}
export class OtcDetails {
    docName: string;
    approvedBy: string;
    typeOfDocument: string;
    nameOfUploadedDocument: string;
    constructor(jsonObj) {
        if (jsonObj) {
            this.typeOfDocument = jsonObj.typeOfDocument;
            this.nameOfUploadedDocument = jsonObj.nameOfUploadedDocument;
            this.docName = jsonObj.docName;
            this.approvedBy = jsonObj.approvedBy;
        }
    }
}
export class PddDetails {
    docName: string;
    approvedBy: string;
    typeOfDocument: string;
    nameOfUploadedDocument: string;
    constructor(jsonObj) {
        if (jsonObj) {
            this.typeOfDocument = jsonObj.typeOfDocument;
            this.nameOfUploadedDocument = jsonObj.nameOfUploadedDocument;
            this.docName = jsonObj.docName;
            this.approvedBy = jsonObj.approvedBy;
        }
    }
}


export class InsuranceDetails {
    insuranceName: string;
    insuredAmount: string;
    insuranceDisplayName: string;
    insurancePremium: string;
    nameOfTheInsuredPerson: string;
    dateOfBirth: any;
    insuranceTenure: string;

    constructor(jsonObj) {
        if (jsonObj) {
            this.insuranceName = jsonObj.insuranceName;
            this.insuredAmount = jsonObj.insuredAmount;
            this.insuranceDisplayName = jsonObj.insuranceDisplayName;
            this.insurancePremium = jsonObj.insurancePremium;
            this.nameOfTheInsuredPerson = jsonObj.nameOfTheInsuredPerson;
            this.dateOfBirth = jsonObj.dateOfBirth ? new DMYDateFormater(jsonObj.dateOfBirth) : null;
            this.insuranceTenure = jsonObj.insuranceTenure;
        }
        else {
            this.insuranceName = '';
            this.insuredAmount = '';
        }
    }
}

export class PayOffDetails {
    loanAccountNo: string;
    payOffDate: DMYDateFormater;
    netpayOffAmount: string;
    payOffInqDate: DMYDateFormater;
    payOffStatus: string;
    loanType: string;
    remarks: string;
    payoffsuccessflag: any;
    payoffsuccessMsg: string;
    closeLoanFlag: any;
    closeLoanMessage: string;
    payOffInqInfo: string;

    constructor(jsonObj) {
        if (jsonObj) {
            this.remarks = jsonObj.remarks;
            this.loanAccountNo = jsonObj.loanAccountNo;
            this.payOffDate = jsonObj.payOffDate ? new DMYDateFormater(jsonObj.payOffDate) : null;
            this.netpayOffAmount = jsonObj.netpayOffAmount ? jsonObj.netpayOffAmount : 0;
            this.payOffInqDate = jsonObj.payOffInqDate ? new DMYDateFormater(jsonObj.payOffInqDate) : null;;
            this.payOffStatus = jsonObj.payOffStatus;
            this.loanType = jsonObj.loanType;
            this.payoffsuccessflag = jsonObj.payoffsuccessflag ? jsonObj.payoffsuccessflag : 0;
            this.payoffsuccessMsg = jsonObj.payoffsuccessMsg ? jsonObj.payoffsuccessMsg : null;
            this.closeLoanFlag = jsonObj.closeLoanFlag ? jsonObj.closeLoanFlag : 0;
            this.closeLoanMessage = jsonObj.closeLoanMessage ? jsonObj.closeLoanMessage : null;
            this.payOffInqInfo = jsonObj.payOffInqInfo ? jsonObj.payOffInqInfo : null;

        } else {
            this.loanAccountNo = '';
            this.payOffDate = null;
            this.netpayOffAmount = '';
            this.payOffInqDate = null;
            this.payOffStatus = '';
            this.loanType = '';
            this.payoffsuccessflag = '';
            this.payoffsuccessMsg = '';
            this.closeLoanFlag = '';
            this.closeLoanMessage = '';
            this.payOffInqInfo = '';
        }
    }
}

export class DisbursementMenu {
    entityCifs: EntityCifs[];
    securityInsuranceDetails: SecurityInsuranceDetails[];
    disbursementDetails: DisbursementDetails;
    loanDetails: LoanDetails;
    otcDetails: OtcDetails[];
    pddDetails: PddDetails[];
    payOffDetails: PayOffDetails;
    insuranceDetails: InsuranceDetails;
    assessmentType: string;

    constructor(jsonObj) {
        if (jsonObj) {
            this.assessmentType = jsonObj.assessmentType;
            this.entityCifs = new Array();
            if (jsonObj.entityCifs && jsonObj.entityCifs.length) {
                jsonObj.entityCifs.forEach(item => {
                    this.entityCifs.push(new EntityCifs(item));
                }, this);
            }
            this.securityInsuranceDetails = new Array();
            if (jsonObj.securityInsuranceDetails && jsonObj.securityInsuranceDetails.length) {
                jsonObj.securityInsuranceDetails.forEach(item => {
                    this.securityInsuranceDetails.push(new SecurityInsuranceDetails(item));
                }, this);
            }

            this.disbursementDetails = new DisbursementDetails(jsonObj.disbursementDetails);
            this.loanDetails = new LoanDetails(jsonObj.loanDetails);
            this.insuranceDetails = new InsuranceDetails(jsonObj.insuranceDetails);
            this.payOffDetails = new PayOffDetails(jsonObj.payOffDetails);


            this.otcDetails = new Array();
            if (jsonObj.otcDetails && jsonObj.otcDetails.length) {
                jsonObj.otcDetails.forEach(item => {
                    this.otcDetails.push(new OtcDetails(item));
                }, this);
            }

            this.pddDetails = new Array();
            if (jsonObj.pddDetails && jsonObj.pddDetails.length) {
                jsonObj.pddDetails.forEach(item => {
                    this.pddDetails.push(new PddDetails(item));
                }, this);
            }
        } else {
            this.entityCifs = new Array();
            this.loanDetails = new LoanDetails({});
            this.securityInsuranceDetails = new Array();
            this.disbursementDetails = new DisbursementDetails({});
            this.loanDetails = new LoanDetails({});
            this.insuranceDetails = new InsuranceDetails({});
            this.payOffDetails = new PayOffDetails({});
            this.otcDetails = new Array();
            this.pddDetails = new Array();
        }
    }
}

export class Details {
    name: string;
    adress: string;
    constructor(jsonObj) {
        this.name = jsonObj.name;
        this.adress = jsonObj.adress;
    }
}

export class CoborrowerDetails {
    placeOfAgreement: string;
    principalAmt: string;
    odLimit: string;
    dropLineOdLimit: string;
    aggregateOd: string;
    purposeOfLoan: string;
    loanTenor: string;
    repaymentSchedule: string;
    tenor: string;
    tenorDropLineOd: string;
    repayment: string;
    repaymentDropLineOd: string;
    noOfInstallmentsSquared: string;
    dateFrstInstlmntDue: DMYDateFormater;

    detailsOfCoborrower: Details[];
    constructor(jsonObj) {
        this.principalAmt = jsonObj.principalAmt;
        this.odLimit = jsonObj.odLimit;
        this.dropLineOdLimit = jsonObj.dropLineOdLimit;
        this.aggregateOd = jsonObj.aggregateOd;
        this.purposeOfLoan = jsonObj.purposeOfLoan;
        this.loanTenor = jsonObj.loanTenor;
        this.repaymentSchedule = jsonObj.repaymentSchedule;
        this.tenor = jsonObj.tenor;
        this.tenorDropLineOd = jsonObj.tenorDropLineOd;
        this.repayment = jsonObj.repayment;
        this.repaymentDropLineOd = jsonObj.repaymentDropLineOd;
        this.noOfInstallmentsSquared = jsonObj.noOfInstallmentsSquared;
        this.dateFrstInstlmntDue = jsonObj.dateFrstInstlmntDue ? new DMYDateFormater(jsonObj.dateFrstInstlmntDue) : null;
        this.placeOfAgreement = jsonObj.placeOfAgreement;


        this.detailsOfCoborrower = new Array();
        if (jsonObj.detailsOfCoborrower && jsonObj.detailsOfCoborrower.length) {
            jsonObj.detailsOfCoborrower.forEach(item => {
                this.detailsOfCoborrower.push(new Details(item));
            }, this);
        }
    }
}

export class DetailsOfTheAccount {
    acctNo: string;
    nameOfBank: string;
    addrOfBank: string;
    interestRate: string;
    interestType: string;
    periodicityIntPayment: string;
    processingFees: string;
    constructor(jsonObj) {
        this.acctNo = jsonObj.acctNo;
        this.nameOfBank = jsonObj.nameOfBank;
        this.addrOfBank = jsonObj.addrOfBank;
        this.interestRate = jsonObj.interestRate;
        this.interestType = jsonObj.interestType;
        this.periodicityIntPayment = jsonObj.periodicityIntPayment;
        this.processingFees = jsonObj.processingFees;
    }
}

export class OtherFeeCharges {
    merchantServiceFee: string;
    documentCharges: string;
    noOfTerminal: string;
    edcRental: string;
    insurance: string;
    frankingCharges: string;
    reviewOrRenewal: string;
    primarySecurity: string;
    collateralSecurity: string;
    // processingFees: string;
    prepayment: string;
    nonSettlemntCharges: string;
    chequeEcsCharges: string;
    duplicateAmortizationCharge: string;
    loanCharges: string;
    issuanceChargesPhotocopy: string;
    legalCharges: string;
    stampDuty: string;
    constructor(jsonObj) {
        this.merchantServiceFee = jsonObj.merchantServiceFee;
        this.documentCharges = jsonObj.documentCharges;
        this.noOfTerminal = jsonObj.noOfTerminal;
        this.edcRental = jsonObj.edcRental;
        this.insurance = jsonObj.insurance;
        this.frankingCharges = jsonObj.frankingCharges;
        this.reviewOrRenewal = jsonObj.reviewOrRenewal;
        this.primarySecurity = jsonObj.primarySecurity;
        this.collateralSecurity = jsonObj.collateralSecurity;
        // this.processingFees = jsonObj.processingFees;
        this.prepayment = jsonObj.prepayment;
        this.nonSettlemntCharges = jsonObj.nonSettlemntCharges;
        this.chequeEcsCharges = jsonObj.chequeEcsCharges;
        this.duplicateAmortizationCharge = jsonObj.duplicateAmortizationCharge;
        this.loanCharges = jsonObj.loanCharges;
        this.issuanceChargesPhotocopy = jsonObj.issuanceChargesPhotocopy;
        this.legalCharges = jsonObj.legalCharges;
        this.stampDuty = jsonObj.stampDuty;
    }
}

export class CollateralSecurity {
    documentCharges: string;
    insurance: string;
    frankingCharges: string;
    edcRental: string;
    edcInstallationCharges: string;
    nameOfOwner: string;
    addrPerSaleDeed: string;
    prepayment: string;
    otherPreDisbCond: string;
    specialMontCond: string;
    othrStdCovenantCond: string;
    loanDocuments: string;
    detailsOfPrsnlGuaran: Details[];
    detailsOfCorpGuaran: Details[];
    constructor(jsonObj) {
        this.documentCharges = jsonObj.documentCharges;
        this.insurance = jsonObj.insurance;
        this.frankingCharges = jsonObj.frankingCharges;
        this.edcRental = jsonObj.edcRental;
        this.edcInstallationCharges = jsonObj.edcInstallationCharges;
        this.nameOfOwner = jsonObj.nameOfOwner;
        this.addrPerSaleDeed = jsonObj.addrPerSaleDeed;
        this.prepayment = jsonObj.prepayment;
        this.otherPreDisbCond = jsonObj.otherPreDisbCond;
        this.specialMontCond = jsonObj.specialMontCond;
        this.othrStdCovenantCond = jsonObj.othrStdCovenantCond;
        this.loanDocuments = jsonObj.loanDocuments;

        this.detailsOfPrsnlGuaran = new Array();
        if (jsonObj.detailsOfPrsnlGuaran && jsonObj.detailsOfPrsnlGuaran.length) {
            jsonObj.detailsOfPrsnlGuaran.forEach(item => {
                this.detailsOfPrsnlGuaran.push(new Details(item));
            }, this);
        }

        this.detailsOfCorpGuaran = new Array();
        if (jsonObj.detailsOfCorpGuaran && jsonObj.detailsOfCorpGuaran.length) {
            jsonObj.detailsOfCorpGuaran.forEach(item => {
                this.detailsOfCorpGuaran.push(new Details(item));
            }, this);
        }
    }
}

export class SanctionLetter {
    assessmentType: string;
    placeOfAgreement: string;
    nameOfBorrower: string;
    addrOfBorrower: string;
    mobileNo: string;
    coborrowerDetails: CoborrowerDetails;
    detailsOfTheAccount: DetailsOfTheAccount;
    otherFeeCharges: OtherFeeCharges;
    collateralSecurity: CollateralSecurity;
    annexure1: any;
    annexure2: any;
    constructor(jsonObj) {
        if (jsonObj) {
            this.assessmentType = jsonObj.assessmentType;
            this.placeOfAgreement = jsonObj.placeOfAgreement;
            this.nameOfBorrower = jsonObj.nameOfBorrower;
            this.addrOfBorrower = jsonObj.addrOfBorrower;
            this.mobileNo = jsonObj.mobileNo;
            this.annexure1 = jsonObj.annexure1;
            this.annexure2 = jsonObj.annexure2;

            this.coborrowerDetails = new CoborrowerDetails(jsonObj);
            this.detailsOfTheAccount = new DetailsOfTheAccount(jsonObj);
            this.otherFeeCharges = new OtherFeeCharges(jsonObj);
            this.collateralSecurity = new CollateralSecurity(jsonObj);
        } else {
            this.assessmentType = '';
            this.coborrowerDetails = new CoborrowerDetails({});
            this.detailsOfTheAccount = new DetailsOfTheAccount({});
            this.otherFeeCharges = new OtherFeeCharges({});
            this.collateralSecurity = new CollateralSecurity({});
        }
    }
}

export class CifGenerationList {
    cpId: string;
    entity: string;
    applNum: String;
    entityType: string;
    proofOfIndentiy1: string;
    proofOfIndentiy2: string;
    proofOfAddress: string;
    cifNo: string;
    ckycNo: string;
    poaDocId: string;
    docId: string;
    cifList: {}[];
    cifFlag: string;
    isEntity: number;
    iWorksId: number;
    workItemNum: string;
    constructor(jsonObj) {
        if (jsonObj) {
            this.cpId = jsonObj.cpId;
            this.poaDocId = jsonObj.poaDocId;
            this.entity = jsonObj.entity;
            this.applNum = jsonObj.applNum;
            this.entityType = jsonObj.entityType;
            this.proofOfIndentiy1 = jsonObj.proofOfIndentiy1;
            this.proofOfIndentiy2 = jsonObj.proofOfIndentiy2;
            this.proofOfAddress = jsonObj.proofOfAddress;
            this.cifNo = jsonObj.cifNo;
            this.ckycNo = jsonObj.ckycNo;
            this.cifFlag = jsonObj.cifFlag;
            this.isEntity = jsonObj.isEntity;
            this.docId = jsonObj.docId;
            this.iWorksId = jsonObj.iWorksId;
            this.workItemNum = jsonObj.workItemNum;
            this.cifList = new Array();
            if (jsonObj.cifList && jsonObj.cifList.length) {
                jsonObj.cifList.forEach(item => {
                    this.cifList.push({ 'cifNo': item.cifNo, 'isSelected': item.isSelected });
                }, this);
            }
        } else {
            this.cifList = new Array();
        }
    }
}
export class CurrentAccountCreation {
    cpId: string;
    docId: String;
    poaDocId: string;
    entity: string;
    currentAccountNo: string;
    entityType: string;
    proofOfIndentiy1: string;
    proofOfIndentiy2: string;
    proofOfAddress: string;
    currentAcctGenFlag: string;


    constructor(jsonObj) {
        if (jsonObj) {
            this.cpId = jsonObj.cpId;
            this.docId = jsonObj.docId;
            this.poaDocId = jsonObj.poaDocId;
            this.entity = jsonObj.entity;
            this.currentAcctGenFlag = jsonObj.currentAcctGenFlag;
            this.currentAccountNo = jsonObj.currentAccountNo;
            this.entityType = jsonObj.entityType;
            this.proofOfIndentiy1 = jsonObj.proofOfIndentiy1;
            this.proofOfIndentiy2 = jsonObj.proofOfIndentiy2;
            this.proofOfAddress = jsonObj.proofOfAddress;
        } else {
        }
    }
}

export class SecurityDetails {
    isInitiate: boolean;
    collateralId: string;
    appId: string;
    securityType: string;
    propertyType: string;
    collateralType: string;
    securityID: string;
    insuranceApplicable: string;
    ltv: string;
    collateralCover: string;
    claimType: string;
    workItemNum: string;

    constructor(jsonObj) {
        if (jsonObj) {
            this.isInitiate = jsonObj.isInitiate;
            this.appId = jsonObj.appId;
            this.securityID = jsonObj.securityID;
            this.collateralId = jsonObj.collateralId;
            this.securityType = jsonObj.securityType;
            this.propertyType = jsonObj.propertyType;
            this.collateralType = jsonObj.collateralType;
            this.insuranceApplicable = jsonObj.insuranceApplicable;
            this.ltv = jsonObj.ltv;
            this.collateralCover = jsonObj.collateralCover;
            this.claimType = jsonObj.claimType;
            this.workItemNum = jsonObj.workItemNum;
        }
    }
}

export class CifGeneration {
    assessmentType: string;

    cifGenerationList: CifGenerationList[];
    currentAcctCreationList: CurrentAccountCreation[];
    securityDetails: SecurityDetails[];
    constructor(jsonObj) {
        if (jsonObj) {
            this.assessmentType = jsonObj.assessmentType;
            this.currentAcctCreationList = new Array();
            if (jsonObj.currentAcctCreationList && jsonObj.currentAcctCreationList.length) {
                jsonObj.currentAcctCreationList.forEach(item => {
                    this.currentAcctCreationList.push(new CurrentAccountCreation(item));
                }, this);
            }
            this.cifGenerationList = new Array();
            if (jsonObj.cifGenerationList && jsonObj.cifGenerationList.length) {
                jsonObj.cifGenerationList.forEach(item => {
                    this.cifGenerationList.push(new CifGenerationList(item));
                }, this);
            }

            this.securityDetails = new Array();
            if (jsonObj.securityDetails && jsonObj.securityDetails.length) {
                jsonObj.securityDetails.forEach(item => {
                    // if (item.insuranceApplicable && item.insuranceApplicable == 'YES') {
                    this.securityDetails.push(new SecurityDetails(item));
                    // }
                }, this);
            }
        } else {
            this.assessmentType = '';
            this.cifGenerationList = new Array();
            this.currentAcctCreationList = new Array();
            this.securityDetails = new Array();
        }
    }
}
export class LoanAccountNumberCreation {
    cpId: string;
    entity: string;
    entityType: string;
    proofOfIndentiy1: string;
    proofOfIndentiy2: string;
    proofOfAddress: string;
    loanAccountNumber: string;
    loanAccNoFlag: any;
    showDLODSetup:any;
    flagForDevType: number;
    assessmentType: string;
    loanProposalType: string;
    transId: string;
    isCopsDocVerified: number;
    acctOpenDt: any;
    sanctionLimit: string;
    inputDate: any;
    reducingPeriodInMonths: string;
    dlodDetailsFurnishFlag: any;
    isDlodUpdateSubmitted: any;
    loanCancellationEnabled: any;
    isLoanCancel: any;

    constructor(jsonObj) {
        if (jsonObj) {
            this.cpId = jsonObj.cpId;
            this.assessmentType = jsonObj.assessmentType;
            this.loanProposalType = jsonObj.loanProposalType;
            this.isCopsDocVerified = jsonObj.isCopsDocVerified;
            this.transId = jsonObj.transId;
            this.entityType = jsonObj.entityType;
            this.entity = jsonObj.entity;
            this.proofOfIndentiy1 = jsonObj.proofOfIndentiy1;
            this.proofOfIndentiy2 = jsonObj.proofOfIndentiy2;
            this.proofOfAddress = jsonObj.proofOfAddress;
            this.loanAccountNumber = jsonObj.loanAccountNumber;
            this.loanAccNoFlag = jsonObj.loanAccNoFlag;
            this.flagForDevType = jsonObj.flagForDevType;
            // jsonObj.month ? moment(jsonObj.month, "MM/YYYY").format('MMM YYYY') : '';
            this.acctOpenDt = jsonObj.acctOpenDt ? moment(jsonObj.acctOpenDt, "YYYY-MM-DD").format('DD/MM/YYYY') : '';

            this.sanctionLimit = jsonObj.sanctionLimit;
            this.inputDate = jsonObj.inputDate ? new DMYDateFormater(jsonObj.inputDate) : null;
            this.reducingPeriodInMonths = jsonObj.reducingPeriodInMonths;
            this.dlodDetailsFurnishFlag = jsonObj.dlodDetailsFurnishFlag;
            this.showDLODSetup = jsonObj.showDLODSetup;
            this.isDlodUpdateSubmitted = jsonObj.isDlodUpdateSubmitted;
            this.loanCancellationEnabled = jsonObj.loanCancellationEnabled ? jsonObj.loanCancellationEnabled : 0;
            this.isLoanCancel = jsonObj.isLoanCancel ? jsonObj.isLoanCancel : 0;
        } else {
            this.cpId = '';
            this.assessmentType = '';
            this.entityType = '';
            this.proofOfIndentiy1 = '';
            this.proofOfIndentiy2 = '';
            this.proofOfAddress = '';
            this.loanAccountNumber = '';
            this.loanAccNoFlag = 0;
            this.flagForDevType = 1;
            this.transId = '';

            this.sanctionLimit = '';
            this.inputDate = '';
            this.reducingPeriodInMonths = '';
            this.dlodDetailsFurnishFlag = '';
            this.showDLODSetup='';
            this.isDlodUpdateSubmitted = '';
            this.loanCancellationEnabled = 0;
        }
    }

}
export class EnachMandate {
    cpId: string;
    entity: string;
    currentAccountNo: string;
    bank: number;
    ifscCode: string;
    status: string;
    iWorksId: string;
    accType: number;
    branch: number;
    micrCode: string;
    emiAmount: string;
    startDate: any;
    endDate: any;
    paymentMode: string;
    assessmentType: string;
    ediAmount: string;

    constructor(jsonObj) {
        if (jsonObj) {
            this.cpId = jsonObj.cpId;
            this.entity = jsonObj.entity;
            this.paymentMode = jsonObj.paymentMode;
            this.currentAccountNo = jsonObj.currentAccountNo;
            this.bank = jsonObj.bank ? jsonObj.bank : '10';
            this.ediAmount = jsonObj.ediAmount;
            this.assessmentType = jsonObj.assessmentType ? jsonObj.assessmentType : null;
            this.ifscCode = jsonObj.ifscCode;
            this.status = jsonObj.status;
            this.iWorksId = jsonObj.iWorksId;
            this.accType = jsonObj.accType ? jsonObj.accType : 45;
            this.branch = jsonObj.branch;
            this.micrCode = jsonObj.micrCode;
            this.emiAmount = jsonObj.emiAmount;
            this.startDate = jsonObj.startDate ? new DMYDateFormater(jsonObj.startDate) : null;
            this.endDate = jsonObj.endDate ? new DMYDateFormater(jsonObj.endDate) : null;
        } else {
            this.cpId = '';
            this.entity = '';
            this.currentAccountNo = '';
            this.bank = 0;
            this.ifscCode = '';
            this.status = '';
            this.iWorksId = '';
            this.accType = 0;
            this.branch = 0;
            this.micrCode = '';
            this.emiAmount = '';
            this.startDate = '';
            this.endDate = '';
            this.assessmentType = '';
        }
    }
}

export class User {

    userType: string;
    dsaMaster: string;
    subTypeId: string;
    subTypeValue: string;
    firstName: string;
    lastName: string;
    email: string;
    userStatus: string;
    creationDate: any;
    userName: string;
    userId: string;
    city: any;
    branch: any;
    salutation: any;
    role: any;
    roleName: string;
    cityName: string;
    employeeId: string;
    Mobile: string;
    designation: any;
    isLdapUser: any;
    designationName: string;
    citygroupId: any;
    level: any;
    rmName: any;
    rmId: any;
    solId: any;


    constructor(jsonObj) {
        if (jsonObj) {
            this.userType = jsonObj.userType ? jsonObj.userType : '';
            this.dsaMaster = jsonObj.dsaId ? jsonObj.dsaId : '';
            this.subTypeId = jsonObj.subTypeId ? jsonObj.subTypeId : '';
            this.subTypeValue = jsonObj.subTypeValue ? jsonObj.subTypeValue : '';
            this.firstName = jsonObj.firstName;
            this.lastName = jsonObj.lastName;
            this.employeeId = jsonObj.employeeId;
            this.isLdapUser = jsonObj.isLdapUser ? Number(jsonObj.isLdapUser) : '';
            this.salutation = jsonObj.salutation ? Number(jsonObj.salutation) : '';
            this.email = jsonObj.email ? jsonObj.email : '';
            this.Mobile = jsonObj.contactNo ? jsonObj.contactNo : '';
            this.citygroupId = jsonObj.citygroupId;
            this.userStatus = jsonObj.status ? jsonObj.status : '';
            this.cityName = jsonObj.cityName;
            this.branch = jsonObj.dsaBranchId ? jsonObj.dsaBranchId : '';
            this.designation = jsonObj.designation ? Number(jsonObj.designation) : '';
            this.designationName = jsonObj.designationName;
            this.roleName = jsonObj.roleName;
            this.creationDate = jsonObj.creationDate ? new DMYDateFormater(jsonObj.creationDate) : null;
            this.userName = jsonObj.userName;
            this.userId = jsonObj.userId;
            this.city = jsonObj.city ? Number(jsonObj.city) : '';
            this.role = jsonObj.role ? Number(jsonObj.role) : '';
            this.level = jsonObj.levelLookupKey ? Number(jsonObj.levelLookupKey) : '';
            this.rmName = jsonObj.rmName;
            this.rmId = jsonObj.rmUserId ? Number(jsonObj.rmUserId) : '';
            this.solId = jsonObj.solId;
        }
    }
}
export class UserList {

    totalNumberRecords: string;
    totalNumberPages: string;

    record: User[];

    constructor(jsonObj) {
        if (jsonObj) {
            this.totalNumberRecords = jsonObj.totalNumberRecords;
            this.totalNumberRecords = jsonObj.totalNumberRecords;

            this.record = new Array();
            if (jsonObj.record && jsonObj.record.length) {
                jsonObj.record.forEach(item => {
                    this.record.push(new User(item));
                }, this);
            }
        }
    }
}
export class RoleList {
    totalNumberRecords: string;
    totalNumberPages: string;

    record: Role[];

    constructor(jsonObj) {
        if (jsonObj) {
            this.totalNumberRecords = jsonObj.totalNumberRecords;
            this.totalNumberRecords = jsonObj.totalNumberRecords;

            this.record = new Array();
            if (jsonObj.record && jsonObj.record.length) {
                jsonObj.record.forEach(item => {
                    this.record.push(new Role(item));
                }, this);
            }
        }
    }
}
export class Role {
    roleId: string;
    roleName: string;

    constructor(jsonObj) {
        if (jsonObj) {
            this.roleId = jsonObj.roleId;
            this.roleName = jsonObj.roleName;

        } else {
            this.roleId = '';
            this.roleName = '';
        }
    }
}
export class userScreen {

    screenId: string;
    screenName: string;


    constructor(jsonObj) {
        if (jsonObj) {
            this.screenId = jsonObj.screenId;
            this.screenName = jsonObj.screenName;
        }
    }
}
export class UserScreens {
    roleId: string;
    record: userScreen[];

    constructor(jsonObj) {
        if (jsonObj) {
            this.roleId = jsonObj.roleId;
            this.record = new Array();
            if (jsonObj.record && jsonObj.record.length) {
                jsonObj.record.forEach(item => {
                    this.record.push(new userScreen(item));
                }, this);
            }
        }
    }
}
export class EdcAddrInstallList {
    edcAddrId: any;
    addressOfInst: any;
    state: any;
    pincode: any;
    edcType: any;
    contactPerson: any;
    contactNumber: any;
    constructor(jsonObj) {
        if (jsonObj) {
            this.edcAddrId = jsonObj.edcAddrId;
            this.addressOfInst = jsonObj.addressOfInst;
            this.state = jsonObj.state;
            this.pincode = jsonObj.pincode;
            this.edcType = jsonObj.edcType;
            this.contactPerson = jsonObj.contactPerson;
            this.contactNumber = jsonObj.contactNumber;

        }

    }
}


export class EdcOfferLetterVO {
    acctNo: string;
    actvIntCrdtReq: string;
    applicantName: string;
    assessmentType: string;
    email: string;
    sourcingVertical: string;
    installationCharges: string;
    location: string;
    mdrMsfIntr: string;
    mdrMsfIndia: string;
    mdrMsfDomestic: string;
    meCategory: string;
    mobileNo: string;
    noOfGprs: string;
    noOfPstn: string;
    noOfTerminal: string;
    rentalCostGprs: string;
    rentalCostPstn: string;
    segment: string;
    zone: string;

    addressOfInst: string;
    state: string;
    pincode: string;
    edcType: string;
    contactPerson: string;
    contactNumber: string;
    sourceOfficialName: string;
    ecn: string;
    nameOfMe: string;
    edcInstallAddrList: EdcAddrInstallList[];

    constructor(jsonObj) {
        if (jsonObj) {
            this.acctNo = jsonObj.acctNo;
            this.actvIntCrdtReq = jsonObj.actvIntCrdtReq;
            this.applicantName = jsonObj.applicantName;
            this.assessmentType = jsonObj.assessmentType;
            this.email = jsonObj.email;
            this.sourcingVertical = 'LACR';
            this.installationCharges = jsonObj.installationCharges;
            this.location = jsonObj.location;
            this.mdrMsfIntr = jsonObj.mdrMsfIntr;
            this.mdrMsfIndia = jsonObj.mdrMsfIndia;
            this.mdrMsfDomestic = jsonObj.mdrMsfDomestic;
            this.meCategory = jsonObj.meCategory;
            this.mobileNo = jsonObj.mobileNo;
            this.noOfGprs = jsonObj.noOfGprs;
            this.noOfPstn = jsonObj.noOfPstn;
            this.noOfTerminal = jsonObj.noOfTerminal;
            this.rentalCostGprs = jsonObj.rentalCostGprs;
            this.rentalCostPstn = jsonObj.rentalCostPstn;
            this.segment = jsonObj.segment;
            this.zone = jsonObj.zone;
            this.addressOfInst = jsonObj.addressOfInst;
            this.state = jsonObj.state;
            this.pincode = jsonObj.pincode;
            this.edcType = jsonObj.edcType;
            this.contactPerson = jsonObj.contactPerson;
            this.contactNumber = jsonObj.contactNumber;
            this.sourceOfficialName = jsonObj.sourceOfficialName;
            this.ecn = jsonObj.ecn;
            this.nameOfMe = jsonObj.nameOfMe;

            this.edcInstallAddrList = new Array();
            if (jsonObj.edcInstallAddrList && jsonObj.edcInstallAddrList.length) {
                jsonObj.edcInstallAddrList.forEach(item => {
                    this.edcInstallAddrList.push(new EdcAddrInstallList(item));
                }, this);
            }
        } else {
            this.edcInstallAddrList = new Array();
        }
    }
}

export class PosBankDetails {
    bankId: any;
    accountType: any;
    bankAccountNo: any;
    bankName: any;
    branchName: any;
    micr: any;
    ifscCode: any;
    isChecked: any;

    constructor(jsonObj) {
        if (jsonObj) {
            this.bankId = jsonObj.bankId;
            this.accountType = jsonObj.accountType ? jsonObj.accountType : '-';
            this.bankAccountNo = jsonObj.bankAccountNo ? jsonObj.bankAccountNo : '';
            this.bankName = jsonObj.bankName ? jsonObj.bankName : '-';
            this.branchName = jsonObj.branchName ? jsonObj.branchName : '-';
            this.micr = jsonObj.micr ? jsonObj.micr : '-';
            this.ifscCode = jsonObj.ifscCode ? jsonObj.ifscCode : '-';
            this.isChecked = jsonObj.isChecked == 1 ? true : (jsonObj.isChecked == 0 ? false : false);

        } else {
            this.bankId = '';
            this.accountType = '';
            this.bankAccountNo = '';
            this.bankName = '';
            this.branchName = '';
            this.micr = '';
            this.ifscCode = '';
            this.isChecked = '';
        }
    }
}

export class PosAccountDetails {
    bankId: string;
    cpId: string;
    entity: string;
    bankAccountNo: string;
    ediAmount: string;
    ediStartDate: string;
    ediEndDate: string;
    initiatePosInstallation: number;

    posBankDetails: PosBankDetails[];

    constructor(jsonObj) {
        if (jsonObj) {
            this.bankId = jsonObj.bankId;
            this.cpId = jsonObj.cpId != null ? jsonObj.cpId : '0';
            this.entity = jsonObj.entity != null ? jsonObj.entity : '0';
            this.bankAccountNo = jsonObj.bankAccountNo != null ? jsonObj.bankAccountNo : '0';
            this.ediAmount = jsonObj.ediAmount != null ? jsonObj.ediAmount : '0';
            this.ediStartDate = jsonObj.ediStartDate != null ? jsonObj.ediStartDate : '0';
            this.ediEndDate = jsonObj.ediEndDate != null ? jsonObj.ediEndDate : '0';


            this.initiatePosInstallation = 0;
            if (jsonObj.initiatePosInstallation && jsonObj.initiatePosInstallation == 1) {
                this.initiatePosInstallation = 1;
            }


            this.posBankDetails = new Array();
            if (jsonObj.posBankDetails && jsonObj.posBankDetails.length) {
                jsonObj.posBankDetails.forEach(item => {
                    this.posBankDetails.push(new PosBankDetails(item));
                }, this);
            }
        } else {
            this.posBankDetails = new Array();

        }
    }
}

export class PosDocuments {
    documentId: string;
    documentType: string;
    uploadedDocumentName: string;
    documentUploadedDate: string;
    isDeleted: string;
    cpId: string;
    edited: string;
    constructor(jsonObj) {
        if (jsonObj) {
            this.documentId = jsonObj.documentId;
            this.documentType = jsonObj.documentType;
            this.uploadedDocumentName = jsonObj.uploadedDocumentName;
            this.documentUploadedDate = jsonObj.documentUploadedDate;
            this.isDeleted = jsonObj.isDeleted;
            this.cpId = jsonObj.cpId;
            this.edited = jsonObj.edited;
        } else {
            this.documentId = ' ';
            this.documentType = ' ';
            this.uploadedDocumentName = ' ';
            this.documentUploadedDate = ' ';
            this.isDeleted = ' ';
            this.cpId = ' ';
            this.edited = ' ';
        }
    }
}

export class PosMachineDetails {
    posMachineId: any;
    mid: string;
    tid: string;
    status: string;
    applicationId: string;
    constructor(jsonObj) {
        if (jsonObj) {
            this.posMachineId = jsonObj.posMachineId;
            this.mid = jsonObj.mid;
            this.tid = jsonObj.tid;
            this.status = jsonObj.status;
            this.applicationId = jsonObj.applicationId;
        } else {
            this.posMachineId = '';
            this.mid = '';
            this.tid = '';
            this.status = '';
            this.applicationId = '';
        }
    }
}

export class PosInstallation {
    posAccountDetails: PosAccountDetails;
    posMachineDetails: PosMachineDetails[];
    // posMachineDetails: PosMachineDetails;
    edcOfferLetterVO: EdcOfferLetterVO;
    posDocuments: PosDocuments[];
    assessmentType: string;
    workItemNum:any;
    constructor(jsonObj) {
        if (jsonObj) {
            this.assessmentType = jsonObj.assessmentType;
            this.workItemNum = jsonObj.workItemNum;
            this.posAccountDetails = new PosAccountDetails(jsonObj.posAccountDetails);
            // this.posMachineDetails = new PosMachineDetails(jsonObj.posMachineDetails);
            this.edcOfferLetterVO = new EdcOfferLetterVO(jsonObj.edcOfferLetterVO);
            this.posDocuments = new Array();
            if (jsonObj.posDocuments && jsonObj.posDocuments.length) {
                jsonObj.posDocuments.forEach(item => {
                    this.posDocuments.push(new PosDocuments(item));
                }, this);
            }

            this.posMachineDetails = new Array();
            if (jsonObj.posMachineDetails && jsonObj.posMachineDetails.length) {
                jsonObj.posMachineDetails.forEach(item => {
                    this.posMachineDetails.push(new PosMachineDetails(item));
                }, this);
            }
        } else {
            this.posDocuments = new Array();
            this.assessmentType = '';
            this.posMachineDetails = new Array();
        }
    }
}

export class GroupExposureByRow {
    cpId: any;
    cifId: any;
    acctNumber: any;
    loanType: any;
    outstandingLoanAmt: any;
    loanAmt: any;

    constructor(jsonObj) {
        if (jsonObj) {
            this.cpId = jsonObj.cpId;
            this.cifId = jsonObj.cifId;
            this.acctNumber = jsonObj.acctNumber ? jsonObj.acctNumber : '';
            this.loanType = jsonObj.loanType ? jsonObj.loanType : '';
            this.outstandingLoanAmt = jsonObj.outstandingLoanAmt ? jsonObj.outstandingLoanAmt : '';
            this.loanAmt = jsonObj.loanAmt ? jsonObj.loanAmt : '';
        }
    }
}

export class GroupExposure {
    groupExposureByRow: GroupExposureByRow[];
    totalOutstandingAmount: any;

    constructor(jsonObj) {
        if (jsonObj) {
            this.totalOutstandingAmount = jsonObj.totalOutstandingAmount ? jsonObj.totalOutstandingAmount : '0';
            this.groupExposureByRow = new Array();
            if (jsonObj.groupexposureByCpId && jsonObj.groupexposureByCpId.length) {
                jsonObj.groupexposureByCpId.forEach(item => {
                    this.groupExposureByRow.push(new GroupExposureByRow(item));
                }, this);
            }
        } else {
            this.groupExposureByRow = new Array();
        }
    }
}
