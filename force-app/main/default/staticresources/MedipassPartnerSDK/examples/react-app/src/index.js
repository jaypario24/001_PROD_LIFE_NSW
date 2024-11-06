import React from 'react';
import ReactDOM from 'react-dom';
import partnerSDK from '@medipass/partner-sdk';
import Transaction from './Transaction';
import AuthorizePayment from './AuthorizePayment';

partnerSDK.setConfig({
  env: partnerSDK.ENVS.LOCAL,

  // apiKey: '5d9ac59dfc37d7004a045295:M0tKus63kqe0pkpkSGXxZbgHb_MTfj7l69IP5nrqBik',
  // apiKey: '5c6e494ef8bbfe0055f679e5:-hdnUX9Y_a5eli0Cg_CudIPov0jU6uQOnUt8gjMXWiU',
  apiKey: '5c6222ff55ce4e0047c2d1d4:i6ZT9ckJiMVnJXOn4X6NLR81_QjTKPLfUhtKUJ4E62s',
  // apiKey: '5c78a7bd84c5c60047a7ca0f:J6W9eSRPg0gs8LgI2xWEOVG-7YMTzufgRtQwc0NfCOQ',
  // apiKey: '5acc2345d06506003ea06e77:6yMSHj07l7vHFdOK5rgUg29kFQQxi5AlQMhNaKMC6RQ',

  appId: 'web-application',

  appVersion: '1.0.0'
});

function App() {
  return (
    <React.Fragment>
      <Transaction />
      <hr style={{ marginTop: '2rem' }}/>
      <AuthorizePayment />
    </React.Fragment>
  )
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
