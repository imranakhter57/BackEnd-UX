import { InjectionToken } from '@angular/core';
import { IAppConfig } from './iapp.config';

export let APP_CONFIG = new InjectionToken('app.config');

const data: IAppConfig = {
    autosaveTimeout: 25000,

    /*While adding any new KeyCode below make sure to update regex too*/
    restrictedChars: [49, 52, 54, 56, 188, 190],
    restrictedCharsRegEx: '[!\\$\\^*<>]',
    restrictedAllSpecialCharsRegEx: '[!\\$^\'*<>_@#$%&()=+{};:,./?"|~`\-]',
    restrictedCharsRegExForAddress: '[!\\^\'*%[]()=+{}?"|~`]',
    // LACR host
  host: 'http://localhost:9090/LMS/',

    endpoints: {
        logout: 'request/logout',
        addNewBook: 'dashboard/addNewBook',
        login: 'request/login',
        screenManagement: 'request/screenManagement',
        approval: 'request/trigger-workflow',
        onPageLoad: 'clip/audit/saveUserNavigationDtls',

        reverseWorkflow: 'request/reverse-workflow',
        saveDsa: 'request/save-dsa',
        getDsa: 'request/get-dsa-journey-detail',
        sendWithRemark: 'request/send-with-remark',
        initiatedisbursement: 'request/initiate-disbursement',

        getTaskboard: 'request/get-taskboard',
        getDashboard: 'request/get-search-taskboard',
        getDsaDashboard: 'request/get-dsa-dashboard',

        getUserList: 'request/getUser',
        getRolesList: 'request/getUserRole',
        saveNewUser: 'request/addUser',
        searchUser: 'request/getUserByName',
        editUser: 'request/editUser',
        UserScreen: 'request/getUserScreen',
        saveUserScreen: 'request/saveScreens',
        getSecurityList: 'request/get-security',
        getAssigneeChanges: 'request/get-assignee-changes',

        /* Rule API START */
        // getAllCategoryList: 'request/rulesengine/getCategories',
        // getCategoryListByClientId: 'request/rulesengine/getCategoriesByClientId',
        // getAllRulesList: 'request/rulesengine/',
        // getCategoryList: 'request/rulesengine/getCategoriesByClientId',
        // getRulesListByCategoryIdAndClientId: 'request/rulesengine/getRulesByCategoryIdAndClientId',
        // addCategoryToClient: 'request/rulesengine/addCategoryToClient',
        // addRuleToClient: 'request/rulesengine/addRuleToClient',
        // getVariablesList: 'request/rulesengine/getVariablesList',
        // addVariable: 'request/rulesengine/',
        /* Rule API END */

        reInitiate: 'request/reinitiate-application',
        getAssignTo: 'request/get-assign-to',
        saveAssignTo: 'request/save-assign-to',
        accountCreation: 'request/accountCreation',
        odAccountCreation: 'request/odAccountCreation',
        applicationAssignTo: 'request/assign-to-me',

        appOverview: 'request/get-app-overview',
        getFIReport: 'request/get-fi-report',
        getRCUReport: 'request/get-rcu-report',
        getSiteVisitReport: 'request/getSiteVisitReport',
        saveSiteVisit: 'request/saveSiteVisitReport',
        pmtAdd: 'request/pmtAdd',
        pmtIftAdd: 'request/xferTrans',

        getConsumerCibilReport: 'request/get-cibil-consumer-details',
        ritriggerConsumerCibil: 'request/retrigger-cibil-consumer',
        saveConsumerCibilReport: 'request/save-cibil-consumer-details',
        consumerCibilDpdList: 'request/getDpdStringFormat',
        consumerEnquiryList: 'request/getAllEnquiry',

        getCiBILCommercialDetails: 'request/get-cibil-commercial-details',
        saveCiBILCommercialDetails: 'request/save-cibil-commercial-details',
        retriggerCommercialCibil: 'request/retrigger-cibil-commercial',

    
        getFinanceInput: 'request/get-financial-input',
        downloadCamData: 'request/download-financial-cam',
        projection: 'request/get-projection-details',
        getFinanceOutput: 'request/get-financial-output',
        listScreening: 'request/list-screening',
        saveListScreening: 'request/save-list-screening',
        listScreeningRetrigger: 'request/list-match-screening',
        getCollateralInput: 'request/getCollateralDetails',
        saveCollateralInput: 'request/saveCollateralDetails',
        saveAsDraftCollateralInput: 'request/saveDraftCollateralDetails',
        saveFIReport: 'request/save-fi-report',
        getGeoTag: 'request/save-fi-report',
        deleteFiReport: 'request/removeFIDoc',
        saveRCUReport: 'request/save-rcu-report',
        getTerms: 'request/get-tnc-details',
        saveTerms: 'request/save-tcn-details',
        deleteTerms: 'request/deleteTermsAndCondition',
        getDeviation: 'request/get-deviation-details',
        getCamScoreCard: 'request/get-breScorecard',
        saveDeviation: 'request/save-deviation-details',
        deviationApproveReject: 'request/deviationApproveReject',

        getAssessmentType: 'request/get-assessment-type',


        deleteDeviation: 'request/deleteDeviation',
        getScoreCard: 'request/getScoreCard',

        getPricing: 'request/get-pricing',
        savePricing: 'request/save-pricing',
        getPriceRate: 'request/callMclr',
        getHouseHolding: 'request/get-dedupe-Details',
        saveHouseHolding: 'request/save-dedupe-details',
        retriggerHouseHolding: 'request/save-dedupe-details',

        getAssessmentReport: 'request/get-assessment-details',
        saveAssesmentReport: 'request/save-assessment-details',
        rtrInputDetails: 'request/getrtrInputDetails',
        rtrOutputDetails: 'request/rtrOutputDetails',
        deleteRtr: 'request/deleteRTR',
        saveFinanceInput: 'request/save-financial-input-details',
        autosaveFinanceInput: 'request/autosave-financial-input-details',
        uploadFinanceDocument: 'request/uploadFinancialXls',
        saveRtrDetails: 'request/savertrInputDetails',
        autosaveRtrDetails: 'request/autosavertrInputDetails',
        getBankingInput: 'request/get-banking-input',
        deleteBanking: 'request/deleteBanking',
        saveBankingInput: 'request/save-banking-input',
        autosaveBankingInput: 'request/autosave-banking-input-details',
        getCardSalesInput: 'request/getCardSalesInputDetails',
        saveCardsalesInput: 'request/saveCardSalesInputDetails',
        deleteCardSales: 'request/deleteStoreDetails',
        autoSaveCardSalesInput: 'request/saveDraftCardSalesInput',

        getfoirReport: 'request/get-foir-details',
        getCamBorrower: 'request/getBorrowerDetails',
        saveCamBorrower: 'request/saveBorrowerDetails',
        exportCam: 'request/downloadCamPdf',
        exportCibil: 'request/download-cibil-report',
        exportRepaymentSchedule: 'request/downloadRepaymentPdf',
        getFinanceSummaryOutput: 'request/get-financial-output',
        getRtrSummaryOutput: 'request/rtrOutputDetails',
        getBankingSummaryOutput: 'request/get-banking-output',
        getDeviationSummaryOutput: 'request/get-deviation-details',
        getCardsalesSummaryOutput: 'request/getCardSalesOutputDetails',
        saveCardsalesSummaryOutput: 'request/saveCardSalesOutputDetails',

        getgstInput: 'request/get-gst-details',
        saveGstInput: 'request/save-gst-details',
        saveasDraftGst: 'request/save-as-draft-gst-details',
        getGstOutput: 'request/get-gst-output-details',
        deleteRcuDoc: 'request/removeRCUDoc',
        uploadRcuDocument: 'request/uploadRCUDocument',
        uploadFiDocument: 'request/uploadFIDocument',
        downloadFiDocument: 'request/downloadFIDocument',
        downloadRcuDocument: 'request/downloadRCUDocument',
        downloadRcuavailableDocument: 'request/downloadDocument',
        downloadConsumerCibil: 'request/download-cibil-cons-report',

        getDisbursementDocuments: 'request/getDisbusementDocument',
        saveDisbursementDocuments: 'request/saveDisbusementDocument',
        saveAsDarftDisbursementDocuments: 'request/saveDraftDisbusementDocument',
        generateCif: 'request/generateCif',
        intiateFd: 'request/intiateFd',
        fetchCif: 'request/fetchCif',
        fetchRetailCif: 'request/fetchRetailCif',
        fetchCorporateCif: 'request/fetchCorporateCif',
        getCamSummary: 'request/get-camsummary-basicdetails',
        pdfOrXlsView: 'request/downloadExcelDisbursmentDocument',

        checkPermissionDisbursalMemoDoc: 'request/downloadPermission/disbursalMemoDoc',
        downloadDisbursalMemoPdf: 'request/downloadDisbursalMemoPdf',

        intiateCkyc: 'request/intiateCkyc',
        documentPreview: 'request/documentPreview',
        initiateFundTranfer: 'request/initiate-fund-transfer',
        approveFundTranfer: 'request/approveFundTranfer',
        sendBackDisbursement: 'request/sendBackDisbursement',
        initiateDisbursement: 'request/initiateDisbursement',
        disburse: 'request/disburse',
        removeAccount: 'request/removeAccount',
        initiateLoanCreation: 'request/initiateLoanCreation',
        approveLoanCreation: 'request/approveLoanCreation',
        checkLoanCreation: 'request/checkLoanCreation',

        getCifGeneration: 'request/get-cif-generation',
        initiateNewCif: 'request/get-cif-generation',
        initiateCKYC: 'request/get-ckyc-generation',
        saveCifGeneration: 'request/save-cif-generation',

        getPDDModProduct: 'request/uploadToFinacle',
        getDisbursementMenu: 'request/get-disbursement-menu',
        saveDisbursementMenu: 'request/save-disbursement-menu',
        getSanctionLetter: 'request/get-sanction-letter',
        saveSanctionLetter: 'request/save-sanction-letter',
        getFundTransfer: 'request/get-fund-transfer',
        disbursementThroughDD: 'request/disbursement-through-dd',

        updateDrawingPower: 'request/updateDrawingPower',
        getLoanNoAccountCreation: 'request/get-loan-account-number-creation',
        saveLoanNoAccountCreation: 'request/save-loan-account-number-creation',
        customDlodSubmit:'request/customDlodSubmit',

        geteNachMandate: 'request/get-enach',
        saveeNachMandate: 'request/save-enach',

        uploadNACHDocument: 'request/uploadNACHDocument',
        generateReport: 'request/login-mis',
        laonCancel: 'request/cancelLoan',

        //payoff api's
        payOffEnquiry: 'request/payOffInq',
        payOffSuccess: 'request/payOffSuccess',
        payOffClose: 'request/payOffCloser',

        /**Pos Installation */
        getposDetails: 'request/getPOSInstallationDetails',
        savePosDetails: 'request/savePOSMachineDetails',
        getInit: 'request/initiatePosInstallation',
        uploadPosDocument: 'request/uploadPOSInstallDocument',
        downloadPosDocument: 'request/downloadPOSInstallDocument',
        deletePosDocument: 'request/deletePOSInstallDocument ',
        savePOSInstallationDetails: 'request/savePOSInstallationDetails',
        /**end */
        /* customer journey api*/
        saveProduct: 'request/save-product-details',
        autosaveProduct: 'request/autosave-product-details',
        saveCompany: 'request/save-company-details',
        autosaveCompany: 'request/autosave-company-details',
        savePromoters: 'request/save-promoter-details',
        saveDocuments: 'request/saveDocument',
        autosavePromoters: 'request/autosave-promoter-details',

        getProduct: 'request/get-product-details',
        getCompany: 'request/get-company-details',
        getCollaterals: 'request/get-collateral-details',
        saveCollaterals: 'request/save-collateral-details',
        deleteCollateral: 'request/delete-collateral-details',
        getPromoters: 'request/get-promoter-details',
        getDocuments: 'request/getAllDcouments',
        getBOCustType: 'request/getBOCustType',

        deleteSisterConcern: 'request/deleteSisterConcern',
        deleteCreditFacility: 'request/deleteExistingLoan',
        deleteReference: 'request/deleteReference',
        deletePromoter: 'request/deletePromoter',
        deleteGuarantors: 'request/deletePromoter',

        uploadDocument: 'request/uploadDocument',
        deleteDocument: 'request/deleteDocument',
        downloadDocument: 'request/downloadDocument',

        gstInfo: 'request/getGstInfo',
        getMcaCaptcha: 'request/getMcaCaptcha',
        getMcaInfo: 'request/getMcaInfo',

        /* AuditLog */
        getSystemLog: 'clip/audit/get-audit-syslogreport',
        getApplicationLog: 'clip/audit/get-audit-logreport',
        exportSystemLog: 'clip/audit/download-system-logreport',
        exportApplicationLog: 'clip/audit/download-audit-logreport',
        /* AuditLog End */

        sendAdharOtp: 'request/getEkycOtp',
        verifyAdhar: 'request/validateEkycOtp',

        submitApplication: 'request/submit-application',
        getDetailsByPan: 'request/getPanInfo',

        getDocumentCheckList: 'request/DocumentCheckList',

        perfiosRedirect: 'request/perfios/netBankingRedirection',
        perfiosDownload: 'request/perfiosDownloadDocument',
        perfiosUpload: 'request/perfios/statementUpload',

        generateEdcOfferLetter: 'request/generateEdcOfferLetter',

        getMisCodes: 'request/get-mis-codes',
        saveMisCode: 'request/save-mis-codes',
        getDeviationType: 'request/getDeviationType',

        getComputedUserNameForDSA: 'request/getComputedUserNameForDSA',
        getsolId: 'request/getSolId',
        downloadApplicationFormPdf: 'request/downloadApplicationFormPdf',

        uploadDocsIworks: 'request/uploadDocsIworks',

         //Group Exposure//
        getGroupExposure: 'request/get-group-exposure',
        saveGroupExposure: 'request/save-group-exposure',
        initiateGroupExposure: 'request/initiate-group-exposure',
        checkGroupExposure: 'request/check-group-exposure',


    },
    breEndpoints: {
        /* Rule API START */
        getPolicyDetails: 'bre/policy/get/',
        getDependency: 'bre/dependency/get',
        getVersionHistory: 'bre/version/update/get/versionhistory',
        clonePolicy: 'bre/version/update/clone',
        getThresholdPolicyMaker: 'bre/dependency/get/threshold',
        updateThreshold: 'bre/version/update/threshold',
        reviewThreshold: 'bre/version/update/preview',
        submitThreshold: 'bre/version/update/submit',

        /* BPMN chart */
        getBpmnServiceXml: 'bre/ruleFlow/get',
        getBpmnRuleBuilder: 'bre/rule/get',
        getBpmnRuleGroup: 'bre/rulegroup/get',
        getBpmnGlobalVariable: 'bre/globalVariable/get',
        getBpmnDecisionTable: 'bre/decisiontable/get',
        getBpmnParameter: 'bre/parameter/get',
        getBpmnDecisionTree: '',
        getBpmnSupportTable: '',
        getBpmnScorecard: 'bre/scoreCard/get',

        getAllRuleFlow: 'bre/dependency/data/dashboard',
        /* For execution creation (new Rule) */

        getRule: 'bre/rule/getRule',
        saveRule: 'bre/rule/save',
        getRuleGroup: 'bre/rulegroup/getRuleGroup',
        saveRuleGroup: 'bre/rulegroup/save',
        getRuleFlow: 'bre/ruleFlow/get',
        saveRuleFlow: 'bre/ruleFlow/save',
        getGlobalVariable: 'bre/globalVariable/getGlobalVariable',
        saveGlobalVariable: 'bre/globalVariable/save',

        rulesDetails: 'bre/details/get',

        copyGlobalVariable: 'bre/globalVariable/copy',
        copyRule: 'bre/rule/copy',

        //get threshold in policy maker updated as getThresholdPolicyMaker
        getThreshold: 'bre/threshold/getThreshold',
        saveThreshold: 'bre/threshold/save',
        getParameter: 'bre/parameter/getParameter',
        saveParameter: 'bre/parameter/save',
        getDecisionTable: 'bre/getDecisionTable',
        // saveDecisionTable: 'bre/decisionTable/save',
        getCreditPolicy: 'bre/policy/getPolicy',
        saveCreditPolicy: 'bre/policy/save',

        evaluate: 'bre/execution/evaluate',
        getDependencies: 'bre/threshold/getDependencies',

        /* Update execution is for all type*/
        updateExicution: 'bre/update/entity',
        policyUpdate: 'bre/policy/update',

        /* FV Update execution is for all type*/
        updateFVExicution: 'bre/version/update/policy/record',
        /*review and submit */
        reviewUpdate: 'bre/preview/changes',
        reviewSubmit: 'bre/submit/policy',

        // Decision table enpoints
        getOperationType: 'bre/decisiontable/get-operation-types',
        getColumns: 'bre/decisiontable/get-drop-down',
        getDecisionTableDetails: 'bre/decisiontable/getDecisionTable',
        saveDecisionTable: 'bre/decisiontable/saveDecisionTable',

        deleteDecisionColumn: 'bre/decisiontable/deleteDecisionColumnOperator',

        getDecisionList: 'bre/decision-table-columns/recordsList-by-decisionTableId-pagination',
        saveDecisionList: 'bre/decision-table-columns/save/column',
        updateDecisionList: 'bre/decision-table-columns/update/column',
        deleteDecisionList: 'bre/decision-table-columns/delete/column',
        deleteMultipleDecisions: 'bre/decision-table-columns/delete/multiple-records',
        submitDecision: 'bre/decision-table-columns/submit/record-table',
        uploadDecisionRecords: 'bre/decision-table-columns/upload-document',
        downloadDecisionRecords: 'bre/decision-table-columns/download-records',

        getUploadHistory: 'bre/decision-table-columns/upload-history',
        getUploadedFile: 'bre/decision-table-columns/upload-file',
        getErrorFile: 'bre/decision-table-columns/error-records',
        getSupportTableValues: 'bre/decision-table-columns/table-result',

        // Test Bed 2 Endpoints
        getApplicationIds: 'bre/testbed/get',
        getCreditPolicies: 'bre/testbed/getPolicies',
        getPolicyRuleflows: 'bre/testbed/getRuleFlow',
        executeTestBed: 'bre/testbed/saveExecute',

        getApplicantsList: 'bre/testbed/screen-2',
        getApplicantResult: 'bre/testbed/result-screen',

        //Scorecard Endpoints
        getScorecardDetails: 'bre/scoreCard/getScoreCard',
        saveScorecard: 'bre/scoreCard/save',
        submitScorecard: 'bre/scoreCard/final-save',
        deleteCharacteristic: 'bre/scoreCard/deleteCharacterstic',

        saveOrUpdateCharacteristic: 'bre/scoreCard/saveCharacteristic',
    },
    lookups: {
        /* Rule API Start */
        getBooksList: 'dashboard/getBooksList',
        getAvlBooksList: 'dashboard/getAvailableBooks',
        getBrwBooksList: 'dashboard/getBorrowedBooks', 
        returnBook: 'dashboard/removeBooks', 
        checkoutBooks: 'dashboard/checkoutBooks', 
        ruleFlowLookup: 'bre/ruleFlow/getAllRuleFlows',
        getParameterView: 'bre/view/get',
        getRuleGroup: 'bre/rulegroup/getByStatus',
        /* Rule API END */
        getAllWorkflowRoled: 'request/get-all-wf-roles',

        getRmsForCityGroups: 'request/lookup/getRmsForCityGroups',

        reportDecision: 'request/lookup/reportDecision',
        doucmentType: 'request/lookup/doucmentType',
        belongsTo: 'request/lookup/belongsTo',
        PdDoneBy: 'request/lookup/getPdDoneByLookup',
        businessApprovingAuthName: 'request/lookup/getApprovingAuthority',
        accountNumber: 'request/lookup/getAccountNumber',

        entityByApplicationPackage: 'request/lookup/getEntityByApplicationPackage',
        documentTypesByCpId: 'request/lookup/getDocumentNameByCpId',
        getVerificationStatusByUserType: 'request/lookup/getVerificationStatusByUserType',
        getDeviations: 'request/lookup/getDeviations',
        getBreManualDeviation: 'request/lookup/getBreManualDeviations',
        getDeviationREType: 'request/lookup/getDeviationREType',
        getDeviationManualType: 'request/lookup/getDeviationManualType',
        getDeviationSought: 'request/lookup/getDeviationSought',
        getApprovingAuthority: 'request/lookup/getApprovingAuthority',
        getRolesList: 'request/getUserRole',
        getDesignation: 'request/getDesignation',
        getCityGroup: 'request/lookup/getCityGroupLookup',
        getScreens: 'request/getScreens',
        getAllRCUDocument: 'request/lookup/getAllRCUDocument',
        getRCUAgencyDetails: 'request/lookup/getRCUAgencyDetails',
        assessmentDoneFor: 'request/lookup/getAssessmentDoneFor',
        addressDetails: 'request/lookup/getListOfAddressesByCpId',
        addressType: 'request/lookup/getAddressType',
        agencyDetails: 'request/lookup/getAgencyDetails',
        branchName: 'request/lookup/getBranch',

        loanType: 'request/lookup/getLoanTypeLookup',
        lookupByName: 'request/lookup/getLookupByLookupName',
        constitution: 'request/lookup/getCustomerType',
        registrationTypes: 'request/lookup/getIdentityProofs',
        industry: 'request/lookup/getIndustryGroup',
        natureOfBusiness: 'request/lookup/getIndustryLookup',
        pslCategory: 'request/lookup/getPslCategory',
        states: 'request/lookup/getStateLookup',
        cities: 'request/lookup/getCityLookup',
        bankName: 'request/lookup/getBankLookup',
        ifscCode:'request/lookup/getIFSCCodes',
        getBranchForIFSC:'request/lookup/getBranchForIFSC',
        occupation: 'request/lookup/getOccupationType',

        productTypes: 'request/lookup/getProduct',
        registrationType: 'request/lookup/getRegistrationByCustomerType',
        getDetailsByZipCode: 'request/lookup/getDetailsByZipCode',

        getEMIFrequency: 'request/lookup/getEMIFrequency',

        getBranches: 'request/lookup/getBranches',
        // CJ
        getCompanyLookups: 'request/lookup/getCompanyLookups',
        getNatureOfActivity: 'request/lookup/getNatureOfActivity',

        collateralPropTypes: 'request/lookup/collateralPropTypes',
        occupationStatus: 'request/lookup/occupationStatus',
        instrumentType: 'request/lookup/instrumentType',
        collateralTypes: 'request/lookup/collateralType',
        collateralPropStatus: 'request/lookup/collateralPropStatus',
        collateralRelationship: 'request/lookup/collateralRelationship',
        owner: 'request/lookup/getOwner',

        camCollateralTypes: 'request/lookup/collateralType',
        camCollateralPropTypes: 'request/lookup/propertyType',
        camCollateralPropStatus: 'request/lookup/ownershipStatus',
        camCollateralRelationship: 'request/lookup/collateralRelationship',
        camOccupationStatus: 'request/lookup/occupationStatus',

        getSwipeMachineUsage: 'request/lookup/getSwipeMachineUsage',
        getNumberOfOutlets: 'request/lookup/numberOfOutletsForIBLMechineInstallation',
        getProgramType: 'request/lookup/getProgrammeType',
        getSanctionAuthority: 'request/lookup/getSanctionAuthority',
        getSanctionLevels: 'request/lookup/getSanctionLevels',

        //mis code screen
        misCategory: 'request/lookup/getMisCategoryLkp',

        //New User API's
        getUserTypes: 'request/lookup/getUserTypes',
        getDsaNames: 'request/lookup/getDsaNames',
        getDsaSubTypes: 'request/lookup/getDsaSubTypes',
        getUserBranch: 'request/lookup/getBranches',
        getLevels: 'request/lookup/getLevels',
        getBranchesForCity: 'request/lookup/getBranchesForCity',
        getReportingManagers: 'request/lookup/getReportingManagersBySearch',

    },
    customerlookups: {
        companyType: 'CONSTITUTION TYPE',
        properties: 'Eligibility_Property_Ownership',
        turnovers: 'Eligibility_Turnover',
        fyProfits: 'Eligibility_PBT',
        loanTypes: 'LOAN TYPE',
        businessClassification: 'LACR-BUSINESS_CLASSIFICATION',
        modeOfOperation: 'MODE OF OPERATION',
        sourceOfLead: 'Source of Lead from IBL employee/DSA/Referrals?',
        coborrowerType: 'CO-BORROWER TYPE',
        coborrowerSubtype: 'SUB_TYPE',

        loanProposalType: 'LOAN PROPOSAL TYPE',
        purposeOfLoan: 'PURPOSE OF LOAN',
        relationshipWithBorrower: 'REL_WITH_BORROWER',

        relationshipWithBorrowerRef: 'REL_WITH_BORROWER_REF',
        ownerships: 'OWNESHIP STATUS',

        stability: 'STABILITY',
        isActiveStatus: 'ACTIVE-STATUS TYPE',

        salutations: 'CUSTOMER PREFIX',
        gender: 'GENDER',
        states: 'States',
        addressProof: 'Address Proof',
        creditFacilities: 'LOAN TYPE',
        accountType: 'STATEMENT ACCOUNT TYPE',
        numberOfMonths: 'BANKING NO OF MONTHS',
        maritalStatus: 'MARITAL STATUS',
        status: 'STATUS',
        socialCategory: 'SOCIAL CATEGORY',
        education: 'EDUCATION',
        proofOfAddress: 'PROOF OF ADDRESS',
        typeOfEmployement: 'TYPE OF EMPLOYMENT',
        religion: 'RELIGION',
        nationality: 'NATIONALITY',
        limitType: 'LIMIT TYPE',
        lacrOwnershipStatus:'LACR-OWNERSHIP_STATUS'
    },
    gridlookups: {
        itemType: 'ITEM TYPE',
        roiType: 'ROI TYPE',
        baseType: 'BASE RATE TYPE',
        financialType: 'FINANCIAL_TYPE',
        projectedFinancial: 'LACR-PROJECTED_FINANCIAL_OUTPUT',
        loanNature: 'LOAN NATURE',
        bankingnoofmonth: 'BANKING NO OF MONTHS',
        iblMeRelationship: 'IBL ME Relationship',
        meRelationshipMultiplier: 'ME_RLTNSHP_MULTIPLIER',
        seasonality: 'SEASONALITY',
        tncType: 'TNC_TYPES',
        actionStatus: 'ACTION_STATUS',
        camAccountType: 'STATEMENT ACCOUNT TYPE',
        atWhatStage: 'DOCUMENT STAGE',
        approveAuthorityLevel: 'APPROVE AUTHORITY LEVEL',
        workingCapitalloanTypes: 'WORKING CAPITAL LOAN TYPE',
        otherLoanType: 'OTHER LOAN TYPE',
        deviationType: 'DEVIATION TYPE',
        deviationData: 'MANUAL DEVIATION',
        fiReportVerificationStatus: 'REPORT_VERIFICATION_TYPE',
        rcuStatus: 'REPORT_INITIATION_TYPE',
        existingCif: 'existingCif',
        insuranceName: 'insuranceName',
        paymentMode: 'paymentMode',
        rePaymentMode: 'rePaymentMode',
        buildingType: 'TYPE OF BULIDING',
        creditTeamVerification: 'creditTeamVerification',
        localopsVerification: 'localopsVerification',
        centralOpsVerification: 'centralOpsVerification',
        userStatus: 'user status',
        emiType: 'EMI TYPE',
        rejectDecision: 'REJECT DECISION',
        approveDecision: 'APPROVE DECISION',
        loanAppearsIn: 'LOAN APPEARS IN',
        misReportType: 'MIS REPORT TYPE',
        personalDiscussion: 'PERSONAL_DISCUSSION-Person Met',
        rentalPlan: 'RENTAL_PLAN',

        policyType: 'Policy Type',
        securityType: 'Security Type',
        claimType: 'Claim Type',
        insuranceProviders: 'INSURANCE_PROVIDERS',

        // borrowers lookup
        successionPlan: 'SUCCESSION_PLAN',
        businesscontinuity: 'BUSINESS_CONTINUITY',
        mnglexp: 'LACR-MNGRL_PRMTR_EXP',
        posDocumentsType: 'POS INSTALLATION DOC TYPE',
        posMachineStatus: 'POS MACHINE STATUS'
    },
    roles: {
        CPA: 4,
        RM: 5,
        DSA: 6,
        SA: 8, // Sales Approver
        CA: 9, // Credit Approver
        CM: 11, // Credit manager
        FIADMIN: 12, // FI admin
        RCUADMIN: 13, // RCU ADMIN
        FIAGENCY: 17, // FI agency
        CH: 16, // Credit Head
        RCUAGENCY: 18, // RCU agency
        LOPS: 10,
        COPS: 14,
        USERMASTER: 22 // User Master
    }
};

export const AppConfig: IAppConfig = data;
