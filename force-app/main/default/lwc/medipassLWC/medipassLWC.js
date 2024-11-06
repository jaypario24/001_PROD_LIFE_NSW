import { LightningElement } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';
import MEDIPASS_SDK from '@salesforce/resourceUrl/Medipass_sdk';

export default class MyMedipassIntegration extends LightningElement {
    medipassSDKInitialized = false;

    renderedCallback() {
        if (this.medipassSDKInitialized) {
            return;
        }
        this.medipassSDKInitialized = true;

        loadScript(this, MEDIPASS_SDK)
            .then(() => {
                this.initializeSDK();
            })
            .catch(error => {
                console.error('Error loading Medipass SDK', error);
            });
    }

    initializeSDK() {
        if (window.MedipassTransactionSDK) {
            window.MedipassTransactionSDK.setConfig({
                env: 'stg',
                apiKey: '[insert your API key here]',
                appId: '[insert your App ID here]',
                appVersion: '[insert your App version here]'
            });
        } else {
            console.error('Medipass SDK not loaded');
        }
    }

    handleCreateTransaction() {
        if (window.MedipassTransactionSDK) {
            window.MedipassTransactionSDK.renderCreateTransaction({}, {
                onSuccess: (transaction) => {
                    console.log('Transaction success', transaction);
                    // Additional handling here
                },
                onError: (error) => {
                    console.error('Transaction error', error);
                    // Additional handling here
                },
                onCancel: () => {
                    console.log('Transaction cancelled');
                    // Additional handling here
                }
            });
        }
    }
}