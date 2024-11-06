# Medipass Partner SDK

The Medipass Partner SDK is a client-side JavaScript library which allows you to interact with Medipass from your web interface.

## Table of Contents

- [Medipass Partner SDK](#medipass-partner-sdk)
  - [Table of Contents](#table-of-contents)
  - [Install](#install)
  - [Basic Usage](#basic-usage)
    - [With a `<script>` tag](#with-a-script-tag)
  - [API](#api)
    - [sdk.setConfig(config)](#sdksetconfigconfig)
      - [config](#config)
    - [sdk.renderCreateTransaction(payload, options)](#sdkrendercreatetransactionpayload-options)
      - [payload](#payload)
      - [options](#options)
    - [sdk.renderViewTransaction(query, options)](#sdkrenderviewtransactionquery-options)
      - [query](#query)
      - [options](#options-1)
    - [sdk.members.discoverMember(options)](#sdkmembersdiscovermemberoptions)
      - [options](#options-2)
      - [Example](#example)
    - [sdk.providers.getProvidersStatus(options)](#sdkprovidersgetprovidersstatusoptions)
      - [options](#options-3)
      - [Example](#example-1)
    - [sdk.payments.getBusinessPatientPaymentMethods(options)](#sdkpaymentsgetbusinesspatientpaymentmethodsoptions)
      - [options](#options-3)
      - [Example](#example-1)
    - [sdk.payments.getBusinessPatientPaymentMethodsByRefId(options)](#sdkpaymentsgetbusinesspatientpaymentmethodsbyrefidoptions)
      - [options](#options-3)
      - [Example](#example-1)
    - [sdk.claimItems.getBusinessClaimItems(options)](#sdkclaimitemsgetbusinessclaimitemsoptions)
      - [options](#options-3)
      - [Example](#example-1)
    - [sdk.transactions.getBusinessTransaction(options)](#sdktransactionsgetbusinesstransactionoptions)
      - [options](#options-4)
      - [Example](#example-2)
    - [sdk.transactions.downloadPDF(options, requestOptions, downloadOptions)](#sdktransactionsdownloadpdfoptions-requestoptions-downloadoptions)
      - [options](#options-5)
      - [requestOptions](#requestoptions)
      - [downloadOptions](#downloadoptions)
      - [Example](#example-3)
    - [sdk.transactions.getPaymentReport(options)](#sdktransactionsgetpaymentreportoptions)
      - [options](#options-6)
      - [Response](#response)
      - [Example](#example-4)
    - [sdk.transactions.getProcessingReport(options)](#sdktransactionsgetprocessingreportoptions)
      - [options](#options-7)
      - [Response](#response-1)
      - [Example](#example-5)
    - [sdk.buildTransactionUrl(payload, config)](#sdkbuildtransactionurlpayload-config)
      - [payload](#payload-1)
      - [config](#config-1)
  - [Examples](#examples)
  - [Browser support](#browser-support)

## Install

```
yarn add @medipass/partner-sdk
```

or NPM:

```
npm install @medipass/partner-sdk
```

## Basic Usage

```jsx
import medipassTransactionSDK from '@medipass/partner-sdk';
// or: const medipassTransactionSDK = require('@medipass/partner-sdk');

medipassTransactionSDK.setConfig({
  env: 'stg',
  apiKey: 'xyz',
  appId: 'my-app',
  appVersion: '1.0.0'
});

medipassTransactionSDK.renderCreateTransaction(
  {},
  {
    onSuccess: data => {
      // handle success
    },
    onError: data => {
      // handle success
    },
    onCancel: () => {
      // handle cancel
    }
  }
);
```

### With a `<script>` tag

```html
<html>
  <head>
    <script src="https://unpkg.com/@medipass/partner-sdk/umd/@medipass/partner-sdk.min.js"></script>
  </head>
  <body>
    <script>
      MedipassTransactionSDK.setConfig({
        env: 'stg',
        apiKey: 'xyz',
        appId: 'my-app',
        appVersion: '1.0.0'
      });

      MedipassTransactionSDK.renderCreateTransaction(
        {},
        {
          onSuccess: data => {
            // handle success
          },
          onError: data => {
            // handle success
          },
          onCancel: () => {
            // handle cancel
          }
        }
      );
    </script>
  </body>
</html>
```

## API

### sdk.setConfig(config)

#### config

> `Object` | required

```js
{
  env: 'stg' | 'prod',
  apiKey: string,
  appId: string,
  appVersion: string
}
```

### sdk.renderCreateTransaction(payload, options)

#### payload

> `Object` | required

With the `payload` parameter, you are able to pre-populate SDK fields. All attributes in the payload are optional (however, attributes marked with a `!` are required) - so you can pre-populate what you wish.

```js
{
  /* ====== START: GENERAL PRE-POPULATION ATTRIBUTES ====== */
  funder: "medicare" | "hicaps" | "patient-funded" | "ghs",

  providerNumber: string,

  invoiceReference: string,

  memberId: string, // Medipass Member ID
  // OR
  patient: {
    firstName: string,
    lastName: string,
    mobile: string,
    dob: string, // "YYYY-MM-DD" format
    accountNumber: string, // Medicare card number / PHI card number
    reference: string // Medicare card reference / PHI card rank
  },

  claimableItems: [{
    itemCode!: string,
    serviceDateString: string, // "YYYY-MM-DD" format
    price: string, // E.g. "$40.00"
    quantity: number,
    isTaxable: boolean
  }],

  nonClaimableItems: [{
    description!: string,
    price: string
  }],

  webhooks: [{
    url!: string,
    event!:
      'memberApprovedInvoice' |
      'memberRejectedInvoice' |
      'medipassAutoCancelledInvoice' |
      'healthFundApprovedInvoice' |
      'healthFundRejectedInvoice',
    method!: 'GET' | 'PUT' | 'POST' | 'DELETE',
    headers: { [key: string]: string }
  }],
  /* ====== END: GENERAL PRE-POPULATION ATTRIBUTES ====== */

  /* ====== START: FUNDER-SPECIFIC PRE-POPULATION ATTRIBUTES ====== */
  funderData: {
    hicaps: {
      patient: {
        healthFundCode: string
      },
      transactionMethod: 'phone' | 'terminal'
    },
    medicare: {
      isBulkBilled: boolean,

      claimantMemberId: string, // Medipass Member ID
      // OR
      claimant: {
        firstName: string,
        lastName: string,
        mobile: string,
        dob: string, // "YYYY-MM-DD" format
        accountNumber: string, // Medicare card number / PHI card number
        reference: string // Medicare card reference / PHI card rank
      },

      referral: {
        providerNumber: string,
        providerName: string,
        issueDateString: string,
        period: 'standard' | 'non-standard' | 'indefinite'
      }
    },
    ghs: {
      isEmergencyTreatment: boolean,
      includesHospitalInpatientItems: boolean,
      failedToAttendClaim: boolean,
      dan: string,
      referringJointHealthCentre: string,
      referringMedicalOfficer: string,
      noDan: boolean,
      noDanReason: string,
      noEpId: boolean,
      noEpIdReason: string
    }
  }
  /* ====== END: FUNDER-SPECIFIC PRE-POPULATION ATTRIBUTES ====== */
}
```

#### options

> `Object`

```js
{
  onSuccess: function(transaction) {},  // Invoked when the transaction has submitted successfully.
  onError: function(error) {},          // Invoked when the transaction submission failed.
  onCancel: function() {},              // Invoked when the 'Cancel' button is clicked.

  // Optional config overrides - if not set, will use global config from sdk.setConfig().
  env: 'stg' | 'prod',
  apiKey: string,
  appId: string,
  appVersion: string
}
```

### sdk.renderViewTransaction(query, options)

#### query

> `Object` | required

```js
{
  // required
  transactionId: string,

  // Optional override Business ID - by default, it uses business attached to API Key.
  businessId: string
}
```

#### options

> `Object`

```js
{
  // Optional config overrides - if not set, will use global config from sdk.setConfig().
  env: 'stg' | 'prod',
  apiKey: string,
  appId: string,
  appVersion: string
}
```

### sdk.members.discoverMember(options)

#### options

> `Object` | required

Discover a member using query parameters.

The response will be the matching member's internal ID. If a `custodians` array field is also present, the
matching member is a dependant. Each custodian object contains the custodian's member ID, first name and
last name. The custodian is important when creating an invoice for a dependant because the claim/payment
authorisation can only be performed by a custodian. A dependant inherits their custodians' email and mobile,
and therefore will be included in such a search.

Email and mobile are the primary search parameters. The order of search parameter priorities are as
follows: `email` > `mobile` > `dobString` > `lastName` > `firstName`.

The following search sets are recommended:

- `{ email }`
- `{ mobile, dobString }`
- `{ mobile, firstName, lastName }`
- `{ dobString, firstName, lastName }`

The following query sets are not allowed:

- `{ firstName }`
- `{ lastName }`
- `{ dobString }`
- `{ firstName, dobString }`
- `{ lastName, dobString }`

```js
{
  query: {
    email: string,
    mobile: string,
    dobString: string, // "YYYY-MM-DD"
    firstName: string,
    lastName: string
  }
}
```

#### Example

```js
medipassTransactionSDK.members.discoverMember({ email: 'john@example.com' });
```

### sdk.providers.getProvidersStatus(options)

#### options

> `Object` | required

Retrieve a business' provider and their status.

A provider number must be supplied as a query param to filter the results and return a single provider.

```js
{
  query: {
    providerNumber: string
  }
}
```

#### Example

[Get provider status](https://jsfiddle.net/joshuafsharp/dtph7ojg/)

### sdk.payments.getBusinessPatientPaymentMethods(options)

#### options

> `Object` | required

Retrieve a patient's payment methods.

A patient id must be supplied as a query parameter.

```js
{
  query: {
    patientId: string
  }
}
```

#### Example

[Get payment methods by patient id](https://jsfiddle.net/joshpiper_medipass/x72vhwL0/)

### sdk.payments.getBusinessPatientPaymentMethodsByRefId(options)

#### options

> `Object` | required

Retrieve a patient's payment methods by a patient's ref id.

A patient's ref id must be supplied as a query parameter.

```js
{
  query: {
    refId: string
  }
}
```

#### Example

[Get payment methods by patient ref id](https://jsfiddle.net/joshpiper_medipass/r7w1ps9n/)

### sdk.claimItems.getBusinessClaimItems(options)

#### options

> `Object` | required

Get a list of claim items. A claim item describes a service that a patient can claim against.

```js
{
  query: {
    page: number,
    limit: number,
    searchText: string
    itemCode: string,
    funderCode: string,
    funderId: string,
    modalityId: string,
    serviceDateString: string,
    isBulkBilled: string,
    isInHospital: string
  },

  // Optional override Business ID - by default, it uses business attached to API Key.
  businessId: string
}
```

#### Example

```js
medipassTransactionSDK.claimItems.getBusinessClaimItems({
  query: {
    page: 1,
    limit: 10,
    funderCode: 'medicare',
    searchText: 'Awesome Item'
  }
});
```

### sdk.transactions.getBusinessTransaction(options)

#### options

> `Object` | required

Get transaction details for a business.

```js
{
  // Required
  transactionId: string,

  // Optional override Business ID - by default, it uses business attached to API Key.
  businessId: string
}
```

#### Example

```js
medipassTransactionSDK.transactions.getBusinessTransaction({ transactionId: '123' });
```

### sdk.transactions.downloadPDF(options, requestOptions, downloadOptions)

Async function that returns a PDF blob.

#### options

> `Object` | required

Downloads the transaction summary in PDF format.

**Note: this method is only supported for Medicare transactions and downloads the Medicare statement.**

```js
{
  // Required
  transactionId: string,

  // Optional override Business ID - by default, it uses business attached to API Key.
  businessId: string
}
```

#### requestOptions

> `Object` | optional

#### downloadOptions

> `Object` | optional

```js
{
  // Optional - when set to true, the PDF will not be automatically downloaded on the client.
  suppressLocalDownload: string

}
```

#### Example

```js
medipassTransactionSDK.transactions.downloadPDF({ transactionId: '123' });
```

### sdk.transactions.getPaymentReport(options)

#### options

> `Object` | required

Fetches the payment report for a given transaction. Response is in JSON format.

**Note: this method is only supported for Medicare transactions.**

```js
{
  // Required
  transactionId: string,

  query: {
    // When true, the payment report is retrieved in real time and the cache is updated if successful.
    forceRefresh: boolean
  },

  // Optional override Business ID - by default, it uses business attached to API Key.
  businessId: string
}
```

#### Response

```js
{
  requestedDate: string,
  reportResult: number,
  sessionId: number,
  paymentRunDateString: string,
  paymentRunNumber: string,
  amountBenefitPaidString: string,
  bankAccount: {
    accountNumber: string,
    bsb: string,
    accountName: string
  },
  payments: [
    {
      claimId: string,
      claimDateString: string,
      amountChargedString: string,
      amountBenefitPaidString: string,
      amountDepositedString: string
    }
  ]
}
```

#### Example

```js
medipassTransactionSDK.transactions.getPaymentReport({ transactionId: '123', query: { forceRefresh: true } });
```

### sdk.transactions.getProcessingReport(options)

#### options

> `Object` | required

Fetches the processing report for a given transaction. Response is in JSON format.

**Note: this method is only supported for Medicare transactions.**

```js
{
  // Required
  transactionId: string,

  query: {
    // When true, the processing report is retrieved in real time and the cache is updated if successful.
    forceRefresh: boolean
  },

  // Optional override Business ID - by default, it uses business attached to API Key.
  businessId: string
}
```

#### Response

```js
{
  requestedDate: string,
  reportResult: number,
  sessionId: number,
  amountChargedString: string,
  amountBenefitPaidString: string,
  providerNumber: string,
  claimItems: [
    {
      serviceDateString: string,
      itemCode: string,
      claimId: string,
      serviceId: string,
      amountBenefitString: string,
      gatewayCode: string,
      gatewayDescription: string,
      amountChargedString: string,
      healthFundAccount: {
        membershipNumber: string,
        cardRank: string
      },
      patient: {
        firstName: string,
        lastName: string
      },
      cardFlag: string,
      cardFlagDescription: string,
      numberOfPatientsSeen: string,
      voucherId: string
    }
  ]
}
```

#### Example

```js
medipassTransactionSDK.transactions.getProcessingReport({ transactionId: '123', query: { forceRefresh: true } });
```

### sdk.buildTransactionUrl(payload, config)

#### payload

> `Object` | required

#### config

> `Object` | required

Returns a standalone URL.

## Examples

Examples can be found in the [in the `examples/` folder](/examples).

## Browser support

The Medipass Transaction SDK supports all popular browsers, including Internet Explorer 11 and above. Unfortunately, support for Internet Exporer 10 and below is discontinued.

[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/medipass/partner-sdk
[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/partner-sdk
