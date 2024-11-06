import React from "react";
import partnerSDK from "@medipass/partner-sdk";

export default function Transaction() {
  const [status, setStatus] = React.useState();
  const [transaction, setTransaction] = React.useState();

  function handleProcessTransaction(config, options = {}) {
    setTransaction(undefined);
    partnerSDK.renderCreateTransaction(
      {
        // platform: 'virtual-terminal',
        funder: partnerSDK.FUNDERS.HICAPS,
        // funder: partnerSDK.FUNDERS.ICARE,
        // funder: partnerSDK.FUNDERS.MEDICARE,
        // funder: 'dva',
        // funder: partnerSDK.FUNDERS.GHS,
        // funder: partnerSDK.FUNDERS.PATIENT_FUNDED,

        // providerNumber: "2429591L", // Medicare (single specialty) 2121331W 2054781W 2429591L
        // providerNumber: '2054781W', // Medicare (multiple specialties)
        providerNumber: '0909818T', // HICAPS (single specialty)
        // providerNumber: '11112222', // HICAPS (multiple specialties)
        // providerNumber: '1341232T', // GHS (single specialty)
        // providerNumber: '1231444T', // GHS (multiple specialties)
        // providerNumber: '9440740B', // icare (single specialty)
        // providerNumber: '1234516A', // icare (multiple specialty)
        // providerNumber: '2429591L',

        invoiceReference: "000001234",

        // chargeAmount: '10.00',

        // paymentMethod: 'pay-in-person',
        // paymentMethod: 'new-payment-card',
        // paymentMethod: 'phone',

        // memberId: '5d280c9baab9bf004856c379',
        // patientId: '5d6cab2b4480b7004bab0e05',
        // or
        patient: {
          firstName: "Claudia",
          lastName: "Connor",
          dob: "1996-08-20",
          mobile: "+61415123123",
          accountNumber: "6950507482", // Medicare
          reference: "1", // Medicare
          // refId: '1234122',
          // accountNumber: '8619751', // GHS
          // accountNumber: '123123',
          // accountNumber: '12312312A', // HICAPS
          // reference: '1', // HICAPS
          // issueDate: '2000-01-01', // HICAPS
          // cardNumber: '123123', // HICAPS
          // cardIssueNumber: '1', // HICAPS
          // healthFundCode: partnerSDK.HEALTH_FUNDS.MEDIBANK // HICAPS
        },
        // patient: {
        //   firstName: 'Anne-Marie',
        //   lastName: 'Fiona',
        //   accountNumber: 'QX901543',
        //   reference: '1',
        //   dob: '1954-04-10',
        //   gender: 'M',
        //   refId: '123123123',
        //   acceptedDisabilityText: 'Test text'
        // },

        // HICAPS
        claimableItems: [
          {
            itemCode: '1001',
            price: '$2.00'
          },
          {
            serviceDateString: '2018-12-20',
            itemCode: '1002',
            price: '$10.00'
          }
          // {
          //   itemCode: '18378123'
          // }
        ],

        // DVA
        // claimableItems: [
        //   {
        //     itemCode: "10905",
        //     serviceDateString: "2019-02-12",
        //     price: "$1.00",
        //     extras: {
        //       duration: "15",
        //       // secondDevice: 'Y',
        //       // treatmentLocation: 'H',
        //       // distanceTravelled: '25'
        //     },
        //   },
        // ],

        // Medicare - non bulk billed
        // claimableItems: [
        //   {
        //     itemCode: '10905',
        //     serviceDateString: '2019-02-12',
        //     price: '$1.00'
        //   },
        //   // {
        //   //   itemCode: '10964',
        //   //   serviceDateString: '2019-01-12'
        //   // },
        //   // {
        //   //   itemCode: '456',
        //   //   serviceDateString: '2019-03-12',
        //   //   price: '$75.00'
        //   // }
        // ],

        // Medicare - bulk billed
        // claimableItems: [
        //   {
        //   itemCode: '10905',
        //   price: '$10'
        //   }
        // ],

        // GHS
        // claimableItems: [
        //   {
        //     itemCode: '85011', // required
        //     price: '$10.00',
        //     quantity: 2,
        //     serviceDateString: '2016-12-12',
        //     isTaxable: true
        //   },
        //   { itemCode: '85012', price: '$15.00', quantity: 3, serviceDateString: '2016-12-12' }
        // ],

        // icare
        // claimableItems: [
        //   {
        //     itemCode: 'EXT0000',
        //     quantity: 1,
        //     price: '$2.00'
        //   },
        //   {
        //     serviceDateString: '2019-03-12',
        //     quantity: 2,
        //     itemCode: 'INT0000',
        //     isTaxable: true,
        //     price: '$10.00'
        //   }
        //   // {
        //   //   itemCode: '18378123'
        //   // }
        // ],

        // HICAPS
        // nonClaimableItems: [
        //   {
        //     description: 'Gatorade',
        //     price: '$2.50'
        //   }
        // ],

        // webhooks: [
        //   {
        //     url: 'https://your-site.com/success',
        //     event: 'memberApprovedInvoice',
        //     method: 'POST',
        //     headers: { hello: 'world' }
        //   },
        //   {
        //     url: 'https://your-site.com/failure',
        //     event: 'memberRejectedInvoice',
        //     method: 'POST',
        //     headers: { hello: 'world' }
        //   }
        // ],

        funderData: {
          // hicaps: {
          //   transactionMethod: 'phone'
          // },
          medicare: {
            isBulkBilled: true,
            // claimantMemberId: '5b03b5884d23b7003ea5dd60',
            // claimantPatientId: '5d673affb7477d004d167418',
            // claimant: {
            //   firstName: 'Corazon',
            //   lastName: 'Baxter',
            //   dob: '1983-12-28',
            //   accountNumber: '3950387651',
            //   reference: '1',
            //   mobile: '0401515611'
            // },
            referral: {
              providerNumber: "2121331W",
              providerName: "Jake Moxey",
              issueDateString: "2019-01-01",
              referrerType: partnerSDK.MEDICARE.REFERRER_TYPE.SPECIALIST,
              period: partnerSDK.MEDICARE.REFERRAL_PERIODS.STANDARD,
            },
          },
          // dva: {
          //   // referral: {
          //   //   providerNumber: '2121331W',
          //   //   providerName: 'Jake Moxey',
          //   //   issueDateString: '2019-01-01',
          //   //   referrerType: partnerSDK.MEDICARE.REFERRER_TYPE.SPECIALIST,
          //   //   period: partnerSDK.MEDICARE.REFERRAL_PERIODS.STANDARD
          //   // }
          //   nonReferral: {
          //     reason: 'lost',
          //     description: 'help'
          //   }
          // },
          // ghs: {
          //   isEmergencyTreatment: false,
          //   includesHospitalInpatientItems: false,
          //   failedToAttendClaim: false,
          //   dan: 'J46640963', // can prepopulate firstName, lastName, epId & dob from `dan`
          //   // referringJointHealthCentre: 'Alfred Hospital',
          //   // referringMedicalOfficer: 'Joe Bloggs'
          //   noDan: false,
          //   noDanReason: null,
          //   noEpId: false,
          //   noEpIdReason: null,
          // }
          // icare: {
          //   approvalNumber: '123123123',
          //   serviceNotes: 'Hello world'
          // }
        },
      },
      {
        disableDiscounts: true,
        hideChatBubble: true,
        version: "3",
        onSuccess: (data) => {
          console.log("Transaction submitted!", JSON.stringify(data));
          setStatus("success");
          setTransaction(data);
        },
        onError: (err) => {
          console.log("Transaction errored!", JSON.stringify(err));
          setStatus("errored");
        },
        onCancel: (data) => {
          console.log("Transaction cancelled", JSON.stringify(data));
          setStatus("cancelled");
        },
        onTransactionCreated: (data) => {
          console.log("Transaction data", data);
        },
        onCloseModal: (data) => console.log("Window closed", data),
        ...options,
      }
    );
  }

  function handleClickViewTransaction() {
    if (!transaction) return;
    partnerSDK.renderViewTransaction({ transactionId: transaction._id });
  }

  function handleClickDownloadPDF() {
    if (!transaction) return;
    partnerSDK.transactions.downloadPDF({ transactionId: transaction._id });
  }

  async function handleClickGetPaymentReport() {
    if (!transaction) return;
    try {
      const response = await partnerSDK.transactions.getPaymentReport({
        transactionId: transaction._id,
        query: { forceRefresh: true },
      });
      console.log("payment report", response);
    } catch (err) {
      if (err.status === 404) {
        console.log("Payment report not available.");
      }
    }
  }

  async function handleClickGetProcessingReport() {
    if (!transaction) return;
    try {
      const response = await partnerSDK.transactions.getProcessingReport({
        transactionId: transaction._id,
        query: { forceRefresh: true },
      });
      console.log("processing report", response);
    } catch (err) {
      if (err.status === 404) {
        console.log("Processing report not available.");
      }
    }
  }

  async function handleClickGetTransactionDetails() {
    if (!transaction) return;
    try {
      const response = await partnerSDK.transactions.getBusinessTransaction({
        transactionId: transaction._id,
      });
      console.log("transaction details", response);
    } catch (err) {
      if (err.status === 404) {
        console.log("transaction details not available.");
      }
    }
  }

  async function handleDiscoverMember() {
    const response = await partnerSDK.members.discoverMember({
      query: { email: "testuser1@jxom.io" },
    });
    console.log("member", response);
  }

  async function handleClickCancelTransaction() {
    if (!transaction) return;
    const cancelReasons = await partnerSDK.transactions.getTransactionCancelReasons(
      { funderId: transaction.funderId }
    );
    const response = await partnerSDK.transactions.cancelBusinessTransaction({
      transactionId: transaction._id,
    });
    console.log("cancelled", response);
  }

  async function handleClickTransactionURL() {
    if (!transaction) return;
    const response = await partnerSDK.transactions.getTransactionDetailsURL({
      transactionId: transaction._id,
    });
    console.log("url", response);
  }

  async function handleClickClaimItems() {
    try {
      console.log(partnerSDK.business);
      const response = await partnerSDK.claimItems.getBusinessClaimItems({});
      console.log("url", response);
    } catch (err) {
      console.log("error", err);
    }
  }

  return (
    <div>
      <h1>Transaction</h1>
      <button onClick={handleDiscoverMember}>Discover member</button>
      <button onClick={handleProcessTransaction}>Process transaction</button>
      <div id="test" style={{ height: "100px" }} />
      {status === "success" && (
        <div>
          Transaction successful!
          <br />
          <button onClick={handleClickViewTransaction}>View transaction</button>
          <button onClick={handleClickDownloadPDF}>Download PDF</button>
          <button onClick={handleClickGetPaymentReport}>
            Get payment report
          </button>
          <button onClick={handleClickGetProcessingReport}>
            Get processing report
          </button>
          <button onClick={handleClickGetTransactionDetails}>
            Get transaction details
          </button>
          <button onClick={handleClickCancelTransaction}>
            Cancel transaction
          </button>
          <button onClick={handleClickTransactionURL}>
            Get transaction URL
          </button>
        </div>
      )}
      {status === "errored" && <div>Transaction errored</div>}
      {status === "cancelled" && <div>Transaction cancelled</div>}
    </div>
  );
}
//
