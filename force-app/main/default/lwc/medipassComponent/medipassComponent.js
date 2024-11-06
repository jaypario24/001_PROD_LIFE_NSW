import { LightningElement } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';
import MEDIPASS_SDK from '@salesforce/resourceUrl/Medipass_sdk';

export default class MedipassComponent extends LightningElement {
    medipassSDK;

    sdkInitialized = false;

    renderedCallback() {
        if (this.sdkInitialized) {
            return;
        }
        this.sdkInitialized = true;

        Promise.all([loadScript(this, MEDIPASS_SDK)])
            .then(() => {
                this.medipassSDK = window.medipassSDK;
                if (this.medipassSDK) {
                    this.initializeMedipassSDK();
                } else {
                    console.error('Medipass Partner SDK not available on window object.');
                }
            })
            .catch(error => {
                console.error('Error loading Medipass Partner SDK:', error);
            });
    }

    initializeMedipassSDK() {
        this.medipassSDK.setConfig({
            env: 'stg',
            apiKey: '641d2ab2f759a3006afd80c6:r7m_I1j_wUFdmAJz31Ks6BsvZoZJtzIWm_lYuVxMTPM',
            appId: 'pariosolutions-web',
            appVersion: '1.0'
        });

        this.medipassSDK.renderCreateTransaction({}, {
            onSuccess: function (transaction) {
                // handle successful submission of transaction
            },
            onError: function (error) {
                // handle errored submission of transaction
            },
            onCancel: function () {
                // handle when create transaction flow has been cancelled
            }
        });
    }
}