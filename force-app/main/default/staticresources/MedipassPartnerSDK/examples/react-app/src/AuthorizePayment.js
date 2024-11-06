import React from 'react';
import partnerSDK from '@medipass/partner-sdk';

let submitForm;

export default function AuthorizePayment() {
  const [status, setStatus] = React.useState();
  const [submitButton, setShowSubmitButton] = React.useState();

  React.useEffect(() => {
    partnerSDK.renderAuthorizePayment(
      {
        funders: ['medicare']
        // patient: {
        //   firstName: 'Claudia',
        //   lastName: 'Connor',
        //   dob: '1996-08-20',
        //   mobile: '0468605450',
        //   accountNumber: '6950507481', // Medicare
        //   reference: '1' // Medicare
        // }
      },
      {
        // env: 'local',

        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZTFlMjQxYTNkZDFlMDAwNTU0MWNjYzIiLCJ2ZXIiOjEsImlhdCI6MTU3OTAzMzYyNiwiZXhwIjoxNTc5MDM3MjI2fQ.NRzoR5J4cjEL5oPGDfHkTb1PqIcUwGDpy4MTt9yhbFw',

        // appId: 'web-application',

        // appVersion: '1.0.0',

        containerId: 'authorize-payment',
        showSubmitButton: false,
        width: '400px',

        onScreenStateChanged: screen => {
          setShowSubmitButton(screen === 'payment-capture');
        },
        onFormStateChanged: form => {
          submitForm = form.submitForm;
        },
        onSuccess: data => {
          console.log('Success!', JSON.stringify(data));
          setStatus('success');
        },
        onError: err => {
          console.log('Error!', JSON.stringify(err));
          setStatus('errored');
        },
        onCancel: data => {
          console.log('Cancelled', JSON.stringify(data));
          setStatus('cancelled');
        }
      }
    );
  }, []);

  function handleSubmit() {
    submitForm && submitForm();
  }

  console.log('test1', submitForm);

  return (
    <div>
      <h1>Authorize Payment</h1>
      <div id="authorize-payment" />
      {submitButton && <button onClick={handleSubmit}>submit</button>}
      {status === 'success' && <div>Success!</div>}
      {status === 'errored' && <div>Error</div>}
      {status === 'cancelled' && <div>Cancel</div>}
    </div>
  );
}
