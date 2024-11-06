({
    doInit: function(component, event, helper) {
        console.log('Medipass SDK loaded successfully.');
    },

    handleClick: function(component, event, helper) {
        var medipassSDK = window.medipassSDK || window.medipassPartnerSDK;
        if (medipassSDK) {
            console.log('SDK Object:', medipassSDK);
            medipassSDK.setConfig({
                env: 'stg',
                apiKey: '641d2ab2f759a3006afd80c6:r7m_I1j_wUFdmAJz31Ks6BsvZoZJtzIWm_lYuVxMTPM',
                appId: 'pariosolutions-web',
                appVersion: '1.0'
            });

            medipassSDK.renderCreateTransaction({
                platform: "funder"
            }, {
                allowEdit: true,
                version: "3",
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
        } else {
            console.error('Unable to access Medipass Partner SDK object.');
        }
    }
})