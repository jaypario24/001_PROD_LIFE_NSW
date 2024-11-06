import { LightningElement, api } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';
import MEDIPASS_SDK from '@salesforce/resourceUrl/MedipassPartnerSDK'; // Reference to the static resource

export default class MedipassInteractionLWC extends LightningElement {
    sdkInitialized = false;
    sdkLoaded = false;

    @api payloadString; // Public property to accept payload as a string

    // Use renderedCallback to load the SDK only once
    renderedCallback() {
        if (this.sdkLoaded) {
            return; // Prevent re-loading the script on every render
        }
        this.sdkLoaded = true;

        // Debug log to verify the correct path is being used
        console.log('Loading Medipass SDK from:', MEDIPASS_SDK + '/dist/umd/index.min.js');

        // Load the SDK script
        loadScript(this, MEDIPASS_SDK + '/dist/umd/index.min.js')
            .then(() => {
                console.log('Medipass SDK loaded successfully');

                // Assign the global SDK to window to ensure it's accessible in LWC
                if (typeof window.MedipassTransactionSDK === 'undefined') {
                    window.MedipassTransactionSDK = MedipassTransactionSDK;
                }

                this.sdkInitialized = true;
                this.initializeSDK(); // Initialize the SDK after loading
            })
            .catch(error => {
                console.error('Error loading Medipass SDK:', error);
            });
    }

    // Initialize SDK and set up its configuration
    initializeSDK() {
        // Check if the SDK is globally available
        if (typeof window.MedipassTransactionSDK !== 'undefined') {
            console.log('Initializing MedipassTransactionSDK...');
            window.MedipassTransactionSDK.setConfig({
                env: 'prod',
                apiKey: '665fc8f578c11da4140ff517:L3Hd4H-TEnzwl1OR26dAKUP6NELmIKKICpep4nVRnqY',
                appId: 'pariosolutions-web',
                appVersion: '1.0'
            });
            console.log('MedipassTransactionSDK initialized.');
            this.submitTransaction(); // Call submitTransaction after initialization
        } else {
            console.error('MedipassTransactionSDK is still not defined after script load.');
        }
    }

    // Call this function to render and submit the transaction
    @api
    submitTransaction() {
        console.log('submitTransaction called with payloadString:', this.payloadString);
        if (typeof window.MedipassTransactionSDK !== 'undefined') {
            let payload;
            try {
                payload = JSON.parse(this.payloadString); // Parse the payload string into a JSON object
                console.log('Parsed payload:', payload);
            } catch (error) {
                console.error('Error parsing payload string:', error);
                this.template.querySelector("#message").innerText = "Error parsing payload string.";
                return;
            }

            window.MedipassTransactionSDK.renderCreateTransaction(payload, {
                container: this.template.querySelector('#sdk-container'), // Render the transaction UI inside this container
                autoSubmit: true,
                onSuccess: function(transaction) {
                    console.log('Transaction successful:', transaction);
                    const messageElement = this.template.querySelector("#message");
                    if (messageElement) {
                        messageElement.innerText = "Transaction successful.";
                    }
                }.bind(this),
                onError: function(error) {
                    console.error('Error submitting transaction:', error);
                    this.template.querySelector("#message").innerText = "Error submitting transaction.";
                }.bind(this),
                onCancel: function() {
                    console.log('Transaction cancelled.');
                    this.template.querySelector("#message").innerText = "Transaction cancelled.";
                }.bind(this)
            });
        } else {
            console.error('MedipassTransactionSDK is not defined');
        }
    }
}