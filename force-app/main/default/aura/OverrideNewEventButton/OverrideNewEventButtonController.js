({
    init: function(component, event, helper) {
        console.log('Init called');
        helper.checkAndRemoveNoOverride(component);

        window.setInterval(
            $A.getCallback(function() {
                console.log('Interval check called');
                helper.checkAndRemoveNoOverride(component);
            }), 
            1000
        );
    },

    handleUrlChange: function(component, event, helper) {
        console.log('URL change detected');
        helper.checkAndRemoveNoOverride(component);
    }
})