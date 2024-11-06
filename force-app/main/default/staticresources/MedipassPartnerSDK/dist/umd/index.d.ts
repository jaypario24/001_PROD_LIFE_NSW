(function(global) {
    global = global || self;
    
    global.medipassSDK = {
        BASE_URLS: {
            // Define BASE_URLS here
        },
        ENVS: {
            LOCAL: 'local',
            DEV: 'dev',
            STG: 'stg',
            PROD_BLUE: 'prod_blue',
            PROD: 'prod'
        },
        FUNDERS: {
            HICAPS: 'hicaps',
            MEDICARE: 'medicare',
            DVA: 'dva',
            GHS: 'ghs',
            PATIENT_FUNDED: 'patient_funded',
            ICARE: 'icare'
        },
        MEDICARE: {
            REFERRER_TYPE: {
                GP: 'gp',
                SPECIALIST: 'specialist'
            },
            REFERRAL_PERIODS: {
                STANDARD: 'standard',
                NON_STANDARD: 'non_standard',
                INDEFINITE: 'indefinite'
            }
        },
        HEALTH_FUNDS: {
            ACA: 'aca',
            AHM: 'ahm',
            AUSTRALIAN_UNITY: 'australian_unity',
            BUPA: 'bupa',
            CBHS: 'cbhs',
            CDH: 'cdh',
            CUA: 'cua',
            DEFENCE_HEALTH: 'defence_health',
            DOCTORS_HEALTH_FUND: 'doctors_health_fund',
            GMF_HEALTH: 'gmf_health',
            GMHBA: 'gmhba',
            GRAND_UNITED_CORPORATE_HEALTH: 'grand_united_corporate_health',
            HBF: 'hbf',
            HCF: 'hcf',
            HEALTH_CASE_INSURANCE: 'health_case_insurance',
            HIF: 'hif',
            HEALTH_PARTNERS: 'health_partners',
            HEALTH_COM_AU: 'health_com_au',
            LATROBE_HEALTH_SERVICES: 'latrobe_health_services',
            MEDIBANK: 'medibank',
            MILDURA_HEALTH_FUND: 'mildura_health_fund',
            ONEMEDIFUND: 'onemedifund',
            NAVY_HEALTH: 'navy_health',
            NIB: 'nib',
            PEOPLECARE: 'peoplecare',
            PHOENIX_HEALTH: 'phoenix_health',
            POLICE_HEALTH: 'police_health',
            QUEENSLAND_COUNTRY_HEALTH_FUND: 'queensland_country_health_fund',
            RAILWAY_TRANSPORT_HEALTH_FUND: 'railway_transport_health_fund',
            RESERVE_BANK_HEALTH_SOCIETY: 'reserve_bank_health_society',
            ST_LUKES_HEALTH: 'st_lukes_health',
            TEACHERS_HEALTH_FUND: 'teachers_health_fund',
            TRANSPORT_HEALTH: 'transport_health',
            TUH: 'tuh',
            WESTFUND_LIMITED: 'westfund_limited'
        },
        PATHS: {
            // Define PATHS here
        },
        TYPES: {
            AUTHORIZE_PAYMENT: 'authorize_payment',
            CREATE_TRANSACTION: 'create_transaction',
            VIEW_TRANSACTION: 'view_transaction',
            VIEW_FUTURE: 'view_future'
        },
        coreSDK: {
            account: null,
            accountId: null,
            apiVersions: {
                core: 'v1',
                risk: 'v1'
            },
            appId: '',
            appVersion: '',
            apiVer: 'v1',
            axios: null,
            baseUrls: undefined,
            defaultVersion: 'v1',
            device: null,
            env: '',
            hasInit: false,
            intercomHash: null,
            isSuperAdmin: false,
            isReadOnlyAdmin: false,
            isAnalyticsInitialised: false,
            member: null,
            region: undefined,
            requestInterceptor: undefined,
            requestInterceptorSuccess: undefined,
            sdkVersion: '',
            tokens: null,
            setup(env, opts) {
                // SDK setup code
            },
            setConfig(opts) {
                // SDK setConfig code
            },
            setSDKAppVersion(version) {
                // SDK setSDKAppVersion code
            },
            hasValidSession(tokenType) {
                // SDK hasValidSession code
            },
            hasSessionExpired(tokenType) {
                // SDK hasSessionExpired code
            },
            setRequestInterceptor(headers) {
                // SDK setRequestInterceptor code
            },
            setResponseInterceptor() {
                // SDK setResponseInterceptor code
            },
            clearTokens() {
                // SDK clearTokens code
            },
            isImpersonating() {
                // SDK isImpersonating code
            },
            getTokenExpiry(tokenType) {
                // SDK getTokenExpiry code
            },
            setToken(token, tokenType) {
                // SDK setToken code
            },
            setAccount(account) {
                // SDK setAccount code
            },
            setMember(member) {
                // SDK setMember code
            },
            setRegion(region) {
                // SDK setRegion code
            },
            stop() {
                // SDK stop code
            },
            removeStorage() {
                // SDK removeStorage code
            },
            setIsAnalyticsInitialised(isInitialised) {
                // SDK setIsAnalyticsInitialised code
            }
        },
        business: undefined,
        config: {
            apiKey: undefined,
            appId: undefined,
            appVersion: undefined,
            baseUrl: undefined,
            env: 'stg',
            token: undefined
        },
        frames: {},
        setConfig(config) {
            return new Promise((resolve, reject) => {
                // setConfig implementation
                resolve();
            });
        },
        setupFrame(opts) {
            return null;
        },
        renderCreateTransaction(payload, options) {
            // renderCreateTransaction implementation
        },
        renderViewTransaction(query, options) {
            // renderViewTransaction implementation
        },
        renderViewFuture(query, options) {
            // renderViewFuture implementation
        },
        renderAuthorizePayment(payload, options) {
            // renderAuthorizePayment implementation
        },
        buildTransactionUrl(payload, config) {
            return '';
        },
        claimItems,
        members,
        providers,
        payments,
        transactions
    };
})(this);
