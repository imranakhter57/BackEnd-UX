export class User {
    appPackageId: string;
    roleId: string;
    roleName: string;
    userId: string;
    userFullName: string;
    authorization: string;
    groupCode: string;
    policyVersion: string;
    cpId: string;
    cpPolicy: string;
    aliasName: string;
    totalRecords: string;
    ruleId: any;

    constructor(jsonObj) {
        if (jsonObj) {
            this.appPackageId = jsonObj.appPackageId ? jsonObj.appPackageId.toString() : '';
            this.roleId = jsonObj.roleId;
            this.roleName = jsonObj.roleName;
            this.userId = jsonObj.userId;
            this.userFullName = jsonObj.userFullName;
            this.authorization = jsonObj.authorization;
            this.groupCode = jsonObj.groupCode;
            this.policyVersion = jsonObj.policyVersion;
            this.ruleId = jsonObj.ruleId;
            this.cpId = jsonObj.cpId;
            this.cpPolicy = jsonObj.cpPolicy;
            this.aliasName = jsonObj.aliasName;
            this.totalRecords = jsonObj.totalRecords;
        } else {
            this.appPackageId = '';
            this.roleId = '0';
            this.roleName = '';
            this.userId = '';
            this.userFullName = '';
            this.authorization = '';
            this.groupCode = '';
            this.policyVersion = '';
            this.cpId = '';
            this.cpPolicy = '';
            this.totalRecords = '';
            this.ruleId = '';
        }
    }
}
